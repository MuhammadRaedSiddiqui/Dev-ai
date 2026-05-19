'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SideNavBar } from '@/components/stitch/organisms/SideNavBar'
import { ProjectCard } from '@/components/stitch/molecules/ProjectCard'
import { Button } from '@/components/stitch/atoms/Button'
import { Icon } from '@/components/stitch/atoms/Icon'
import { DashboardSkeleton } from '@/components/stitch/atoms/Skeleton'
import { useToast } from '@/components/stitch/organisms/ToastProvider'

interface Project {
  id: string
  name: string
  project_type: string
  status: 'in_progress' | 'complete' | 'archived'
  interview_data: any
  updated_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenProject = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (project?.status === 'complete') {
      router.push(`/project/${id}/review`)
    } else {
      router.push(`/project/${id}/interview`)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove from UI
        const deletedProject = projects.find((p) => p.id === id)
        setProjects(projects.filter((p) => p.id !== id))

        // Show undo toast
        showToast({
          message: 'Project deleted',
          type: 'success',
          duration: 5000,
          action: {
            label: 'Undo',
            onClick: async () => {
              // Restore project
              await fetch(`/api/projects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deleted_at: null }),
              })
              fetchProjects()
              showToast({
                message: 'Project restored',
                type: 'success',
              })
            },
          },
        })
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      showToast({
        message: 'Failed to delete project',
        type: 'error',
      })
    }
  }

  const handleNewProject = () => {
    router.push('/onboarding')
  }

  const formatUpdatedAt = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Updated just now'
    if (diffHours < 24) return `Updated ${diffHours}h ago`
    if (diffDays < 7) return `Updated ${diffDays}d ago`
    return `Updated ${date.toLocaleDateString()}`
  }

  const getProjectDescription = (project: Project) => {
    // Extract description from interview data or use default
    return (
      project.interview_data?.description ||
      `${project.project_type} project documentation in progress`
    )
  }

  return (
    <div className="bg-stitch-background text-stitch-ink-black font-stitch-body-md antialiased min-h-screen flex">
      <SideNavBar
        currentPath="/dashboard"
        onNewProject={handleNewProject}
      />

      {/* Main Content Canvas */}
      <main className="ml-64 flex-1 p-stitch-section-xl max-w-stitch-container-max mx-auto">
        {/* Header Area */}
        <header className="flex justify-between items-end mb-stitch-gap-lg border-b border-stitch-parchment pb-stitch-gap-md">
          <div>
            <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black tracking-tight">
              Your Projects
            </h1>
            <p className="font-stitch-body-lg text-stitch-body-lg text-stitch-stone mt-2 max-w-2xl">
              Manage your active documentation repositories and editorial drafts.
            </p>
          </div>
        </header>

        {/* Projects Grid */}
        {loading ? (
          <DashboardSkeleton />
        ) : projects.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-stitch-secondary-fixed/30 rounded-full flex items-center justify-center mb-4">
              <Icon name="post_add" size="xl" className="text-stitch-terra-cotta" />
            </div>
            <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mb-2">
              No projects yet
            </h3>
            <p className="font-stitch-body-md text-stitch-body-md text-stitch-stone max-w-md mb-6">
              Initialize a new academic structure for your documentation. Start by creating your first project.
            </p>
            <Button variant="primary" size="md" onClick={handleNewProject}>
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stitch-gap-md">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                type={project.project_type}
                status={project.status}
                description={getProjectDescription(project)}
                updatedAt={formatUpdatedAt(project.updated_at)}
                onOpen={handleOpenProject}
                onDelete={handleDeleteProject}
              />
            ))}

            {/* Create New Card */}
            <button
              onClick={handleNewProject}
              className="bg-stitch-surface-container border border-dashed border-stitch-outline-variant p-stitch-gap-md flex flex-col items-center justify-center min-h-[220px] rounded-stitch-DEFAULT hover:bg-stitch-surface-container-high hover:border-stitch-outline transition-all duration-300 group text-center"
            >
              <div className="w-16 h-16 bg-stitch-secondary-fixed/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Icon name="post_add" size="xl" className="text-stitch-terra-cotta" />
              </div>
              <h3 className="font-stitch-h4 text-stitch-h4 text-stitch-ink-black mb-1">
                Create Project
              </h3>
              <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone max-w-[200px]">
                Initialize a new academic structure for your documentation.
              </p>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
