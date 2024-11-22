import { get, post } from '@api/transport';

export async function login(data) {
  await get('/sanctum/csrf-cookie')
  return post(`${data.company}/customer/login`, data)
}

export async function forgotPassword(data) {
  return this.post(`${data.company}/customer/auth/password/email`, data)
}

export async function resetPassword(data, company) {
  return this.post(`${company}/customer/auth/reset/password`, data)
}

export async function logout(company) {
  return this.post(`${company}/customer/logout`)
}
