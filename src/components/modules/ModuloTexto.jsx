import { useState } from 'react';
import { Binary, Type } from 'lucide-react';

function textToBinary(text) {
  if (!text) {
    return '';
  }

  return Array.from(text)
    .map((character) => character.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

function binaryToText(binaryInput) {
  try {
    const cleanBinary = binaryInput.replace(/\s+/g, '').replace(/[^01]/g, '');
    const bytes = cleanBinary.match(/.{1,8}/g) || [];
    let result = '';

    for (const byte of bytes) {
      if (byte.length < 8) {
        continue;
      }

      try {
        const decimalValue = parseInt(byte, 2);

        if (Number.isNaN(decimalValue)) {
          continue;
        }

        result += String.fromCharCode(decimalValue);
      } catch {
        // Ignora bytes malformados para mantener la conversion estable.
      }
    }

    return result;
  } catch {
    return '';
  }
}

export default function ModuloTexto() {
  const [textValue, setTextValue] = useState('');
  const [binaryValue, setBinaryValue] = useState('');

  const handleTextChange = (event) => {
    const nextText = event.target.value;
    setTextValue(nextText);
    setBinaryValue(textToBinary(nextText));
  };

  const handleBinaryChange = (event) => {
    const nextBinary = event.target.value;
    setBinaryValue(nextBinary);
    setTextValue(binaryToText(nextBinary));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-accent-primary/10">
            <Type className="w-7 h-7 text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Representacion de Texto
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-dark-700/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-accent-primary/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary flex items-center gap-2 mb-2">
              <Type className="w-4 h-4" />
              Texto (ASCII legible)
            </span>
            <textarea
              value={textValue}
              onChange={handleTextChange}
              placeholder="Escribe texto aqui..."
              rows={10}
              className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-950 text-text-primary px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wide text-text-secondary flex items-center gap-2 mb-2">
              <Binary className="w-4 h-4" />
              Binario (8 bits por caracter)
            </span>
            <textarea
              value={binaryValue}
              onChange={handleBinaryChange}
              placeholder="01001000 01101111 01101100 01100001"
              rows={10}
              className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-950 text-text-primary font-mono px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
