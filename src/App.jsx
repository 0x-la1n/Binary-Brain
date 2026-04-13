import { useState } from 'react';
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
  const ActiveComponent = modules[activeModule];

  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      {/* ── Área de Contenido Principal ── */}
      <main className="ml-72 flex-1 p-10">
        {/* Barra superior con migas de pan */}
        <div className="mb-8 flex items-center gap-2 text-xs text-text-muted">
          <span>Binary-Brain</span>
          <span>/</span>
          <span className="text-text-secondary capitalize">
            {activeModule === 'ieee754' ? 'IEEE 754' : activeModule}
          </span>
        </div>

        {/* Módulo Activo */}
        <div key={activeModule}>
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
