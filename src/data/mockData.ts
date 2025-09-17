import type { ProjectItem, ServiceItem, TestimonialItem, BlogPost, NavItem } from '../types';

export const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '#home',
    children: [
      { label: 'Home Interior', href: '#' },
      { label: 'Home Architecture', href: '#' },
      { label: 'Home Minimalist', href: '#' },
      { label: 'Home Real Estate', href: '#' },
    ]
  },
  {
    label: 'About',
    href: '#about',
    children: [
      { label: 'About Style 1', href: '#' },
      { label: 'About Style 2', href: '#' },
    ]
  },
  {
    label: 'Services',
    href: '#services',
    children: [
      { label: 'Services', href: '#services' },
      { label: 'Service Details', href: '#' },
    ]
  },
  {
    label: 'Projects',
    href: '#projects',
    children: [
      { label: 'Project Gallery', href: '#projects' },
      { label: 'Project Details', href: '#' },
    ]
  },
  {
    label: 'Pages',
    href: '#',
    children: [
      { label: 'Team', href: '#team' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Blog', href: '#blog' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'FAQ', href: '#faq' },
    ]
  },
  { label: 'Contact', href: '#contact' },
];

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Modern Villa Design',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A stunning modern villa featuring clean lines, large windows, and sustainable materials.',
    year: '2024',
    location: 'Beverly Hills, CA',
    size: '4,200 sq ft',
  },
  {
    id: 2,
    title: 'Luxury Apartment Interior',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant interior design combining contemporary aesthetics with comfort and functionality.',
    year: '2024',
    location: 'Manhattan, NY',
    size: '2,800 sq ft',
  },
  {
    id: 3,
    title: 'Commercial Office Space',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A productive and inspiring workspace designed to enhance collaboration and creativity.',
    year: '2023',
    location: 'San Francisco, CA',
    size: '8,500 sq ft',
  },
  {
    id: 4,
    title: 'Minimalist Loft',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A minimalist approach to urban living with emphasis on space, light, and simplicity.',
    year: '2023',
    location: 'Brooklyn, NY',
    size: '1,900 sq ft',
  },
  {
    id: 5,
    title: 'Contemporary Restaurant',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'An atmospheric dining space that creates memorable experiences through thoughtful design.',
    year: '2024',
    location: 'Chicago, IL',
    size: '3,200 sq ft',
  },
  {
    id: 6,
    title: 'Sustainable Family Home',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Eco-friendly family home incorporating renewable energy and natural materials.',
    year: '2023',
    location: 'Portland, OR',
    size: '3,800 sq ft',
  },
];

export const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Architecture Design',
    description: 'Complete architectural services from concept to construction, creating innovative and functional spaces.',
    icon: 'Building',
    features: [
      'Conceptual Design',
      'Detailed Drawings',
      'Building Permits',
      'Construction Administration',
    ],
  },
  {
    id: 2,
    title: 'Interior Design',
    description: 'Transform your spaces with our expert interior design services that blend style and functionality.',
    icon: 'Home',
    features: [
      'Space Planning',
      'Color Consultation',
      'Furniture Selection',
      'Custom Millwork',
    ],
  },
  {
    id: 3,
    title: 'Project Management',
    description: 'Comprehensive project management ensuring your vision is realized on time and within budget.',
    icon: 'Users',
    features: [
      'Timeline Management',
      'Budget Control',
      'Quality Assurance',
      'Vendor Coordination',
    ],
  },
  {
    id: 4,
    title: 'Consultation Services',
    description: 'Expert guidance and consultation for all your architectural and design needs.',
    icon: 'MessageCircle',
    features: [
      'Design Review',
      'Code Compliance',
      'Feasibility Studies',
      'Expert Advice',
    ],
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'Tech Innovations Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'Faren transformed our office space into something truly remarkable. The attention to detail and understanding of our needs was exceptional.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Homeowner',
    company: 'Private Client',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'The team at Faren exceeded all our expectations. Our new home is a perfect blend of modern design and comfortable living.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Restaurant Owner',
    company: 'Bella Vista Restaurant',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'Our restaurant design perfectly captures our vision and has significantly improved our customer experience. Highly recommended!',
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Sustainable Architecture',
    excerpt: 'Exploring innovative approaches to eco-friendly building design and sustainable construction practices.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '2024-01-15',
    author: 'David Kim',
    category: 'Architecture',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Minimalist Interior Design Trends 2024',
    excerpt: 'Discover the latest trends in minimalist design and how to create serene, functional living spaces.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '2024-01-10',
    author: 'Lisa Zhang',
    category: 'Interior Design',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Creating Productive Workspace Environments',
    excerpt: 'Learn how thoughtful design can boost productivity and employee satisfaction in office environments.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '2024-01-05',
    author: 'John Smith',
    category: 'Commercial Design',
    readTime: '6 min read',
  },
];