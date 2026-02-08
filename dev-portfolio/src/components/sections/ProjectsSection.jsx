import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { PROJECTS, AUTHORS } from "../../constants/data";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Chip } from "../ui/Chip";

export function ProjectsSection({ t, lang, openProjectIds, toggleProject }) {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter((p) =>
      [p.title, p.description[lang]].some((x) => x.toLowerCase().includes(q))
    );
  }, [query, lang]);

  return (
    <Section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold tracking-wide text-cyan-200">{t.projects.title}</h2>
        <div className="relative w-full sm:w-80">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.projects.filtersPlaceholder}
            className="w-full rounded-2xl border border-cyan-400/20 bg-zinc-900/60 px-8 py-2 text-sm outline-none ring-cyan-400/30 placeholder:text-cyan-300/50 focus:border-cyan-400/40 focus:ring"
          />
          <Search size={16} className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 opacity-60" />
        </div>
      </div>

      <div className="space-y-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            t={t}
            lang={lang}
            isOpen={openProjectIds.has(project.id)}
            onToggle={() => toggleProject(project.id)}
          />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project, t, lang, isOpen, onToggle }) {
  return (
    <Card>
      <button onClick={onToggle} className="flex w-full items-center gap-3 text-left">
        <div className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-zinc-900">
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-cyan-100">{project.title}</span>
            {project.keyFlag && <Chip>{t.projects.theEndKey}</Chip>}
          </div>
          <div className="text-xs text-cyan-300/80">{project.description[lang]}</div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                  {t.projects.fields.gallery}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.images.map((src, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-cyan-400/20 bg-zinc-900/60">
                      <img
                        src={src}
                        alt={`${project.title} ${i + 1}`}
                        className="h-40 w-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                  {t.projects.fields.authors}
                </h4>
                <div className="space-y-2">
                  {project.authors.map((authorId) => {
                    const author = AUTHORS[authorId];
                    return (
                      <div key={authorId} className="flex items-center gap-2">
                        <div className="h-8 w-8 overflow-hidden rounded-lg border border-cyan-400/20 bg-zinc-900/60">
                          <img
                            src={author.avatar}
                            alt={author.name}
                            className="h-full w-full object-cover"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                        </div>
                        <div>
                          <div className="text-sm text-cyan-100">{author.name}</div>
                          <div className="text-[10px] text-cyan-300/70">
                            {t.authors.roles[author.roleKey]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={`mt-4 grid grid-cols-1 gap-4 ${project.video ? "md:grid-cols-3" : "md:grid-cols-1"}`}>
              {project.video && (
                <div className="md:col-span-2">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                    {t.projects.fields.video}
                  </h4>
                  <div className="overflow-hidden rounded-xl border border-cyan-400/20 bg-zinc-900/60">
                    {project.video.type === "youtube" ? (
                      <div className="aspect-video w-full">
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${project.video.id}`}
                          title={`${project.title} video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    ) : project.video.type === "mp4" ? (
                      <video controls className="h-full w-full">
                        <source src={project.video.src} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="p-6 text-center text-xs opacity-60">—</div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                  {t.projects.fields.results}
                </h4>
                <ul className="list-inside list-disc text-sm text-cyan-200/90">
                  {(project.results?.[lang] || []).map((result, i) => (
                    <li key={i}>{result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
