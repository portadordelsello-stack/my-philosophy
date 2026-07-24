// Technology.tsx — bilingual version
import { motion } from 'framer-motion';
import { Orbit } from '../shared/Orbit';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

const TECH_ITEMS = [
  { label: 'React',       radius: 110, duration: 28, startAngle: 0   },
  { label: 'TypeScript',  radius: 110, duration: 28, startAngle: 90  },
  { label: 'Firebase',    radius: 110, duration: 28, startAngle: 180 },
  { label: 'Supabase',    radius: 110, duration: 28, startAngle: 270 },
  { label: 'Node',        radius: 165, duration: 42, startAngle: 45  },
  { label: 'Python',      radius: 165, duration: 42, startAngle: 135 },
  { label: 'PostgreSQL',  radius: 165, duration: 42, startAngle: 225 },
  { label: 'AWS',         radius: 165, duration: 42, startAngle: 315 },
  { label: 'OpenAI',      radius: 210, duration: 58, startAngle: 20  },
  { label: 'Vercel',      radius: 210, duration: 58, startAngle: 200 },
];

export function Technology() {
  const { lang } = useLang();
  const t        = translations.technology;

  return (
    <SectionWrapper id="technology">
      <motion.div className="center-col" style={{ gap: '3rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', top: '10%', fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}
        >
          {t.caption[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.6 }}
        >
          <Orbit
            center={lang === 'es' ? 'Producto' : 'Product'}
            items={TECH_ITEMS}
            size={Math.min(480, typeof window !== 'undefined' ? window.innerWidth * 0.85 : 480)}
          />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
