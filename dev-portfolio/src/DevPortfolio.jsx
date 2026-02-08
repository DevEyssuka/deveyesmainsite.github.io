import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOCALES } from "./constants/locales";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthorsSection } from "./components/sections/AuthorsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { InfoSection } from "./components/sections/InfoSection";
import { ReleasesSection } from "./components/sections/ReleasesSection";

export default function DevPortfolio() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => LOCALES[lang], [lang]);

  const [tab, setTab] = useState("authors");
  const [activeAuthor, setActiveAuthor] = useState("dev");
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
      <Header t={t} lang={lang} setLang={setLang} tab={tab} setTab={setTab} />

      <main>
        <AnimatePresence mode="wait">
          {tab === "authors" && (
            <motion.div
              key="authors"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <AuthorsSection
                t={t}
                lang={lang}
                activeAuthor={activeAuthor}
                setActiveAuthor={setActiveAuthor}
              />
            </motion.div>
          )}

          {tab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <ProjectsSection
                t={t}
                lang={lang}
                openProjectIds={openProjectIds}
                toggleProject={toggleProject}
              />
            </motion.div>
          )}

          {tab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <InfoSection t={t} lang={lang} />
            </motion.div>
          )}

          {tab === "releases" && (
            <motion.div
              key="releases"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <ReleasesSection t={t} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer footerText={t.footer} />
    </div>
  );
}
