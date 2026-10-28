import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  Rocket,
  Check,
  Star,
  Plus,
  MessageCircle,
  Users,
  Clock,
  Gift,
  Menu,
  X,
  Target,
  Eye,
  Pause,
  Play,
} from 'lucide-react';
import Intro from './Intro';
import { Orbits, Kicker } from './Orbits';
import {
  MARCA,
  TALLERES,
  PROGRAMAS,
  NAV,
  SEDE,
  PONENTE,
  ALIADOS,
  PERSONALIDAD,
  DOLORES,
  RUTA,
  ESENCIA,
  FAQ,
  waLink,
  type Aliado,
  type Programa,
} from './data';

const EASE = [0.16, 1, 0.3, 1] as const;

const reservaGeneral = waLink(
  `Hola ${MARCA}, quiero reservar mi cupo en los talleres gratuitos para emprendedores.`,
);

const goTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function App() {
  const seenIntro =
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('impuls_intro') === '1';
  const [intro, setIntro] = useState(!seenIntro);
  const [taller, setTaller] = useState(0);
  const [interes, setInteres] = useState('');

  const finishIntro = () => {
    try {
      sessionStorage.setItem('impuls_intro', '1');
    } catch {
      /* noop */
    }
    setIntro(false);
  };

  const verTaller = (i: number) => {
    setTaller(i);
    goTo('talleres');
  };
  const reservar = (valor: string) => {
    setInteres(valor);
    goTo('reserva');
  };

  return (
    <div className="min-h-screen bg-marfil font-sans text-azul antialiased">
      <AnimatePresence>{intro && <Intro key="intro" onFinish={finishIntro} />}</AnimatePresence>

      <Header />
      <Hero />
      <Marquee />
      <Dolores onPick={verTaller} />
      <Ruta />
      <Talleres active={taller} setActive={setTaller} onReservar={reservar} />
      <Programas onReservar={reservar} />
      <Nosotros />
      <Reserva interes={interes} setInteres={setInteres} />
      <Faq />
      <Footer />
      <WhatsAppFlotante />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HEADER                                                               */
/* ------------------------------------------------------------------ */
function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const light = solid || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        light ? 'bg-marfil/95 shadow-[0_8px_30px_rgba(44,49,89,0.08)] backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#" aria-label={MARCA} className="shrink-0">
          <img
            src={light ? '/logo-color.png' : '/logo-white.png'}
            alt={MARCA}
            className="h-11 w-auto md:h-12"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                light ? 'text-azul/75 hover:bg-niebla hover:text-azul' : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#reserva"
            className="hidden items-center gap-2 rounded-full bg-naranja px-5 py-3 text-[14px] font-bold text-azul-ink transition hover:-translate-y-0.5 hover:bg-naranja-soft sm:inline-flex"
          >
            Reserva gratis <ArrowRight size={16} />
          </a>
          <button
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(!open)}
            className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              light ? 'bg-niebla text-azul' : 'bg-white/10 text-white'
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="border-t border-azul/10 bg-marfil px-5 pb-6 pt-2 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block border-b border-azul/10 py-4 text-lg font-semibold"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#reserva"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-naranja py-4 font-bold text-azul-ink"
            >
              Reserva tu cupo gratis <ArrowRight size={18} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — "Tu idea. Nuestro impulso."                                   */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="hero-shell relative isolate overflow-hidden bg-azul text-white">
      {/* Fondo: brillo + órbitas gigantes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 78% 45%, rgba(215,129,51,0.22), transparent 70%), radial-gradient(50% 60% at 0% 100%, rgba(185,193,204,0.12), transparent 70%)',
        }}
      />
      <Orbits className="absolute -left-40 -top-40 w-[700px] text-white/[0.07]" node="rgba(215,129,51,0.3)" />

      <div className="hero-content relative mx-auto grid min-h-[94svh] max-w-[1240px] items-center gap-10 px-5 pb-16 pt-32 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-20 lg:pt-28">
        {/* Texto */}
        <div>
          <div className="anim-up" style={{ animationDelay: '0.1s' }}>
            <Kicker light>Academia para emprendedores</Kicker>
          </div>

          <h1 className="hero-title display anim-up mt-6 max-w-[680px] text-[3.1rem] font-black uppercase sm:text-[4.2rem] lg:text-[5.4rem]" style={{ animationDelay: '0.2s' }}>
            Tu idea.
            <br />
            <span className="text-naranja">Nuestro</span>
            <br />
            <span className="text-naranja">impulso.</span>
          </h1>

          <p className="anim-up mt-7 max-w-[520px] text-[17px] leading-relaxed text-white/80 md:text-lg" style={{ animationDelay: '0.35s' }}>
            Somos el punto de partida para convertir tu idea en acción. Formación práctica,
            herramientas estratégicas y acompañamiento real para que tu negocio despegue con
            dirección.
          </p>

          <div className="anim-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.5s' }}>
            <a
              href="#reserva"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-naranja px-7 py-4 text-[16px] font-bold text-azul-ink shadow-[0_12px_40px_rgba(215,129,51,0.35)] transition hover:-translate-y-0.5 hover:bg-naranja-soft"
            >
              <Rocket size={19} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Reserva tu taller gratis
            </a>
            <a
              href="#ruta"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[16px] font-semibold text-white transition hover:border-white hover:bg-white/5"
            >
              Cómo te impulsamos
            </a>
          </div>

          <div className="anim-up mt-12 grid max-w-[520px] grid-cols-3 gap-4 border-t border-white/15 pt-6" style={{ animationDelay: '0.65s' }}>
            {[
              { k: '04', v: 'talleres gratuitos' },
              { k: '1 h', v: 'por sesión, cada viernes' },
              { k: '+15', v: 'cupos por sesión' },
            ].map((s) => (
              <div key={s.v}>
                <div className="display text-3xl font-black text-white md:text-4xl">{s.k}</div>
                <div className="mt-1.5 text-[13px] leading-snug text-white/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual: isotipo en órbita */}
        <div className="hero-art anim-up relative mx-auto aspect-square w-full max-w-[520px]" style={{ animationDelay: '0.3s' }}>
          <Orbits className="absolute inset-0 h-full w-full text-white/25" />
          <div className="absolute inset-[22%] rounded-full bg-marfil shadow-[0_30px_80px_rgba(0,0,0,0.35)]" />
          <img
            src="/isotipo.png"
            alt=""
            className="rocket-float absolute inset-[29%] h-[42%] w-[42%] object-contain"
          />

          <FloatChip className="left-0 top-[12%]" delay="0s" icon={<Gift size={16} />}>
            Taller 100% gratis
          </FloatChip>
          <FloatChip className="right-0 top-[44%]" delay="1.2s" icon={<Users size={16} />}>
            Cupos limitados
          </FloatChip>
          <FloatChip className="bottom-[8%] left-[6%]" delay="2.4s" icon={<Clock size={16} />}>
            Viernes · 6:30 pm
          </FloatChip>
        </div>
      </div>
    </section>
  );
}

function FloatChip({
  children,
  icon,
  className,
  delay,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`chip-float absolute flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-bold text-azul shadow-[0_14px_40px_rgba(0,0,0,0.25)] ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-durazno text-azul">{icon}</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MARQUEE — personalidad de marca                                      */
/* ------------------------------------------------------------------ */
function Marquee() {
  const items = ['Cercana', 'Dinámica', 'Innovadora', 'Confiable', 'De la idea a la acción', 'Formación práctica'];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden bg-naranja py-4 text-azul-ink" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="display flex items-center gap-6 px-6 text-xl font-black uppercase md:text-2xl">
                {t}
                <Rocket size={18} className="-rotate-45" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DOLORES — "¿Te suena familiar?"                                     */
/* ------------------------------------------------------------------ */
function Dolores({ onPick }: { onPick: (i: number) => void }) {
  return (
    <section className="bg-marfil px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Kicker>¿Te suena familiar?</Kicker>
            <h2 className="display mt-5 text-[2.3rem] font-black uppercase md:text-[3.4rem]">
              Todo gran negocio empezó en <span className="text-naranja">cero</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[520px] text-[17px] leading-relaxed text-azul/75 lg:ml-auto">
              Elige lo que más se parece a tu situación y te mostramos el taller gratuito que
              te da el primer impulso.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {DOLORES.map((d, i) => {
            const t = TALLERES[d.taller];
            return (
              <Reveal key={d.q} delay={i * 0.08}>
                <button
                  onClick={() => onPick(d.taller)}
                  className="group flex h-full w-full items-start gap-5 rounded-3xl border border-azul/10 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-naranja hover:shadow-[0_20px_50px_rgba(44,49,89,0.12)] md:p-8"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-niebla text-azul transition-colors group-hover:bg-naranja group-hover:text-azul-ink">
                    <t.Icon size={22} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[19px] font-bold leading-snug md:text-[21px]">“{d.q}”</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-naranja">
                      Ver taller {t.num}: {t.clave.toLowerCase()}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RUTA DE DESPEGUE — 3, 2, 1, 0 con cohete que avanza al hacer scroll  */
/* ------------------------------------------------------------------ */
function Ruta() {
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(-1);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const top = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const immersion = useMotionValue(0);
  // Evita interpolar el texto por grises que se confundan con el fondo intermedio.
  const headingColor = useTransform(immersion, (value) =>
    value < 0.38 ? '#2c3159' : value < 0.59 ? '#000000' : '#ffffff',
  );
  const lightAccent = useTransform(immersion, [0, 0.25], ['#d78133', '#2c3159']);
  const darkAccent = useTransform(immersion, [0.8, 1], ['#ffffff', '#d78133']);
  const accentColor = useTransform(() => {
    const progress = immersion.get();
    const light = lightAccent.get();
    const dark = darkAccent.get();
    const readable = headingColor.get();
    return progress < 0.25 ? light : progress > 0.8 ? dark : readable;
  });
  const orbitColor = useTransform(immersion, [0, 1], ['rgba(44,49,89,0.1)', 'rgba(255,255,255,0.14)']);

  useEffect(() => {
    const container = ref.current;
    const rail = railRef.current;
    if (!container || !rail) return;

    let ranges: { start: number; end: number }[] = [];
    let currentStep: number | null = null;
    let arrival = { start: 1, end: 1, entry: 1 };
    const updateActiveStep = (progress: number) => {
      const next = ranges.findIndex(({ start, end }) => progress >= start && progress <= end);
      // Solo actualiza React cuando el cohete entra o sale de una tarjeta.
      if (next !== currentStep) {
        currentStep = next;
        setActiveStep(next);
      }
      const approach = Math.max(0, Math.min(1,
        (progress - arrival.start) / Math.max(arrival.end - arrival.start, 0.001),
      ));
      immersion.set(reduceMotion
        ? Number(progress >= arrival.entry)
        : approach * approach * (3 - 2 * approach));
    };
    const measure = () => {
      if (!rail.offsetHeight) return;
      // Coordenadas de layout: las animaciones de entrada y hover no alteran los umbrales.
      ranges = cardRefs.current.map((card) => ({
        start: card ? (card.offsetTop - rail.offsetTop) / rail.offsetHeight : Infinity,
        end: card ? (card.offsetTop + card.offsetHeight - rail.offsetTop) / rail.offsetHeight : -Infinity,
      }));
      const last = ranges[ranges.length - 1];
      const previous = ranges[ranges.length - 2];
      if (last && Number.isFinite(last.start)) {
        arrival = {
          start: previous ? (previous.end + last.start) / 2 : last.start,
          end: Math.min(1, (last.start + last.end) / 2),
          entry: last.start,
        };
      }
      updateActiveStep(scrollYProgress.get());
    };

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    cardRefs.current.forEach((card) => card && observer.observe(card));
    measure();
    const unsubscribe = scrollYProgress.on('change', updateActiveStep);
    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [scrollYProgress, immersion, reduceMotion]);

  return (
    <section id="ruta" className="relative isolate overflow-hidden bg-niebla px-5 py-24 md:px-8 md:py-32">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-azul-deep"
        style={{ opacity: immersion }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ color: orbitColor }}
      >
        <Orbits className="absolute -right-48 top-10 w-[420px] opacity-40 md:w-[640px] md:opacity-100" />
        <Orbits
          className="absolute -left-48 top-1/2 hidden w-[560px] -translate-y-1/2 opacity-50 md:block"
          node="rgba(215,129,51,0.45)"
        />
        <Orbits
          className="absolute -right-44 bottom-8 hidden w-[520px] opacity-70 md:block"
          node="rgba(215,129,51,0.5)"
        />
      </motion.div>
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Kicker><motion.span style={{ color: headingColor }}>Ruta de despegue</motion.span></Kicker>
          <motion.h2
            className="display mt-5 text-[2.3rem] font-black uppercase md:text-[3.4rem]"
            style={{ color: headingColor }}
          >
            3, 2, 1… <motion.span style={{ color: accentColor }}>despega</motion.span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed"
            style={{ color: headingColor }}
          >
            Así acompañamos a cada emprendedor, desde el punto cero hasta un negocio con proyección.
          </motion.p>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-16 max-w-[860px]">
          {/* Riel */}
          <div ref={railRef} aria-hidden="true" className="pointer-events-none absolute bottom-6 left-[27px] top-6 z-10 w-[3px] rounded-full bg-grisazul/50 md:left-1/2 md:-translate-x-1/2">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top rounded-full bg-naranja" />
            <motion.div
              style={{ top }}
              className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-naranja text-azul-ink shadow-[0_0_0_8px_rgba(215,129,51,0.16),0_0_28px_rgba(215,129,51,0.65),0_0_64px_rgba(215,129,51,0.4)]"
            >
              {/* La levitación va dentro del marcador para conservar su centrado en el riel. */}
              <motion.div
                className="relative flex h-full w-full items-center justify-center"
                animate={reduceMotion ? { y: 0 } : { y: [0, -2, 0] }}
                transition={{ duration: 1.4, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
              >
                <span className="absolute left-1/2 top-10 -translate-x-1/2">
                  <motion.span
                    className="block h-7 w-3 origin-top rounded-b-full bg-gradient-to-b from-durazno via-naranja to-transparent shadow-[0_6px_18px_rgba(215,129,51,0.65)] blur-[2px]"
                    animate={reduceMotion
                      ? { opacity: 0.55, scaleY: 0.7 }
                      : { opacity: [0.55, 0.95, 0.55], scaleY: [0.7, 1.15, 0.7] }}
                    transition={{ duration: 0.6, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                  />
                </span>
                <Rocket size={22} className="relative -rotate-45 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
              </motion.div>
            </motion.div>
          </div>

          <ol className="space-y-10 md:space-y-16">
            {RUTA.map((p, i) => {
              const right = i % 2 === 1;
              const active = activeStep === i;
              const last = i === RUTA.length - 1;
              return (
                <motion.li
                  key={p.t}
                  ref={(element) => { cardRefs.current[i] = element; }}
                  aria-current={active ? 'step' : undefined}
                  initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`relative pl-20 md:w-1/2 md:pl-0 ${right ? 'md:ml-auto md:pl-16' : 'md:pr-16 md:text-right'}`}
                >
                  <div className="relative isolate">
                    {last && (
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-10 rounded-[3rem] md:-inset-14"
                        style={{
                          opacity: immersion,
                          background: 'radial-gradient(ellipse at center, rgba(215,129,51,0.38) 0%, rgba(215,129,51,0.14) 45%, transparent 72%)',
                        }}
                      />
                    )}
                    <div className={`relative rounded-3xl border-2 p-7 transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(215,129,51,0.2)] ${
                      active
                        ? 'border-naranja shadow-[0_18px_50px_rgba(215,129,51,0.26),0_0_0_4px_rgba(215,129,51,0.08)]'
                        : 'border-transparent shadow-[0_14px_40px_rgba(44,49,89,0.08)]'
                    } ${last ? 'bg-azul text-white' : 'bg-white'}`}>
                      <div className={`flex items-center gap-4 ${right ? '' : 'md:flex-row-reverse'}`}>
                        <span className={`display text-6xl font-black transition-colors duration-300 ${active || last ? 'text-naranja' : 'text-durazno'}`}>{p.n}</span>
                        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-300 ${active || last ? 'bg-naranja text-azul-ink' : 'bg-niebla text-azul'}`}>
                          <p.Icon size={20} />
                        </span>
                      </div>
                      <h3 className="mt-4 text-[22px] font-extrabold">{p.t}</h3>
                      <p className={`mt-2 text-[15px] leading-relaxed ${last ? 'text-white/75' : 'text-azul/70'}`}>{p.d}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* TALLERES GRATUITOS                                                   */
/* ------------------------------------------------------------------ */
function Talleres({
  active,
  setActive,
  onReservar,
}: {
  active: number;
  setActive: (i: number) => void;
  onReservar: (v: string) => void;
}) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((active + 1) % TALLERES.length), 5000);
    return () => clearInterval(id);
  }, [active, paused, setActive]);

  const t = TALLERES[active];

  return (
    <section id="talleres" className="relative overflow-hidden bg-azul px-5 py-24 text-white md:px-8 md:py-32">
      <Orbits className="absolute -bottom-60 -left-60 w-[720px] text-white/[0.06]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <Kicker light>Talleres gratuitos · Formación práctica</Kicker>
            <h2 className="display mt-5 max-w-[720px] text-[2.3rem] font-black uppercase md:text-[3.4rem]">
              Cuatro viernes para <span className="text-naranja">blindar y hacer crecer</span> tu negocio
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {['Práctico', '1 hora', 'Gratuito', 'Con expertos'].map((p) => (
                <span key={p} className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80">
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div
          className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Póster animado */}
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-naranja text-azul-ink">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.num}
                className="relative flex min-h-[420px] flex-col justify-between gap-8 p-8 md:p-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <span aria-hidden="true" className="display pointer-events-none absolute -bottom-4 -right-3 select-none text-[5.5rem] font-black uppercase leading-none text-white/25 md:text-[7.5rem]">
                  {t.clave}
                </span>
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl bg-azul px-5 py-4 text-center text-white">
                    <div className="display text-4xl font-black leading-none">{t.dateShort.split(' ')[0]}</div>
                    <div className="mt-1 text-[12px] font-bold tracking-widest text-durazno">{t.dateShort.split(' ')[1]}</div>
                  </div>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30">
                    <t.Icon size={26} />
                  </span>
                </div>
                <div className="relative">
                  <div className="text-[13px] font-bold uppercase tracking-widest">{t.label} · {t.time}</div>
                  <h3 className="mt-3 text-[1.7rem] font-extrabold leading-tight md:text-[2rem]">{t.title}</h3>
                  <p className="mt-3 max-w-[380px] text-[15px] font-medium text-azul-ink/80">{t.desc}</p>
                  <button
                    onClick={() => onReservar(`${t.label}: ${t.title}`)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-azul px-6 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-azul-ink"
                  >
                    {t.ctaLabel} <ArrowRight size={17} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* progreso */}
            <div className="absolute inset-x-0 top-0 flex gap-1.5 p-3">
              {TALLERES.map((x, i) => (
                <span key={x.num} className="h-1 flex-1 overflow-hidden rounded-full bg-azul/20">
                  {i === active && (
                    <motion.span
                      key={`${x.num}-${paused}`}
                      className="block h-full bg-azul"
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : 5, ease: 'linear' }}
                    />
                  )}
                  {i < active && <span className="block h-full w-full bg-azul" />}
                </span>
              ))}
            </div>
          </div>

          {/* Lista */}
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-azul-deep">
            {TALLERES.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.num}
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`relative block w-full border-b border-white/10 px-6 py-6 text-left transition-[background-color,transform] duration-200 last:border-b-0 motion-reduce:transform-none md:px-8 md:py-7 ${
                    on ? 'bg-white/[0.06]' : 'hover:translate-x-1 hover:bg-white/[0.03]'
                  }`}
                >
                  {on && <motion.span layoutId="taller-bar" className="absolute inset-y-0 left-0 w-1 bg-naranja" />}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4">
                      <span className={`text-[13px] font-bold ${on ? 'text-naranja' : 'text-white/50'}`}>{item.num}</span>
                      <span className={`text-[17px] font-bold leading-snug md:text-[21px] ${on ? 'text-white' : 'text-white/60'}`}>
                        {item.title}
                      </span>
                    </div>
                    <ArrowUpRight size={22} className={`shrink-0 transition ${on ? 'text-naranja' : 'text-white/25'}`} />
                  </div>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pl-9"
                      >
                        <div className="flex flex-wrap gap-x-5 gap-y-1 pt-3 text-[14px] text-white/65">
                          <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {item.day}</span>
                          <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {item.time}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
            <div className="flex items-start gap-3 border-t border-white/10 bg-white/[0.03] px-6 py-5 text-[14px] text-white/70 md:px-8">
              <MapPin size={18} className="mt-0.5 shrink-0 text-naranja" />
              <span>
                <b className="text-white">{SEDE.lugar}</b> · {SEDE.direccion}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PROGRAMAS                                                            */
