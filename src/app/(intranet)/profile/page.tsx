import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileEditor } from "@/components/profile-editor";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const [user, completedPrograms] = await Promise.all([
    prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        phone: true,
        skills: { orderBy: { name: "asc" } },
        volunteerPrograms: { orderBy: { volunteeredOn: "desc" } },
      },
    }),
    prisma.completedProgram.findMany({ orderBy: { completedOn: "desc" } }),
  ]);

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
        Account
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        Profile
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        Your details on this intranet.
      </p>

      <dl className="mt-10 max-w-2xl divide-y divide-line rounded-sm bg-cream-soft px-6">
        <Detail label="Name" value={user.name} />
        <Detail label="Email" value={user.email} />
        <Detail label="Phone" value={user.phone} />
      </dl>

      <ProfileEditor
        skills={user.skills}
        programs={user.volunteerPrograms}
        completedPrograms={completedPrograms}
      />
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-5">
      <dt className="text-xs tracking-[0.16em] text-muted uppercase">{label}</dt>
      <dd className="mt-2 text-lg text-ink">{value}</dd>
    </div>
  );
}
