import { createFileRoute } from "@tanstack/react-router";
import cisco7911 from "@/assets/cisco-7911.jpg.asset.json";
import cisco7841 from "@/assets/cisco-7841.webp.asset.json";
import desktopImg from "@/assets/desktop-pc.jpg";
import routerImg from "@/assets/cisco-router.jpg";
import switchImg from "@/assets/cisco-switch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عرض سعر | الأبيض أوتوموتيف — SwitchesMarket" },
      {
        name: "description",
        content:
          "عرض سعر تفصيلي لتوريد سويتشات Cisco 3850 وحلول VoIP باستخدام Issabel وتليفونات Cisco 7911 و 7841 لشركة الأبيض أوتوموتيف.",
      },
    ],
  }),
  component: QuotePage,
});

const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n) + " ج.م";

/* ---------- shared bits ---------- */

function Eyebrow({ children, color = "red" }: { children: React.ReactNode; color?: "red" | "amber" }) {
  const c =
    color === "amber"
      ? "border-amber-300/40 bg-amber-300/10 text-amber-200"
      : "border-red-500/40 bg-red-500/10 text-red-300";
  const dot =
    color === "amber"
      ? "bg-amber-300 shadow-[0_0_12px_#facc15]"
      : "bg-red-500 shadow-[0_0_14px_#ef4444]";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] sm:text-xs font-bold backdrop-blur ${c}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  color,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  color?: "red" | "amber";
}) {
  return (
    <div className="mb-8 sm:mb-12 max-w-3xl">
      <Eyebrow color={color}>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      {desc && (
        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

type Item = {
  title: string;
  spec: string;
  features: string[];
  qty: number;
  unit: number;
  image: string;
  badge?: string;
};

function ProductCard({ item }: { item: Item }) {
  const total = item.qty * item.unit;
  return (
    <article className="card-tilt group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] transition-all duration-500 hover:border-red-500/50 hover:from-red-600/[0.10] hover:shadow-[0_30px_80px_-20px_rgba(239,68,68,0.45)]">
      {/* shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-500/20 via-transparent to-amber-300/10 blur-xl" />
      </div>

      {/* image */}
      <div className="relative aspect-[16/10] sm:aspect-[5/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-4 sm:p-6 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {item.badge && (
          <div className="absolute top-3 right-3 rounded-full bg-[#0b0608]/90 backdrop-blur px-3 py-1 text-[10px] font-black text-red-300 border border-red-500/50 shadow-[0_0_18px_rgba(239,68,68,0.45)]">
            {item.badge}
          </div>
        )}
        <div className="absolute top-3 left-3 rounded-full bg-[#0b0608]/90 backdrop-blur px-3 py-1 text-[10px] font-bold text-amber-300 border border-amber-300/40">
          الكمية × {item.qty}
        </div>
      </div>

      {/* content */}
      <div className="relative p-5 sm:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white leading-snug">
          {item.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">{item.spec}</p>

        <ul className="mt-4 grid gap-1.5">
          {item.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[12px] sm:text-sm text-slate-300">
              <svg
                className="size-4 shrink-0 mt-0.5 text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between gap-3">
          <div className="text-[11px] text-slate-400" dir="ltr">
            {fmt(item.unit)} / وحدة
          </div>
          <div className="text-left" dir="ltr">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">إجمالي</div>
            <div className="text-xl sm:text-2xl font-black text-red-400 tabular-nums drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]">
              {fmt(total)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionTotalBar({
  label,
  sub,
  total,
  color,
}: {
  label: string;
  sub: string;
  total: number;
  color: "red" | "amber";
}) {
  const ring =
    color === "amber"
      ? "border-amber-400/30 from-amber-400/10"
      : "border-red-500/40 from-red-600/15";
  const text = color === "amber" ? "text-amber-300" : "text-red-300";
  return (
    <div
      className={`mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border ${ring} bg-gradient-to-l to-transparent p-5 sm:p-6 backdrop-blur`}
    >
      <div>
        <div className={`text-xs font-bold ${text}`}>{label}</div>
        <div className="text-sm text-slate-300 mt-1">{sub}</div>
      </div>
      <div className="text-3xl sm:text-4xl font-black text-white tabular-nums" dir="ltr">
        {fmt(total)}
      </div>
    </div>
  );
}

/* ---------- page ---------- */

function QuotePage() {
  const switches: Item[] = [
    {
      title: "Cisco Catalyst 3850 — 48 Port Gigabit",
      spec: "سويتش Cisco 3850 إنتربرايز بـ 48 منفذ جيجابت لتغطية الشبكة الأساسية بسرعات عالية وموثوقية.",
      features: [
        "48 منفذ Gigabit Ethernet",
        "سلسلة Catalyst 3850 الإنتربرايز",
        "أداء عالي للشبكات الكبيرة",
        "إدارة متقدمة (L2/L3)",
      ],
      qty: 1,
      unit: 9800,
      image: switchImg,
      badge: "48 PORT · GIGA",
    },
    {
      title: "Cisco Catalyst 3850 — 24 Port Gigabit",
      spec: "سويتش Cisco 3850 بـ 24 منفذ جيجابت، مثالي لتوزيع الشبكة على الأقسام والمكاتب.",
      features: [
        "24 منفذ Gigabit Ethernet",
        "سلسلة Catalyst 3850 الإنتربرايز",
        "ثبات وموثوقية عالية",
        "دعم VLANs و QoS",
      ],
      qty: 2,
      unit: 7000,
      image: switchImg,
      badge: "24 PORT · GIGA",
    },
  ];

  const voip: Item[] = [
    {
      title: "سيرفر Issabel (كيسة كمبيوتر)",
      spec: "كيسة مخصصة لتشغيل سنترال Issabel المفتوح المصدر بكفاءة عالية.",
      features: [
        "معالج Core i5",
        "رامات 8GB",
        "تخزين SSD 256GB",
        "مخصصة لتشغيل السنترال 24/7",
      ],
      qty: 1,
      unit: 5100,
      image: desktopImg,
      badge: "Issabel Server",
    },
    {
      title: "إعداد وتجهيز نظام VoIP بالكامل",
      spec: "تنصيب وتهيئة شاملة لنظام Issabel مع ربط جميع المكونات.",
      features: [
        "تنصيب وتهيئة سيرفر Issabel",
        "ربط أجهزة الـ GoIP",
        "ضبط الـ Dial Plan والإكستنشنات",
        "اختبار شامل بعد التركيب",
      ],
      qty: 1,
      unit: 14000,
      image: routerImg,
      badge: "Full Setup",
    },
    {
      title: "Cisco Router + WIC FXO Card (×2)",
      spec: "راوتر Cisco مع كارت FXO للاتصال بالخطوط الأرضية الواردة.",
      features: [
        "راوتر Cisco إنتربرايز",
        "كارت WIC FXO للخطوط الأرضية",
        "توجيه مكالمات احترافي",
        "موثوقية عالية",
      ],
      qty: 2,
      unit: 7000,
      image: routerImg,
      badge: "Cisco × 2",
    },
    {
      title: "تليفون Cisco 7911",
      spec: "IP Phone أحادي الخط بشاشة LCD، مثالي للاستخدام المكتبي اليومي.",
      features: ["خط واحد", "شاشة LCD واضحة", "جودة صوت ممتازة", "مناسب لمعظم المستخدمين"],
      qty: 1,
      unit: 900,
      image: cisco7911.url,
      badge: "7911",
    },
    {
      title: "تليفون Cisco 7841",
      spec: "IP Phone بـ 4 خطوط وشاشة عالية الدقة، للمستويات الإدارية والمكاتب التنفيذية.",
      features: [
        "4 خطوط في آنٍ واحد",
        "شاشة عالية الدقة",
        "جودة صوت HD",
        "مناسب للإدارة العليا",
      ],
      qty: 1,
      unit: 1800,
      image: cisco7841.url,
      badge: "7841 · HD Voice",
    },
  ];

  const switchesTotal = switches.reduce((s, i) => s + i.qty * i.unit, 0);
  const voipTotal = voip.reduce((s, i) => s + i.qty * i.unit, 0);
  const grandTotal = switchesTotal + voipTotal;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0608] text-slate-100">
      {/* ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 right-1/4 size-[600px] rounded-full bg-red-600/25 blur-[140px] animate-float" />
        <div className="absolute top-1/3 -left-40 size-[500px] rounded-full bg-amber-400/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 size-[500px] rounded-full bg-rose-900/40 blur-[140px]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 scanlines opacity-[0.06]" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0608]/80 border-b border-red-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 h-14 sm:h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <a href="#top" className="flex items-center gap-2 min-w-0">
            <div className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-red-500 to-rose-700 font-black text-white text-sm shadow-[0_0_20px_rgba(239,68,68,0.55)]">
              S
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-xs sm:text-sm font-extrabold truncate">SwitchesMarket</div>
              <div className="text-[9px] sm:text-[10px] text-red-300/80 truncate">
                Networking & VoIP Solutions
              </div>
            </div>
          </a>
          <div className="flex items-center gap-2 sm:gap-5">
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <a href="#overview" className="hover:text-red-300 transition">
                العميل
              </a>
              <a href="#switches" className="hover:text-red-300 transition">
                السويتشات
              </a>
              <a href="#voip" className="hover:text-red-300 transition">
                VoIP
              </a>
              <a href="#total" className="hover:text-red-300 transition">
                الإجمالي
              </a>
            </nav>
            <a
              href="#total"
              className="rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-bold text-white hover:from-red-400 hover:to-rose-500 transition shadow-[0_8px_24px_-6px_rgba(239,68,68,0.7)] whitespace-nowrap"
            >
              الإجمالي
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 grid gap-10 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-fade-up">
            <Eyebrow color="amber">عرض سعر رسمي · صالح لمدة أسبوع للهاردوير</Eyebrow>
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08]">
              سويتشات <span className="gradient-text">Cisco</span>
              <br />
              وحلول <span className="gradient-text">VoIP</span>
              <br />
              <span className="text-white">للأبيض أوتوموتيف</span>
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              عرض سعر متكامل لتوريد سويتشات <b className="text-white">Cisco Catalyst 3850</b>{" "}
              الإنتربرايز، وتركيب سنترال SIP باستخدام <b className="text-white">Issabel</b> مع
              تليفونات <b className="text-white">Cisco 7911 / 7841</b>.
            </p>
            <div className="mt-7 sm:mt-8 flex flex-wrap gap-3">
              <a
                href="#total"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-5 sm:px-6 py-3 text-sm font-bold text-white glow-red hover:scale-[1.03] transition"
              >
                مشاهدة الإجمالي
                <svg
                  className="size-4 transition group-hover:-translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </a>
              <a
                href="#switches"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 sm:px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
              >
                تفاصيل العرض
              </a>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-md">
              {[
                { k: "3", v: "سويتشات Cisco" },
                { k: "96", v: "منفذ جيجابت" },
                { k: "SIP", v: "Issabel VoIP" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-xl border border-red-500/20 bg-white/[0.03] p-3 sm:p-4 text-center hover:border-red-500/50 transition"
                >
                  <div className="text-xl sm:text-2xl font-black text-red-400">{s.k}</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* hero visual */}
          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[520px] mx-auto">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* outer ring */}
                <g style={{ transformOrigin: "200px 200px", animation: "infra-spin 18s linear infinite" }}>
                  <polygon
                    points="200,20 365,110 365,290 200,380 35,290 35,110"
                    stroke="rgba(239,68,68,0.35)"
                    strokeWidth="1.5"
                    strokeDasharray="12 8"
                    fill="none"
                  />
                  {/* nodes on outer ring */}
                  {[
                    [200, 20], [365, 110], [365, 290], [200, 380], [35, 290], [35, 110],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="5" fill="#ef4444" filter="url(#glow)">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                    </circle>
                  ))}
                </g>

                {/* middle ring */}
                <g style={{ transformOrigin: "200px 200px", animation: "infra-spin-reverse 14s linear infinite" }}>
                  <polygon
                    points="200,70 320,140 320,260 200,330 80,260 80,140"
                    stroke="rgba(250,204,21,0.30)"
                    strokeWidth="1.5"
                    strokeDasharray="8 6"
                    fill="none"
                  />
                  {[
                    [200, 70], [320, 140], [320, 260], [200, 330], [80, 260], [80, 140],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3.5" fill="#facc15" filter="url(#glow)">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                    </circle>
                  ))}
                </g>

                {/* inner ring */}
                <g style={{ transformOrigin: "200px 200px", animation: "infra-spin 10s linear infinite" }}>
                  <polygon
                    points="200,120 270,160 270,240 200,280 130,240 130,160"
                    stroke="rgba(239,68,68,0.45)"
                    strokeWidth="2"
                    fill="none"
                  />
                  {[
                    [200, 120], [270, 160], [270, 240], [200, 280], [130, 240], [130, 160],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3" fill="#ff6b6b" filter="url(#glow)">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
                    </circle>
                  ))}
                </g>

                {/* beams from center to outer nodes */}
                {[
                  [200, 20], [365, 110], [365, 290], [200, 380], [35, 290], [35, 110],
                ].map(([x, y], i) => (
                  <line
                    key={i}
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="rgba(239,68,68,0.15)"
                    strokeWidth="1"
                  >
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                  </line>
                ))}

                {/* data packets moving along beams */}
                {[
                  [200, 20], [365, 110], [365, 290], [200, 380], [35, 290], [35, 110],
                ].map(([x, y], i) => (
                  <circle key={`p-${i}`} r="2.5" fill="#facc15" filter="url(#glow)">
                    <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} path={`M200,200 L${x},${y}`} />
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
                  </circle>
                ))}

                {/* cross mesh lines between outer nodes */}
                <g stroke="rgba(239,68,68,0.08)" strokeWidth="0.8">
                  <line x1="200" y1="20" x2="365" y2="290" />
                  <line x1="365" y1="110" x2="200" y2="380" />
                  <line x1="365" y1="290" x2="35" y2="290" />
                  <line x1="200" y1="380" x2="35" y2="110" />
                  <line x1="35" y1="290" x2="200" y2="20" />
                  <line x1="35" y1="110" x2="365" y2="110" />
                </g>

                {/* center core ring */}
                <circle cx="200" cy="200" r="42" stroke="rgba(239,68,68,0.35)" strokeWidth="1.5" fill="none">
                  <animate attributeName="r" values="42;48;42" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="200" r="36" stroke="rgba(250,204,21,0.25)" strokeWidth="1" fill="none">
                  <animate attributeName="r" values="36;40;36" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative grid size-32 sm:size-48 place-items-center rounded-3xl bg-gradient-to-br from-red-500 to-rose-700 shadow-[0_30px_90px_-20px_rgba(239,68,68,0.75)] animate-float">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-12 sm:size-20 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="2" y="8" width="20" height="8" rx="1.5" />
                    <path d="M6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01" />
                  </svg>
                  <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-[#0b0608] text-[10px] font-black text-red-300 border border-red-500/60 whitespace-nowrap shadow-[0_0_18px_rgba(239,68,68,0.5)]">
                    CISCO CATALYST 3850
                  </div>
                </div>
              </div>
              {[
                { label: "48 PORT", role: "Core", pos: "top-0 right-1/2 translate-x-1/2" },
                { label: "24 PORT", role: "Access", pos: "bottom-2 right-0" },
                { label: "24 PORT", role: "Access", pos: "bottom-2 left-0" },
              ].map((b, i) => (
                <div
                  key={i}
                  className={`absolute ${b.pos} animate-float`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-red-500/30 px-2.5 sm:px-4 py-1.5 sm:py-3 text-center min-w-[72px] sm:min-w-[110px] shadow-[0_8px_30px_-8px_rgba(239,68,68,0.5)]">
                    <div className="text-[9px] sm:text-xs text-amber-300 font-bold">{b.role}</div>
                    <div className="text-[11px] sm:text-sm font-extrabold text-white mt-0.5">
                      {b.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT CARD */}
      <section id="overview" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid gap-3 sm:gap-5 grid-cols-2 lg:grid-cols-4">
            {[
              { t: "العميل", v: "الأبيض أوتوموتيف", s: "بيع السيارات الجديدة" },
              { t: "المقدم", v: "SwitchesMarket", s: "حلول شبكات و VoIP" },
              {
                t: "تاريخ الإصدار",
                v: new Intl.DateTimeFormat("ar-EG").format(new Date()),
                s: "صلاحية: أسبوع / شهر",
              },
              { t: "مدة التنفيذ", v: "1 — 2 يوم", s: "حسب وضع الشبكة" },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 sm:p-5 hover:border-red-500/40 hover:from-red-500/10 transition"
              >
                <div className="text-[10px] sm:text-xs text-red-300/90 font-bold">{c.t}</div>
                <div className="mt-1 text-sm sm:text-lg font-extrabold text-white leading-tight">
                  {c.v}
                </div>
                <div className="mt-1 text-[10px] sm:text-xs text-slate-400">{c.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 — Switches */}
      <section id="switches" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHeader
            eyebrow="القسم الأول · سويتشات Cisco"
            title="سويتشات Cisco Catalyst 3850 الإنتربرايز"
            desc="توريد سويتش رئيسي 48 منفذ جيجابت لتغطية الشبكة الأساسية، بالإضافة إلى سويتشين 24 منفذ جيجابت لتوزيع الشبكة على الأقسام بأعلى أداء وموثوقية."
          />
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            {switches.map((it) => (
              <ProductCard key={it.title} item={it} />
            ))}
          </div>
          <SectionTotalBar
            label="إجمالي القسم الأول"
            sub="شامل سويتش 48 منفذ + سويتشين 24 منفذ"
            total={switchesTotal}
            color="red"
          />
        </div>
      </section>

      {/* SECTION 2 — VoIP */}
      <section id="voip" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHeader
            eyebrow="القسم الثاني · الـ VoIP"
            title="سنترال SIP باستخدام Issabel وتليفونات Cisco"
            desc="إعداد سيرفر Issabel متكامل مع ربط الـ GoIP والتليفونات، بالإضافة إلى راوترات Cisco بكارت FXO للاتصال بالخطوط الأرضية."
            color="amber"
          />
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {voip.map((it) => (
              <ProductCard key={it.title} item={it} />
            ))}
          </div>
          <SectionTotalBar
            label="إجمالي القسم الثاني"
            sub="شامل السيرفر، الإعداد، الراوترات والتليفونات"
            total={voipTotal}
            color="amber"
          />
        </div>
      </section>

      {/* GRAND TOTAL */}
      <section id="total" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-600/15 via-rose-900/20 to-amber-300/10 p-6 sm:p-10 md:p-12 glow-red">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-red-500/40 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="text-xs sm:text-sm font-bold text-red-300">
                  الإجمالي الكلي للمشروع
                </div>
                <h2 className="mt-2 text-3xl sm:text-5xl md:text-6xl font-black gradient-text leading-tight">
                  عرض متكامل بسعر تنافسي
                </h2>
                <div className="mt-6 grid gap-2 max-w-md text-sm">
                  <div className="flex justify-between border-b border-white/10 py-2">
                    <span>القسم الأول · سويتشات Cisco</span>
                    <span className="font-bold tabular-nums" dir="ltr">
                      {fmt(switchesTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 py-2">
                    <span>القسم الثاني · VoIP</span>
                    <span className="font-bold tabular-nums" dir="ltr">
                      {fmt(voipTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest">
                  Grand Total
                </div>
                <div
                  className="mt-2 text-4xl sm:text-6xl md:text-7xl font-black text-white tabular-nums drop-shadow-[0_0_24px_rgba(239,68,68,0.6)]"
                  dir="ltr"
                >
                  {fmt(grandTotal)}
                </div>
                <div className="mt-3 text-[11px] sm:text-xs text-slate-400">
                  السعر شامل التركيب والتهيئة
                </div>
              </div>
            </div>

            <div className="relative mt-8 sm:mt-10 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-black/30 border border-red-500/20 p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-500/20 text-red-300">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v6" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  <b className="text-white">صلاحية الهاردوير:</b> أسبوع واحد من تاريخ الإصدار،
                  نظراً لتغير الأسعار في السوق.
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-black/30 border border-amber-300/20 p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-300/20 text-amber-300">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm text-slate-200">
                  <b className="text-white">صلاحية إعداد VoIP:</b> شهر كامل من تاريخ إصدار العرض.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-red-500/10 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400 text-center sm:text-right">
          <div className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-red-500 to-rose-700 font-black text-white shadow-[0_0_18px_rgba(239,68,68,0.5)]">
              S
            </div>
            <span className="font-bold text-white">SwitchesMarket</span>
            <span>· جميع الحقوق محفوظة</span>
          </div>
          <div>عرض سعر مُعدّ خصيصاً لشركة الأبيض أوتوموتيف</div>
        </div>
      </footer>
    </div>
  );
}
