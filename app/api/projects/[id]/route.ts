import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * API Route: GET /api/projects/[id]
 *
 * Retrieve a single project including interview_data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Fetch project (RLS enforces ownership)
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError || !project) {
      return NextResponse.json(
        { error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Unexpected error in GET /api/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}

/**
 * API Route: PATCH /api/projects/[id]
 *
 * Update project (name, status, or interview_data)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { name, status, interview_data } = body

    // Build update object
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (name !== undefined) updates.name = name
    if (status !== undefined) updates.status = status
    if (interview_data !== undefined) updates.interview_data = interview_data

    // Update project (RLS enforces ownership)
    const { data: project, error: updateError } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (updateError || !project) {
      return NextResponse.json(
        { error: 'Failed to update project', code: 'UPDATE_FAILED' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Unexpected error in PATCH /api/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}

/**
 * API Route: DELETE /api/projects/[id]
 *
 * Soft-delete a project (sets deleted_at)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Soft delete (set deleted_at)
    const { error: deleteError } = await supabase
      .from('projects')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', params.id)

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to delete project', code: 'DELETE_FAILED' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      deleted_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Unexpected error in DELETE /api/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
