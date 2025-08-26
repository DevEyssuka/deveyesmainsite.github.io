import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlayCircle, Users, FolderGit2, Info, PackageOpen, Globe } from "lucide-react";

// ---------------------------------------------
// Lightweight i18n (EN default, RU optional)
// ---------------------------------------------
const LOCALES = {
  en: {
    brand: "DEV EYES",
    nav: { authors: "Authors", projects: "Projects", info: "Info", releases: "Releases" },
    authors: {
      title: "Authors",
      youBadge: "You",
      roles: {
        dev: "Frontend / Backend / Game Developer",
        catterson: "Biomechanics & Co‑author of JETRUNNER",
      },
      contacts: "Contacts",
      email: "Email",
      github: "GitHub",
    },
    projects: {
      title: "Projects",
      filtersPlaceholder: "Search projects…",
      theEndKey: "(Key universe project)",
      fields: { description: "Description", gallery: "Gallery", authors: "Authors", video: "Video", results: "Results" },
    },
    info: {
      title: "Info",
      text:
        "This space hosts the DEV EYES universe. THE END is the narrative spine. SUBJECTS (UE5) and JETRUNNER extend that world into games and biomech R&D.",
    },
    releases: { title: "Releases", none: "No public releases yet." },
    footer: "Developed by DEV EYES © 2025",
  },
  ru: {
    brand: "DEV EYES",
    nav: { authors: "Авторы", projects: "Проекты", info: "Инфо", releases: "Релизы" },
    authors: {
      title: "Авторы",
      youBadge: "Это ты",
      roles: {
        dev: "Frontend / Backend / Game Developer",
        catterson: "Биомеханика и со‑автор JETRUNNER",
      },
      contacts: "Контакты",
      email: "Почта",
      github: "GitHub",
    },
    projects: {
      title: "Проекты",
      filtersPlaceholder: "Искать проекты…",
      theEndKey: "(Ключевой проект вселенной)",
      fields: { description: "Описание", gallery: "Галерея", authors: "Авторы", video: "Видео", results: "Результаты" },
    },
    info: {
      title: "Информация",
      text:
        "Здесь живёт вселенная DEV EYES. THE END — её позвоночник. SUBJECTS (UE5) и JETRUNNER расширяют мир в игры и биомех R&D.",
    },
    releases: { title: "Релизы", none: "Публичных релизов пока нет." },
    footer: "Developed by DEV EYES © 2025",
  },
};

// ---------------------------------------------
// Data (authors & projects)
// ---------------------------------------------
const AUTHORS = {
  dev: {
    id: "dev",
    name: "DevEyes",
    avatar: "assets/devlogo.png",
    roleKey: "dev",
    email: "gamer0ignis0black@gmail.com",
    github: "https://github.com/DevEyssuka",
    badges: ["Founder", "Universe Architect"],
  },
  catterson: {
    id: "catterson",
    name: "Catterson",
    avatar: "assets/catterson.png",
    roleKey: "catterson",
    email: null,
    github: null,
    badges: ["Co‑author", "Biomechanics"],
  },
};

const PROJECTS = [
  {
    id: "the-end",
    title: "THE END",
    keyFlag: true,
    cover: "assets/theend.png",
    description: {
      en: "The core narrative universe. A living book whose lore seeds all other projects.",
      ru: "Сердце вселенной: живая книга, чей лор питает все остальные проекты.",
    },
    authors: ["dev"],
    images: ["assets/theend_1.png", "assets/theend_2.png"],
    video: { type: "youtube", id: "9bZkp7q19f0" },
    results: {
      en: ["World bible drafts", "Timeline v0.2", "Character matrix"],
      ru: ["Черновики мирового библа", "Хронология v0.2", "Матрица персонажей"],
    },
  },
  {
    id: "subjects",
    title: "S.U.B.J.E.C.T.S",
    cover: "assets/subjects.png",
    description: {
      en: "Immersive ops thriller moved from Unity to Unreal Engine 5 (UE5).",
      ru: "Иммерсивный оп‑триллер перенесён с Unity на Unreal Engine 5 (UE5).",
    },
    authors: ["dev"],
    images: ["assets/subjects_1.png", "assets/subjects_2.png"],
    video: { type: "youtube", id: "dQw4w9WgXcQ" },
    results: {
      en: ["Procedural complexes", "Ops loadouts", "Bodycam‑style movement"],
      ru: ["Процедурные комплексы", "Снаряжение оперативников", "Движение в стиле bodycam"],
    },
  },
  {
    id: "jetrunner",
    title: "JETRUNNER",
    cover: "assets/jetrunner.png",
    description: {
      en: "Adaptive prosthetics for sprinting and mobility — R&D with Catterson.",
      ru: "Адаптивные протезы для бега и мобильности — R&D вместе с Catterson.",
    },
    authors: ["dev", "catterson"],
    images: ["assets/jetrunner_1.png", "assets/jetrunner_2.png"],
    video: { type: "mp4", src: "assets/jetrunner.mp4" },
    results: {
      en: ["Socket prototypes v0.1", "Gait analysis rig", "UE5 viz sandbox"],
      ru: ["Прототипы гильз v0.1", "Стенд анализа походки", "UE5 песочница визуализаций"],
    },
  },
];

