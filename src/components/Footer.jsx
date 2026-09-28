import {
  Phone,
  MapPin,
  Mail,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import logo from "../assets/LOGO.png";

const PHONE_NUMBER = "+91 9423364990";
const PHONE_HREF = "tel:+919423364990";
const WHATSAPP_HREF =
  "https://wa.me/919423364990?text=Hi%2C%20I%20would%20like%20to%20book%20a%20driver%20via%20LinkMyDriver";
const EMAIL = "team@linkmydriver.com";
const ADDRESS = "Ratnagiri, Maharashtra 415612";
const MAP_HREF = "https://maps.google.com/?q=Ratnagiri,+Maharashtra+415612";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#F49E12] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1D38]";

function InfoRow({ icon: Icon, label, value, href, external, trailing }) {
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#F49E12] ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-[#F49E12] group-hover:text-[#0E1D38]">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <span className="break-words text-sm font-bold text-white sm:text-[15px]">
          {value}
        </span>
      </span>
      {trailing}
    </>
  );

  const base = "group flex min-h-[2.75rem] items-center gap-3 rounded-xl";

  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${focusRing}`}
    >
      {body}
    </a>
  ) : (
    <div className={base}>{body}</div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-20 w-full overflow-hidden bg-[#0E1D38] text-white">
      <div
        className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 sm:pt-14 lg:px-12"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        {/* Call to action */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#F49E12]/20 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-balance text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Need a driver for your next trip?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                Call or message us. We&apos;ll link you with a skilled, verified
                local driver.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_NUMBER}`}
                className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#F49E12] px-6 text-sm font-black text-[#0E1D38] shadow-lg shadow-[#F49E12]/20 transition-all duration-300 hover:bg-[#E08D05] active:scale-[0.97] motion-reduce:transition-none ${focusRing}`}
              >
                <Phone className="h-4 w-4 fill-current" />
                {PHONE_NUMBER}
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-6 text-sm font-bold text-white transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-500/15 active:scale-[0.97] motion-reduce:transition-none ${focusRing}`}
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4 sm:col-span-2 lg:col-span-5">
            <a
              href="#"
              aria-label="LinkMyDriver Home"
              className={`group flex items-center gap-3 rounded-xl ${focusRing}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1 shadow-md transition-transform duration-300 group-hover:-rotate-3 motion-reduce:transform-none">
                <img
                  src={logo}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-2xl font-black tracking-tight">
                LinkMy<span className="text-[#F49E12]">Driver</span>
              </span>
            </a>

            <p className="max-w-sm text-sm leading-relaxed text-slate-300 sm:text-base">
              Your car, your diesel &mdash; we only provide skilled,
              background-verified local drivers for your trips.
            </p>

            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-3 pr-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#F49E12] opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F49E12]" />
              </span>
              <span className="text-xs font-semibold text-slate-200 sm:text-sm">
                Launching soon in Ratnagiri
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 text-base font-black text-white">Contact</h3>
            <div className="flex flex-col gap-1">
              <InfoRow
                icon={Phone}
                label="Call us"
                value={PHONE_NUMBER}
                href={PHONE_HREF}
              />
              <InfoRow
                icon={Mail}
                label="Email us"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
              />
              <InfoRow
                icon={Clock}
                label="Open every day"
                value="7:00 AM – 11:00 PM"
              />
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-4">
            <h3 className="mb-3 text-base font-black text-white">Find us</h3>
            <div className="flex flex-col gap-1">
              <InfoRow
                icon={MapPin}
                label="Office"
                value={ADDRESS}
                href={MAP_HREF}
                external
                trailing={
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F49E12] motion-reduce:transform-none" />
                }
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Serving city commutes, hospital visits, weddings and outstation
              journeys.
            </p>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-slate-400 sm:flex-row sm:text-left sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">LinkMyDriver</span>. All
            rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <a
              href="#"
              className={`rounded transition-colors hover:text-white ${focusRing}`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`rounded transition-colors hover:text-white ${focusRing}`}
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[0.12em] select-none whitespace-nowrap text-center font-black leading-none tracking-tighter text-white/[0.04]"
        style={{ fontSize: "clamp(3rem, 13vw, 12rem)" }}
      >
        LinkMyDriver
      </div>
    </footer>
  );
}
