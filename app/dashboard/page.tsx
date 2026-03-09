import { createClient } from '@/lib/supabase/server'
import DashHome from '@/components/app/DashHome'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single()

  return <DashHome profile={profile} />
}
