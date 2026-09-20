"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { isAllowedEmail } from "@/lib/auth-domains";

type LoginFormProps = {
  error?: string;
};

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: "Email or password is incorrect.",
  AccessDenied:
    "This intranet is only for @sadhguru.org and @sadhguru-ext.org emails.",
  Configuration: "Sign-in is not configured yet.",
  Default: "Something went wrong while signing in. Please try again.",
};

export function LoginForm({ error }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(
    error ? ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default : "",
  );

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextEmail = email.trim().toLowerCase();

    if (!isAllowedEmail(nextEmail)) {
      setMessage(ERROR_MESSAGES.AccessDenied);
      return;
    }

    if (!password) {
      setMessage("Enter your password.");
      return;
    }

    setMessage("");
    setPending(true);
    await signIn("credentials", {
      email: nextEmail,
      password,
      redirectTo: "/dashboard",
    });
  }

  return (
    <div className="w-full max-w-[420px]">
      {message ? (
        <p className="mb-6 rounded-md bg-white px-4 py-3 text-sm leading-6 text-ink">
          {message}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Isha email"
          className="h-12 w-full rounded-full border border-line bg-white px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
        />
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="h-12 w-full rounded-full border border-line bg-white px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 w-full rounded-full bg-cta text-[15px] font-medium text-white transition-opacity disabled:opacity-70"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="text-accent">
          Create an account
        </Link>
      </p>
    </div>
  );
}
