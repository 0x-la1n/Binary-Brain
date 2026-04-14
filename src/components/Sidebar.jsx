import { X, Cpu, ArrowRightLeft, Calculator, Type, Palette, GitBranch } from 'lucide-react';

const menuItems = [
  { id: 'conversiones', label: 'Conversiones', icon: ArrowRightLeft },
  { id: 'operaciones', label: 'Operaciones Binarias', icon: Calculator },
  { id: 'ieee754', label: 'Normalización IEEE 754', icon: Cpu },
  { id: 'texto', label: 'Representación Texto', icon: Type },
  { id: 'pixeles', label: 'Píxeles y Colores', icon: Palette },
];

export default function Sidebar({ activeModule, onModuleChange, isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 transform flex-col border-r border-border bg-dark-800 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
      {/* ── Encabezado ── */}
        <div className="border-b border-border px-6 py-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-accent-primary/15 p-2 animate-pulse-glow">
                <Cpu className="h-6 w-6 text-accent-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-text-primary">
                  Binary-Brain
                </h1>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-xl border border-border bg-dark-700 p-2 text-text-secondary md:hidden"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

      {/* ── Navegación ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            Módulos
          </p>
          <ul className="space-y-1">
            {menuItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeModule === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => onModuleChange(id)}
                    className={`
                      flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'bg-accent-primary/12 text-accent-secondary shadow-[inset_0_0_0_1px_rgba(108,92,231,0.2)]'
                        : 'text-text-secondary hover:bg-dark-600 hover:text-text-primary'
                      }
                    `}
                  >
                    <Icon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? 'text-accent-primary' : ''}`} />
                    <span>{label}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-primary" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      {/* ── Pie de página ── */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              <span className="truncate text-xs text-text-muted">
                Universidad de Margarita
              </span>
            </div>
            <a
              href="https://github.com/0x-la1n/Binary-Brain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center justify-center rounded-lg border border-border bg-dark-700 p-1.5 text-text-secondary transition-colors hover:bg-dark-600 hover:text-text-primary"
              aria-label="Ir al repositorio de GitHub de Binary-Brain"
              title="Repositorio en GitHub"
            >
              <GitBranch className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