// ---------------------------------------------
// UI helpers
// ---------------------------------------------
const Section = ({ children }) => (
  <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">{children}</div>
);

const Chip = ({ children }) => (
  <span className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-wide">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-cyan-400/20 bg-zinc-900/60 p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur ${className}`}>
    {children}
  </div>
);

// ---------------------------------------------
// Main App
// ---------------------------------------------
export default function DevPortfolio() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => LOCALES[lang], [lang]);

  const [tab, setTab] = useState("authors");
  const [activeAuthor, setActiveAuthor] = useState("dev"); // default = Dev
  const [query, setQuery] = useState("");
  const [openProjectIds, setOpenProjectIds] = useState(new Set());

  const toggleProject = (id) => {
    setOpenProjectIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter((p) =>
      [p.title, p.description[lang]].some((x) => x.toLowerCase().includes(q))
    );
  }, [query, lang]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-cyan-300">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-cyan-400/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400/60 to-cyan-600/30 shadow-[0_0_30px_rgba(34,211,238,0.4)]" />
            <span className="text-sm font-semibold tracking-wider text-cyan-200/90">
              {t.brand}
            </span>
          </div>

          <nav className="hidden gap-6 sm:flex">
            <TabButton icon={<Users size={16} />} active={tab === "authors"} onClick={() => setTab("authors")}>
              {t.nav.authors}
            </TabButton>
            <TabButton icon={<FolderGit2 size={16} />} active={tab === "projects"} onClick={() => setTab("projects")}>
              {t.nav.projects}
            </TabButton>
            <TabButton icon={<Info size={16} />} active={tab === "info"} onClick={() => setTab("info")}>
              {t.nav.info}
            </TabButton>
            <TabButton icon={<PackageOpen size={16} />} active={tab === "releases"} onClick={() => setTab("releases")}>
              {t.nav.releases}
            </TabButton>
          </nav>

          {/* Lang switcher */}
          <div className="flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-zinc-900/60 p-1">
            <Globe size={16} className="opacity-70" />
            <button
              className={`rounded-xl px-2 py-1 text-xs ${lang === "en" ? "bg-cyan-400/20" : "opacity-70 hover:opacity-100"}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`rounded-xl px-2 py-1 text-xs ${lang === "ru" ? "bg-cyan-400/20" : "opacity-70 hover:opacity-100"}`}
              onClick={() => setLang("ru")}
            >
              RU
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="mx-auto block max-w-6xl px-4 pb-3 sm:hidden">
          <div className="flex gap-2">
            {[
              { id: "authors", label: t.nav.authors, icon: <Users size={16} /> },
              { id: "projects", label: t.nav.projects, icon: <FolderGit2 size={16} /> },
              { id: "info", label: t.nav.info, icon: <Info size={16} /> },
              { id: "releases", label: t.nav.releases, icon: <PackageOpen size={16} /> },
            ].map((x) => (
              <button
                key={x.id}
                onClick={() => setTab(x.id)}
                className={`flex flex-1 items-center justify-center gap-1 rounded-xl border border-cyan-400/20 px-2 py-2 text-xs ${
                  tab === x.id ? "bg-cyan-400/10" : "bg-zinc-900/60"
                }`}
              >
                {x.icon}
                {x.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Sections */}
      <main>
        <AnimatePresence mode="wait">
          {tab === "authors" && (
            <motion.div key="authors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <AuthorsSection t={t} activeAuthor={activeAuthor} setActiveAuthor={setActiveAuthor} />
            </motion.div>
          )}

          {tab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <ProjectsSection t={t} lang={lang} query={query} setQuery={setQuery} openProjectIds={openProjectIds} toggleProject={toggleProject} />
            </motion.div>
          )}

          {tab === "info" && (
            <motion.div key="info" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <InfoSection t={t} />
            </motion.div>
          )}

          {tab === "releases" && (
            <motion.div key="releases" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <ReleasesSection t={t} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="pointer-events-none fixed bottom-3 right-4 rounded-xl border border-cyan-400/20 bg-zinc-900/60 px-3 py-2 text-[10px] text-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
        {t.footer}
      </footer>
    </div>
  );
}

// ---------------------------------------------
// Subsections
// ---------------------------------------------
function AuthorsSection({ t, activeAuthor, setActiveAuthor }) {
  return (
    <Section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-wide text-cyan-200">{t.authors.title}</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Object.values(AUTHORS)
          // ensure Dev first, then others
          .sort((a, b) => (a.id === "dev" ? -1 : b.id === "dev" ? 1 : a.name.localeCompare(b.name)))
          .map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveAuthor(a.id)}
              className={`group relative overflow-hidden rounded-2xl border p-2 text-left transition ${
                activeAuthor === a.id
                  ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                  : "border-cyan-400/20 bg-zinc-900/60 hover:border-cyan-400/40 hover:bg-cyan-400/5"
              }`}
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400/10 to-zinc-900">
                <img
                  src={a.avatar}
                  alt={a.name}
                  className="h-full w-full object-cover object-center opacity-90 transition group-hover:scale-105"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-cyan-100">{a.name}</div>
                  <div className="text-[10px] text-cyan-300/70">{t.authors.roles[a.roleKey]}</div>
                </div>
                {a.id === "dev" && <Chip>{t.authors.youBadge}</Chip>}
              </div>
            </button>
          ))}
      </div>

      {/* Details */}
      <div className="mt-6">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-1/3">
              <div className="overflow-hidden rounded-xl border border-cyan-400/20 bg-zinc-900/60">
                <img
                  src={AUTHORS[activeAuthor].avatar}
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
                {AUTHORS[activeAuthor].badges.map((b) => (
                  <Chip key={b}>{b}</Chip>
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
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function ProjectsSection({ t, lang, query, setQuery, openProjectIds, toggleProject }) {
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
        {PROJECTS.map((p) => (
          <Card key={p.id}>
            <button
              onClick={() => toggleProject(p.id)}
              className="flex w-full items-center gap-3 text-left"
            >
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-zinc-900">
                <img src={p.cover} alt={p.title} className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")}/>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-cyan-100">{p.title}</span>
                  {p.keyFlag && <Chip>{t.projects.theEndKey}</Chip>}
                </div>
                <div className="text-xs text-cyan-300/80">
                  {p.description[lang]}
                </div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {openProjectIds.has(p.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Gallery */}
                    <div className="md:col-span-2">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                        {t.projects.fields.gallery}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {p.images.map((src, i) => (
                          <div key={i} className="overflow-hidden rounded-xl border border-cyan-400/20 bg-zinc-900/60">
                            <img src={src} alt={`${p.title} ${i + 1}`} className="h-40 w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")}/>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Authors */}
                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                        {t.projects.fields.authors}
                      </h4>
                      <div className="space-y-2">
                        {p.authors.map((aid) => (
                          <div key={aid} className="flex items-center gap-2">
                            <div className="h-8 w-8 overflow-hidden rounded-lg border border-cyan-400/20 bg-zinc-900/60">
                              <img src={AUTHORS[aid].avatar} alt={AUTHORS[aid].name} className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")}/>
                            </div>
                            <div>
                              <div className="text-sm text-cyan-100">{AUTHORS[aid].name}</div>
                              <div className="text-[10px] text-cyan-300/70">{LOCALES[lang].authors.roles[AUTHORS[aid].roleKey]}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Video & Results */}
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                        {t.projects.fields.video}
                      </h4>
                      <div className="overflow-hidden rounded-xl border border-cyan-400/20 bg-zinc-900/60">
                        {p.video?.type === "youtube" ? (
                          <div className="aspect-video w-full">
                            <iframe
                              className="h-full w-full"
                              src={`https://www.youtube.com/embed/${p.video.id}`}
                              title={`${p.title} video`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        ) : p.video?.type === "mp4" ? (
                          <video controls className="h-full w-full">
                            <source src={p.video.src} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="p-6 text-center text-xs opacity-60">—</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-200/80">
                        {t.projects.fields.results}
                      </h4>
                      <ul className="list-inside list-disc text-sm text-cyan-200/90">
                        {(p.results?.[lang] || []).map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function InfoSection({ t }) {
  return (
    <Section>
      <Card>
        <h2 className="mb-2 text-lg font-semibold text-cyan-100">{t.info.title}</h2>
        <p className="text-sm text-cyan-200/90">{t.info.text}</p>
      </Card>
    </Section>
  );
}

function ReleasesSection({ t }) {
  return (
    <Section>
      <div className="space-y-3">
        <Card>
          <h2 className="mb-2 text-lg font-semibold text-cyan-100">{t.releases.title}</h2>
          <p className="text-sm text-cyan-200/80">{t.releases.none}</p>
        </Card>
      </div>
    </Section>
  );
}

function TabButton({ children, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded-xl border px-3 py-2 text-xs transition ${
        active
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
          : "border-cyan-400/10 bg-zinc-900/60 text-cyan-300/80 hover:border-cyan-400/30 hover:bg-cyan-400/5"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}


