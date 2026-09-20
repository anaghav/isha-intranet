"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser, type RegisterState } from "@/app/actions/auth";

const initialState: RegisterState = {};

export function SignupForm() {
  const [state, action, pending] = useActionState(registerUser, initialState);

  return (
    <div className="w-full max-w-[420px]">
      {state.error ? (
        <p className="mb-6 rounded-md bg-white px-4 py-3 text-sm leading-6 text-ink">
          {state.error}
        </p>
      ) : null}

      <form action={action} className="space-y-4">
        <Field
          id="name"
          name="name"
          label="Full name"
          autoComplete="name"
          required
        />
        <Field
          id="email"
          name="email"
          type="email"
          label="Isha email"
          autoComplete="email"
          required
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          label="Phone number"
          autoComplete="tel"
          required
        />
        <Field
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 w-full rounded-full bg-cta text-[15px] font-medium text-white transition-opacity disabled:opacity-70"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-accent">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
  minLength,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block text-sm text-muted" htmlFor={id}>
      {label}
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="mt-1 h-12 w-full rounded-full border border-line bg-white px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
      />
    </label>
  );
}
