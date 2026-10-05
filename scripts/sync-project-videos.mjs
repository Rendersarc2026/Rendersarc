import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import pg from 'pg';

const videos = [
  {
    source: '/home/abin/Downloads/SELLA.mp4',
    slug: 'sella',
    filename: 'sella.mp4',
  },
  {
    source: '/home/abin/Downloads/backwater.mp4',
    slug: 'backwater',
    filename: 'backwater.mp4',
  },
  {
    source: '/home/abin/Downloads/kala.mp4',
    slug: 'kala-interiors',
    filename: 'kala-interiors.mp4',
  },
  {
    source: '/home/abin/Downloads/skei.mp4',
    slug: 'skeiland',
    filename: 'skeiland.mp4',
  },
  {
    source: '/home/abin/Downloads/shopify -areej alarab.mp4',
    slug: 'areej-alarab',
    filename: 'areej-alarab.mp4',
  },
  {
    source: '/home/abin/Downloads/tit -shopify.mp4',
    slug: 'tit',
    filename: 'tit.mp4',
  },
  {
    source: '/home/abin/Downloads/travel link uae-brand.mp4',
    slug: 'travel-link-uae',
    filename: 'travel-link-uae.mp4',
  },
  {
    source: '/home/abin/Downloads/wow gels -shopify.mp4',
    slug: 'wow-gel-nails',
    filename: 'wow-gel-nails.mp4',
  },
];

const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
const s3 = new S3Client({
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  region: process.env.SUPABASE_S3_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY,
  },
});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Ensure column exists in public.projects
await pool.query('alter table public.projects add column if not exists video text;');

console.log('Starting video optimization and upload...');

for (const { source, slug, filename } of videos) {
  const optimizedPath = `/tmp/work_videos_optimized/${filename}`;
  console.log(`\nOptimizing ${slug} from ${source}...`);
  
  // Encode with H.264, faststart for instant streaming, optimized bitrate
  execSync(
    `ffmpeg -y -i "${source}" -c:v libx264 -crf 22 -preset medium -c:a aac -b:a 128k -movflags +faststart "${optimizedPath}"`,
    { stdio: 'inherit' }
  );

  const key = `work/videos/${filename}`;
  console.log(`Uploading ${key} to bucket ${bucket}...`);
  const fileBuffer = await readFile(optimizedPath);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: 'video/mp4',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  console.log(`Uploaded ${key}. Updating database for slug ${slug}...`);
  await pool.query('update public.projects set video = $1 where slug = $2', [key, slug]);
  console.log(`Database updated: ${slug} -> ${key}`);
}

await pool.end();
console.log('\nAll videos successfully optimized, uploaded, and mapped in database!');
