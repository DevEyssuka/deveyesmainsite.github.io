export function TabButton({ children, icon, active, onClick }) {
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
