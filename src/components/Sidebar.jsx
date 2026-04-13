import { Cpu, ArrowRightLeft, Calculator, Type, Palette, Zap } from 'lucide-react';

const menuItems = [
  { id: 'conversiones', label: 'Conversiones', icon: ArrowRightLeft },
  { id: 'operaciones', label: 'Operaciones Binarias', icon: Calculator },
  { id: 'ieee754', label: 'Normalización IEEE 754', icon: Cpu },
  { id: 'texto', label: 'Representación Texto', icon: Type },
  { id: 'pixeles', label: 'Píxeles y Colores', icon: Palette },
];

export default function Sidebar({ activeModule, onModuleChange }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-dark-800 border-r border-border flex flex-col z-50">
      {/* ── Encabezado ── */}
      <div className="px-6 py-7 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent-primary/15 animate-pulse-glow">
            <Cpu className="w-6 h-6 text-accent-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary">
              Binary-Brain
            </h1>
          </div>
        </div>
      </div>

      {/* ── Navegación ── */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
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
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'bg-accent-primary/12 text-accent-secondary shadow-[inset_0_0_0_1px_rgba(108,92,231,0.2)]'
                      : 'text-text-secondary hover:bg-dark-600 hover:text-text-primary'
                    }
                  `}
                >
                  <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-accent-primary' : ''}`} />
                  <span>{label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Pie de página ── */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span className="text-xs text-text-muted">
            Universidad de Margarita
          </span>
        </div>
      </div>
    </aside>
  );
}
