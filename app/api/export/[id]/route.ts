import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * API Route: GET /api/export/[id]
 *
 * Generate and stream a ZIP download of the documentation bundle.
 * The ZIP contains all 10 documentation files plus an auto-generated README.md
 * under a `docs/` directory.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const { buildZip } = await import('@/lib/export/zip')
    const { generateReadme } = await import('@/lib/export/readme')

    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
    }

    // Fetch project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, name, project_type, created_at')
      .eq('id', params.id)
      .single()

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Fetch latest bundle
    const { data: bundle, error: bundleError } = await supabase
      .from('documentation_bundles')
      .select('files, generated_at')
      .eq('project_id', params.id)
      .order('version', { ascending: false })
      .limit(1)
      .single()

    if (bundleError || !bundle) {
      return NextResponse.json(
        { error: 'No bundle found for this project', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Validate bundle has all required files
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

    const missingFiles = requiredFiles.filter((file) => !bundle.files[file])

    if (missingFiles.length > 0) {
      return NextResponse.json(
        {
          error: 'Bundle is incomplete',
          code: 'INCOMPLETE_BUNDLE',
          missingFiles,
        },
        { status: 409 }
      )
    }

    // Generate README.md
    const readmeContent = generateReadme({
      projectName: project.name,
      projectType: project.project_type,
      completionDate: bundle.generated_at,
    })

    // Build ZIP
    const zipBlob = await buildZip(bundle.files, readmeContent, project.name)

    // Convert blob to buffer for streaming
    const buffer = Buffer.from(await zipBlob.arrayBuffer())

    // Generate filename
    const date = new Date().toISOString().split('T')[0]
    const sanitizedName = project.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const filename = `devdocs-${sanitizedName}-${date}.zip`

    // Return ZIP as download
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Unexpected error in GET /api/export/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
