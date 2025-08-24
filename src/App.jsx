import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Users, FolderGit2, Info, PackageOpen, Globe } from "lucide-react";

import { LOCALES } from "./locales";
import { AUTHORS, PROJECTS } from "./data";

import AuthorsSection from "./sections/AuthorsSection";
import ProjectsSection from "./sections/ProjectsSection";
import InfoSection from "./sections/InfoSection";
import ReleasesSection from "./sections/ReleasesSection";
import TabButton from "./components/TabButton";

export default function App() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => LOCALES[lang], [lang]);
  const [tab, setTab] = useState("authors");
  const [activeAuthor, setActiveAuthor] = useState("dev");
  const [query, setQuery] = useState("");
  const [openProjectIds, setOpenProjectIds] = useState(new Set());

  const toggleProject = (id) => {
    setOpenProjectIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-cyan-300">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-cyan-400/10 bg-zinc-950/80 backdrop-blur">
        {/* Navbar контент как у тебя */}
      </header>

      {/* Main Sections */}
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
          {tab === "info" && <InfoSection t={t} />}
          {tab === "releases" && <ReleasesSection t={t} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-3 right-4 rounded-xl border border-cyan-400/20 bg-zinc-900/60 px-3 py-2 text-[10px] text-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
        {t.footer}
      </footer>
    </div>
  );
}
