import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home.page'
import LoginPage from '../pages/login.page'
import RegisterPage from '../pages/register.page'
import AuthProvider from './auth.provder'

export default function AppRouterProvider() {
   return (
      <BrowserRouter>
         <Routes>
            <Route
               path='/'
               element={
                  <AuthProvider>
                     <HomePage />
                  </AuthProvider>
               }
            />
            <Route path='/login' Component={LoginPage} />
            <Route path='/register' Component={RegisterPage} />
         </Routes>
      </BrowserRouter>
   )
}
