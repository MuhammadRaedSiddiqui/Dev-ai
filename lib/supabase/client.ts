import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for browser/client-side usage
 *
 * This client uses the anon key and respects RLS policies.
 * User authentication is handled via Supabase Auth cookies.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
