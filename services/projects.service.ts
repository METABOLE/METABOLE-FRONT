import { ProjectType } from '@/types';
import { ParsedUrlQuery } from 'querystring';

const projects = [
  // {
  //   image: 'image-1.jpg',
  //   title: 'Swile',
  //   year: '2021',
  //   tags: ['Website', 'Photography', '3D'],
  // },
  // {
  //   image: 'image-2.jpg',
  //   year: '2020',
  //   title: 'Molotov',
  //   tags: ['Motion design', '3D'],
  // },
  // {
  //   image: 'image-3.jpg',
  //   year: '2020',
  //   title: 'Actility',
  //   tags: ['Website', 'Photography'],
  // },
  // {
  //   image: 'image-4.jpg',
  //   year: '2020',
  //   title: 'Lemonway',
  //   tags: ['Website', 'Photography'],
  // },
  // {
  //   image: 'image-5.jpg',
  //   year: '2020',
  //   title: 'Swile',
  //   tags: ['Website', 'Photography', '3D'],
  // },
  // {
  //   image: 'image-6.jpg',
  //   year: '2020',
  //   title: 'Molotov2',
  //   tags: ['Motion design', '3D'],
  // },
] as ProjectType[];

export const fetchPaths = async () => {
  const paths = projects.map((project: ProjectType) => ({
    slug: project.title,
  }));

  return paths;
};

export const fetchProjects = async () => {
  return projects;
};

export const fetchSingleProject = async (params: ParsedUrlQuery | undefined) => {
  if (!params?.project) return undefined;

  return projects.find(
    (project) => project.title.toLowerCase() === params.project?.toString().toLowerCase(),
  );
};
