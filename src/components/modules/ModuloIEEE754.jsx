import { useEffect, useState } from 'react';
import { Binary, Cpu } from 'lucide-react';

function parseInputValue(rawValue) {
  const value = rawValue.trim();

  if (!value) {
    return { parsed: null, error: '' };
  }

  if (/^-?0b[01]+$/i.test(value)) {
    const isNegative = value.startsWith('-');
    const cleanBits = value.replace('-', '').slice(2);
    const parsed = parseInt(cleanBits, 2);
    return { parsed: isNegative ? -parsed : parsed, error: '' };
  }

  if (/^-?[01]+$/.test(value)) {
    const isNegative = value.startsWith('-');
    const cleanBits = value.replace('-', '');
    const parsed = parseInt(cleanBits, 2);
    return { parsed: isNegative ? -parsed : parsed, error: '' };
  }

  const normalized = value.replace(',', '.');
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    return {
      parsed: null,
      error: 'Ingresa un numero valido (entero o decimal) o un binario entero',
    };
  }

  return { parsed, error: '' };
}

function getIEEE754Parts(numberValue) {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setFloat32(0, numberValue, false);

  const uint32 = view.getUint32(0, false);
  const fullBits = uint32.toString(2).padStart(32, '0');

  const signBit = fullBits.slice(0, 1);
  const exponentBits = fullBits.slice(1, 9);
  const mantissaBits = fullBits.slice(9);

  const exponentValue = parseInt(exponentBits, 2);

  let exponentExplanation = '';
  if (exponentValue === 0) {
    exponentExplanation = 'Subnormal o cero (exponente real = -126)';
  } else if (exponentValue === 255) {
    exponentExplanation = 'Valor especial (Infinito o NaN)';
  } else {
    exponentExplanation = `${exponentValue} - 127 = ${exponentValue - 127}`;
  }

  return {
    signBit,
    exponentBits,
    mantissaBits,
    fullBits,
    exponentExplanation,
  };
}

export default function ModuloIEEE754() {
  const [inputValue, setInputValue] = useState('');
  const [parsedValue, setParsedValue] = useState(null);
  const [parts, setParts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const parsedResult = parseInputValue(inputValue);

    if (!inputValue.trim()) {
      setParsedValue(null);
      setParts(null);
      setError('');
      return;
    }

    if (parsedResult.error) {
      setParsedValue(null);
      setParts(null);
      setError(parsedResult.error);
      return;
    }

    const ieeeParts = getIEEE754Parts(parsedResult.parsed);
    setParsedValue(parsedResult.parsed);
    setParts(ieeeParts);
    setError('');
  }, [inputValue]);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-accent-primary/10">
            <Cpu className="w-7 h-7 text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Normalizacion IEEE 754 (32 bits)
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-dark-700/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-accent-primary/20">
        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
            Valor de entrada
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Ej: 13.25  |  1101"
            className="w-full rounded-xl border border-border bg-dark-800 text-text-primary px-4 py-3 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
          />
        </label>

        {error && (
          <p className="text-sm text-red-400 mb-5">{error}</p>
        )}

        <div className="rounded-xl border border-border bg-dark-800 px-4 py-4 mb-5">
          <p className="text-xs uppercase tracking-wide text-text-secondary mb-2">
            Valor interpretado
          </p>
          <p className="font-mono text-text-primary min-h-6">
            {parsedValue !== null ? parsedValue : '...'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-red-300 mb-1">
              Signo (1 bit)
            </p>
            <p className="font-mono text-lg text-red-200 min-h-7">
              {parts ? parts.signBit : '-'}
            </p>
          </div>

          <div className="rounded-xl border border-green-400/40 bg-green-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-green-300 mb-1">
              Exponente (8 bits)
            </p>
            <p className="font-mono text-lg text-green-200 min-h-7">
              {parts ? parts.exponentBits : '-'}
            </p>
            <p className="text-xs text-green-200/80 mt-1 min-h-4">
              {parts ? parts.exponentExplanation : ''}
            </p>
          </div>

          <div className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-blue-300 mb-1">
              Mantisa (23 bits)
            </p>
            <p className="font-mono text-sm text-blue-200 break-all min-h-7">
              {parts ? parts.mantissaBits : '-'}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-dark-800 px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Binary className="w-4 h-4 text-accent-secondary" />
            <p className="text-xs uppercase tracking-wide text-text-secondary">
              Cadena IEEE 754 completa (32 bits)
            </p>
          </div>

          <p className="font-mono text-sm md:text-base break-all leading-7 min-h-7">
            {parts ? (
              <>
                <span className="text-red-300">{parts.signBit}</span>
                <span className="text-text-muted"> </span>
                <span className="text-green-300">{parts.exponentBits}</span>
                <span className="text-text-muted"> </span>
                <span className="text-blue-300">{parts.mantissaBits}</span>
              </>
            ) : (
              <span className="text-text-muted">...</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
