import { AUTHORS } from "../../constants/data";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Chip } from "../ui/Chip";
import devLogo from "../../assets/devlogo.png";

export function AuthorsSection({ t, lang, activeAuthor, setActiveAuthor }) {
  const sortedAuthors = Object.values(AUTHORS).sort((a, b) =>
    a.id === "dev" ? -1 : b.id === "dev" ? 1 : a.name.localeCompare(b.name)
  );

  return (
    <Section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-wide text-cyan-200">{t.authors.title}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {sortedAuthors.map((author) => (
          <button
            key={author.id}
            onClick={() => setActiveAuthor(author.id)}
            className={`group relative overflow-hidden rounded-2xl border p-2 text-left transition ${
              activeAuthor === author.id
                ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                : "border-cyan-400/20 bg-zinc-900/60 hover:border-cyan-400/40 hover:bg-cyan-400/5"
            }`}
          >
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400/10 to-zinc-900">
              <img
                src={devLogo}
                alt={author.name}
                className="h-full w-full object-cover object-center opacity-90 transition group-hover:scale-105"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-cyan-100">{author.name}</div>
                <div className="text-[10px] text-cyan-300/70">{t.authors.roles[author.roleKey]}</div>
              </div>
              {author.id === "dev" && <Chip>{t.authors.youBadge}</Chip>}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-1/3">
              <div className="overflow-hidden rounded-xl border border-cyan-400/20 bg-zinc-900/60">
                <img
                  src={devLogo}
                  alt={AUTHORS[activeAuthor].name}
                  className="h-48 w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            </div>
            <div className="w-full sm:w-2/3">
              <h3 className="text-lg font-semibold text-cyan-100">{AUTHORS[activeAuthor].name}</h3>
              <p className="text-sm text-cyan-200/80">{t.authors.roles[AUTHORS[activeAuthor].roleKey]}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {AUTHORS[activeAuthor].badges.map((badge) => (
                  <Chip key={badge}>{badge}</Chip>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="text-xs">
                  <div className="mb-1 font-semibold text-cyan-200/90">{t.authors.contacts}</div>
                  {AUTHORS[activeAuthor].email && (
                    <div className="truncate opacity-80">
                      <span className="mr-1 opacity-70">{t.authors.email}:</span>
                      <a className="underline hover:opacity-100" href={`mailto:${AUTHORS[activeAuthor].email}`}>
                        {AUTHORS[activeAuthor].email}
                      </a>
                    </div>
                  )}
                  {AUTHORS[activeAuthor].github && (
                    <div className="truncate opacity-80">
                      <span className="mr-1 opacity-70">{t.authors.github}:</span>
                      <a className="underline hover:opacity-100" href={AUTHORS[activeAuthor].github} target="_blank" rel="noreferrer">
                        {AUTHORS[activeAuthor].github.replace("https://", "")}
                      </a>
                    </div>
                  )}
                  {AUTHORS[activeAuthor].telegram && (
                    <div className="truncate opacity-80">
                      <span className="mr-1 opacity-70">{t.authors.telegram}:</span>
                      <span className="opacity-100">{AUTHORS[activeAuthor].telegram}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
