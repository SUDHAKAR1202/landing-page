import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Scale,
  Briefcase,
  Globe2,
  Building2,
  ShieldCheck,
  PenLine,
  TrendingUp,
  Users,
  Star,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Clock,
  Award,
  MessageSquareQuote,
} from "lucide-react";



const COLORS = {
  ink: "#14213D",
  inkSoft: "#1F3158",
  parchment: "#F7F3EB",
  parchmentDim: "#EFE9DA",
  gold: "#C08A2E",
  goldBright: "#D9A53F",
  charcoal: "#211F1C",
  sage: "#5C7A6B",
  rule: "#D9D2C4",
  white: "#FFFFFF",
};

const FONT_IMPORT_URL =
  "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap";

/* ============================================================
   CONTENT — sourced from the reference Lawctopus course page
   ============================================================ */

const CLAUSES = [
  {
    id: "01",
    months: "Months 1–2",
    title: "Foundations of Contract Drafting",
    icon: FileText,
    desc:
      "Learn the building blocks of a valid contract, then get hands-on by reviewing and redrafting a real sale deed yourself.",
    points: [
      "Elements of a valid contract & pre-contractual instruments",
      "Anatomy of an agreement: clauses, recitals, schedules",
      "Hands-on: review & redraft a Sale Deed from scratch",
    ],
  },
  {
    id: "02",
    months: "Month 3",
    title: "Common & International Agreements",
    icon: Globe2,
    desc:
      "Move from theory to the agreements freelancers are hired for most — plus your first negotiation drills.",
    points: [
      "NDAs, service agreements, e-contracts",
      "Drafting for international & cross-border clients",
      "Advanced negotiation skills, applied",
    ],
  },
  {
    id: "03",
    months: "Month 4",
    title: "IP, Technology & Website Terms",
    icon: ShieldCheck,
    desc:
      "Master the agreements every SaaS founder, app, and content creator now needs — a fast-growing freelance niche.",
    points: [
      "Trademark licensing & IP assignment agreements",
      "Terms & conditions for websites and apps",
      "Technology and data-sharing contracts",
    ],
  },
  {
    id: "04",
    months: "Month 5",
    title: "Real Estate Agreements",
    icon: Building2,
    desc:
      "Draft the high-value property contracts that anchor a large share of private legal practice in India.",
    points: [
      "Sale deeds, gift deeds & lease agreements",
      "Power of Attorney drafting",
      "Stamp duty, registration & execution mechanics",
    ],
  },
  {
    id: "05",
    months: "Month 6",
    title: "Business & Corporate Agreements",
    icon: Briefcase,
    desc:
      "Finish on the contracts that corporate law firms bill the most for — and that freelance clients pay the best rates for.",
    points: [
      "Shareholders' & Joint Venture Agreements",
      "Master Service Agreements (MSAs)",
      "Partnership deeds & MOAs",
    ],
  },
];

const FREELANCE_SKILLS = [
  {
    icon: TrendingUp,
    title: "Upwork, from a top-rated expert",
    desc:
      "Train directly under a top-rated Upwork contract specialist and get real opportunities to land your first client.",
  },
  {
    icon: Users,
    title: "A profile that gets noticed",
    desc:
      "Build a standout LinkedIn profile, CV, and cover letter — with live, personalised feedback from the faculty.",
  },
  {
    icon: MessageSquareQuote,
    title: "Proposals that win projects",
    desc:
      "Learn to write freelance proposals and pitch yourself with confidence on Upwork, Fiverr, and beyond.",
  },
  {
    icon: Users,
    title: "Negotiation, for life and for clients",
    desc:
      "Practical negotiation drills for client rates, salary discussions, and career growth — not just theory.",
  },
];

const STATS = [
  { value: "54", unit: "live sessions", icon: Clock },
  { value: "24+", unit: "contracts drafted", icon: FileText },
  { value: "10", unit: "drafts in your portfolio", icon: Award },
  { value: "6", unit: "months, start to finish", icon: Scale },
];

