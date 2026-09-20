import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function requireApiUser() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  return session.user;
}
