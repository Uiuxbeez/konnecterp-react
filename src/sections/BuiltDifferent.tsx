import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { InViewTextEffect, getIcon } from "@/sections/shared";

type MapDot = { x: number; y: number; label: string };
type Feature = { icon: string; title: string; description: string };
type Stat = { value: number; suffix: string; label: string };

export interface BuiltDifferentContent {
  eyebrow: string;
  title: string;
  highlight: string;
  mapDots: MapDot[];
  features: Feature[];
  officeEyebrow: string;
  officeTitle: string;
  securityEyebrow: string;
  securityTitle: string;
  stats: Stat[];
}

const DEFAULT_LINES = [
  { x1: 320, y1: 195, x2: 437, y2: 77 },
  { x1: 437, y1: 77, x2: 640, y2: 68 },
  { x1: 640, y1: 68, x2: 860, y2: 203 },
  { x1: 860, y1: 203, x2: 870, y2: 122 },
  { x1: 870, y1: 122, x2: 950, y2: 167 },
  { x1: 950, y1: 167, x2: 860, y2: 203 },
  { x1: 860, y1: 203, x2: 320, y2: 195 },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return undefined;
    let start = 0;
    const duration = 2;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function BuiltDifferent({ content, isDarkMode }: { content: BuiltDifferentContent; isDarkMode: boolean }) {
  const featureColumns = [
    (content.features ?? []).filter((_, index) => index % 2 === 0),
    (content.features ?? []).filter((_, index) => index % 2 === 1),
  ];

  return (
    <section className={`relative overflow-hidden ${isDarkMode ? "bg-[#001133]" : "bg-white"}`}>
      <div className="relative overflow-hidden" style={{ minHeight: 460 }}>
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/images/global.svg"
              alt=""
              className={`w-full h-full object-cover object-top ${isDarkMode ? "opacity-70" : "opacity-20"}`}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(249,115,22,0.10) 0%, rgba(17,101,239,0.07) 45%, transparent 70%)",
            }}
          />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1280 460"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {DEFAULT_LINES.map((ln, i) => {
              const len = Math.hypot(ln.x2 - ln.x1, ln.y2 - ln.y1);
              return (
                <motion.line
                  key={i}
                  x1={ln.x1}
                  y1={ln.y1}
                  x2={ln.x2}
                  y2={ln.y2}
                  stroke={isDarkMode ? "rgba(99,179,237,0.35)" : "rgba(17,101,239,0.20)"}
                  strokeWidth="1"
                  strokeDasharray={`${len}`}
                  initial={{ strokeDashoffset: len }}
                  animate={{ strokeDashoffset: [len, 0, -len] }}
                  transition={{ duration: 3.5, delay: i * 0.45, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                />
              );
            })}

            {(content.mapDots ?? []).map((dot, i) => (
              <g key={`${dot.label}-${i}`}>
                <motion.circle
                  cx={dot.x}
                  cy={dot.y}
                  r={10}
                  fill="none"
                  stroke={isDarkMode ? "rgba(249,115,22,0.5)" : "rgba(249,115,22,0.4)"}
                  strokeWidth="1"
                  initial={{ scale: 0.6, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.35, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                />
                <circle cx={dot.x} cy={dot.y} r={3.5} fill={isDarkMode ? "#F97316" : "#1165EF"} />
                <text
                  x={dot.x}
                  y={dot.y - 10}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={isDarkMode ? "rgba(255,255,255,0.55)" : "rgba(11,31,74,0.55)"}
                  letterSpacing="0.04em"
                >
                  {dot.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="relative z-10 px-8 md:px-16 py-20 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-400 mb-4">{content.eyebrow}</p>
            <h2 className={`text-4xl md:text-[52px] font-bold leading-tight ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
              <InViewTextEffect>{content.title}</InViewTextEffect><br />
              <span className="text-[#F97316]"><InViewTextEffect>{content.highlight}</InViewTextEffect></span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
            {featureColumns.map((features, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-8">
                {features.map((feature, i) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <motion.div
                      key={`${feature.title}-${i}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (columnIndex * 0.1) + i * 0.1, duration: 0.45 }}
                      className="flex gap-3 rounded-[5px] border border-[rgba(178,178,178,0.23)] bg-white/10 backdrop-blur-sm p-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/25 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm mb-1 ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{feature.title}</p>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col gap-6 lg:pl-8">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1.5">{content.officeEyebrow}</p>
                <h3 className={`text-2xl md:text-3xl font-black leading-tight ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{content.officeTitle}</h3>
              </div>
              <div className={`w-12 h-px ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`} />
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1.5">{content.securityEyebrow}</p>
                <h3 className={`text-2xl md:text-3xl font-black leading-tight ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{content.securityTitle}</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className={`border-t ${isDarkMode ? "border-white/[0.07]" : "bg-[#001133] border-white/[0.07]"}`}>
        <div className="container mx-auto px-4 max-w-8xl">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {(content.stats ?? []).map((stat, i) => (
              <div
                key={`${stat.label}-${i}`}
                className={`py-14 px-6 text-center ${i < 3 ? "md:border-r border-white/[0.07]" : ""} ${i === 0 || i === 2 ? "border-r border-white/[0.07] md:border-r-0" : ""}`}
              >
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                  <AnimatedCounter value={Number(stat.value) || 0} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 font-semibold text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
