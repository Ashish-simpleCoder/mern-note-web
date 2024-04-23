import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home.page'
import LoginPage from '../pages/login.page'
import RegisterPage from '../pages/register.page'

export default function AppRouterProvider() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' Component={HomePage} />
            <Route path='/login' Component={LoginPage} />
            <Route path='/register' Component={RegisterPage} />
         </Routes>
      </BrowserRouter>
   )
}
