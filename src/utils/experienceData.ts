export interface ExperienceItem {
  id: string;
  type: 'work' | 'education' | 'project' | 'internship';
  title: string;
  company: string;
  location: string;
  duration: string;
  current?: boolean;
  description: string[];
  skills: string[];
  achievements?: string[];
  link?: string;
  companyUrl?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: '1',
    type: 'work',
    title: 'Cashier',
    company: 'DMart - Avenue Supermarts Ltd',
    location: 'Raipur, Chhattisgarh, India · On-site',
    duration: 'Sep 2022 - Mar 2023',
    current: false,
    description: [
      'Efficiently processed customer transactions and handled payment operations',
      'Provided excellent customer service and maintained positive customer relationships',
      'Maintained accurate cash handling and ensured smooth checkout operations',
      'Contributed to creating positive shopping experiences for customers',
      'Worked collaboratively in fast-paced retail environment',
      'Developed strong interpersonal and communication skills'
    ],
    skills: ['Customer Relationship Management (CRM)', 'Customer Service', 'Cash Handling', 'Point of Sale (POS)', 'Team Collaboration', 'Communication Skills'],
    achievements: [
      'Maintained accurate transaction records with zero discrepancies',
      'Consistently received positive customer feedback for service quality',
      'Contributed to smooth daily operations and team efficiency',
      'Developed strong work ethic and professional customer interaction skills'
    ],
    companyUrl: 'https://www.dmart.in/'
  },
  // {
  //   id: '2',
  //   type: 'project',
  //   title: 'Contributor',
  //   company: 'GirlScript Summer of Code',
  //   location: 'India · Remote',
  //   duration: 'Jul 2025 - Present',
  //   current: false,
  //   description: [
  //     'Contributing to open-source projects as part of GirlScript Summer of Code',
  //     'One of India\'s largest open-source programs fostering developer community growth',
  //     'Working on various projects to enhance coding skills and technical expertise',
  //     'Collaborating with developers across India on meaningful open-source contributions',
  //     'Participating in mentorship programs and code reviews'
  //   ],
  //   skills: ['MERN Stack', 'GitHub', 'Open Source', 'React.js', 'Node.js', 'JavaScript'],
  //   achievements: [
  //     'Selected as contributor in competitive open-source program',
  //     'Active participation in community-driven development projects',
  //     'Contributing to projects with significant impact on developer community'
  //   ],
  //   link: 'https://gssoc.girlscript.tech/',
  //   companyUrl: 'https://www.girlscript.tech/'
  // },
  // {
  //   id: '2',
  //   type: 'work',
  //   title: 'Full Stack Web Developer',
  //   company: 'Freelancer.com',
  //   location: 'Raipur, Chhattisgarh, India · Hybrid',
  //   duration: 'Jun 2023 - Present',
  //   current: true,
  //   description: [
  //     'Specializing in building responsive, user-centric web applications from front to back',
  //     'Developing and maintaining full-fledged web applications using React.js, Next.js, Node.js, and MongoDB',
  //     'Integrating Generative AI APIs to create intelligent, interactive user experiences',
  //     'Exploring and implementing Blockchain technology for secure and decentralized solutions',
  //     'Working on RESTful APIs, JWT authentication, and cloud-based deployment (Vercel, Render, etc.)',
  //     'Building mobile-responsive, accessible UIs using Bootstrap and Tailwind CSS',
  //     'Collaborating with version control tools like Git and project management platforms',
  //     'Passionate about learning and applying emerging technologies to solve real-world problems'
  //   ],
  //   skills: ['MERN Stack', 'Next.js', 'React.js', 'Node.js', 'MongoDB', 'Generative AI', 'Blockchain', 'RESTful APIs', 'JWT Authentication', 'Tailwind CSS', 'Bootstrap', 'Vercel', 'Git'],
  //   achievements: [
  //     'Built innovative, scalable web solutions for diverse client requirements',
  //     'Successfully integrated AI technologies into web applications',
  //     'Delivered projects with creative problem-solving and continuous learning approach',
  //     'Maintained high client satisfaction through quality deliverables',
  //     'Expertise in modern deployment and cloud technologies'
  //   ],
  //   link: 'https://www.freelancer.com/',
  //   companyUrl: 'https://www.freelancer.com/'
  // },
  {
    id: '2',
    type: 'internship',
    title: 'Software Developer',
    company: 'Bhilai Steel Plant - SAIL',
    location: 'Bhilai, Chhattisgarh, India · Hybrid',
    duration: 'Dec 2025 - Mar 2026',
    current: false,
    description: [
      'Developed a full-stack web application to digitize and optimize steel plate rake dispatch planning, replacing manual Excel-based workflows with a centralized dashboard',
      'Built frontend using React + TypeScript and backend using FastAPI + Python',
      'Processed large datasets with data cleansing, filtering, and automated logistics calculations',
      'Developed interactive KPIs, charts, consignee summaries, and destination × thickness analysis',
      'Implemented JWT-based role authentication with Admin, PMGM, CITGM & Viewer roles',
      'Integrated upstream APIs with caching for near real-time order data',
      'Added CSV export for operational reporting',
      'Reduced dispatch planning time from ~45 minutes to under 5 minutes, significantly improving operational efficiency and decision-making',

      // old
      // 'Developed "BSP Rake Planning System", a full-stack application digitizing steel plate logistics and rake dispatch planning, replacing manual Excel workflows.',
      // 'Architected scalable frontend using React (TypeScript) and backend with FastAPI (Python), featuring a centralized browser-accessible dashboard.',
      // 'Implemented complex data processing for large steel order datasets, including automated calculation of loadable material and wagon requirements.',
      // 'Built interactive dashboards with multi-dimensional filtering (destination, quality, region) for deep operational analysis.',
      // 'Developed dynamic data visualizations (Bar, Pie, Treemaps) and Operational Matrices (Destination × Thickness) for logistics tracking.',
      // 'Integrated secure JWT-based Role-Based Access Control (Admin, PMGM, CITGM, Viewer) and automated CSV export functionality.',
      // 'Leveraged upstream API integration with caching to ensure real-time data availability while eliminating manual data handling.'
    ],
    skills: ['React', 'TypeScript', 'FastAPI', 'Python', 'JWT', 'Data Visualization', 'Full-Stack Development', 'Logistics Optimization'],
    achievements: [
      'Reduced dispatch planning time by 90% (from 45 minutes to under 5 minutes)',
      'Improved cross-departmental visibility and decision-making through centralized, automated data access',
      'Digitized legacy Excel-based workflows into a scalable, browser-accessible enterprise solution'
    ],
    companyUrl: 'https://www.sail.co.in/en/plant/bhilai-steel-plant'
  },
  {
    id: '3',
    type: 'internship',
    title: 'Full Stack / Backend Engineer',
    company: 'Emilo Ventures Pvt. Ltd.',
    location: 'Raipur, Chhattisgarh, India · On-site',
    duration: 'Feb 2026 - Aug 2026',
    current: false,
    description: [
      'Worked on scalable backend systems and event-driven microservices for a high-traffic platform.',
      'Built Node.js microservices using NATS JetStream, BullMQ & Redis for asynchronous processing and real-time messaging',
      'Developed multi-channel notification systems supporting Push, WebSockets, Email & SMS with dynamic templates',
      'Designed scalable KYC and contest settlement workflows handling 100K+ users with secure audit trails',
      'Built analytics and geolocation systems for user engagement, MAU, retention, and personalized content',
      'Integrated AWS S3 & Cloudflare R2 for media storage, video processing, and CDN delivery',
      'Integrated RAG-based AI tools and automated content moderation for administrative workflows',
    ],
    skills: ['React', 'TypeScript', 'Node.js' , 'PHP', 'Laravel', 'MongoDB', 'SQL', 'Full-Stack Development'],
    achievements: [
      'Learned about Microservices Architecture',
      'Understand workers usecase',
      'Caching',
      'High Traffic Architecture'
    ],
    companyUrl: 'https://www.emilo.in/'
  },

  {
    id: '4',
    type: 'work',
    title: 'Software Developer Engineer (SDE) - Full Stack',
    company: 'GimBooks - CodeNicely',
    location: 'Raipur, Chhattisgarh, India · On-site',
    duration: 'Sep 2026 - Present',
    current: true,
    description: [
      'Working as a Software Engineer at CodeNicely, contributing to GimBooks, a business management and accounting platform.',
    ],
    skills: ['Django', 'Vue.js', 'Nuxt', 'MySql'],
    achievements: [
      'Working as Full Stack Software Engineer'
    ],
    companyUrl: 'https://www.gimbooks.com/'
  },


];

// Instructions for customizing:
/*
1. Replace the template data above with your actual LinkedIn experience
2. Update company names, positions, dates, and descriptions
3. Add or remove entries based on your experience
4. Update skills arrays with technologies you've actually used
5. Add real achievements and metrics where possible
6. Include links to relevant projects or companies when appropriate

To add LinkedIn data:
1. Go to your LinkedIn profile: https://www.linkedin.com/in/girdhar-agrawal-124346220/
2. Copy information from each experience section
3. Replace the template entries above with your real data
4. Make sure to include:
   - Exact job titles and company names
   - Accurate dates (start and end)
   - Detailed descriptions of your work
   - Skills and technologies used
   - Quantifiable achievements when possible
*/
