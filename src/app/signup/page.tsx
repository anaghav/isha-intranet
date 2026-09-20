import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AuthShell } from "@/components/auth-shell";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default async function SignupPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title="Join the intranet"
      body="Use your Isha email, and add your name and phone so people can reach you."
    >
      <SignupForm />
    </AuthShell>
  );
}
