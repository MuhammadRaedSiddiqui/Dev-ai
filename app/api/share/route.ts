import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { randomBytes } from 'crypto'

/**
 * API Route: POST /api/share
 *
 * Create a read-only share link for a documentation bundle.
 * Returns a cryptographically random token that can be used to access the bundle.
 */
export async function POST(request: NextRequest) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { bundle_id } = body

    if (!bundle_id) {
      return NextResponse.json(
        { error: 'Bundle ID is required', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    // Verify bundle exists and belongs to user
    const { data: bundle, error: bundleError } = await supabase
      .from('documentation_bundles')
      .select('id, project_id')
      .eq('id', bundle_id)
      .single()

    if (bundleError || !bundle) {
      return NextResponse.json(
        { error: 'Bundle not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Verify project belongs to user (via RLS)
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', bundle.project_id)
      .single()

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'You do not have permission to share this bundle', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    // Generate cryptographically random token (32 bytes = 64 hex chars)
    const token = randomBytes(32).toString('hex')

    // Create share link
    const { data: shareLink, error: createError } = await supabase
      .from('share_links')
      .insert({
        bundle_id,
        token,
        created_by: user.id,
        expires_at: null, // MVP: never expires
      })
      .select()
      .single()

    if (createError) {
      console.error('Share link creation error:', createError)
      return NextResponse.json(
        { error: 'Failed to create share link', code: 'CREATE_FAILED' },
        { status: 500 }
      )
    }

    // Build share URL
    const baseUrl = request.nextUrl.origin
    const shareUrl = `${baseUrl}/share/${token}`

    return NextResponse.json(
      {
        token: shareLink.token,
        url: shareUrl,
        created_at: shareLink.created_at,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Unexpected error in POST /api/share:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
