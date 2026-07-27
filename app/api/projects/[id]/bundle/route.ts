import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * API Route: GET /api/projects/[id]/bundle
 *
 * Retrieve the latest documentation bundle for a project
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Fetch latest bundle for this project (RLS enforces ownership via project)
    const { data: bundle, error: fetchError } = await supabase
      .from('documentation_bundles')
      .select('*')
      .eq('project_id', id)
      .order('version', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !bundle) {
      return NextResponse.json(
        { error: 'No bundle found for this project', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    return NextResponse.json(bundle)
  } catch (error) {
    console.error('Unexpected error in GET /api/projects/[id]/bundle:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}

/**
 * API Route: POST /api/projects/[id]/bundle
 *
 * Save or update documentation bundle for a project
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
    const { files, model_used } = body

    // Validate that all 10 files are present
    const requiredFiles = [
      'PLANNING.md',
      'ARCHITECTURE.md',
      'DATABASE.md',
      'API-CONTRACTS.md',
      'ENV-STRATEGY.md',
      'AUTH.md',
      'TESTING.md',
      'MONITORING.md',
      'FRONTEND.md',
      'DEPLOYMENT.md',
    ]

    const missingFiles = requiredFiles.filter((file) => !files[file])

    if (missingFiles.length > 0) {
      return NextResponse.json(
        {
          error: 'Incomplete bundle',
          code: 'INCOMPLETE_BUNDLE',
          missingFiles,
        },
        { status: 400 }
      )
    }

    // Check if bundle already exists
    const { data: existingBundle } = await supabase
      .from('documentation_bundles')
      .select('id, version')
      .eq('project_id', id)
      .order('version', { ascending: false })
      .limit(1)
      .single()

    let bundle

    if (existingBundle) {
      // Update existing bundle (increment version)
      const { data, error } = await supabase
        .from('documentation_bundles')
        .insert({
          project_id: id,
          version: existingBundle.version + 1,
          files,
          model_used: model_used || 'claude-sonnet-4-6',
        })
        .select()
        .single()

      if (error) {
        console.error('Bundle update error:', error)
        return NextResponse.json(
          { error: 'Failed to update bundle', code: 'UPDATE_FAILED' },
          { status: 500 }
        )
      }

      bundle = data
    } else {
      // Create new bundle
      const { data, error } = await supabase
        .from('documentation_bundles')
        .insert({
          project_id: id,
          version: 1,
          files,
          model_used: model_used || 'claude-sonnet-4-6',
        })
        .select()
        .single()

      if (error) {
        console.error('Bundle creation error:', error)
        return NextResponse.json(
          { error: 'Failed to create bundle', code: 'CREATE_FAILED' },
          { status: 500 }
        )
      }

      bundle = data
    }

    return NextResponse.json(bundle, { status: existingBundle ? 200 : 201 })
  } catch (error) {
    console.error('Unexpected error in POST /api/projects/[id]/bundle:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
