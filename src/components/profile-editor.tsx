import {
  addSkill,
  addVolunteerProgram,
  removeSkill,
  removeVolunteerProgram,
} from "@/app/actions/profile";
import { formatProgramDate } from "@/lib/dashboard";

type ProfileEditorProps = {
  skills: { id: string; name: string }[];
  programs: { id: string; title: string; volunteeredOn: Date }[];
};

export function ProfileEditor({ skills, programs }: ProfileEditorProps) {
  return (
    <div className="mt-12 space-y-12">
      <section>
        <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
          Skills
        </p>
        <h2 className="mt-2 font-serif text-3xl text-ink">What you can offer</h2>
        <p className="mt-3 text-muted">Add anything in your own words.</p>

        {skills.length === 0 ? (
          <p className="mt-6 text-muted">No skills added yet.</p>
        ) : (
          <ul className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center gap-2 rounded-full bg-cream-soft px-3 py-1.5 text-sm text-ink"
              >
                {skill.name}
                <form action={removeSkill}>
                  <input type="hidden" name="id" value={skill.id} />
                  <button
                    type="submit"
                    className="text-muted hover:text-ink"
                    aria-label={`Remove ${skill.name}`}
                  >
                    ×
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <form action={addSkill} className="mt-6 flex flex-wrap gap-3">
          <input
            name="name"
            required
            placeholder="e.g. First aid"
            className="h-12 min-w-[200px] flex-1 rounded-full border border-line bg-cream-soft px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-6 text-[15px] font-medium text-white"
          >
            Add skill
          </button>
        </form>
      </section>

      <section>
        <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
          Seva
        </p>
        <h2 className="mt-2 font-serif text-3xl text-ink">
          Programs volunteered for
        </h2>
        <p className="mt-3 text-muted">
          Programs you have offered seva for, with the date.
        </p>

        {programs.length === 0 ? (
          <p className="mt-6 text-muted">No programs added yet.</p>
        ) : (
          <div className="mt-6">
            {programs.map((program) => (
              <article
                key={program.id}
                className="flex items-start justify-between gap-4 border-b border-line py-5 first:pt-0 last:border-b-0"
              >
                <div>
                  <h3 className="font-serif text-2xl leading-snug text-ink">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-ink">
                    {formatProgramDate(program.volunteeredOn)}
                  </p>
                </div>
                <form action={removeVolunteerProgram}>
                  <input type="hidden" name="id" value={program.id} />
                  <button
                    type="submit"
                    className="text-sm text-muted hover:text-ink"
                  >
                    Remove
                  </button>
                </form>
              </article>
            ))}
          </div>
        )}

        <form action={addVolunteerProgram} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            name="title"
            required
            placeholder="Program name"
            className="h-12 rounded-full border border-line bg-cream-soft px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
          />
          <input
            name="volunteeredOn"
            type="date"
            required
            className="h-12 rounded-full border border-line bg-cream-soft px-5 text-[15px] text-ink outline-none focus:border-sidebar"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-6 text-[15px] font-medium text-white"
          >
            Add
          </button>
        </form>
      </section>
    </div>
  );
}
