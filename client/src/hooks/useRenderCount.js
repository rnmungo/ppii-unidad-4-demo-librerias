import { useRef } from 'react';

// Cuenta cuántas veces se renderizó el componente que lo usa.
// (Mutar un ref no provoca un nuevo render, por eso sirve para medir.)
export function useRenderCount() {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}
