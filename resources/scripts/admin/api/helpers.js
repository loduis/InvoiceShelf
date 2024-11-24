import { get } from '@/scripts/services/api'

export function nextNumber (key, params) {
  return get(`next-number?key=${key}`, params)
}
