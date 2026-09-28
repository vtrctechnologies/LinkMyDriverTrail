import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import logo from "../assets/LOGO.png";

const PHONE_NUMBER = "+91 9423364990";
const PHONE_HREF = "tel:+919423364990";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full px-2 pb-1 min-[400px]:px-3 sm:px-6 lg:px-8 2xl:px-12"
      style={{
        paddingTop: "max(0.5rem, env(safe-area-inset-top))",
        paddingLeft: "max(0.5rem, env(safe-area-inset-left))",
        paddingRight: "max(0.5rem, env(safe-area-inset-right))",
      }}
    >
      <div
        className={`mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-2 rounded-xl border px-2 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none min-[400px]:px-3 sm:h-16 sm:gap-4 sm:rounded-2xl sm:px-5 lg:h-[72px] lg:px-6 ${
          scrolled
            ? "border-slate-200/80 bg-white/90 shadow-[0_8px_30px_-12px_rgba(14,29,56,0.25)]"
            : "border-slate-100/60 bg-white/75"
        }`}
      >
        {/* Brand */}
        <a
          href="#"
          aria-label="LinkMyDriver Home"
          className="group flex min-w-0 items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#F49E12] focus-visible:ring-offset-2 min-[400px]:gap-2.5 sm:gap-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0E1D38]/[0.04] p-1 ring-1 ring-[#0E1D38]/10 transition-transform duration-300 group-hover:-rotate-3 motion-reduce:transform-none sm:h-11 sm:w-11 sm:rounded-xl lg:h-12 lg:w-12">
            <img
              src={logo}
              alt=""
              className="h-full w-full object-contain"
              width="48"
              height="48"
              decoding="async"
            />
          </span>

          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[17px] font-black leading-none tracking-tight text-[#0E1D38] min-[400px]:text-lg sm:text-2xl lg:text-[28px]">
              LinkMy<span className="text-[#F49E12]">Driver</span>
            </span>
            <span className="mt-1 hidden truncate text-xs font-medium leading-none text-slate-500 sm:block lg:text-[13px]">
              Personal driver service
            </span>
          </span>
        </a>

        {/* Call button */}
        <a
          href={PHONE_HREF}
          aria-label={`Call us at ${PHONE_NUMBER}`}
          className="group flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#0E1D38] p-1.5 text-white shadow-sm outline-none transition-all duration-300 hover:bg-[#162a50] hover:shadow-lg hover:shadow-[#0E1D38]/20 focus-visible:ring-2 focus-visible:ring-[#F49E12] focus-visible:ring-offset-2 active:scale-[0.97] motion-reduce:transition-none min-[400px]:pr-3.5 sm:h-12 sm:gap-3 sm:pr-5 lg:h-[52px]"
        >
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F49E12] text-[#0E1D38] sm:h-9 sm:w-9">
            <span className="absolute inset-0 rounded-full bg-[#F49E12] opacity-60 motion-safe:animate-ping [animation-duration:2.4s]" />
            <Phone className="relative h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
          </span>

          {/* Hidden on very small phones (icon-only), shown from 400px up */}
          <span className="hidden flex-col items-start leading-tight min-[400px]:flex">
            <span className="hidden text-[11px] font-medium text-white/60 sm:block">
              Call us now
            </span>
            <span className="whitespace-nowrap text-xs font-bold tracking-wide transition-colors group-hover:text-[#F49E12] sm:text-sm">
              {PHONE_NUMBER}
            </span>
          </span>
        </a>
      </div>
    </header>
  );
}
