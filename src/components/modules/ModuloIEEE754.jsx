import { Cpu } from 'lucide-react';
import PlaceholderModule from '../PlaceholderModule';

export default function ModuloIEEE754() {
  return (
    <PlaceholderModule
      icon={Cpu}
      title="Normalización IEEE 754"
      description="Normaliza números decimales al estándar IEEE 754 de precisión simple (32 bits). Descompone el resultado en signo, exponente y mantisa."
    />
  );
}
