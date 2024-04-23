import { Navigate } from 'react-router-dom'
import { Cookie } from '../lib/cookie'

export default function RegisterPage() {
   if (Cookie.get('access-token')) {
      return <Navigate to='/login' replace />
   }
   return <div>register</div>
}
