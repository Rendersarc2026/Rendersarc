// Uploads a folder of images/videos to the Supabase Storage bucket under a key
// prefix, keeping each file's path inside the folder:
//
//   npm run upload -- ~/shots work/gallery     # ~/shots/sella-1.jpg -> work/gallery/sella-1.jpg
//   npm run upload -- ~/clips videos           # ~/clips/campaigns.mp4 -> videos/campaigns.mp4
//
// Existing objects with the same key are overwritten.
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const env = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} — run with --env-file=.env.local`);
  return value;
};

const [dirArg, prefixArg] = process.argv.slice(2);
if (!dirArg || !prefixArg) {
  console.error('Usage: npm run upload -- <folder> <bucket prefix>, e.g. ~/shots work/gallery');
  process.exit(1);
}
const dir = resolve(dirArg);
const prefix = prefixArg.replace(/^\/+|\/+$/g, '');
const bucket = env('NEXT_PUBLIC_SUPABASE_BUCKET');
const s3 = new S3Client({
  endpoint: env('SUPABASE_S3_ENDPOINT'),
  region: env('SUPABASE_S3_REGION'),
  forcePathStyle: true,
  credentials: {
    accessKeyId: env('SUPABASE_S3_ACCESS_KEY_ID'),
    secretAccessKey: env('SUPABASE_S3_SECRET_ACCESS_KEY'),
  },
});

const files = (await readdir(dir, { recursive: true })).filter(
  (f) => TYPES[extname(f).toLowerCase()],
);

for (const file of files) {
  const key = `${prefix}/${relative(dir, join(dir, file)).split('\\').join('/')}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: await readFile(join(dir, file)),
      ContentType: TYPES[extname(file).toLowerCase()],
      // Short enough that a re-uploaded file under the same key shows up the same day.
      CacheControl: 'public, max-age=3600',
    }),
  );
  console.log(`uploaded ${key}`);
}
console.log(`${files.length} file(s) -> ${bucket}`);
