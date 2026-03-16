export default function Projects() {
  const projects = [
    { title: "Project Alpha", tech: "Next.js & WebGL", date: "2026" },
    { title: "Neon Genesis", tech: "React Three Fiber", date: "2025" },
    { title: "Onyx Frame", tech: "Framer Motion", date: "2025" },
    { title: "Hyperloop", tech: "Vue & GSAP", date: "2024" },
  ];

  return (
    <section className="relative z-20 min-h-screen bg-black text-white px-6 py-24 md:px-24">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">
          Featured Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col justify-end p-8 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0 transition-opacity group-hover:opacity-70" />
              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-sm font-mono text-zinc-400 mb-2">
                  {p.date} • {p.tech}
                </p>
                <h4 className="text-3xl font-semibold">{p.title}</h4>
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 relative z-10">
                ↗
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