const TESTIMONIALS = [
  {
    quote:
      "The course gave me real drafts I could put in front of clients — not just notes. I picked up my first Upwork project in month four.",
    name: "Batch learner",
    role: "Dec–May 2026 batch",
  },
  {
    quote:
      "Six months covered what I expected to pick up over years of practice. The personalised feedback on every assignment made the difference.",
    name: "Batch learner",
    role: "Dec–May 2026 batch",
  },
  {
    quote:
      "I went in knowing nothing about freelancing as a lawyer. I came out with a LinkedIn profile, a portfolio, and a plan.",
    name: "Batch learner",
    role: "Dec–May 2026 batch",
  },
];

const AUDIENCE = [
  "Law students who want a head start",
  "Young lawyers ready to start earning",
  "Academicians teaching contract law",
  "Freelancing enthusiasts, legal or not",
];

const FAQS = [
  {
    q: "Do I need prior experience in contract drafting?",
    a: "No. The first two months are built from the ground up — starting with what makes a contract valid before you touch a single clause. Most learners join with zero drafting experience.",
  },
  {
    q: "What do I actually walk away with?",
    a: "Ten fully-drafted, personally-reviewed contracts for your portfolio, lifetime access to every recording and resource, a completion certificate, and direct freelancing training and opportunities.",
  },
  {
    q: "Is this only for law students?",
    a: "No. Young lawyers, academicians, in-house professionals, and freelancing enthusiasts from outside law all take this course — the freelancing track is built to apply broadly.",
  },
  {
    q: "How much time does it take each week?",
    a: "Sessions run 7–8 times a month, with assignments and personalised feedback woven in. Expect a steady, manageable weekly rhythm rather than a sudden overload.",
  },
  {
    q: "What if I miss a live session?",
    a: "Every session is recorded, and you keep lifetime access to all recordings, reading resources, and drafts — so a missed week never means a missed module.",
  },
];



function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, y = 18 }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}s, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   ATOMS
   ============================================================ */

function Eyebrow({ children, dark }) {
  return (
    <div
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: dark ? COLORS.goldBright : COLORS.gold,
        fontWeight: 500,
        marginBottom: 16,
      }}
    >
      <span
        style={{
          width: 22,
          height: 1.5,
          background: dark ? COLORS.goldBright : COLORS.gold,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, big, style }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: hover ? COLORS.goldBright : COLORS.gold,
        color: COLORS.ink,
        fontWeight: 700,
        fontSize: big ? 16.5 : 15,
        padding: big ? "17px 30px" : "13px 24px",
        borderRadius: 3,
        letterSpacing: "0.01em",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover
          ? "0 14px 28px -10px rgba(192,138,46,0.55)"
          : "0 8px 18px -8px rgba(192,138,46,0.4)",
        transition: "all 0.25s ease",
        ...style,
      }}
    >
      {children}
      <ArrowRight size={big ? 19 : 17} strokeWidth={2.4} />
    </button>
  );
}

function GhostButton({ children, onClick, light }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "transparent",
        color: light ? COLORS.parchment : COLORS.ink,
        fontWeight: 600,
        fontSize: 15,
        padding: "13px 22px",
        borderRadius: 3,
        border: `1.5px solid ${light ? "rgba(247,243,235,0.35)" : COLORS.ink}`,
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

function SealBadge() {
  return (
    <div
      style={{
        position: "relative",
        width: 86,
        height: 86,
        borderRadius: "50%",
        background: `radial-gradient(circle at 32% 28%, ${COLORS.goldBright}, ${COLORS.gold} 60%, #9c6f22 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "0 12px 30px -8px rgba(192,138,46,0.55), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.25)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          border: "1.5px dashed rgba(20,33,61,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Scale size={28} color={COLORS.ink} strokeWidth={1.8} />
      </div>
    </div>
  );
}

/* ============================================================
   HEADER
   ============================================================ */

function Header({ onEnroll }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "14px 0" : "22px 0",
        background: scrolled ? "rgba(20,33,61,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(255,255,255,0.08)` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <PenLine size={20} color={COLORS.goldBright} strokeWidth={2.2} />
          <span
            className="serif"
            style={{ fontSize: 19, fontWeight: 600, color: COLORS.parchment, letterSpacing: "0.01em" }}
          >
            Lawctopus Law School
          </span>
        </div>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
          className="header-nav"
        >
          {["Curriculum", "Freelancing", "Faculty", "Reviews", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: 14.5,
                fontWeight: 500,
                color: "rgba(247,243,235,0.75)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.parchment)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247,243,235,0.75)")}
            >
              {item}
            </a>
          ))}
          <PrimaryButton onClick={onEnroll}>Enroll Now</PrimaryButton>
        </nav>
      </div>
    </header>
  );
}



