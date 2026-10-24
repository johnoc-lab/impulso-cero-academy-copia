/**
 * Elementos gráficos de marca (manual 3.5): línea orbital, línea con nodo,
 * doble orbital y órbita parcial. Decorativos, giran lento.
 */
export function Orbits({
  className = '',
  stroke = 'currentColor',
  node = '#d78133',
}: {
  className?: string;
  stroke?: string;
  node?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <g className="orbit-spin">
        <ellipse cx="300" cy="300" rx="280" ry="150" stroke={stroke} strokeWidth="1.5" transform="rotate(-28 300 300)" />
        <circle cx="545" cy="170" r="8" fill={node} />
      </g>
      <g className="orbit-spin-rev">
        <ellipse cx="300" cy="300" rx="230" ry="230" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 10" />
        <circle cx="300" cy="70" r="5" fill={stroke} />
      </g>
      <g className="orbit-spin">
        <path d="M70 380 A 240 240 0 0 0 470 470" stroke={node} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="470" cy="470" r="6" fill={node} />
      </g>
    </svg>
  );
}

/** Etiqueta de sección con nodo orbital */
export function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] ${
        light ? 'text-durazno' : 'text-naranja'
      }`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inset-0 rounded-full bg-naranja" />
        <span className="absolute -inset-1 rounded-full border border-naranja/50" />
      </span>
      {children}
    </div>
  );
}
