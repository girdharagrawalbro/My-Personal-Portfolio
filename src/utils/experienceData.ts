export interface ExperienceItem {
  id: string;
  type: 'work' | 'education' | 'project';
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
    type: 'project',
    title: 'Contributor',
    company: 'GirlScript Summer of Code',
    location: 'India · Remote',
    duration: 'Jul 2025 - Present',
    current: true,
    description: [
      'Contributing to open-source projects as part of GirlScript Summer of Code',
      'One of India\'s largest open-source programs fostering developer community growth',
      'Working on various projects to enhance coding skills and technical expertise',
      'Collaborating with developers across India on meaningful open-source contributions',
      'Participating in mentorship programs and code reviews'
    ],
    skills: ['MERN Stack', 'GitHub', 'Open Source', 'React.js', 'Node.js', 'JavaScript'],
    achievements: [
      'Selected as contributor in competitive open-source program',
      'Active participation in community-driven development projects',
      'Contributing to projects with significant impact on developer community'
    ],
    link: 'https://gssoc.girlscript.tech/',
    companyUrl: 'https://www.girlscript.tech/'
  },
  {
    id: '2',
    type: 'work',
    title: 'Full Stack Web Developer',
    company: 'Freelancer.com',
    location: 'Raipur, Chhattisgarh, India · Hybrid',
    duration: 'Jun 2023 - Present',
    current: true,
    description: [
      'Specializing in building responsive, user-centric web applications from front to back',
      'Developing and maintaining full-fledged web applications using React.js, Next.js, Node.js, and MongoDB',
      'Integrating Generative AI APIs to create intelligent, interactive user experiences',
      'Exploring and implementing Blockchain technology for secure and decentralized solutions',
      'Working on RESTful APIs, JWT authentication, and cloud-based deployment (Vercel, Render, etc.)',
      'Building mobile-responsive, accessible UIs using Bootstrap and Tailwind CSS',
      'Collaborating with version control tools like Git and project management platforms',
      'Passionate about learning and applying emerging technologies to solve real-world problems'
    ],
    skills: ['MERN Stack', 'Next.js', 'React.js', 'Node.js', 'MongoDB', 'Generative AI', 'Blockchain', 'RESTful APIs', 'JWT Authentication', 'Tailwind CSS', 'Bootstrap', 'Vercel', 'Git'],
    achievements: [
      'Built innovative, scalable web solutions for diverse client requirements',
      'Successfully integrated AI technologies into web applications',
      'Delivered projects with creative problem-solving and continuous learning approach',
      'Maintained high client satisfaction through quality deliverables',
      'Expertise in modern deployment and cloud technologies'
    ],
    link: 'https://www.freelancer.com/',
    companyUrl: 'https://www.freelancer.com/'
  },
  {
    id: '3',
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
  }
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