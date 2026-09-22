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
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
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
    <section className="mx-auto w-full max-w-6xl">
      <ProfileEditor
        name={user.name}
        email={user.email}
        phone={user.phone}
        imageUrl={user.imageUrl}
        createdAt={user.createdAt}
        updatedAt={user.updatedAt}
        skills={user.skills}
        programs={user.volunteerPrograms}
        completedPrograms={completedPrograms}
      />
    </section>
  );
}
