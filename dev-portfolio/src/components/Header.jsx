import { Users, FolderGit2, Info, PackageOpen, Globe } from "lucide-react";
import { TabButton } from "./ui/TabButton";
import devLogo from "../assets/devlogo.png";

export function Header({ t, lang, setLang, tab, setTab }) {
  const navItems = [
    { id: "authors", label: t.nav.authors, icon: <Users size={16} /> },
    { id: "projects", label: t.nav.projects, icon: <FolderGit2 size={16} /> },
    { id: "info", label: t.nav.info, icon: <Info size={16} /> },
    { id: "releases", label: t.nav.releases, icon: <PackageOpen size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-400/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={devLogo}
            alt="DevEyes Logo"
            className="h-9 w-9 rounded-xl object-cover shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold tracking-wider text-cyan-200/90 leading-tight">
              {t.brand}
            </span>
            <span className="text-[10px] font-medium tracking-wide text-cyan-300/60 leading-tight">
              portfolio
            </span>
          </div>
        </div>

        <nav className="hidden gap-6 sm:flex">
          {navItems.map((item) => (
            <TabButton
              key={item.id}
              icon={item.icon}
              active={tab === item.id}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </TabButton>
          ))}
        </nav>

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

      <div className="mx-auto block max-w-6xl px-4 pb-3 sm:hidden">
        <div className="flex gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-1 items-center justify-center gap-1 rounded-xl border border-cyan-400/20 px-2 py-2 text-xs ${
                tab === item.id ? "bg-cyan-400/10" : "bg-zinc-900/60"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
