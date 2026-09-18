import { useEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Instagram, MapPin, MessageCircle } from "lucide-react";

const SHOP_NAME = "Shree Fashion Store";
const FOUNDER = "@shravanibugge";
// Official logo (light petals on black — blended into the dark theme with mix-blend-screen)
const LOGO_URL = "/assets/Shree_Logo_website.png";

// ── Brand links ────────────────────────────────────────────────────────────
const INSTAGRAM_URL = "https://instagram.com/shree_fashionstore31";
const INSTAGRAM_HANDLE = "@shree_fashionstore31";
// wa.me deep link opens a chat with the shop number (+91 70307 69731)
const WHATSAPP_URL = "https://wa.me/917030769731";
const WHATSAPP_LABEL = "+91 70307 69731";
const MAPS_URL = "https://share.google/8se8HJa4ilQ29wwJP"; // shared Maps listing

// Countdown is hidden until the opening date is confirmed.
// When the date is final, set SHOW_COUNTDOWN to true and fix OPENING_DATE.
const SHOW_COUNTDOWN = false;
const OPENING_DATE = new Date("2026-10-31T10:00:00+05:30"); // placeholder

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE, delay: 0.12 * i },
    }),
};

function LinkCard({
                      icon,
                      title,
                      subtitle,
                      href,
                      index,
                  }: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    href: string;
    index: number;
}) {
    return (
        <motion.a
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-4 rounded-2xl border border-foreground/8 bg-card/60 p-4 text-left backdrop-blur-sm shadow-layered transition-colors hover:border-accent/40"
        >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        {icon}
      </span>
            <span className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="block text-sm font-semibold leading-tight tracking-tight">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-xs leading-snug text-muted-foreground">
          {subtitle}
        </span>
      </span>
            <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </motion.a>
    );
}

function Countdown() {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(t);
    }, []);

    const diff = Math.max(0, OPENING_DATE.getTime() - now);
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const mins = Math.floor((diff % 3_600_000) / 60_000);
    const secs = Math.floor((diff % 60_000) / 1000);
    const cells: Array<[number, string]> = [
        [days, "days"],
        [hours, "hrs"],
        [mins, "min"],
        [secs, "sec"],
    ];

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex items-center justify-center gap-2 sm:gap-3"
        >
            {cells.map(([value, label], i) => (
                <div key={label} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-[4.5rem] rounded-xl border border-foreground/8 bg-card/60 py-3 text-center shadow-layered sm:w-20">
                        <div className="font-display text-2xl font-medium tabular-nums sm:text-3xl">
                            {String(value).padStart(2, "0")}
                        </div>
                        <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            {label}
                        </div>
                    </div>
                    {i < cells.length - 1 && (
                        <span className="font-display text-xl text-accent/60">·</span>
                    )}
                </div>
            ))}
        </motion.div>
    );
}

export default function Landing() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Ambient background: rose-gold glows + subtle grain */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute -bottom-48 left-1/4 h-80 w-[30rem] rounded-full bg-[#c97e5e]/10 blur-3xl" />
                <div className="absolute inset-0 bg-grain opacity-50" />
            </div>

            <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8">
                {/* Header */}
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <img
                            src={LOGO_URL}
                            alt=""
                            className="h-9 w-auto mix-blend-screen"
                        />
                        <span className="text-sm font-semibold tracking-tight">{SHOP_NAME}</span>
                    </div>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent backdrop-blur-sm">
            Opening Soon
          </span>
                </header>

                {/* Hero */}
                <section className="flex flex-1 flex-col items-center justify-center py-16 text-center sm:py-20">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0}
                        className="relative mx-auto"
                    >
                        <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-accent/20 blur-3xl" />
                        <img
                            src={LOGO_URL}
                            alt="Shree Fashion Store lotus logo"
                            className="h-36 w-auto mix-blend-screen sm:h-48"
                        />
                    </motion.div>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="mt-10 text-xs font-semibold uppercase tracking-[0.32em] text-accent"
                    >
                        Where tradition meets fashion
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="mt-5 max-w-3xl font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        Shree Fashion <span className="text-goldgrad font-normal">Store</span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={2}
                        className="mt-7 font-display text-2xl font-light tracking-wide text-foreground sm:text-3xl"
                    >
                        “Wear It. <span className="text-goldgrad">Rent It. Own It.</span>”
                    </motion.p>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={2}
                        className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                    >
                        A retail &amp; rental fashion house is getting ready — ethnic and
                        contemporary looks for every occasion. Follow along and be the first
                        to know when we open our doors.
                    </motion.p>

                    {SHOW_COUNTDOWN && <Countdown />}

                    {/* Link cards */}
                    <div className="mt-12 grid w-full max-w-md gap-3">
                        <LinkCard
                            index={4}
                            icon={<Instagram className="h-5 w-5" />}
                            title="Instagram"
                            subtitle={INSTAGRAM_HANDLE}
                            href={INSTAGRAM_URL}
                        />
                        <LinkCard
                            index={5}
                            icon={<MessageCircle className="h-5 w-5" />}
                            title="WhatsApp"
                            subtitle={WHATSAPP_LABEL}
                            href={WHATSAPP_URL}
                        />
                        <LinkCard
                            index={6}
                            icon={<MapPin className="h-5 w-5" />}
                            title="Find us on the map"
                            subtitle="Shree Fashion Store — directions"
                            href={MAPS_URL}
                        />
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-foreground/8 pt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} {SHOP_NAME} · A new closet by{" "}
                        <a
                            href="https://instagram.com/shravanibugge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-accent/90 transition-colors hover:text-accent"
                        >
                            {FOUNDER}
                        </a>
                    </p>
                </footer>
            </main>
        </div>
    );
}
