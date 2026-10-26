import {
  TrendingUp,
  Search,
  Bot,
  ShieldCheck,
  Lightbulb,
  GraduationCap,
  Handshake,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

export const MARCA = 'Impulso Cero Academy';

// Cambia por tu número real (formato internacional sin +, ej. 51987654321)
export const WHATSAPP = '51999999999';
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const SEDE = {
  lugar: 'La Base Cowork',
  direccion: 'Jr. Tacna N.º 234, Piso 10 — Torre Galena',
  horario: 'Viernes · 6:30 – 7:30 pm',
};

export const PONENTE = {
  nombre: 'Fiorella Pérez',
  rol: 'Especialista en Creatividad Publicitaria y Marketing',
  img: '/flyer-taller1.png',
};

export type Aliado = {
  nombre: string;
  logo: string;
  url: string;
};

// Datos y logos temporales: reemplazar por las marcas y enlaces oficiales desde el CMS.
export const ALIADOS: Aliado[] = [
  { nombre: 'La Base Cowork', logo: '/logos/la-base.svg', url: '#' },
  { nombre: 'Égida Jurídica', logo: '/logos/egida.svg', url: '#' },
  { nombre: 'Finacorp', logo: '/logos/finacorp.svg', url: '#' },
  { nombre: 'Aliado de prueba', logo: '/logos/aliado-demo.svg', url: '#' },
];

export const NAV = [
  { label: 'Ruta', href: '#ruta' },
  { label: 'Talleres', href: '#talleres' },
  { label: 'Programas', href: '#programas' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Preguntas', href: '#faq' },
];

// Personalidad de marca (manual 1.3)
export const PERSONALIDAD = [
  { t: 'Cercana', d: 'Te hablamos claro, sin tecnicismos y de tú a tú.' },
  { t: 'Dinámica', d: 'Energía, movimiento y avance constante en cada sesión.' },
  { t: 'Innovadora', d: 'Herramientas actuales, incluida la inteligencia artificial.' },
  { t: 'Confiable', d: 'Profesionales y aliados que respaldan lo que enseñamos.' },
];

// Dolores del emprendedor → cada uno lleva a un taller
export const DOLORES = [
  { q: 'Tengo una idea, pero no sé por dónde empezar.', taller: 0 },
  { q: 'Vendo, pero mi negocio no termina de crecer.', taller: 1 },
  { q: 'Hago todo a mano y no me alcanza el tiempo.', taller: 2 },
  { q: 'Tengo trabajadores y me preocupa un problema legal.', taller: 3 },
];

// Ruta de despegue: el concepto "punto cero → proyección"
export const RUTA: { n: string; t: string; d: string; Icon: LucideIcon }[] = [
  {
    n: '3',
    t: 'Punto cero',
    d: 'Llegas con una idea o un negocio que quieres ordenar. Aquí empieza todo.',
    Icon: Lightbulb,
  },
  {
    n: '2',
    t: 'Formación práctica',
    d: 'Talleres gratuitos de una hora con casos reales y herramientas que aplicas al día siguiente.',
    Icon: GraduationCap,
  },
  {
    n: '1',
    t: 'Acompañamiento',
    d: 'Programas con mentoría, plantillas y seguimiento para que no avances solo.',
    Icon: Handshake,
  },
  {
    n: '0',
    t: '¡Despegue!',
    d: 'Un negocio sostenible, con dirección y proyección de crecimiento.',
    Icon: Rocket,
  },
];

export type Taller = {
  num: string;
  label: string;
  ctaLabel: string;
  clave: string; // palabra gigante
  dateShort: string; // "05 SET"
  day: string; // "Viernes 05 de Setiembre"
  time: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

export const TALLERES: Taller[] = [
  {
    num: '01',
    label: 'Taller 01',
    ctaLabel: 'Reservar este taller',
    clave: 'CRECE',
    dateShort: '05 SET',
    day: 'Viernes 05 de Setiembre',
    time: '6:30 – 7:30 pm',
    title: '¿Qué hace que un negocio crezca o desaparezca?',
    desc: 'Aprende cómo hacer crecer el tuyo sin ponerlo en riesgo.',
    Icon: TrendingUp,
  },
  {
    num: '02',
    label: 'Taller 02',
    ctaLabel: 'Reservar este taller',
    clave: 'ESCALA',
    dateShort: '12 SET',
    day: 'Viernes 12 de Setiembre',
    time: '6:30 – 7:30 pm',
    title: '¿Por qué tu negocio no crece?',
    desc: 'Descubre el error que cometen la mayoría de emprendedores.',
    Icon: Search,
  },
  {
    num: '03',
    label: 'Taller 03',
    ctaLabel: 'Reservar este taller',
    clave: 'AUTOMATIZA',
    dateShort: '19 SET',
    day: 'Viernes 19 de Setiembre',
    time: '6:30 – 7:30 pm',
    title: '¿La inteligencia artificial puede trabajar por ti?',
    desc: 'Descúbrelo en una hora y pon la IA a favor de tu negocio.',
    Icon: Bot,
  },
  {
    num: '04',
    label: 'Taller 04',
    ctaLabel: 'Reservar este taller',
    clave: 'PROTEGE',
    dateShort: '26 SET',
    day: 'Viernes 26 de Setiembre',
    time: '6:30 – 7:30 pm',
    title: '¿Tu trabajador puede demandarte?',
    desc: 'Aprende cómo evitar ese problema antes de que ocurra.',
    Icon: ShieldCheck,
  },
];

// Programas de pago (siguiente paso tras los talleres gratuitos).
// EDITA libremente: nombres, precios reales, duración e incluye.
export type Programa = {
  nombre: string;
  tagline: string;
  duracion: string;
  precio: string;
  destacado: boolean;
  incluye: string[];
  Icon: LucideIcon;
};

export const PROGRAMAS: Programa[] = [
  {
    nombre: 'Programa Crecimiento',
    tagline: 'De la idea a un negocio rentable y ordenado.',
    duracion: '6 semanas · grupal en vivo',
    precio: 'Consulta la inversión',
    destacado: false,
    incluye: [
      'Diagnóstico real de tu negocio',
      'Plan de crecimiento paso a paso',
      'Sesiones en vivo con expertos',
      'Plantillas y herramientas listas',
      'Comunidad de emprendedores',
    ],
    Icon: TrendingUp,
  },
  {
    nombre: 'Automatización con IA',
    tagline: 'Pon la inteligencia artificial a trabajar por ti.',
    duracion: '4 semanas · 100% práctico',
    precio: 'Consulta la inversión',
    destacado: true,
    incluye: [
      'Bot de WhatsApp para ventas y atención',
      'Automatización de tareas repetitivas',
      'IA para contenido y marketing',
      'Implementación guiada en tu negocio',
    ],
    Icon: Bot,
  },
  {
    nombre: 'Blindaje Legal & Financiero',
    tagline: 'Protege y escala con acompañamiento 1 a 1.',
    duracion: 'A medida · individual',
    precio: 'Consulta la inversión',
    destacado: false,
    incluye: [
      'Asesoría legal con Égida Jurídica',
      'Orden financiero con Finacorp',
      'Contratos y protección laboral',
      'Mentoría personalizada',
    ],
    Icon: ShieldCheck,
  },
];

export const ESENCIA = {
  mision:
    'Impulsar a emprendedores mediante formación práctica, herramientas estratégicas y acompañamiento que les permita transformar sus ideas en proyectos sostenibles y con proyección.',
  vision:
    'Ser una academia referente en formación para emprendedores, reconocida por impulsar ideas, desarrollar capacidades y generar oportunidades de crecimiento.',
};

export const FAQ = [
  {
    q: '¿Los talleres realmente son gratuitos?',
    a: 'Sí. Los talleres son 100% gratuitos; solo necesitas reservar tu cupo porque los espacios por sesión son limitados.',
  },
  {
    q: '¿Necesito tener un negocio ya funcionando?',
    a: 'No. Si solo tienes una idea, este es tu punto cero. Si ya vendes, te damos herramientas para ordenar y crecer.',
  },
  {
    q: '¿Dónde y cuándo son las sesiones?',
    a: `Todos los viernes de 6:30 a 7:30 pm en ${SEDE.lugar}, ${SEDE.direccion}.`,
  },
  {
    q: '¿Qué pasa después de los talleres?',
    a: 'Si quieres ir más lejos, tenemos programas con mentoría y seguimiento. Sin presión: primero conoces cómo trabajamos.',
  },
  {
    q: '¿Cómo reservo mi cupo?',
    a: 'Completa el formulario de esta página o escríbenos por WhatsApp. Te confirmamos tu lugar en minutos.',
  },
];
