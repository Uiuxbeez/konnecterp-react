import { motion } from 'framer-motion';
import { RichText } from '@/components/site/RichText';
import { getIcon } from '@/sections/shared';

export interface IndustryChallengesBenefitsContent {
  backgroundImage: string;
  centerIcon: string;
  challengesEyebrow: string;
  challengesTitle: string;
  challengesDescription: string;
  challenges: { icon: string; text: string }[];
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefits: { icon: string; title: string; description: string }[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function IndustryChallengesBenefits({ content }: { content: IndustryChallengesBenefitsContent }) {
  const CenterIcon = getIcon(content.centerIcon);

  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-2"
        >
          {/* Challenges panel */}
          <div className="relative p-8 sm:p-10 md:p-12">
            <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4A]/95 via-[#0B1F4A]/92 to-[#080E1D]/95" />

            <div className="relative z-10">
              <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest">{content.challengesEyebrow}</p>
              <span className="block w-10 h-0.5 bg-[#F97316] mt-2.5 mb-5" />
              <h3 className="text-2xl md:text-[28px] font-bold text-white mb-3 leading-tight">{content.challengesTitle}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-md"><RichText text={content.challengesDescription} /></p>

              <ul className="space-y-3">
                {content.challenges.map((c, i) => {
                  const Icon = getIcon(c.icon);
                  return (
                    <motion.li
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={itemVariants}
                      transition={{ delay: i * 0.05 }}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm px-4 py-3 transition-colors hover:bg-white/[0.12] hover:border-white/20"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 border border-orange-400/25 transition-transform group-hover:scale-105">
                        <Icon className="h-4 w-4 text-orange-300" />
                      </span>
                      <span className="text-sm font-semibold text-slate-100">{c.text}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Benefits panel */}
          <div className="relative p-8 sm:p-10 md:p-12 bg-white overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-10 -right-10 w-56 h-56 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(11,31,74,0.10) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />

            <div className="relative z-10">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{content.benefitsEyebrow}</p>
              <span className="block w-10 h-0.5 bg-emerald-500 mt-2.5 mb-5" />
              <h3 className="text-2xl md:text-[28px] font-bold text-[#0B1F4A] mb-7 leading-tight">{content.benefitsTitle}</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {content.benefits.map((b, i) => {
                  const Icon = getIcon(b.icon);
                  return (
                    <motion.div
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={cardVariants}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 mb-3">
                        <Icon className="h-4 w-4 text-emerald-600" />
                      </span>
                      <p className="text-sm font-bold text-[#0B1F4A] mb-1 leading-snug">{b.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed"><RichText text={b.description} /></p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 rounded-full bg-white shadow-xl border-4 border-[#F97316] items-center justify-center">
            <CenterIcon className="w-9 h-9 text-[#F97316]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
