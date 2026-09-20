type PagePlaceholderProps = {
  title: string;
  kicker: string;
  body: string;
};

export function PagePlaceholder({ title, kicker, body }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-3xl">
      <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
        {kicker}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{body}</p>
    </section>
  );
}
