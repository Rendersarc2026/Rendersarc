/**
 * Public URL of an object in the Supabase Storage bucket, e.g. 'work/sella.png'.
 * Uses NEXT_PUBLIC_ vars so client components can build URLs too.
 */
export function storageUrl(key: string) {
  const bucket = encodeURIComponent(process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? '');
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${key}`;
}
