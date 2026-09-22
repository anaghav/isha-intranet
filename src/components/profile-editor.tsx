import {
  addSkill,
  removeSkill,
  removeVolunteerProgram,
} from "@/app/actions/profile";
import { ProfilePhotoCard } from "@/components/profile-photo-card";
import { formatProgramDate } from "@/lib/dashboard";
import { formatPostedDate } from "@/lib/listings";

type ProfileEditorProps = {
  name: string;
  email: string;
  phone: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  skills: { id: string; name: string }[];
  programs: { id: string; title: string; volunteeredOn: Date }[];
  completedPrograms: {
    id: string;
    title: string;
    location: string;
    completedOn: Date;
  }[];
};

export function ProfileEditor({
  name,
  email,
  phone,
  imageUrl,
  createdAt,
  updatedAt,
  skills,
  programs,
  completedPrograms,
}: ProfileEditorProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="grid gap-5 xl:grid-cols-12">
      <ProfilePhotoCard
        name={name}
        initials={initials}
        imageUrl={
          imageUrl ? `${imageUrl}?v=${updatedAt.getTime()}` : null
        }
      />

      <article className="rounded-2xl bg-cream-soft p-8 xl:col-span-4">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">
          Name
        </p>
        <h1 className="mt-1 font-serif text-3xl leading-tight text-ink">{name}</h1>
        <p className="mt-5 text-xs tracking-[0.16em] text-muted uppercase">
          Volunteer
        </p>
        <p className="mt-1 text-[15px] text-ink">{email}</p>
        <p className="mt-1 text-[15px] text-ink">{phone}</p>
        <p className="mt-5 text-sm text-muted">
          Joined {formatPostedDate(createdAt)}
        </p>
      </article>

      <article className="rounded-2xl bg-cream-soft p-8 xl:col-span-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">
              Skills
            </p>
            <h2 className="mt-1 font-serif text-2xl text-ink">What you can offer</h2>
          </div>
          <SkillRing count={skills.length} />
        </div>

        {skills.length === 0 ? (
          <p className="mt-6 text-muted">No skills added yet.</p>
        ) : (
          <ul className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm text-ink"
              >
                {skill.name}
                <form action={removeSkill}>
                  <input type="hidden" name="id" value={skill.id} />
                  <button
                    type="submit"
                    className="text-muted hover:text-ink"
                    aria-label={`Remove ${skill.name}`}
                  >
                    ×
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <form action={addSkill} className="mt-6 flex flex-wrap gap-3">
          <input
            name="name"
            required
            placeholder="e.g. First aid"
            className="h-11 min-w-[160px] flex-1 rounded-full border border-line bg-cream px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-cta px-5 text-sm font-medium text-white"
          >
            Add skill
          </button>
        </form>
      </article>

      <article className="rounded-2xl bg-cream-soft p-6 xl:col-span-7">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Seva</p>
        <h2 className="mt-1 font-serif text-2xl text-ink">
          Programs volunteered for
        </h2>

        {programs.length === 0 ? (
          <p className="mt-6 text-muted">No programs added yet.</p>
        ) : (
          <div className="mt-5 space-y-3">
            {programs.map((program) => (
              <div
                key={program.id}
                className="flex items-center justify-between gap-4 rounded-xl bg-cream px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-xs tracking-[0.16em] text-muted uppercase">
                    {formatProgramDate(program.volunteeredOn)}
                  </p>
                  <h3 className="mt-1 truncate font-serif text-xl text-ink">
                    {program.title}
                  </h3>
                </div>
                <form action={removeVolunteerProgram}>
                  <input type="hidden" name="id" value={program.id} />
                  <button
                    type="submit"
                    className="text-sm text-muted hover:text-ink"
                  >
                    Remove
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </article>

      <article className="rounded-2xl bg-cream-soft p-6 xl:col-span-5">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">
          Programs
        </p>
        <h2 className="mt-1 font-serif text-2xl text-ink">Completed so far</h2>
        {completedPrograms.length === 0 ? (
          <p className="mt-6 text-muted">No completed programs yet.</p>
        ) : (
          <div className="mt-5 space-y-3">
            {completedPrograms.map((program) => (
              <div key={program.id} className="rounded-xl bg-cream px-4 py-3">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">
                  {formatProgramDate(program.completedOn)}
                </p>
                <h3 className="mt-1 font-serif text-xl text-ink">
                  {program.title}
                </h3>
                {program.location ? (
                  <p className="mt-1 text-sm text-muted">{program.location}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

function SkillRing({ count }: { count: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(count / 8, 1);

  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 72 72" className="h-16 w-16 -rotate-90" aria-hidden>
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-cream"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          className="text-accent"
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-sm font-medium text-ink">
        {count}
      </p>
    </div>
  );
}
