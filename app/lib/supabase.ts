// Supabase connection for the KRAVYADA project.
// The URL and the publishable key are public by design (they ship to every browser);
// what protects the data is Row Level Security in the database, not secrecy of these values.
export const SUPABASE_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zpvxrpshwxcbnedqpppr.supabase.co'
).replace(/\/+$/, '')

export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_NntD9DFZIL9Djn_mI_wIXw_ICgB2qJ6'

export const REST = `${SUPABASE_URL}/rest/v1`
export const AUTH = `${SUPABASE_URL}/auth/v1`
