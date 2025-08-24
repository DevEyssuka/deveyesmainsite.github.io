export default function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-cyan-400/20 bg-zinc-900/60 p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur ${className}`}>{children}</div>;
}
