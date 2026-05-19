'use client'

import { cn } from '@/lib/utils'
import { Avatar } from '../atoms/Avatar'
import { Button } from '../atoms/Button'
import { NavLink } from '../molecules/NavLink'

export interface SideNavBarProps {
  projectName?: string
  projectVersion?: string
  projectImage?: string
  currentPath?: string
  onNewProject?: () => void
  className?: string
}

export function SideNavBar({
  projectName = 'Project Alpha',
  projectVersion = 'V1.0.4',
  projectImage,
  currentPath = '/dashboard',
  onNewProject,
  className,
}: SideNavBarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen w-64 bg-stitch-vellum-white border-r border-stitch-parchment flex flex-col py-stitch-section-xl px-stitch-gap-xs z-20',
        className
      )}
    >
      {/* Header */}
      <div className="px-3 mb-stitch-gap-lg flex items-center gap-3">
        <Avatar src={projectImage} size="md" fallback="PA" />
        <div>
          <h2 className="font-stitch-display text-stitch-h4 text-stitch-ink-black">
            {projectName}
          </h2>
          <p className="font-stitch-caption text-stitch-caption text-stitch-stone mt-0.5">
            {projectVersion}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1">
        <NavLink
          href="/dashboard"
          icon="dashboard"
          active={currentPath === '/dashboard'}
        >
          Overview
        </NavLink>
        <NavLink
          href="/api-keys"
          icon="vpn_key"
          active={currentPath === '/api-keys'}
        >
          API Keys
        </NavLink>
        <NavLink
          href="/drafts"
          icon="description"
          active={currentPath === '/drafts'}
        >
          Drafts
        </NavLink>
        <NavLink
          href="/review"
          icon="rate_review"
          active={currentPath === '/review'}
        >
          Review
        </NavLink>
        <NavLink
          href="/settings"
          icon="settings"
          active={currentPath === '/settings'}
        >
          Settings
        </NavLink>
      </nav>

      {/* CTA */}
      <div className="px-3 mt-auto pt-stitch-gap-md border-t border-stitch-parchment">
        <Button
          variant="secondary"
          size="sm"
          icon="add"
          iconPosition="left"
          onClick={onNewProject}
          className="w-full uppercase"
        >
          New Project
        </Button>
      </div>
    </aside>
  )
}
