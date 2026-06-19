import rawProjects from "./projects-full.json";
import { categories, type Category, type CategoryId } from "./project-meta";

export type { Category, CategoryId };
export { categories };

export interface Project {
  id: string;
  title: string;
  url: string;
  categoryId: CategoryId;
  type: string;
  summary: string;
  overview: string;
  highlights: string[];
  results: string[];
  image: string;
  developmentPeriod: string;
  languages: string[];
  frameworks: string[];
  scope: string;
  team: string;
}

export const projects: Project[] = rawProjects.map((project) => ({
  id: project.id,
  title: project.title,
  url: project.url,
  categoryId: project.industryId as CategoryId,
  type: project.projectType,
  summary: project.summary ?? project.overview,
  overview: project.overview,
  highlights: project.highlights,
  results: project.results,
  image: project.imageUrl,
  developmentPeriod: project.developmentPeriod,
  languages: project.languages,
  frameworks: project.frameworks,
  scope: project.role,
  team: project.teamSize,
}));

export function getProjectsByCategory(categoryId: CategoryId) {
  return projects.filter((project) => project.categoryId === categoryId);
}

export function getCategoryLabel(categoryId: CategoryId) {
  return categories.find((category) => category.id === categoryId)?.label ?? "";
}
