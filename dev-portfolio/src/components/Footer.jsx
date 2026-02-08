export function Footer({ footerText }) {
  return (
    <footer className="pointer-events-none fixed bottom-3 right-4 rounded-xl border border-cyan-400/20 bg-zinc-900/60 px-3 py-2 text-[10px] text-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      {footerText}
    </footer>
  );
}
