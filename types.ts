
export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  thumbnail: string;
  description: string;
  result: string;
}

export enum ProjectCategory {
  Explainer = 'Explainer Video',
  Brand = 'Brand Animation',
  ThreeD = '3D Animation',
  Cel = 'Cel Animation',
  Commercial = 'Commercial'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}
