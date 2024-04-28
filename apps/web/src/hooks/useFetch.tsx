import { useCallback, useState } from 'react'

export default function useFetch(url: string) {
   const [status, setStatus] = useState<Status | null>(null)

   const handleFetch = useCallback(() => {}, [])
}

type Status = 'loading' | 'failed' | 'sucess'
