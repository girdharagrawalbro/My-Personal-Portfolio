export type Skill = {
  name: string;
  percent: number;
};

export type SkillCategory = {
  title: string;
  icon: string; // FontAwesome class
  skills: Skill[];
};

export const skillsData: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'fas fa-code',
    skills: [
      { name: 'HTML5', percent: 90 },
      { name: 'CSS3/Sass', percent: 85 },
      { name: 'JavaScript', percent: 80 },
      { name: 'React', percent: 75 }
    ]
  },
  {
    title: 'Backend',
    icon: 'fas fa-server',
    skills: [
      { name: 'Node.js', percent: 80 },
      { name: 'Express', percent: 70 },
      { name: 'Python', percent: 65 },
      { name: 'PHP', percent: 60 }
    ]
  },
  {
    title: 'Databases',
    icon: 'fas fa-database',
    skills: [
      { name: 'MongoDB', percent: 75 },
      { name: 'MySQL', percent: 70 },
      { name: 'PostgreSQL', percent: 65 },
      { name: 'Firebase', percent: 60 }
    ]
  },
  {
    title: 'Tools & Other',
    icon: 'fas fa-tools',
    skills: [
      { name: 'Git/GitHub', percent: 85 },
      { name: 'Docker', percent: 80 },
      { name: 'AWS', percent: 75 },
      { name: 'CI/CD', percent: 70 }
    ]
  }
];