function Hero({ onEnroll }) {
  return (
    <section
      style={{
        position: "relative",
        background: `linear-gradient(165deg, ${COLORS.ink} 0%, ${COLORS.inkSoft} 55%, #182645 100%)`,
        paddingTop: 168,
        paddingBottom: 110,
        overflow: "hidden",
      }}
    >
      {/* faint ledger rule lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 47px, rgba(217,165,63,0.05) 48px)`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -140,
          right: -160,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,165,63,0.16), transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.9fr",
            gap: 56,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <div>
            <Reveal>
              <div
                className="mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: COLORS.goldBright,
                  border: "1px solid rgba(217,165,63,0.35)",
                  borderRadius: 30,
                  padding: "7px 16px",
                  marginBottom: 28,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.goldBright }} />
                6-Month Live Certificate Course
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="serif"
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  lineHeight: 1.08,
                  fontWeight: 600,
                  color: COLORS.parchment,
                  letterSpacing: "-0.01em",
                  marginBottom: 26,
                }}
              >
                Draft contracts like a&nbsp;
                <span style={{ color: COLORS.goldBright, fontStyle: "italic" }}>
                  specialist.
                </span>
                <br />
                Get paid to draft them anywhere.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.65,
                  color: "rgba(247,243,235,0.78)",
                  maxWidth: 540,
                  marginBottom: 38,
                }}
              >
                54 live sessions. 24+ real-world agreements. A faculty of practicing
                corporate lawyers. By the end, you won't just understand contract law —
                you'll have ten client-ready drafts and a plan to freelance on Upwork.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 38 }}>
                <PrimaryButton big onClick={onEnroll}>
                  Secure Your Seat
                </PrimaryButton>
                <GhostButton light onClick={() => document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })}>
                  View the Curriculum
                </GhostButton>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill={COLORS.goldBright} color={COLORS.goldBright} />
                  ))}
                  <span className="mono" style={{ fontSize: 13.5, color: "rgba(247,243,235,0.7)", marginLeft: 6 }}>
                    9/10 learner rating
                  </span>
                </div>
                <div style={{ width: 1, height: 16, background: "rgba(247,243,235,0.2)" }} />
                <span className="mono" style={{ fontSize: 13.5, color: "rgba(247,243,235,0.7)" }}>
                  20,000+ learners trained
                </span>
              </div>
            </Reveal>
          </div>

          {/* Signature contract card */}
          <Reveal delay={0.2} y={26}>
            <div
              style={{
                background: COLORS.parchment,
                borderRadius: 6,
                padding: "34px 30px",
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5)",
                transform: "rotate(1.2deg)",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: `1px solid ${COLORS.rule}`,
                  paddingBottom: 16,
                  marginBottom: 18,
                }}
              >
                <div>
                  <p className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: COLORS.sage, textTransform: "uppercase" }}>
                    Course Certificate
                  </p>
                  <p className="serif" style={{ fontSize: 20, fontWeight: 600, color: COLORS.ink, marginTop: 4 }}>
                    Mastering Contract Drafting
                  </p>
                </div>
                <SealBadge />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {[
                  ["Duration", "6 Months"],
                  ["Live Sessions", "54"],
                  ["Agreements Drafted", "24+"],
                  ["Portfolio Drafts", "10, with feedback"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5 }}>
                    <span style={{ color: COLORS.sage }}>{label}</span>
                    <span className="mono" style={{ fontWeight: 600, color: COLORS.ink }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: `1px dashed ${COLORS.rule}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <CheckCircle2 size={17} color={COLORS.sage} />
                <span style={{ fontSize: 13.5, color: COLORS.charcoal, fontStyle: "italic" }} className="serif">
                  Issued by Lawctopus Law School
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS STRIP
   ============================================================ */

function StatsStrip() {
  return (
    <section style={{ background: COLORS.ink, borderTop: "1px solid rgba(217,165,63,0.18)" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "30px 28px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
        className="stats-grid"
      >
        {STATS.map(({ value, unit, icon: Icon }, i) => (
          <div
            key={unit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              justifyContent: "center",
              padding: "8px 0",
              borderLeft: i !== 0 ? "1px solid rgba(247,243,235,0.1)" : "none",
            }}
          >
            <Icon size={20} color={COLORS.goldBright} strokeWidth={1.8} />
            <div>
              <div className="serif" style={{ fontSize: 26, fontWeight: 600, color: COLORS.parchment, lineHeight: 1 }}>
                {value}
              </div>
              <div className="mono" style={{ fontSize: 11.5, color: "rgba(247,243,235,0.6)", letterSpacing: "0.03em" }}>
                {unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



function ClauseRow({ clause, index }) {
  const [ref, inView] = useInView(0.18);
  const Icon = clause.icon;
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 32,
        padding: "38px 0",
        borderBottom: `1px solid ${COLORS.rule}`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-14px)",
        transition: `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`,
      }}
      className="clause-row"
    >
      <div>
        <div className="mono" style={{ fontSize: 13, color: COLORS.gold, letterSpacing: "0.08em" }}>
          CLAUSE
        </div>
        <div className="serif" style={{ fontSize: 44, fontWeight: 600, color: COLORS.ink, lineHeight: 1 }}>
          {clause.id}
        </div>
        <div className="mono" style={{ fontSize: 12, color: COLORS.sage, marginTop: 6 }}>
          {clause.months}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <Icon size={20} color={COLORS.ink} strokeWidth={1.8} />
          <h3 className="serif" style={{ fontSize: 24, fontWeight: 600, color: COLORS.ink }}>
            {clause.title}
          </h3>
        </div>
        <p style={{ fontSize: 15.5, color: "#4A4640", lineHeight: 1.65, marginBottom: 16, maxWidth: 620 }}>
          {clause.desc}
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {clause.points.map((pt) => (
            <li key={pt} style={{ display: "flex", gap: 10, fontSize: 14.5, color: COLORS.charcoal }}>
              <CheckCircle2 size={16} color={COLORS.sage} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Curriculum() {
  return (
    <section id="curriculum" style={{ background: COLORS.parchment, padding: "100px 0" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 28px" }}>
        <Reveal>
          <Eyebrow>The Agreement</Eyebrow>
          <h2
            className="serif"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, color: COLORS.ink, marginBottom: 18, lineHeight: 1.15 }}
          >
            Five clauses. Six months. 24+ contracts you'll actually be able to draft.
          </h2>
          <p style={{ fontSize: 16.5, color: "#4A4640", lineHeight: 1.65, marginBottom: 50, maxWidth: 640 }}>
            The course reads like the contracts it teaches you to write — structured,
            sequential, and building on what came before. Here's exactly what's inside.
          </p>
        </Reveal>

        <div>
          {CLAUSES.map((clause, i) => (
            <ClauseRow clause={clause} index={i} key={clause.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FREELANCING SECTION
   ============================================================ */

function FreelancingSection() {
  return (
    <section
      id="freelancing"
      style={{
        background: `linear-gradient(180deg, ${COLORS.ink} 0%, ${COLORS.inkSoft} 100%)`,
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -200,
          left: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(92,122,107,0.18), transparent 70%)",
        }}
      />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", position: "relative" }}>
        <Reveal>
          <Eyebrow dark>Beyond the Drafting Table</Eyebrow>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 56,
            }}
          >
            <h2
              className="serif"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, color: COLORS.parchment, maxWidth: 600, lineHeight: 1.15 }}
            >
              Most courses teach you to draft. This one teaches you to get hired.
            </h2>
            <p style={{ fontSize: 15.5, color: "rgba(247,243,235,0.7)", maxWidth: 360, lineHeight: 1.6 }}>
              Save four years of slow, on-the-job learning. Walk out with a freelance
              practice already in motion.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(247,243,235,0.1)",
          }}
          className="freelance-grid"
        >
          {FREELANCE_SKILLS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal delay={i * 0.07} key={title}>
              <div
                style={{
                  background: COLORS.ink,
                  padding: "32px 26px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(217,165,63,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon size={20} color={COLORS.goldBright} strokeWidth={1.8} />
                </div>
                <h3 className="serif" style={{ fontSize: 18.5, fontWeight: 600, color: COLORS.parchment, marginBottom: 10 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14.5, color: "rgba(247,243,235,0.68)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div
            style={{
              marginTop: 40,
              padding: "22px 28px",
              background: "rgba(217,165,63,0.08)",
              border: "1px solid rgba(217,165,63,0.25)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Briefcase size={22} color={COLORS.goldBright} style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 15, color: "rgba(247,243,235,0.85)", lineHeight: 1.6 }}>
              <strong style={{ color: COLORS.parchment }}>Your portfolio, built in real time:</strong>{" "}
              draft 10 contracts during the course, get personalised feedback on each one, and
              use every one of them in your Upwork portfolio from day one.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   WHO THIS IS FOR
   ============================================================ */

function AudienceSection() {
  return (
    <section style={{ background: COLORS.parchment, padding: "90px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 60, alignItems: "center" }} className="audience-grid">
          <Reveal>
            <Eyebrow>The Parties</Eyebrow>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3.4vw, 36px)", fontWeight: 600, color: COLORS.ink, lineHeight: 1.2 }}>
              Built for anyone ready to put contract drafting to work.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="audience-cards">
            {AUDIENCE.map((item, i) => (
              <Reveal delay={i * 0.06} key={item}>
                <div
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.rule}`,
                    borderRadius: 5,
                    padding: "22px 22px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Users size={18} color={COLORS.sage} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: COLORS.charcoal, lineHeight: 1.5, fontWeight: 500 }}>
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */

function Testimonials() {
  return (
    <section id="reviews" style={{ background: COLORS.parchmentDim, padding: "100px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
        <Reveal>
          <Eyebrow>Witnessed By</Eyebrow>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 50 }}>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: COLORS.ink, lineHeight: 1.15, maxWidth: 560 }}>
              Learners rated the course 9/10
            </h2>
            <div style={{ display: "flex", gap: 4 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={COLORS.gold} color={COLORS.gold} />
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal delay={i * 0.08} key={i}>
              <div
                style={{
                  background: COLORS.white,
                  borderRadius: 6,
                  padding: "30px 26px",
                  border: `1px solid ${COLORS.rule}`,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MessageSquareQuote size={24} color={COLORS.gold} style={{ marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: 20, flexGrow: 1 }} className="serif">
                  "{t.quote}"
                </p>
                <div style={{ borderTop: `1px solid ${COLORS.rule}`, paddingTop: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{t.name}</div>
                  <div className="mono" style={{ fontSize: 12, color: COLORS.sage }}>{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING / FINAL CTA
   ============================================================ */

function PricingCTA({ onEnroll }) {
  return (
    <section
      id="enroll"
      style={{
        background: COLORS.ink,
        padding: "110px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,165,63,0.12), transparent 70%)",
        }}
      />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 28px", textAlign: "center", position: "relative" }}>
        <Reveal>
          <Eyebrow dark>
            <span style={{ margin: "0 auto" }}>Final Clause</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4.5vw, 46px)", fontWeight: 600, color: COLORS.parchment, lineHeight: 1.15, marginBottom: 20 }}>
            Learn in six months what a lawyer learns in five years.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{ fontSize: 16.5, color: "rgba(247,243,235,0.75)", lineHeight: 1.65, marginBottom: 44, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Lifetime access to every recording, draft, and resource. A completion
            certificate. And a freelancing practice you start building from week one.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div
            style={{
              background: COLORS.parchment,
              borderRadius: 8,
              padding: "36px 40px",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.4)",
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            <div className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: COLORS.sage, textTransform: "uppercase", marginBottom: 10 }}>
              6-Month Expert Course
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 12, marginBottom: 6 }}>
              <span className="serif" style={{ fontSize: 17, color: COLORS.sage, textDecoration: "line-through" }}>
                ₹60,000
              </span>
              <span className="serif" style={{ fontSize: 44, fontWeight: 700, color: COLORS.ink }}>
                ₹24,999
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: COLORS.sage, marginBottom: 26 }}>One-time payment · lifetime access</p>
            <PrimaryButton big onClick={onEnroll} style={{ width: "100%", justifyContent: "center" }}>
              Enroll in the Course
            </PrimaryButton>
            <p style={{ fontSize: 12.5, color: COLORS.sage, marginTop: 16 }}>
              Limited seats per batch · Certificates issued by Lawctopus Law School
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.rule}` }}>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 0",
          textAlign: "left",
        }}
      >
        <span className="serif" style={{ fontSize: 17, fontWeight: 600, color: COLORS.ink, paddingRight: 20 }}>
          {q}
        </span>
        <ChevronDown
          size={19}
          color={COLORS.gold}
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: isOpen ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p style={{ fontSize: 15, color: "#4A4640", lineHeight: 1.65, paddingBottom: 22, maxWidth: 640 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" style={{ background: COLORS.parchment, padding: "100px 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 28px" }}>
        <Reveal>
          <Eyebrow>Read the Fine Print</Eyebrow>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 600, color: COLORS.ink, marginBottom: 44 }}>
            Frequently asked questions
          </h2>
        </Reveal>
        <div>
          {FAQS.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer style={{ background: COLORS.ink, padding: "44px 0", borderTop: "1px solid rgba(247,243,235,0.08)" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <PenLine size={17} color={COLORS.goldBright} />
          <span className="serif" style={{ fontSize: 15.5, color: COLORS.parchment, fontWeight: 600 }}>
            Lawctopus Law School
          </span>
        </div>
        <p className="mono" style={{ fontSize: 12, color: "rgba(247,243,235,0.5)" }}>
          Mastering Contract Drafting &amp; Freelancing — 6-Month Course
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT
   ============================================================ */

export default function ContractDraftingLandingPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_IMPORT_URL;
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      * { box-sizing: border-box; }
      body { margin: 0; }
      .serif { font-family: 'Source Serif 4', Georgia, serif; }
      .mono { font-family: 'IBM Plex Mono', monospace; }
      ::selection { background: ${COLORS.gold}; color: ${COLORS.white}; }
      a { text-decoration: none; }

      @media (max-width: 880px) {
        .hero-grid { grid-template-columns: 1fr !important; }
        .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .freelance-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .audience-grid { grid-template-columns: 1fr !important; }
        .testimonial-grid { grid-template-columns: 1fr !important; }
        .clause-row { grid-template-columns: 1fr !important; gap: 12px !important; }
        .header-nav a:not(:last-child) { display: none; }
      }
      @media (max-width: 560px) {
        .freelance-grid { grid-template-columns: 1fr !important; }
        .audience-cards { grid-template-columns: 1fr !important; }
        .stats-grid { grid-template-columns: 1fr 1fr !important; }
      }

      button:focus-visible, a:focus-visible {
        outline: 2px solid ${COLORS.gold};
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const handleEnroll = () => {
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: COLORS.parchment, color: COLORS.charcoal, fontFamily: "'Inter', sans-serif" }}>
      <Header onEnroll={handleEnroll} />
      <Hero onEnroll={handleEnroll} />
      <StatsStrip />
      <Curriculum />
      <FreelancingSection />
      <AudienceSection />
      <Testimonials />
      <PricingCTA onEnroll={handleEnroll} />
      <FAQSection />
      <Footer />
    </div>
  );
}
