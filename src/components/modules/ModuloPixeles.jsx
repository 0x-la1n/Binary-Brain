import { useEffect, useMemo, useState } from 'react';
import { Palette, Pipette } from 'lucide-react';

function normalizeHex(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  if (!/^#[0-9A-Fa-f]{6}$/.test(withHash)) {
    return null;
  }

  return withHash.toUpperCase();
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function toIEEE754Bits(value) {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setFloat32(0, value, false);
  return view.getUint32(0, false).toString(2).padStart(32, '0');
}

function buildChannelData(value) {
  return {
    decimal: value,
    binary8: value.toString(2).padStart(8, '0'),
    ieee754: toIEEE754Bits(value),
  };
}

export default function ModuloPixeles() {
  const [hexInput, setHexInput] = useState('#FF5733');
  const [selectedColor, setSelectedColor] = useState('#FF5733');
  const [error, setError] = useState('');

  useEffect(() => {
    const normalized = normalizeHex(hexInput);

    if (!hexInput.trim()) {
      setError('Ingresa un valor hexadecimal en formato #RRGGBB');
      return;
    }

    if (!normalized) {
      setError('Formato invalido. Usa #RRGGBB (ej: #FF5733)');
      return;
    }

    setError('');
    setSelectedColor(normalized);
  }, [hexInput]);

  const rgb = useMemo(() => hexToRgb(selectedColor), [selectedColor]);

  const channels = useMemo(
    () => [
      {
        key: 'R',
        name: 'Rojo',
        value: rgb.r,
        styles: {
          border: 'border-red-400/40',
          bg: 'bg-red-500/10',
          title: 'text-red-300',
          value: 'text-red-200',
        },
      },
      {
        key: 'G',
        name: 'Verde',
        value: rgb.g,
        styles: {
          border: 'border-green-400/40',
          bg: 'bg-green-500/10',
          title: 'text-green-300',
          value: 'text-green-200',
        },
      },
      {
        key: 'B',
        name: 'Azul',
        value: rgb.b,
        styles: {
          border: 'border-blue-400/40',
          bg: 'bg-blue-500/10',
          title: 'text-blue-300',
          value: 'text-blue-200',
        },
      },
    ],
    [rgb.b, rgb.g, rgb.r],
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-accent-primary/10">
            <Palette className="w-7 h-7 text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Pixeles y Colores
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-dark-700/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-accent-primary/20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <label className="block lg:col-span-2">
            <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
              Color Hexadecimal
            </span>
            <input
              type="text"
              value={hexInput}
              onChange={(event) => setHexInput(event.target.value)}
              placeholder="#FF5733"
              className="w-full rounded-xl border border-border bg-dark-800 text-text-primary px-4 py-3 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary flex items-center gap-2 mb-2">
              <Pipette className="w-4 h-4" />
              Selector
            </span>
            <input
              type="color"
              value={selectedColor}
              onChange={(event) => {
                const next = event.target.value.toUpperCase();
                setSelectedColor(next);
                setHexInput(next);
              }}
              className="h-12 w-full rounded-xl border border-border bg-dark-800 p-1 cursor-pointer"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-400 mb-6">{error}</p>}

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-auto">
            <p className="text-xs uppercase tracking-wide text-text-secondary mb-2">
              Vista del color
            </p>
            <div
              className="w-32 h-32 rounded-2xl border border-border shadow-lg"
              style={{ backgroundColor: selectedColor }}
              aria-label="Color seleccionado"
            />
            <p className="mt-3 font-mono text-sm text-text-secondary">
              {selectedColor}
            </p>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
            {channels.map((channel) => {
              const data = buildChannelData(channel.value);

              return (
                <div
                  key={channel.key}
                  className={`rounded-xl border ${channel.styles.border} ${channel.styles.bg} p-4`}
                >
                  <p className={`text-xs uppercase tracking-wide mb-2 ${channel.styles.title}`}>
                    Canal {channel.key} ({channel.name})
                  </p>

                  <p className="text-xs text-text-secondary">Decimal</p>
                  <p className={`font-mono text-lg mb-3 ${channel.styles.value}`}>
                    {data.decimal}
                  </p>

                  <p className="text-xs text-text-secondary">Binario (8 bits)</p>
                  <p className="font-mono text-sm text-text-primary mb-3 break-all">
                    {data.binary8}
                  </p>

                  <p className="text-xs text-text-secondary">IEEE 754 (32 bits)</p>
                  <p className="font-mono text-[11px] leading-5 text-text-primary break-all">
                    {data.ieee754}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
