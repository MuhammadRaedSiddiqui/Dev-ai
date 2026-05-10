-- Migration: 004_rls_policies.sql
-- Purpose: Row Level Security policies for all tables
-- Date: 2026-05-07

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentation_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

-- Users can only read their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- PROJECTS POLICIES
-- ============================================================================

-- Users can only select their own non-deleted projects
CREATE POLICY "projects_select_own" ON projects
  FOR SELECT USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Users can insert their own projects
CREATE POLICY "projects_insert_own" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own projects
CREATE POLICY "projects_update_own" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

-- No DELETE policy - soft delete only via UPDATE

-- ============================================================================
-- DOCUMENTATION_BUNDLES POLICIES
-- ============================================================================

-- Users can read bundles for their own projects
CREATE POLICY "bundles_select_own" ON documentation_bundles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = documentation_bundles.project_id
        AND projects.user_id = auth.uid()
    )
  );

-- Users can insert bundles for their own projects
CREATE POLICY "bundles_insert_own" ON documentation_bundles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = documentation_bundles.project_id
        AND projects.user_id = auth.uid()
    )
  );

-- Users can update bundles for their own projects
CREATE POLICY "bundles_update_own" ON documentation_bundles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = documentation_bundles.project_id
        AND projects.user_id = auth.uid()
    )
  );

-- Allow read access via valid share token (for unauthenticated share view)
CREATE POLICY "bundles_select_via_share" ON documentation_bundles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM share_links
      WHERE share_links.bundle_id = documentation_bundles.id
        AND (share_links.expires_at IS NULL OR share_links.expires_at > NOW())
    )
  );

-- ============================================================================
-- SHARE_LINKS POLICIES
-- ============================================================================

-- Anyone (including unauthenticated) can read share links by token
CREATE POLICY "share_links_select_by_token" ON share_links
  FOR SELECT USING (true);

-- Only authenticated users can create share links for their own bundles
CREATE POLICY "share_links_insert_own" ON share_links
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM documentation_bundles b
      JOIN projects p ON p.id = b.project_id
      WHERE b.id = share_links.bundle_id
        AND p.user_id = auth.uid()
    )
  );

-- Users can delete their own share links
CREATE POLICY "share_links_delete_own" ON share_links
  FOR DELETE USING (auth.uid() = created_by);
