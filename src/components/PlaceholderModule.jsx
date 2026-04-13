import { Construction } from 'lucide-react';

/**
 * PlaceholderModule — Tarjeta skeleton reutilizable para cada módulo.
 */
export default function PlaceholderModule({ icon: Icon, title, description }) {
  return (
    <div className="animate-fade-in">
      {/* ── Encabezado de la Sección ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-accent-primary/10">
            <Icon className="w-7 h-7 text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            {title}
          </h2>
        </div>
        <p className="text-sm text-text-secondary max-w-xl leading-relaxed ml-[52px]">
          {description}
        </p>
      </div>

      {/* ── Tarjeta de Placeholder ── */}
      <div className="rounded-2xl border border-border bg-dark-700/50 backdrop-blur-sm p-8 min-h-[340px] flex flex-col items-center justify-center gap-5 transition-all duration-300 hover:border-accent-primary/20">
        {/* Líneas del skeleton shimmer */}
        <div className="w-full max-w-md space-y-4">
          <div className="h-4 rounded-lg card-shimmer" />
          <div className="h-4 rounded-lg card-shimmer w-5/6" style={{ animationDelay: '0.2s' }} />
          <div className="h-10 rounded-xl card-shimmer w-full mt-6" style={{ animationDelay: '0.4s' }} />
          <div className="flex gap-3 mt-4">
            <div className="h-10 rounded-xl card-shimmer flex-1" style={{ animationDelay: '0.6s' }} />
            <div className="h-10 rounded-xl card-shimmer flex-1" style={{ animationDelay: '0.8s' }} />
          </div>
          <div className="h-24 rounded-xl card-shimmer w-full mt-4" style={{ animationDelay: '1s' }} />
        </div>

        {/* Separador */}
        <div className="w-12 h-px bg-border my-2" />

        {/* Insignia de información */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-600/80 border border-border">
          <Construction className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-muted">
            Módulo en desarrollo — listo para implementación
          </span>
        </div>
      </div>
    </div>
  );
}
