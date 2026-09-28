import { useEffect, useRef, useState } from "react";
import { Car, Fuel, UserCheck, Smartphone } from "lucide-react";
import bgImage from "../assets/bgimage.png";

const FEATURES = [
  {
    id: "car",
    icon: Car,
    label: "Your Car",
    short: "Use your own vehicle",
    detail:
      "Your car stays yours. Our driver comes to you and drives it, so you travel in the comfort you already know.",
  },
  {
    id: "diesel",
    icon: Fuel,
    label: "Your Diesel",
    short: "Keep your fuel",
    detail:
      "You fill the tank and stay in control of fuel costs. What you book from us is only the driver.",
  },
  {
    id: "driver",
    icon: UserCheck,
    label: "We Only Provide a Driver",
    tabLabel: "Just a Driver",
    short: "Skilled. Verified. Local.",
    detail:
      "Every driver is skilled, verified and local, so you can hand over the wheel with confidence.",
  },
];

export default function LinkMyDriverHero() {
  const [active, setActive] = useState(0);
  const heroRef = useRef(null);
  const tabRefs = useRef([]);

  /* Gyroscope state: idle | needs-permission (iOS) | active | denied */
  const [motion, setMotion] = useState("idle");

  /* Detect touch devices with orientation sensors */
  useEffect(() => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window))
      return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!isTouch || reduce) return;
    // iOS 13+ needs an explicit permission tap; Android starts right away
    setMotion(
      typeof window.DeviceOrientationEvent.requestPermission === "function"
        ? "needs-permission"
        : "active",
    );
  }, []);

  /* Tilt-driven parallax: feeds the same --px / --py values as the mouse */
  useEffect(() => {
    if (motion !== "active") return;
    const el = heroRef.current;
    if (!el) return;

    const RANGE = 20; // degrees of tilt for full movement
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let base = null;
    let raf = 0;
    let visible = true;

    const getAngle = () => {
      const a = window.screen.orientation?.angle;
      const angle = typeof a === "number" ? a : window.orientation || 0;
      return ((angle % 360) + 360) % 360;
    };

    const onOrient = (e) => {
      if (e.beta == null || e.gamma == null) return;
      const angle = getAngle();
      let x, y;
      if (angle === 90) {
        x = e.beta;
        y = -e.gamma;
      } else if (angle === 270) {
        x = -e.beta;
        y = e.gamma;
      } else if (angle === 180) {
        x = -e.gamma;
        y = -e.beta;
      } else {
        x = e.gamma;
        y = e.beta;
      }

      // First reading = neutral hold position; it drifts back slowly
      if (!base) base = { x, y };
      base.x += (x - base.x) * 0.01;
      base.y += (y - base.y) * 0.01;

      target.x = clamp((x - base.x) / RANGE, -1, 1) * 0.5;
      target.y = clamp((y - base.y) / RANGE, -1, 1) * 0.5;
    };

    const tick = () => {
      if (!visible) {
        raf = 0;
        return;
      }
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      el.style.setProperty("--px", cur.x.toFixed(3));
      el.style.setProperty("--py", cur.y.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    const resetBase = () => {
      base = null;
    };

    // Only animate while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);

    window.addEventListener("deviceorientation", onOrient);
    window.addEventListener("orientationchange", resetBase);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("orientationchange", resetBase);
      io.disconnect();
      cancelAnimationFrame(raf);
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
  }, [motion]);

  const enableTilt = async () => {
    try {
      const result = await window.DeviceOrientationEvent.requestPermission();
      setMotion(result === "granted" ? "active" : "denied");
    } catch {
      setMotion("denied");
    }
  };

  /* Subtle pointer parallax (mouse only, off for reduced motion) */
  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty(
      "--px",
      ((e.clientX - r.left) / r.width - 0.5).toFixed(3),
    );
    el.style.setProperty(
      "--py",
      ((e.clientY - r.top) / r.height - 0.5).toFixed(3),
    );
  };

  const resetPointer = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  /* Arrow-key navigation for the feature tabs */
  const handleKeyDown = (e, i) => {
    const last = FEATURES.length - 1;
    let next = null;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const current = FEATURES[active];

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFCFE]">
      <style>{`
        @keyframes lmd-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes lmd-swap { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .lmd-rise { animation: lmd-rise .7s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--d, 0ms); }
        .lmd-swap { animation: lmd-swap .3s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .lmd-rise, .lmd-swap { animation: none; } }
      `}</style>

      <div
        ref={heroRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        className="relative flex min-h-[calc(100dvh-4.5rem)] w-full flex-col justify-between"
      >
        {/* Background artwork */}
        <div className="pointer-events-none absolute inset-0 h-full w-full select-none overflow-hidden">
          <img
            src={bgImage}
            alt="LinkMyDriver car and professional driver illustration"
            className={`h-full w-full object-cover object-[72%_center] will-change-transform sm:object-[68%_center] md:object-[60%_center] lg:object-right ${
              motion === "active"
                ? ""
                : "transition-transform duration-500 ease-out"
            }`}
            style={{
              transform:
                "translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -10px), 0) scale(1.05)",
            }}
          />
          {/* Readability gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/30 sm:via-white/70 sm:to-transparent lg:via-white/40 lg:w-[62%]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent lg:hidden" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-8 px-4 pb-4 pt-6 sm:px-6 sm:pt-8 lg:px-12 lg:pt-10">
          {/* Top: message */}
          <div className="relative">
            {/* iOS only: motion sensors need a tap to allow */}
            {motion === "needs-permission" && (
              <button
                type="button"
                onClick={enableTilt}
                aria-label="Enable tilt effect"
                className="lmd-rise absolute right-0 top-0 inline-flex h-9 items-center gap-2 rounded-full border border-[#FCD698] bg-white/80 px-3 text-xs font-bold text-[#0E1D38] shadow-sm outline-none backdrop-blur transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-[#F49E12] md:hidden"
                style={{ "--d": "400ms" }}
              >
                <Smartphone className="h-4 w-4 text-[#F49E12]" />
                <span className="hidden min-[400px]:inline">Enable tilt</span>
              </button>
            )}

            <div className="flex max-w-2xl flex-col items-start">
              {/* Launching soon status */}
              <div
                className="lmd-rise inline-flex items-center gap-2.5 rounded-full border border-[#FCD698] bg-white/80 py-1.5 pl-2.5 pr-4 shadow-sm backdrop-blur"
                style={{ "--d": "0ms" }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#F49E12] opacity-70 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F49E12]" />
                </span>
                <span className="text-sm font-bold text-[#A06000]">
                  Launching soon
                </span>
              </div>

              <h1
                className="lmd-rise mt-4 text-balance text-[2rem] font-black leading-[1.08] tracking-tight text-[#0E1D38] min-[400px]:text-4xl sm:mt-5 sm:text-5xl lg:text-6xl xl:text-7xl"
                style={{ "--d": "90ms" }}
              >
                Your Personal Driver,
                <span className="block">
                  Just One{" "}
                  <span className="text-[#F49E12] drop-shadow-[0_2px_14px_rgba(244,158,18,0.25)]">
                    Link Away.
                  </span>
                </span>
              </h1>

              <p
                className="lmd-rise mt-4 max-w-xl text-pretty text-sm font-medium leading-relaxed text-slate-600 sm:mt-5 sm:text-base lg:text-lg"
                style={{ "--d": "180ms" }}
              >
                Hire trusted local drivers for your trips in your own car
                &mdash; safe, simple and convenient.
              </p>
            </div>

            {/* Handwritten sticker (tablet and up) */}
            <div
              className="pointer-events-none absolute right-2 top-0 hidden -rotate-6 select-none transition-transform duration-500 ease-out md:block lg:right-10 lg:top-2"
              style={{
                transform:
                  "rotate(-6deg) translate3d(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 8px), 0)",
              }}
            >
              <div className="relative">
                <div className="text-right">
                  <span
                    className="block text-2xl font-bold tracking-wide text-[#0E1D38] lg:text-3xl xl:text-4xl"
                    style={{
                      fontFamily: "var(--font-handwriting), 'Caveat', cursive",
                    }}
                  >
                    Local Drivers
                  </span>
                  <span
                    className="-mt-1 block text-2xl font-bold tracking-wide text-[#0E1D38] lg:text-3xl xl:text-4xl"
                    style={{
                      fontFamily: "var(--font-handwriting), 'Caveat', cursive",
                    }}
                  >
                    For Your Next Trip
                  </span>
                </div>

                <svg
                  className="absolute -right-5 -top-2.5 h-7 w-7 text-[#0E1D38]"
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M10 20 L2 18" />
                  <path d="M14 14 L8 6" />
                  <path d="M20 10 L22 2" />
                </svg>

                <svg
                  className="-mt-1 h-3.5 w-full text-[#F49E12]"
                  viewBox="0 0 200 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M10 12 Q 100 2 190 14" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom: interactive feature selector */}
          <div
            className="lmd-rise mx-auto w-full max-w-4xl rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-[0_10px_30px_-8px_rgba(15,27,51,0.18)] backdrop-blur-md sm:p-3"
            style={{ "--d": "280ms" }}
          >
            <div
              role="tablist"
              aria-label="How LinkMyDriver works"
              className="grid grid-cols-3 gap-1.5 sm:gap-2"
            >
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                const isActive = i === active;
                return (
                  <button
                    key={f.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    role="tab"
                    id={`lmd-tab-${f.id}`}
                    type="button"
                    aria-selected={isActive}
                    aria-controls="lmd-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className={`group flex min-h-[4.25rem] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border px-1.5 py-2.5 text-center outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#F49E12] focus-visible:ring-offset-1 motion-reduce:transition-none sm:flex-row sm:justify-start sm:gap-3.5 sm:px-4 sm:text-left ${
                      isActive
                        ? "border-[#F49E12]/60 bg-white shadow-md"
                        : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-11 sm:w-11 ${
                        isActive
                          ? "bg-[#F49E12] text-[#0E1D38]"
                          : "bg-[#E5F1FC] text-[#0E1D38]"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px] stroke-[2] sm:h-5 sm:w-5" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[11px] font-black leading-tight tracking-tight text-[#0E1D38] min-[400px]:text-xs sm:text-base">
                        <span className="sm:hidden">
                          {f.tabLabel || f.label}
                        </span>
                        <span className="hidden sm:inline">{f.label}</span>
                      </span>
                      <span className="mt-0.5 hidden text-xs font-medium text-slate-500 sm:block">
                        {f.short}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div
              id="lmd-panel"
              role="tabpanel"
              aria-labelledby={`lmd-tab-${current.id}`}
              aria-live="polite"
              className="min-h-[5.25rem] px-2 pb-1 pt-3 sm:min-h-[4.25rem] sm:px-4"
            >
              <p
                key={current.id}
                className="lmd-swap text-sm leading-relaxed text-slate-600 sm:text-[15px]"
              >
                <span className="font-black text-[#0E1D38]">
                  {current.label}.{" "}
                </span>
                {current.detail}
              </p>
            </div>
          </div>
        </div>

        {/* Dual wave swoosh */}
        <div className="pointer-events-none relative -mb-[1px] w-full select-none leading-none">
          <svg
            className="h-10 w-full sm:h-14 md:h-16 lg:h-20"
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M720,70 C960,110 1200,60 1440,25 L1440,120 L720,120 Z"
              fill="#F49E12"
            />
            <path
              d="M0,45 C280,10 620,95 1040,65 C1240,50 1360,35 1440,50 L1440,120 L0,120 Z"
              fill="#0E1D38"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
