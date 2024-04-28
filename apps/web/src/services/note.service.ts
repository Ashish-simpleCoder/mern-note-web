import toast from 'react-hot-toast'
import { AxiosInstance } from '../lib/axios-instance'
import { Cookie } from '../lib/cookie'

export async function noteCreate(body: { email: string; password: string }, options?: { onSuccess?: () => void }) {
   try {
      const res = await AxiosInstance.post('/api/v1/user', body)
      if (res.data.status == 'success') {
         // show success toast
         toast.success(res.data.message)

         // set cookie
         Cookie.set('access-token', res.data.accessToken)
         Cookie.set('refresh-token', res.data.refreshToken)

         // redirect to home page
         options?.onSuccess?.()
         toast.success('Login successfully.')
      }
      // show error toast
   } catch (err) {
      // show error toast
      if (err.response?.data?.status == 'error') {
         toast.error(err.response.data.message)
      }
   }
}