/* ------------------------------------------------------------------ */
function Programas({ onReservar }: { onReservar: (v: string) => void }) {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section id="programas" className="bg-marfil px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Kicker>Siguiente nivel</Kicker>
          <h2 className="display mt-5 text-[2.3rem] font-black uppercase md:text-[3.4rem]">
            ¿Listo para llegar <span className="text-naranja">más lejos</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[17px] leading-relaxed text-azul/75">
            Los talleres son tu punto de partida. Nuestros programas te acompañan paso a paso, con
            mentoría, herramientas y seguimiento, para que los resultados sean reales.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PROGRAMAS.map((p, i) => (
            <ProgramaCard
              key={p.nombre}
              programa={p}
              index={i}
              onReservar={onReservar}
              tiltEnabled={finePointer && !reduceMotion}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramaCard({
  programa: p,
  index,
  onReservar,
  tiltEnabled,
  reduceMotion,
}: {
  programa: Programa;
  index: number;
  onReservar: (value: string) => void;
  tiltEnabled: boolean;
  reduceMotion: boolean;
}) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const hoverAmount = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.6 });
  const energy = useSpring(hoverAmount, { stiffness: 180, damping: 24, mass: 0.6 });
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);
  const lift = useTransform(energy, [0, 1], [0, -6]);
  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glow = useMotionTemplate`radial-gradient(320px circle at ${glowX} ${glowY}, rgba(215,129,51,0.2), transparent 70%)`;

  const resetTilt = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    hoverAmount.set(0);
  };

  useEffect(() => {
    if (!tiltEnabled) {
      pointerX.set(0.5);
      pointerY.set(0.5);
      hoverAmount.set(0);
    }
  }, [tiltEnabled, pointerX, pointerY, hoverAmount]);

  const moveTilt = (event: PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled || event.pointerType === 'touch') {
      resetTilt();
      return;
    }
    // El contenedor no gira: sus coordenadas mantienen estable el seguimiento.
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    pointerX.set(Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)));
    pointerY.set(Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)));
    hoverAmount.set(1);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
      onPointerEnter={moveTilt}
      onPointerMove={moveTilt}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      onFocusCapture={resetTilt}
      className={`relative flex min-w-0 [perspective:1000px] hover:z-10 focus-within:z-10 ${p.destacado ? 'lg:-my-4' : ''}`}
    >
      <motion.article
        style={{
          rotateX: tiltEnabled ? rotateX : 0,
          rotateY: tiltEnabled ? rotateY : 0,
          y: tiltEnabled ? lift : 0,
        }}
        className={`relative isolate flex min-w-0 flex-1 flex-col rounded-[2rem] p-8 focus-within:ring-2 focus-within:ring-naranja/50 ${
          p.destacado
            ? 'bg-azul text-white shadow-[0_30px_70px_rgba(44,49,89,0.35)] lg:py-12'
            : 'border border-azul/10 bg-white'
        }`}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[2rem]"
          style={{ backgroundImage: glow, opacity: tiltEnabled ? energy : 0 }}
        />
        {p.destacado && (
          <div className="absolute -top-3.5 left-8 z-20 inline-flex items-center gap-1.5 rounded-full bg-naranja px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-wider text-azul-ink">
            <Star size={13} strokeWidth={2.5} /> Más pedido
          </div>
        )}
        <div className="relative z-10 flex flex-1 flex-col">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${p.destacado ? 'bg-naranja text-azul-ink' : 'bg-durazno/60 text-azul'}`}>
            <p.Icon size={26} />
          </span>
          <h3 className="mt-6 text-[1.5rem] font-extrabold leading-tight">{p.nombre}</h3>
          <p className={`mt-2 text-[15px] ${p.destacado ? 'text-white/75' : 'text-azul/70'}`}>{p.tagline}</p>
          <div className={`mt-4 text-[13px] font-bold uppercase tracking-wider ${p.destacado ? 'text-durazno' : 'text-naranja'}`}>
            {p.duracion}
          </div>
          <ul className="mt-6 flex-1 space-y-3">
            {p.incluye.map((item) => (
              <li key={item} className={`flex items-start gap-3 text-[15px] ${p.destacado ? 'text-white/85' : 'text-azul/85'}`}>
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.destacado ? 'bg-naranja text-azul-ink' : 'bg-azul text-white'}`}>
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className={`mt-8 border-t pt-6 ${p.destacado ? 'border-white/15' : 'border-azul/10'}`}>
            <div className="mb-4 text-[15px] font-bold">{p.precio}</div>
            <button
              type="button"
              onClick={() => onReservar(`Programa: ${p.nombre}`)}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-bold transition ${
                p.destacado
                  ? 'bg-naranja text-azul-ink hover:bg-naranja-soft'
                  : 'border-2 border-azul text-azul hover:bg-azul hover:text-white'
              }`}
            >
              Quiero información <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* NOSOTROS — esencia, personalidad, ponente y aliados                  */
/* ------------------------------------------------------------------ */
function Nosotros() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-azul-deep px-5 py-24 text-white md:px-8 md:py-32">
      <Orbits className="absolute -right-52 -top-40 w-[700px] text-white/[0.06]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Kicker light>Nuestra esencia</Kicker>
            <h2 className="display mt-5 text-[2.3rem] font-black uppercase md:text-[3.4rem]">
              El punto de partida para <span className="text-naranja">transformar ideas en acción</span>
            </h2>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-white/75">
              El cohete de nuestra marca es la “O” de Impulso Cero: representa el avance, el
              crecimiento y la proyección de cada emprendedor que confía en nosotros.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { Icon: Target, t: 'Misión', d: ESENCIA.mision },
                { Icon: Eye, t: 'Visión', d: ESENCIA.vision },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-naranja text-azul-ink">
                      <Icon size={18} />
                    </span>
                    <span className="text-lg font-extrabold">{t}</span>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Ponente */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[460px]">
              <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-naranja" />
              <div className="relative overflow-hidden rounded-[2rem] bg-marfil">
                {/* Recorte del flyer centrado en la ponente (sin los textos del flyer) */}
                <div
                  role="img"
                  aria-label={`${PONENTE.nombre}, ponente`}
                  className="aspect-[4/5] w-full bg-no-repeat"
                  style={{
                    backgroundImage: `url(${PONENTE.img})`,
                    backgroundSize: '230% auto',
                    backgroundPosition: '97% 24%',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-azul-ink via-azul-ink/85 to-transparent p-7 pt-20">
                  <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-durazno">Ponente</div>
                  <div className="display mt-1 text-3xl font-black uppercase">{PONENTE.nombre}</div>
                  <div className="mt-1 text-[14px] text-white/75">{PONENTE.rol}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Personalidad */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONALIDAD.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 p-6 transition-colors hover:border-naranja hover:bg-naranja hover:text-azul-ink">
                <div className="display text-2xl font-black uppercase">{p.t}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65 group-hover:text-azul-ink/80">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Aliados */}
        <AliadosMarquee aliados={ALIADOS} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ALIADOS — dos grupos iguales mantienen el bucle sin saltos            */
/* ------------------------------------------------------------------ */
function AliadosMarquee({ aliados }: { aliados: Aliado[] }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue('0%');
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const canAnimate = aliados.length > 1 && !reduceMotion;

  useEffect(() => {
    x.set('0%');
    if (!canAnimate) return;

    const controls = animate(x, ['0%', '-50%'], {
      duration: Math.max(18, aliados.length * 6),
      repeat: Infinity,
      ease: 'linear',
    });
    animation.current = controls;
    return () => {
      controls.stop();
      animation.current = null;
    };
  }, [x, canAnimate, aliados.length]);

  useEffect(() => {
    if (paused || hovered || focused) animation.current?.pause();
    else animation.current?.play();
  }, [paused, hovered, focused, canAnimate, aliados.length]);

  if (aliados.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Marcas que nos respaldan"
      className="mt-20 flex min-w-0 flex-col gap-8 border-t border-white/10 py-10 md:mt-24 md:flex-row md:items-center md:py-12"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 md:flex-col md:items-start md:gap-2">
        <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-white/70">Con el respaldo de</span>
        {canAnimate && (
          <button
            type="button"
            aria-label={paused ? 'Reanudar movimiento de aliados' : 'Pausar movimiento de aliados'}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[12px] font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            {paused ? 'Reanudar' : 'Pausar'}
          </button>
        )}
      </div>
      <div
        className="min-w-0 flex-1 overflow-hidden py-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        <motion.div
          className={canAnimate ? 'flex w-max min-w-[200%]' : 'w-full'}
          style={{ x }}
        >
          {(canAnimate ? [0, 1] : [0]).map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className={canAnimate
                ? 'flex flex-1 items-center justify-around gap-6 pr-6 md:gap-10 md:pr-10'
                : 'flex flex-wrap items-center justify-center gap-6 md:gap-10'}
            >
              {aliados.map((aliado) => (
                <li
                  key={aliado.nombre}
                  className="shrink-0"
                >
                  <a
                    href={aliado.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy === 1 ? -1 : undefined}
                    aria-label={`${aliado.nombre} (abre en una pestaña nueva)`}
                    className="group flex min-h-[88px] min-w-[180px] items-center justify-center rounded-2xl px-6 py-4 transition-colors hover:bg-white/5 md:min-h-[112px]"
                  >
                    <img
                      src={aliado.logo}
                      alt={aliado.nombre}
                      className="h-12 w-auto max-w-[200px] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0 md:h-16 md:max-w-[240px]"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RESERVA — formulario que abre WhatsApp con el mensaje armado          */
/* ------------------------------------------------------------------ */
const ETAPAS = ['Tengo una idea', 'Ya estoy vendiendo', 'Quiero escalar'];

function Reserva({ interes, setInteres }: { interes: string; setInteres: (v: string) => void }) {
  const [nombre, setNombre] = useState('');
  const [negocio, setNegocio] = useState('');
  const [etapa, setEtapa] = useState(ETAPAS[0]);
  const [enviado, setEnviado] = useState(false);

  const opciones = [
    ...TALLERES.map((t) => `${t.label}: ${t.title}`),
    ...PROGRAMAS.map((p) => `Programa: ${p.nombre}`),
    'Todos los talleres gratuitos',
    'Aún no sé, quiero orientación',
  ];
  const elegido = interes || 'Todos los talleres gratuitos';

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hola ${MARCA}, soy ${nombre.trim()}.`,
      negocio.trim() ? `Mi negocio/idea: ${negocio.trim()}.` : '',
      `Etapa: ${etapa}.`,
      `Me interesa: ${elegido}`,
      '¿Me ayudan a reservar mi cupo?',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(waLink(msg), '_blank', 'noopener');
    setEnviado(true);
  };

  return (
    <section id="reserva" className="relative overflow-hidden bg-durazno px-5 py-24 md:px-8 md:py-32">
      <Orbits className="absolute -left-40 bottom-[-200px] w-[640px] text-azul/15" node="#2c3159" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <Kicker>Reserva gratis</Kicker>
          <h2 className="display mt-5 text-[2.6rem] font-black uppercase md:text-[4rem]">
            Tu cuenta regresiva <span className="text-naranja [-webkit-text-stroke:0]">empieza hoy</span>
          </h2>
          <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-azul/80">
            Déjanos tus datos y te confirmamos tu cupo por WhatsApp en minutos. Los espacios por
            sesión son limitados.
          </p>
          <ul className="mt-8 space-y-3">
            {['Sin costo y sin compromiso', 'Respuesta rápida por WhatsApp', 'Te recordamos la fecha de tu taller'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[16px] font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-azul text-white">
                  <Check size={14} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={enviar} className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_rgba(44,49,89,0.18)] md:p-10">
            <AnimatePresence mode="wait">
              {enviado ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-naranja text-azul-ink">
                    <Rocket size={36} className="-rotate-45" />
                  </span>
                  <h3 className="display mt-6 text-3xl font-black uppercase">¡Despegaste!</h3>
                  <p className="mx-auto mt-3 max-w-[340px] text-azul/75">
                    Te abrimos WhatsApp con tu mensaje listo. Solo presiona enviar y te confirmamos tu cupo.
                  </p>
                  <button type="button" onClick={() => setEnviado(false)} className="mt-6 text-[14px] font-bold text-naranja underline underline-offset-4">
                    Hacer otra reserva
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <Field label="Tu nombre">
                    <input
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="¿Cómo te llamas?"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Tu negocio o idea (opcional)">
                    <input
                      value={negocio}
                      onChange={(e) => setNegocio(e.target.value)}
                      placeholder="Ej. venta de postres, consultora, tienda online…"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="¿En qué etapa estás?">
                    <div className="flex flex-wrap gap-2">
                      {ETAPAS.map((x) => (
                        <button
                          type="button"
                          key={x}
                          onClick={() => setEtapa(x)}
                          className={`rounded-full px-4 py-2.5 text-[14px] font-semibold transition ${
                            etapa === x ? 'bg-azul text-white' : 'bg-niebla text-azul hover:bg-grisazul/50'
                          }`}
                        >
                          {x}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="¿Qué te interesa?">
                    <select value={elegido} onChange={(e) => setInteres(e.target.value)} className={inputCls}>
                      {opciones.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-naranja py-4 text-[16px] font-extrabold text-azul-ink shadow-[0_12px_30px_rgba(215,129,51,0.35)] transition hover:-translate-y-0.5 hover:bg-naranja-soft"
                  >
                    <MessageCircle size={19} />
                    Reservar por WhatsApp
                  </button>
                  <p className="text-center text-[12px] text-azul/55">
                    Usamos tus datos solo para confirmar tu reserva.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  'w-full rounded-2xl border-2 border-niebla bg-marfil px-4 py-3.5 text-[15px] font-medium text-azul outline-none transition placeholder:text-azul/40 focus:border-naranja focus:bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-bold uppercase tracking-wider text-azul/70">{label}</span>
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-marfil px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Kicker>Preguntas frecuentes</Kicker>
          <h2 className="display mt-5 text-[2.3rem] font-black uppercase md:text-[3rem]">
            Resolvemos tus <span className="text-naranja">dudas</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-azul/70">¿No encuentras tu respuesta?</p>
          <a
            href={reservaGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-azul px-6 py-3 text-[15px] font-bold transition hover:bg-azul hover:text-white"
          >
            <MessageCircle size={18} /> Escríbenos
          </a>
        </Reveal>

        <div className="divide-y divide-azul/10 border-y border-azul/10">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[18px] font-bold md:text-[20px]">{f.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      on ? 'rotate-45 bg-naranja text-azul-ink' : 'bg-niebla text-azul'
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[600px] pb-6 text-[16px] leading-relaxed text-azul/75">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FOOTER                                                               */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-azul px-5 pb-10 pt-20 text-white md:px-8">
      <Orbits className="absolute -right-40 -top-40 w-[560px] text-white/[0.07]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <img src="/logo-white.png" alt={MARCA} className="w-[220px]" />
            <p className="mt-6 max-w-[360px] text-[15px] leading-relaxed text-white/65">
              Formación, crecimiento y desarrollo para emprendedores que quieren transformar sus
              ideas en proyectos con dirección y propósito.
            </p>
          </div>
          <div>
            <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-durazno">Explora</div>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[15px] text-white/75 transition hover:text-naranja">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-durazno">Visítanos</div>
            <div className="mt-5 space-y-4 text-[15px] text-white/75">
              <p className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-naranja" />
                <span>
                  {SEDE.lugar}
                  <br />
                  {SEDE.direccion}
                </span>
              </p>
              <p className="flex gap-3">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-naranja" />
                {SEDE.horario}
              </p>
              <a
                href={reservaGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-naranja px-5 py-3 font-bold text-azul-ink transition hover:bg-naranja-soft"
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-[13px] text-white/50 md:flex-row">
          <span>© 2026 {MARCA}. Todos los derechos reservados.</span>
          <span>Hecho para impulsar emprendedores 🚀</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* WHATSAPP FLOTANTE                                                    */
/* ------------------------------------------------------------------ */
function WhatsAppFlotante() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={reservaGeneral}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] md:bottom-8 md:right-8"
        >
          <span className="wa-ping absolute inset-0 rounded-full bg-[#25D366]" />
          <svg viewBox="0 0 24 24" className="relative h-8 w-8 fill-current" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Utilidad: aparición al hacer scroll                                  */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
