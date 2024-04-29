import { Toaster } from 'react-hot-toast'
import AppRouterProvider from './provider/router.provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

export default function App() {
   return (
      <>
         <QueryClientProvider client={queryClient}>
            <AppRouterProvider />
         </QueryClientProvider>
         <Toaster position='bottom-right' />
      </>
   )
}
