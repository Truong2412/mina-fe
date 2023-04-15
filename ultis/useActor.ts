import { useRouter } from 'next/router'
export const useActor = () => {
  const router = useRouter()
  const actor = router.pathname.split('/')[1]
  return actor
}
