import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Sanitize string input to prevent XSS
 */
function sanitizeInput(input: string): string {
  if (!input) return ''
  // Remove HTML tags and trim
  let sanitized = input.replace(/<[^>]*>/g, '')
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  return sanitized.trim().slice(0, 1000)
}

/**
 * API Route: POST /api/projects
 *
 * Create a new project for the authenticated user.
 * Enforces free tier limit (3 active projects).
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
    const { name, project_type } = body

    // Validate and sanitize input
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Project name is required', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    const sanitizedName = sanitizeInput(name)

    if (sanitizedName.length === 0) {
      return NextResponse.json(
        { error: 'Project name cannot be empty', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    if (sanitizedName.length < 3) {
      return NextResponse.json(
        { error: 'Project name must be at least 3 characters', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    if (sanitizedName.length > 100) {
      return NextResponse.json(
        { error: 'Project name must be 100 characters or less', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    // Validate project type
    const validTypes = ['saas', 'api', 'internal_tool', 'mobile', 'landing_page', 'other']
    if (!project_type || typeof project_type !== 'string' || !validTypes.includes(project_type)) {
      return NextResponse.json(
        { error: 'Invalid project type', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    // Check free tier limit (3 active projects)
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    if (profile?.plan === 'free') {
      const { count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .is('deleted_at', null)

      if (count !== null && count >= 3) {
        return NextResponse.json(
          {
            error: 'Free tier limit reached. Upgrade to Pro for unlimited projects.',
            code: 'FREE_TIER_LIMIT',
          },
          { status: 402 }
        )
      }
    }

    // Create project with sanitized name
    const { data: project, error: createError } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: sanitizedName,
        project_type,
        status: 'in_progress',
        interview_data: {},
      })
      .select()
      .single()

    if (createError) {
      console.error('Project creation error:', createError)
      return NextResponse.json(
        { error: 'Failed to create project', code: 'CREATE_FAILED' },
        { status: 500 }
      )
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Unexpected error in POST /api/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}

/**
 * API Route: GET /api/projects
 *
 * List all active projects for the authenticated user.
 * Soft-deleted projects are automatically excluded by RLS.
 */
export async function GET() {
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

    // Fetch projects (RLS automatically filters by user_id and deleted_at IS NULL)
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, name, status, project_type, created_at, updated_at')
      .order('updated_at', { ascending: false })

    if (fetchError) {
      console.error('Projects fetch error:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch projects', code: 'FETCH_FAILED' },
        { status: 500 }
      )
    }

    return NextResponse.json({ projects: projects || [] })
  } catch (error) {
    console.error('Unexpected error in GET /api/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
