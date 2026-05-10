-- Migration: 003_create_bundles.sql
-- Purpose: Create documentation_bundles and share_links tables
-- Date: 2026-05-07

-- Create documentation_bundles table
CREATE TABLE IF NOT EXISTS documentation_bundles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  files JSONB NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  model_used TEXT NOT NULL DEFAULT 'claude-sonnet-4-6'
);

-- Create indexes for documentation_bundles
CREATE UNIQUE INDEX IF NOT EXISTS idx_bundles_project_version ON documentation_bundles(project_id, version);
CREATE INDEX IF NOT EXISTS idx_bundles_project_id ON documentation_bundles(project_id);

-- Create share_links table
CREATE TABLE IF NOT EXISTS share_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id UUID NOT NULL REFERENCES documentation_bundles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Create indexes for share_links
CREATE UNIQUE INDEX IF NOT EXISTS idx_share_links_token ON share_links(token);
CREATE INDEX IF NOT EXISTS idx_share_links_bundle_id ON share_links(bundle_id);

-- Add comments
COMMENT ON TABLE documentation_bundles IS '10-file documentation output generated from completed interviews';
COMMENT ON COLUMN documentation_bundles.files IS 'JSONB object keyed by filename with markdown content';
COMMENT ON TABLE share_links IS 'Read-only share tokens for documentation bundles';
COMMENT ON COLUMN share_links.expires_at IS 'Optional expiry - NULL means never expires (MVP default)';
