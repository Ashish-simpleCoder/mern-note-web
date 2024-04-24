import { Link, useNavigate } from 'react-router-dom'
import { logoutService } from '../../services/logout.service'
import toast from 'react-hot-toast'

export default function Header() {
   const navigate = useNavigate()
   return (
      <header>
         <div className='flex justify-between px-10 py-4'>
            <Link to='/' role='heading' className='flex items-center gap-2'>
               <span className='text-2xl'>Easy Note</span>
            </Link>
            <button
               className='bg-red-200 px-4 rounded-md'
               onClick={() => {
                  logoutService()
                  navigate('/login', { replace: true })
                  toast.success('Logout successfully.')
               }}
            >
               Logout
            </button>
         </div>
      </header>
   )
}
