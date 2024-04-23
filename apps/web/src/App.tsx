import { Toaster } from 'react-hot-toast'
import AppRouterProvider from './provider/router.provider'

export default function App() {
   return (
      <div>
         <AppRouterProvider />
         <Toaster position='bottom-right' />
      </div>
   )
}
