-- Migration: 002_create_projects.sql
-- Purpose: Create projects table with indexes
-- Date: 2026-05-07

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'complete', 'archived')),
  project_type TEXT NOT NULL CHECK (project_type IN ('saas', 'api', 'internal_tool', 'mobile', 'landing_page', 'other')),
  interview_data JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_user_deleted ON projects(user_id, deleted_at);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at DESC);

-- Add comments
COMMENT ON TABLE projects IS 'User projects - planning sessions with interview data';
COMMENT ON COLUMN projects.interview_data IS 'Full interview Q&A and state stored as JSONB';
COMMENT ON COLUMN projects.deleted_at IS 'Soft delete timestamp - NULL means not deleted';
