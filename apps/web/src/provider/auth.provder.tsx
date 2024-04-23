import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Cookie } from '../lib/cookie'

export default function AuthProvider(props: { children: ReactNode }) {
   if (!Cookie.get('access-token')) {
      return <Navigate to='/login' replace />
   }

   return props.children
}
