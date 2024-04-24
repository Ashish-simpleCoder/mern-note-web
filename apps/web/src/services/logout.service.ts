import { Cookie } from '../lib/cookie'

export function logoutService() {
   Cookie.remove('refresh-token')
   Cookie.remove('access-token')
}
