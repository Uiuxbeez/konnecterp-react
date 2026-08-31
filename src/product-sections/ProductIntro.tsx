import { motion } from 'framer-motion';
import { BrowserFrame } from '@/components/site/BrowserFrame';
import { MiniDashboardMock } from '@/components/site/MiniDashboardMock';
import { RichText } from '@/components/site/RichText';
import type { SectionCtx } from '@/sections/shared';

export interface ProductIntroContent {
  eyebrow: string;
  title: string;
  description: string;
  dashboardUrl: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProductIntro({ content, ctx }: { content: ProductIntroContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  return (
    <section className={`py-24 ${isDarkMode ? 'bg-[#0B1220]' : 'bg-white'}`}>
      <div className="container mx-auto px-4 max-w-4xl text-center mb-14">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{content.eyebrow}</p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B1F4A]'}`}>
            {content.title}
          </h2>
          <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><RichText text={content.description} /></p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }}>
          <BrowserFrame url={content.dashboardUrl}>
            <MiniDashboardMock />
          </BrowserFrame>
        </motion.div>
      </div>
    </section>
  );
}
