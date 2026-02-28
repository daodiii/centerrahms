'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const serviceItems = [
  { key: 'prayer', icon: 'mosque' },
  { key: 'friday', icon: 'event' },
  { key: 'eid', icon: 'celebration' },
  { key: 'education', icon: 'school' },
  { key: 'safespace', icon: 'diversity_3' },
  { key: 'guidance', icon: 'support_agent' },
  { key: 'social', icon: 'groups' },
  { key: 'venue', icon: 'meeting_room' },
] as const;

export default function ServicesGrid() {
  const t = useTranslations('heritage');

  return (
    <section className="mb-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {t('services.eyebrow')}
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-display)]">
          {t('services.title')}
        </h2>
        <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
          {t('services.subtitle')}
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {serviceItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="group glass-panel rounded-xl p-6 cursor-pointer"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <span className="material-icons text-primary text-2xl">
                {item.icon}
              </span>
            </div>

            {/* Text */}
            <p className="text-[var(--color-text)] text-sm leading-relaxed font-medium">
              {t(`services.${item.key}`)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Contact Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 glass-panel rounded-xl p-6 md:p-8 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-icons text-[var(--color-gold)] text-xl">favorite</span>
        </div>
        <p className="text-[var(--color-text-muted)] leading-relaxed italic">
          {t('contact.text')}
        </p>
      </motion.div>
    </section>
  );
}
