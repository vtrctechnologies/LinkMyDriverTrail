import React, { useState, useRef } from "react";
import heroVideo from "./assets/hero.mp4";
import {
  Car,
  ShieldCheck,
  Clock,
  DollarSign,
  Volume2,
  VolumeX,
  ArrowDown,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function App() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-amber-300 selection:text-slate-950">
      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Car className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight font-display text-slate-900">
                LinkMy<span className="text-amber-600">Driver</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-semibold ml-2.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300/70">
                Local Drivers On-Demand
              </span>
            </div>
          </div>

          {/* Right Status Badge & Nav */}
          <div className="flex items-center gap-4">
            <a
              href="#how-it-works"
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-amber-600 transition hidden sm:inline"
            >
              How It Works
            </a>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Launching Soon</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* SECTION 1: HERO SECTION WITH FULL BACKGROUND VIDEO */}
      {/* ======================================================== */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] scale-[1.02]"
          />
          {/* Light Theme Layered Frosted Glass Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/85 to-white/70" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-50/50 to-slate-50/90" />
        </div>

        {/* Ambient Warm Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-300/20 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          {/* Status Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span>Launching Soon • Major Cities Nationwide</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.08] mb-6">
            Hire Trusted{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              Local Drivers
            </span>{" "}
            For Your Car.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Skip traffic stress, parking hassles, and tiring long drives.
            Connect with verified, professional local drivers in your
            neighborhood by the hour or day — for daily commutes, shopping, late
            nights, and outstation journeys.
          </p>

          {/* Action CTA */}
          <div className="flex items-center justify-center gap-4 mb-14">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 active:scale-95 transition shadow-lg shadow-amber-400/25"
            >
              <span>Launching Soon... !</span>
            </a>
          </div>

          {/* Trust Highlights (Light Frosted Cards) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-700 font-medium">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-xs backdrop-blur-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Available in 15 Mins</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-xs backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>KYC & Police Verified Drivers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-xs backdrop-blur-sm">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <span>Transparent Hourly Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: HOW IT WORKS / WHY HIRE LOCAL DRIVERS */}
      {/* ======================================================== */}
      <section
        id="how-it-works"
        className="relative z-10 py-20 px-4 sm:px-6 bg-white border-t border-slate-200"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold mb-2 inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              SIMPLE, RELIABLE, AFFORDABLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mb-4">
              Why Hire Local Drivers with LinkMyDriver?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The smartest way to travel in your own vehicle without touching
              the steering wheel.
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition duration-300 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Drive In Your Own Car's Comfort
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Relax in the comfort and cleanliness of your own car. Avoid
                  smelly cabs or expensive rentals. Perfect for family outings,
                  doctor visits, daily office commutes, and party nights.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition duration-300 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  100% Verified Neighborhood Drivers
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every driver is thoroughly vetted with government ID
                  validation, criminal background checks, license verification,
                  and real driving tests before they ever accept a trip.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition duration-300 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  On-Demand or Advance Bookings
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Need a driver right away? Get one matched in 15 minutes.
                  Planning a weekend road trip or wedding event? Schedule hours
                  or days in advance with guaranteed arrival.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition duration-300 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Empowering Local Drivers
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Are you a skilled driver? Join LinkMyDriver to earn steady
                  income without buying a car or taking on fuel costs. Work
                  flexible hours and get paid directly every week.
                </p>
              </div>
            </div>
          </div>

          {/* Quick 3-Step Summary Bar */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-amber-600 font-mono font-bold text-lg mb-1">
                  01. Request
                </div>
                <div className="text-slate-900 font-semibold text-sm mb-1">
                  Set Pickup & Duration
                </div>
                <p className="text-slate-500 text-xs">
                  Choose hourly, full day, or outstation trip.
                </p>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                <div className="text-amber-600 font-mono font-bold text-lg mb-1">
                  02. Meet Driver
                </div>
                <div className="text-slate-900 font-semibold text-sm mb-1">
                  Verified Driver Arrives
                </div>
                <p className="text-slate-500 text-xs">
                  Quick digital check-in and handover keys.
                </p>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                <div className="text-amber-600 font-mono font-bold text-lg mb-1">
                  03. Relax
                </div>
                <div className="text-slate-900 font-semibold text-sm mb-1">
                  Travel Without Driving
                </div>
                <p className="text-slate-500 text-xs">
                  Enjoy your ride, work, or relax in your seat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* FOOTER */}
      {/* ========================================= */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <div className="w-6 h-6 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Car className="w-3.5 h-3.5" />
            </div>
            <span>LinkMyDriver</span>
            <span className="text-slate-400 font-normal">
              | Local Drivers For Hire
            </span>
          </div>

          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} LinkMyDriver. All rights reserved.
            Launching Soon.
          </div>
        </div>
      </footer>
    </div>
  );
}
