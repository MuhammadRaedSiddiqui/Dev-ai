import { createClient } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'
import SharePageClient from '@/components/share/SharePageClient'

/**
 * Share Page (Server Component)
 *
 * Read-only public view of a shared documentation bundle.
 * No authentication required - access is granted via the share token.
 */
export default async function SharePage({ params }: { params: { token: string } }) {
  const supabase = createClient()

  // Fetch share link by token (RLS allows unauthenticated read)
  const { data: shareLink, error: shareLinkError } = await supabase
    .from('share_links')
    .select('bundle_id, created_at, expires_at')
    .eq('token', params.token)
    .single()

  if (shareLinkError || !shareLink) {
    notFound()
  }

  // Check if expired (MVP: always null, but check for future-proofing)
  if (shareLink.expires_at && new Date(shareLink.expires_at) < new Date()) {
    notFound()
  }

  // Fetch bundle (RLS allows read via valid share token)
  const { data: bundle, error: bundleError } = await supabase
    .from('documentation_bundles')
    .select('files, generated_at, project_id')
    .eq('id', shareLink.bundle_id)
    .single()

  if (bundleError || !bundle) {
    notFound()
  }

  // Fetch project name
  const { data: project } = await supabase
    .from('projects')
    .select('name, project_type')
    .eq('id', bundle.project_id)
    .single()

  return <SharePageClient bundle={bundle} project={project} />
}
