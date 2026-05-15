export default function BackgroundGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,255,0.45), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,255,0.35), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,255,0.30), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}
