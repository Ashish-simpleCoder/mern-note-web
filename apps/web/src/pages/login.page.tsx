export default function LoginPage() {
   return (
      <div className='max-md:px-4'>
         <form className='max-w-md h-[450px] w-full mx-auto mt-40 bg-blue-100 rounded-lg shadow-lg flex flex-col'>
            <h1 className='text-3xl text-center py-8'>Login</h1>
            <div className='flex flex-col gap-5 px-4'>
               <div className='form-group flex flex-col gap-1'>
                  <label htmlFor='email' className='text-lg'>
                     Email
                  </label>
                  <input type='text' id='email' className='px-1 py-2 rounded-sm' />
               </div>

               <div className='form-group flex flex-col gap-1'>
                  <label htmlFor='password' className='text-lg'>
                     Password
                  </label>
                  <input type='text' id='password' className='px-1 py-2 rounded-sm' />
               </div>
            </div>
            <div className='px-4 py-8 mt-auto'>
               <button className='bg-green-500 w-full py-2 rounded-md text-lg'>Login</button>
            </div>
         </form>
      </div>
   )
}
