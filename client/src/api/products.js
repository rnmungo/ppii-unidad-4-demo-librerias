import { http } from './http';

// Axios: SOLO se encarga de hablar con el servidor.
// No sabe nada de caché, estados de carga ni reintentos.

export async function getProducts({ fail = false } = {}) {
  const { data } = await http.get('/products', { params: { fail } });
  return data;
}

export async function createProduct(product) {
  const { data } = await http.post('/products', product);
  return data;
}
