import { auth } from "@/auth";
import { formatProgramDate } from "@/lib/dashboard";
import { prisma } from "@/lib/prisma";

export type ProgramRecommendation = {
  id: string;
  title: string;
  description: string;
  location: string;
  startsOn: string;
  neededSkills: string[];
  why: string;
  source: "ai" | "profile";
};

type Offering = {
  id: string;
  title: string;
  description: string;
  location: string;
  startsOn: Date;
  neededSkills: string[];
};

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
const AI_MODEL = "qwen/qwen3.8-27b";

export async function recommendProgramsForCurrentUser(): Promise<ProgramRecommendation[]> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return [];
  }

  const [user, offerings] = await Promise.all([
    prisma.user.findUnique({
      where: { email },
      select: {
        skills: { select: { name: true } },
        volunteerPrograms: {
          select: { title: true, volunteeredOn: true },
          orderBy: { volunteeredOn: "desc" },
        },
      },
    }),
    prisma.programOffering.findMany({
      orderBy: { startsOn: "asc" },
    }),
  ]);

  if (!user || offerings.length === 0) {
    return [];
  }

  const completed = await prisma.completedProgram.findMany({
    select: { title: true },
  });

  const taken = new Set(
    [
      ...user.volunteerPrograms.map((item) => item.title),
      ...completed.map((item) => item.title),
    ].map((title) => title.trim().toLowerCase()),
  );

  const candidates = offerings.filter(
    (offering) => !taken.has(offering.title.trim().toLowerCase()),
  );

  if (candidates.length === 0) {
    return [];
  }

  const profile = {
    skills: user.skills.map((skill) => skill.name),
    volunteerPrograms: user.volunteerPrograms.map((item) => ({
      title: item.title,
      date: formatProgramDate(item.volunteeredOn),
    })),
  };

  const aiPicks = await recommendWithAi(profile, candidates);
  if (aiPicks.length > 0) {
    return aiPicks;
  }

  return recommendFromProfile(profile, candidates);
}

async function recommendWithAi(
  profile: {
    skills: string[];
    volunteerPrograms: { title: string; date: string }[];
  },
  candidates: Offering[],
): Promise<ProgramRecommendation[]> {
  const token = process.env.GROQ_API_KEY;
  if (!token) {
    return [];
  }

  const catalog = candidates.map((offering) => ({
    id: offering.id,
    title: offering.title,
    description: offering.description,
    location: offering.location,
    startsOn: formatProgramDate(offering.startsOn),
    neededSkills: offering.neededSkills,
  }));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        temperature: 0.3,
        reasoning_effort: "none",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You recommend volunteer programs at Isha Yoga Centre. Return JSON only.",
          },
          {
            role: "user",
            content: `Pick the 3 best upcoming programs for this volunteer. Use their skills and past seva. Write a short why line that names a real skill or past program.

Profile:
${JSON.stringify(profile, null, 2)}

Programs:
${JSON.stringify(catalog, null, 2)}

Return: {"recommendations":[{"id":"...","why":"..."}]}`,
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    const parsed = parseRecommendations(content);
    const byId = new Map(candidates.map((offering) => [offering.id, offering]));

    return parsed
      .map((item) => {
        const offering = byId.get(item.id);
        if (!offering) {
          return null;
        }
        return toRecommendation(offering, item.why, "ai");
      })
      .filter((item): item is ProgramRecommendation => item !== null)
      .slice(0, 3);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

function recommendFromProfile(
  profile: {
    skills: string[];
    volunteerPrograms: { title: string; date: string }[];
  },
  candidates: Offering[],
): ProgramRecommendation[] {
  const ranked = candidates
    .map((offering) => {
      const matches = matchingSkills(profile.skills, offering.neededSkills);
      const past = relatedVolunteer(profile.volunteerPrograms, offering);
      const score = matches.length * 3 + (past ? 2 : 0);
      return { offering, matches, past, score };
    })
    .sort((a, b) => b.score - a.score || a.offering.startsOn.getTime() - b.offering.startsOn.getTime());

  return ranked.slice(0, 3).map(({ offering, matches, past }) => {
    const reasons = [
      matches[0] ? `your ${matches[0]} skill` : null,
      past ? `your seva at ${past}` : null,
    ].filter((item): item is string => Boolean(item));
    const why = reasons.length
      ? `Recommended because of ${reasons.join(" and ")}.`
      : "This upcoming offering matches volunteers with your kind of profile.";
    return toRecommendation(offering, why, "profile");
  });
}

function matchingSkills(skills: string[], needed: string[]) {
  const neededLower = needed.map((item) => item.toLowerCase());
  return skills.filter((skill) =>
    neededLower.some(
      (need) =>
        need.includes(skill.toLowerCase()) || skill.toLowerCase().includes(need),
    ),
  );
}

function relatedVolunteer(
  volunteerPrograms: { title: string }[],
  offering: Offering,
) {
  const haystack = `${offering.title} ${offering.description}`.toLowerCase();
  return volunteerPrograms.find((item) => {
    const words = item.title.toLowerCase().split(/\s+/).filter((word) => word.length > 3);
    return words.some((word) => haystack.includes(word));
  })?.title;
}

function toRecommendation(
  offering: Offering,
  why: string,
  source: ProgramRecommendation["source"],
): ProgramRecommendation {
  return {
    id: offering.id,
    title: offering.title,
    description: offering.description,
    location: offering.location,
    startsOn: offering.startsOn.toISOString(),
    neededSkills: offering.neededSkills,
    why,
    source,
  };
}

function parseRecommendations(content?: string) {
  if (!content) {
    return [] as { id: string; why: string }[];
  }

  const jsonText = content
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/```json|```/g, "")
    .trim();
  const start = jsonText.indexOf("{");
  const end = jsonText.lastIndexOf("}");
  if (start === -1 || end === -1) {
    return [];
  }

  try {
    const parsed = JSON.parse(jsonText.slice(start, end + 1)) as {
      recommendations?: { id?: string; why?: string }[];
    };
    return (parsed.recommendations ?? []).filter(
      (item): item is { id: string; why: string } =>
        Boolean(item.id && item.why),
    );
  } catch {
    return [];
  }
}
