import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * API Route: POST /api/session/init
 *
 * Returns the system prompt for initializing an AI interview session.
 * The system prompt is read from DEVDOCS_SYSTEM_PROMPT env var (server-side only).
 *
 * SECURITY: The system prompt is transmitted to the authenticated user's browser
 * for client-side Anthropic API calls. It is NOT stored client-side beyond the
 * in-memory lifetime of the interview session.
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
    const { projectId } = body

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    // Verify project belongs to user
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, project_type')
      .eq('id', projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Get system prompt from environment variable
    const systemPrompt = process.env.DEVDOCS_SYSTEM_PROMPT

    if (!systemPrompt) {
      console.error('DEVDOCS_SYSTEM_PROMPT environment variable not set')
      return NextResponse.json(
        { error: 'System prompt not configured', code: 'CONFIG_ERROR' },
        { status: 500 }
      )
    }

    // Return session initialization data
    return NextResponse.json({
      systemPrompt,
      model: 'claude-sonnet-4-6',
      projectType: project.project_type,
    })
  } catch (error) {
    console.error('Session init error:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
