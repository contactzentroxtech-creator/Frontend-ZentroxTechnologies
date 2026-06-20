'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Award } from 'lucide-react';
import { useLang } from '@/lib/providers';

export default function LocalSection() {
  const { t, lang } = useLang();

  const CITIES_EN = ['Mohali', 'Chandigarh', 'Panchkula', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Noida', 'Haryana', 'Himachal Pradesh'];
  const CITIES_HI = ['मोहाली', 'चंडीगढ़', 'पंचकूला', 'लुधियाना', 'अमृतसर', 'जालंधर', 'नोएडा', 'हरियाणा', 'हिमाचल प्रदेश'];
  const CITIES_PA = ['ਮੋਹਾਲੀ', 'ਚੰਡੀਗੜ੍ਹ', 'ਪੰਚਕੂਲਾ', 'ਲੁਧਿਆਣਾ', 'ਅੰਮ੍ਰਿਤਸਰ', 'ਜਲੰਧਰ', 'ਨੋਇਡਾ', 'ਹਰਿਆਣਾ', 'ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼'];

  const BIZ_EN = ['Coaching Centers', 'Local Shops', 'Startups', 'Service Providers', 'Freelancers', 'Enterprises'];
  const BIZ_HI = ['कोचिंग सेंटर', 'लोकल शॉप', 'स्टार्टअप', 'सर्विस प्रोवाइडर', 'फ्रीलांसर', 'एंटरप्राइज़'];
  const BIZ_PA = ['ਕੋਚਿੰਗ ਸੈਂਟਰ', 'ਲੋਕਲ ਸ਼ਾਪ', 'ਸਟਾਰਟਅੱਪ', 'ਸਰਵਿਸ ਪ੍ਰੋਵਾਈਡਰ', 'ਫ੍ਰੀਲਾਂਸਰ', 'ਐਂਟਰਪ੍ਰਾਈਜ਼'];

  const cities = lang === 'hi' ? CITIES_HI : lang === 'pa' ? CITIES_PA : CITIES_EN;
  const bizTypes = lang === 'hi' ? BIZ_HI : lang === 'pa' ? BIZ_PA : BIZ_EN;

  const LOCAL_CARDS = [
    {
      icon: Users,
      color: '#3b7bff',
      title: t('local.card1.title', 'Affordable Business Websites'),
      desc: t('local.card1.desc', 'Professional websites at competitive prices — no compromise on quality or performance.'),
    },
    {
      icon: BookOpen,
      color: '#7c3aed',
      title: t('local.card2.title', 'Coaching Center Platforms'),
      desc: t('local.card2.desc', 'Student management, online classes, attendance systems for education institutes.'),
    },
    {
      icon: Award,
      color: '#06d6a0',
      title: t('local.card3.title', 'Startup Launch Packages'),
      desc: t('local.card3.desc', 'Complete digital presence — website, branding, and growth strategy to launch right.'),
    },
  ];

  return (
    <section
      className="relative z-10 py-24 px-4 md:px-6"
      style={{ background: 'linear-gradient(180deg,#04050a 0%,#080c15 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-10">
          <div className="z-badge mb-4">{t('local.badge', 'Serving Punjab')}</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
            {t('local.title', 'Built for Mohali, Chandigarh & All of Punjab')}
          </h2>
          <p className="text-base text-z-muted max-w-xl leading-relaxed">
            {t('local.sub', "We understand the local market. Affordable, world-quality solutions tailored for Punjab's businesses and entrepreneurs.")}
          </p>
        </motion.div>

        {/* City chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[...cities, ...bizTypes].map((item, i) => (
            <motion.div key={`${item}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-z-border text-sm text-z-muted hover:border-z-accent hover:text-white transition-all duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-z-accent3 flex-shrink-0" />
              {item}
            </motion.div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LOCAL_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${card.color}18`, border: `1px solid ${card.color}30` }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <h3 className="font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-z-muted leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
