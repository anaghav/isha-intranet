"use server";

import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { signIn } from "@/auth";
import { isAllowedEmail } from "@/lib/auth-domains";
import { prisma } from "@/lib/prisma";

export type RegisterState = {
  error?: string;
};

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function registerUser(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const name = readString(formData, "name");
  const email = readString(formData, "email").toLowerCase();
  const phone = readString(formData, "phone");
  const password = String(formData.get("password") ?? "");

  if (!name) {
    return { error: "Enter your name." };
  }

  if (!isAllowedEmail(email)) {
    return {
      error: "Use an @sadhguru.org or @sadhguru-ext.org email.",
    };
  }

  if (!phone || phone.replace(/\D/g, "").length < 8) {
    return { error: "Enter a valid phone number." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: await hash(password, 12),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "An account with this email already exists. Sign in instead." };
    }
    throw error;
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });

  return {};
}
