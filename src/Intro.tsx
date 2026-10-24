import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

/**
 * Intro cinematográfica: reproduce el video de entrada a pantalla completa
 * y avisa cuando termina (o al saltar / por seguridad a los 8s).
 * Respeta prefers-reduced-motion saltando el video.
 */
export default function Intro({ onFinish }: { onFinish: () => void }) {
  const done = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onFinish();
  };

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      finish();
      return;
    }
    const cap = setTimeout(finish, 8000); // tope de seguridad
    return () => clearTimeout(cap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-azul"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/impulsozero.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
        onError={finish}
      />
      {/* Viñeta navy suave para integrar el video con la marca */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-azul/40 via-transparent to-azul/30" />

      {/* Botón saltar */}
      <button
        onClick={finish}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 transition hover:border-naranja hover:bg-naranja hover:text-azul-ink"
      >
        Saltar intro
      </button>
    </motion.div>
  );
}
