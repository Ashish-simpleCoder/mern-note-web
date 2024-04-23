import { AxiosInstance } from '../lib/axios-instance'

export async function registerService(body: { email: string; password: string }) {
   try {
      const res = await AxiosInstance.post('/api/v1/user/login', body)
      if (res.data.status == 'success') {
         // show success toast
         // set cookie
         // redirect to home page
      }
      // show error toast
   } catch (err) {
      // show error toast
   }
}
