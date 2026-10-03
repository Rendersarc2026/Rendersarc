import { cache } from 'react';
import { db } from '@/app/lib/db';
import { storageUrl } from '@/app/lib/storage';
import type { AppListing, CaseStudyContent, Project } from './work';

type ProjectRow = {
  slug: string;
  title: string;
  summary: string;
  url: string;
  hide_site_link: boolean;
  categories: string[];
  image: string | null;
  gallery: string[];
  apps: AppListing[] | null;
  case_study: CaseStudyContent | null;
};

function toProject(row: ProjectRow): Project {
  const study = row.case_study;
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    url: row.url,
    hideSiteLink: row.hide_site_link || undefined,
    categories: row.categories,
    image: row.image ? storageUrl(row.image) : undefined,
    gallery: row.gallery.length ? row.gallery.map(storageUrl) : undefined,
    apps: row.apps ?? undefined,
    caseStudy: study
      ? { ...study, cover: study.cover ? storageUrl(study.cover) : undefined }
      : undefined,
  };
}

/** Every portfolio project in display order. Deduped within a render. */
export const getProjects = cache(async (): Promise<Project[]> => {
  const { rows } = await db.query<ProjectRow>(
    `select slug, title, summary, url, hide_site_link, categories, image, gallery, apps, case_study
       from public.projects
      order by position, slug`,
  );
  return rows.map(toProject);
});
