import Image from "next/image";

export function AuthShell({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-cream-soft px-6 py-16">
      <div className="flex w-full max-w-[420px] flex-1 flex-col items-center pt-10">
        <Image
          src="/isha-logo-dark.png"
          alt="Isha"
          width={196}
          height={136}
          className="h-auto w-[120px]"
          priority
        />
        <h1 className="mt-8 font-serif text-4xl text-ink">{title}</h1>
        <p className="mt-3 mb-10 max-w-sm text-center text-[15px] leading-7 text-muted">
          {body}
        </p>
        {children}
      </div>
      <p className="mt-12 max-w-sm text-center text-xs leading-5 text-muted/80">
        Only @sadhguru.org and @sadhguru-ext.org emails can join this intranet.
      </p>
    </main>
  );
}
