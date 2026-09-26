export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  achievements?: string[];
  skills: string[];
  logo?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
}

export const educationData: Education[] = [
  {
    id: 1,
    institution: "Government Nagarjuna P.G. College of Science, Raipur",
    degree: "Bachelor in Computer Application (BCA)",
    field: "Computer Science",
    duration: "Jun 2021 - Jun 2024",
    location: "Raipur, Chhattisgarh",
    achievements: ["🏆 1st Rank at College Level"],
    skills: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "C Programming","C++", "Database Management" ],
    logo: "🎓"
  },
  {
    id: 2,
    institution: "Rungta College of Engineering & Technology Kohka-Kurud Bhilai",
    degree: "Master of Computer Applications (MCA)",
    field: "Computer and Information Sciences and Support Services",
    duration: "Jun 2024 - July 2026",
    location: "Bhilai, Chhattisgarh",
    skills: ["Java", "Python (Django)", "Data Structures", "Algorithms", "Microservices", "Caching", "System Architecture"],
    logo: "🎓"
  }
];
