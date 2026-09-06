import { requireStaff } from '@/lib/auth'
import AdminClient from './AdminClient'

export default async function AdminPage(){
  await requireStaff()
  return <AdminClient />
}
