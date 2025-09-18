import type { ProjectItem, ServiceItem, TestimonialItem, BlogPost, NavItem, ServicePackage, ServiceOption } from '../types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Residential Photography', href: '/services#residential' },
      { label: 'Commercial Photography', href: '/services#commercial' },
      { label: 'Virtual Tours', href: '/services#virtual-tours' },
      { label: 'Drone Photography', href: '/services#drone' },
    ]
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    children: [
      { label: 'Residential Homes', href: '/portfolio?category=residential' },
      { label: 'Commercial Properties', href: '/portfolio?category=commercial' },
      { label: 'Luxury Estates', href: '/portfolio?category=luxury' },
      { label: 'Interior Photography', href: '/portfolio?category=interior' },
    ]
  },
];

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Luxury Modern Estate',
    category: 'Luxury Homes',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Stunning architectural photography of a contemporary luxury estate with dramatic lighting and composition.',
    year: '2024',
    location: 'Beverly Hills, CA',
    size: '4,200 sq ft',
  },
  {
    id: 2,
    title: 'Elegant Penthouse Interior',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Professional interior photography showcasing high-end finishes and designer furnishings.',
    year: '2024',
    location: 'Manhattan, NY',
    size: '2,800 sq ft',
  },
  {
    id: 3,
    title: 'Corporate Headquarters',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Commercial real estate photography highlighting modern office spaces and architectural details.',
    year: '2023',
    location: 'San Francisco, CA',
    size: '25,000 sq ft',
  },
  {
    id: 4,
    title: 'Urban Loft Conversion',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Creative photography capturing the unique character and industrial charm of a converted loft.',
    year: '2023',
    location: 'Brooklyn, NY',
    size: '1,900 sq ft',
  },
  {
    id: 5,
    title: 'Boutique Hotel & Restaurant',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Hospitality photography showcasing ambiance, design details, and inviting atmosphere.',
    year: '2024',
    location: 'Chicago, IL',
    size: '8,500 sq ft',
  },
  {
    id: 6,
    title: 'Eco-Friendly Family Home',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Sustainable home photography emphasizing natural light, green features, and family living spaces.',
    year: '2023',
    location: 'Portland, OR',
    size: '3,800 sq ft',
  },
];

export const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Residential Photography',
    description: 'Professional real estate photography that showcases homes in their best light, driving faster sales.',
    icon: 'Home',
    features: [
      'High-Resolution Images',
      'Natural Light Optimization',
      'Wide-Angle Compositions',
      '24-Hour Turnaround',
    ],
  },
  {
    id: 2,
    title: 'Commercial Photography',
    description: 'Capture the professional appeal of commercial properties with expert lighting and composition.',
    icon: 'Building',
    features: [
      'Office Buildings',
      'Retail Spaces',
      'Industrial Properties',
      'Hospitality Venues',
    ],
  },
  {
    id: 3,
    title: 'Drone Photography',
    description: 'Aerial photography and videography that provides stunning perspectives and comprehensive property views.',
    icon: 'Camera',
    features: [
      '4K Aerial Video',
      'High-Res Aerial Stills',
      'Property Boundaries',
      'Neighborhood Context',
    ],
  },
  {
    id: 4,
    title: 'Virtual Tours',
    description: 'Interactive 360° virtual tours that allow buyers to explore properties from anywhere.',
    icon: 'Eye',
    features: [
      'Matterport 3D Tours',
      'Interactive Floor Plans',
      'Immersive Experience',
      'Mobile Optimized',
    ],
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: 'Sarah Martinez',
    position: 'Real Estate Agent',
    company: 'Premium Properties Group',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'Since partnering with Marcos, my listings get 3x more online views and sell 40% faster. His photography transforms ordinary properties into must-see homes that buyers fall in love with online.',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Thompson',
    position: 'Property Developer',
    company: 'Metro Development LLC',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'Marcos\'s virtual tours have revolutionized my sales process. Buyers arrive pre-qualified and ready to make offers. I\'ve closed 3 deals this month where buyers saw the virtual tour first.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Jennifer Collins',
    position: 'Luxury Home Specialist',
    company: 'Elite Estates Realty',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'My luxury listings now command premium prices thanks to Marcos\'s photography. The twilight shots and aerial views justify higher asking prices and attract serious buyers immediately.',
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Tips for Perfect Real Estate Photography',
    excerpt: 'Master the art of real estate photography with these essential techniques for capturing stunning property images.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '2024-01-15',
    author: 'Alex Rivera',
    category: 'Photography Tips',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Lighting Techniques for Interior Photography',
    excerpt: 'Learn how to work with natural and artificial light to create compelling interior photographs that sell properties.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '2024-01-10',
    author: 'Alex Rivera',
    category: 'Photography Tips',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Drone Photography for Real Estate Success',
    excerpt: 'Discover how aerial photography can showcase properties from unique perspectives and attract more buyers.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '2024-01-05',
    author: 'Alex Rivera',
    category: 'Aerial Photography',
    readTime: '6 min read',
  },
];

export const servicePackages: ServicePackage[] = [
  {
    id: 'basic-photography',
    name: 'Basic Photography',
    description: 'Professional interior and exterior photos perfect for standard listings',
    basePrice: 1200,
    features: [
      '15-25 high-resolution photos',
      'Interior and exterior shots',
      'Basic editing and color correction',
      '24-hour delivery',
      'Online gallery'
    ],
    icon: 'Camera'
  },
  {
    id: 'premium-photography',
    name: 'Premium Photography',
    description: 'Enhanced photography package with twilight and detail shots',
    basePrice: 1800,
    features: [
      '25-35 high-resolution photos',
      'Interior, exterior & twilight shots',
      'Advanced editing and HDR processing',
      'Detail and lifestyle shots',
      '12-hour delivery',
      'Online gallery with sharing options'
    ],
    icon: 'Camera'
  },
  {
    id: 'drone-photography',
    name: 'Drone Photography',
    description: 'Aerial photography showcasing property from unique perspectives',
    basePrice: 800,
    features: [
      '10-15 aerial photos',
      '4K aerial video (2-3 minutes)',
      'Multiple angles and heights',
      'Weather-dependent scheduling',
      'Licensed drone operator'
    ],
    icon: 'Plane'
  },
  {
    id: 'virtual-tour',
    name: 'Virtual Tour Package',
    description: 'Interactive 360° virtual tour with floor plan integration',
    basePrice: 2500,
    features: [
      'Matterport 3D virtual tour',
      'Interactive floor plan',
      'Measurements and room labels',
      'Branded tour interface',
      'Hosted for 12 months'
    ],
    icon: 'Eye'
  },
  {
    id: 'complete-package',
    name: 'Complete Marketing Package',
    description: 'All services combined for maximum property exposure',
    basePrice: 3500,
    features: [
      'Premium photography (30+ photos)',
      'Drone photography and video',
      'Matterport virtual tour',
      'Twilight photography',
      'Social media ready content',
      'Same-day delivery available'
    ],
    icon: 'Package'
  }
];

export const serviceOptions: ServiceOption[] = [
  {
    id: 'garagePhotos',
    name: 'Garage Photos',
    description: 'Include interior garage photography',
    price: 200,
    type: 'boolean'
  },
  {
    id: 'basementPhotos',
    name: 'Basement Photos',
    description: 'Include basement/cellar photography',
    price: 200,
    type: 'boolean'
  }
];