import { useEffect, useState } from 'react';
import { Calculator, ChevronDown } from 'lucide-react';

const OPERATIONS = {
  '+': {
    label: 'Suma (+)',
    apply: (a, b) => a + b,
  },
  '-': {
    label: 'Resta (-)',
    apply: (a, b) => a - b,
  },
  '*': {
    label: 'Multiplicacion (*)',
    apply: (a, b) => a * b,
  },
};

function toBinaryString(value) {
  if (value < 0) {
    return `-${Math.abs(value).toString(2)}`;
  }

  return value.toString(2);
}

export default function ModuloOperaciones() {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [operation, setOperation] = useState('+');
  const [resultBinary, setResultBinary] = useState('');
  const [resultDecimal, setResultDecimal] = useState(null);
  const [decimalA, setDecimalA] = useState(null);
  const [decimalB, setDecimalB] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const cleanA = valueA.trim();
    const cleanB = valueB.trim();

    if (!cleanA && !cleanB) {
      setError('');
      setResultBinary('');
      setResultDecimal(null);
      setDecimalA(null);
      setDecimalB(null);
      return;
    }

    const isValidA = /^[01]+$/.test(cleanA);
    const isValidB = /^[01]+$/.test(cleanB);

    if (!cleanA || !cleanB || !isValidA || !isValidB) {
      setResultBinary('');
      setResultDecimal(null);
      setDecimalA(null);
      setDecimalB(null);
      setError('Formato invalido: solo se permiten 0 y 1 en ambos campos');
      return;
    }

    const parsedA = parseInt(cleanA, 2);
    const parsedB = parseInt(cleanB, 2);
    const decimalResult = OPERATIONS[operation].apply(parsedA, parsedB);

    setDecimalA(parsedA);
    setDecimalB(parsedB);
    setResultDecimal(decimalResult);
    setResultBinary(toBinaryString(decimalResult));
    setError('');
  }, [valueA, valueB, operation]);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-accent-primary/10">
            <Calculator className="w-7 h-7 text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Operaciones Binarias
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-dark-700/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-accent-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
              Binario A
            </span>
            <input
              type="text"
              value={valueA}
              onChange={(event) => setValueA(event.target.value)}
              placeholder="Ej: 1010"
              inputMode="numeric"
              className="w-full rounded-xl border border-border bg-dark-800 text-text-primary px-4 py-3 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
              Operacion
            </span>
            <div className="relative">
              <select
                value={operation}
                onChange={(event) => setOperation(event.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-dark-800 text-text-primary pl-4 pr-11 py-3 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
              >
                {Object.entries(OPERATIONS).map(([symbol, config]) => (
                  <option key={symbol} value={symbol}>
                    {config.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            </div>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary block mb-2">
              Binario B
            </span>
            <input
              type="text"
              value={valueB}
              onChange={(event) => setValueB(event.target.value)}
              placeholder="Ej: 0011"
              inputMode="numeric"
              className="w-full rounded-xl border border-border bg-dark-800 text-text-primary px-4 py-3 outline-none focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
            />
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-400 mb-4">
            {error}
          </p>
        )}

        <div className="rounded-xl border border-indigo-400/40 bg-indigo-500/10 px-4 py-4 mb-6">
          <p className="text-xs uppercase tracking-wide text-indigo-200/80 mb-2">
            Resultado Binario
          </p>
          <div className="font-mono text-xl text-indigo-100 break-all min-h-8">
            {resultBinary || '...'}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-dark-800 px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-text-secondary mb-2">
            Procedimiento / Verificacion
          </p>
          <div className="font-mono text-sm md:text-base text-text-primary break-all min-h-6">
            {decimalA !== null && decimalB !== null && resultDecimal !== null
              ? `${decimalA} ${operation} ${decimalB} = ${resultDecimal}`
              : 'Completa ambos valores binarios para ver la comprobacion en base 10'}
          </div>
        </div>
      </div>
    </div>
  );
}
