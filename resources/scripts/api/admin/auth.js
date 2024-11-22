import { get, post } from '@api/transport';

export async function login(data) {
  await get('/sanctum/csrf-cookie')
  return post('login', data)
}

export async function logout() {
  return post('auth/logout')
}
