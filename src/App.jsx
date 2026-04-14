import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ModuloConversiones from './components/modules/ModuloConversiones';
import ModuloOperaciones from './components/modules/ModuloOperaciones';
import ModuloIEEE754 from './components/modules/ModuloIEEE754';
import ModuloTexto from './components/modules/ModuloTexto';
import ModuloPixeles from './components/modules/ModuloPixeles';

const modules = {
  conversiones: ModuloConversiones,
  operaciones: ModuloOperaciones,
  ieee754: ModuloIEEE754,
  texto: ModuloTexto,
  pixeles: ModuloPixeles,
};

export default function App() {
  const [activeModule, setActiveModule] = useState('conversiones');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ActiveComponent = modules[activeModule];

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Sidebar
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* ── Área de Contenido Principal ── */}
      <main className="ml-0 min-h-screen flex-1 px-4 py-4 pt-20 sm:px-6 md:ml-72 md:p-10 md:pt-10">
        {/* Barra superior con migas de pan */}
        <div className="mb-6 flex items-center justify-between gap-3 text-xs text-text-muted md:mb-8">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-dark-800 p-2 text-text-secondary md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="truncate">Binary-Brain</span>
            <span>/</span>
            <span className="truncate text-text-secondary capitalize">
              {activeModule === 'ieee754' ? 'IEEE 754' : activeModule}
            </span>
          </div>
        </div>

        {/* Módulo Activo */}
        <div key={activeModule}>
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
