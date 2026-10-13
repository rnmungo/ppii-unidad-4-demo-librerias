import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, getProducts } from '../api/products';

// TanStack Query: decide CUÁNDO pedir, guarda en caché y expone el estado.
export function useProducts({ fail = false } = {}) {
  return useQuery({
    queryKey: ['products', { fail }], // "nombre" de estos datos en la caché
    queryFn: () => getProducts({ fail }), // la función de Axios
    retry: 2, // si falla, reintenta 2 veces más (3 intentos en total)
    retryDelay: 1000, // espera 1 s entre intentos
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    // Cuando se crea un producto, marcamos la lista como "vieja"
    // y TanStack Query la vuelve a pedir sola → UI sincronizada.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}
