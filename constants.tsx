
import { Project, ProjectCategory, Service, TeamMember, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Odyssey',
    client: 'CyberTech Dynamics',
    year: '2024',
    category: ProjectCategory.ThreeD,
    thumbnail: 'https://picsum.photos/seed/neo/800/600',
    description: 'A futuristic 3D journey through a digital cityscape.',
    result: 'Increased brand awareness by 45% in the tech sector.'
  },
  {
    id: '2',
    title: 'The Modern Banker',
    client: 'FinVibe',
    year: '2023',
    category: ProjectCategory.Explainer,
    thumbnail: 'https://picsum.photos/seed/bank/800/600',
    description: 'Making complex fintech simple through fluid motion design.',
    result: 'Onboarded 50k+ new users within the first month.'
  },
  {
    id: '3',
    title: 'Organic Flow',
    client: 'EcoLife',
    year: '2024',
    category: ProjectCategory.Cel,
    thumbnail: 'https://picsum.photos/seed/eco/800/600',
    description: 'Hand-drawn character animation celebrating sustainability.',
    result: 'Won Best Animation at the Green Media Awards.'
  },
  {
    id: '4',
    title: 'Velocity X',
    client: 'Speedsters Inc',
    year: '2024',
    category: ProjectCategory.Brand,
    thumbnail: 'https://picsum.photos/seed/vel/800/600',
    description: 'Dynamic visual identity refresh through animated storytelling.',
    result: 'Unified brand presence across 12 international markets.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'explainer',
    title: 'Explainer Videos',
    description: 'We distill complex ideas into clear, engaging visual narratives that stick.',
    icon: '💡',
    image: 'https://picsum.photos/seed/exp/600/400'
  },
  {
    id: 'brand',
    title: 'Brand Animation',
    description: 'Breathing life into your identity with motion that reflects your values.',
    icon: '✨',
    image: 'https://picsum.photos/seed/brand/600/400'
  },
  {
    id: '3d',
    title: '3D Animation',
    description: 'High-end CGI and immersive cinematic worlds. We specialize in photorealistic outputs, high-polygon modeling, and custom animation rigging for complex character movements. Our expertise spans detailed product visualizations, realistic architectural walkthroughs, and high-impact 3D assets for commercial advertisements and epic game trailers.',
    icon: '🧊',
    image: 'https://picsum.photos/seed/3d/600/400'
  },
  {
    id: '3d-env',
    title: '3D Environment Design',
    description: 'Creating immersive, cinematic worlds and architectural visualizations for films, games, and high-end commercials.',
    icon: '⛰️',
    image: 'https://picsum.photos/seed/env3d/600/400'
  },
  {
    id: 'cel',
    title: 'Cel Animation',
    description: 'Traditional, hand-drawn techniques for that unique, handcrafted soul.',
    icon: '🎨',
    image: 'https://picsum.photos/seed/cel/600/400'
  }
];

export const TEAM: TeamMember[] = [
  { name: 'Alex Rivera', role: 'Creative Director', image: 'https://picsum.photos/seed/alex/300/300' },
  { name: 'Sarah Chen', role: 'Head of 3D', image: 'https://picsum.photos/seed/sarah/300/300' },
  { name: 'Marcus Bell', role: 'Lead Motion Designer', image: 'https://picsum.photos/seed/marcus/300/300' },
  { name: 'Elena Frost', role: 'Art Director', image: 'https://picsum.photos/seed/elena/300/300' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of Motion Design in VR',
    excerpt: 'Exploring how immersive technologies are changing the way we tell stories.',
    date: 'Oct 12, 2024',
    image: 'https://picsum.photos/seed/vr/500/300'
  },
  {
    id: 'b2',
    title: 'Why Character Design Matters',
    excerpt: 'The psychological impact of character shapes and movements on audience empathy.',
    date: 'Sep 28, 2024',
    image: 'https://picsum.photos/seed/char/500/300'
  }
];

export const INDUSTRIES = [
  { name: 'Fintech', description: 'Simplifying data and complex monetary systems.', icon: '💳' },
  { name: 'Healthcare', description: 'Visualizing medical processes with precision.', icon: '🏥' },
  { name: 'Real Estate', description: 'Bringing architecture to life before it exists.', icon: '🏠' },
  { name: 'Education', description: 'Making learning interactive and fun.', icon: '🎓' }
];
