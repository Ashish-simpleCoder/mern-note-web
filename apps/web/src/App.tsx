import { Toaster } from 'react-hot-toast'
import AppRouterProvider from './provider/router.provider'

export default function App() {
   return (
      <>
         <AppRouterProvider />
         <Toaster position='bottom-right' />
      </>
   )
}
