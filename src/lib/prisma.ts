import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function databaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return url;
  }

  const extra: string[] = [];
  if (!/[?&]connect_timeout=/.test(url)) {
    extra.push("connect_timeout=30");
  }
  if (!/[?&]pool_timeout=/.test(url)) {
    extra.push("pool_timeout=30");
  }
  if (extra.length === 0) {
    return url;
  }

  return `${url}${url.includes("?") ? "&" : "?"}${extra.join("&")}`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: databaseUrl(),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
