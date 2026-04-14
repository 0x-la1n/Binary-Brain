import { useEffect, useState } from 'react';
import { ArrowRightLeft, ChevronDown } from 'lucide-react';

const BASES = {
  decimal: { label: 'Decimal', base: 10, pattern: /^-?\d+$/ },
  binario: { label: 'Binario', base: 2, pattern: /^-?[01]+$/ },
  hexadecimal: { label: 'Hexadecimal', base: 16, pattern: /^-?[0-9A-Fa-f]+$/ },
};

const BASE_OPTIONS = Object.keys(BASES);

function convertValue(value, origin, destination) {
  const { base: originBase, pattern } = BASES[origin];
  const { base: destinationBase } = BASES[destination];

  if (!pattern.test(value)) {
    return { result: '', error: 'Formato inválido para la base seleccionada' };
  }

  const numericValue = parseInt(value, originBase);

  if (Number.isNaN(numericValue)) {
    return { result: '', error: 'Formato inválido para la base seleccionada' };
  }

  if (origin === destination) {
    return {
      result: destination === 'hexadecimal' ? value.toUpperCase() : value,
      error: '',
    };
  }

  const rawResult = numericValue.toString(destinationBase);

  return {
    result: destination === 'hexadecimal' ? rawResult.toUpperCase() : rawResult,
    error: '',
  };
}

export default function ModuloConversiones() {
  const [originBase, setOriginBase] = useState('decimal');
  const [destinationBase, setDestinationBase] = useState('binario');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputValue.trim()) {
      setResult('');
      setError('');
      return;
    }

    const conversion = convertValue(inputValue.trim(), originBase, destinationBase);
    setResult(conversion.result);
    setError(conversion.error);
  }, [inputValue, originBase, destinationBase]);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-accent-primary/10">
            <ArrowRightLeft className="w-7 h-7 text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Conversor de Bases
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-dark-700/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-accent-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
              Origen
            </span>
            <div className="relative">
              <select
                value={originBase}
                onChange={(event) => setOriginBase(event.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-dark-800 text-text-primary pl-4 pr-11 py-2.5 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
              >
                {BASE_OPTIONS.map((baseKey) => (
                  <option key={baseKey} value={baseKey}>
                    {BASES[baseKey].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            </div>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
              Destino
            </span>
            <div className="relative">
              <select
                value={destinationBase}
                onChange={(event) => setDestinationBase(event.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-dark-800 text-text-primary pl-4 pr-11 py-2.5 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
              >
                {BASE_OPTIONS.map((baseKey) => (
                  <option key={baseKey} value={baseKey}>
                    {BASES[baseKey].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            </div>
          </label>
        </div>

        <label className="block mb-2">
          <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
            Valor
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Ingresa un valor"
            className="w-full rounded-xl border border-border bg-dark-800 text-text-primary px-4 py-3 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
          />
        </label>

        {error && (
          <p className="text-sm text-red-400 mt-2">
            {error}
          </p>
        )}

        <div className="mt-6 rounded-xl border border-accent-primary/25 bg-dark-800 px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-text-secondary mb-2">
            Resultado
          </p>
          <div className="font-mono text-lg text-accent-secondary break-all min-h-7">
            {inputValue.trim() ? (error ? '--' : result) : '...'}
          </div>
        </div>
      </div>
    </div>
  );
}
