export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  grade?: string;
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
    institution: "Rungta College of Engineering & Technology Kohka-Kurud Bhilai",
    degree: "Master of Computer Applications (MCA)",
    field: "Computer and Information Sciences and Support Services",
    duration: "Jun 2024 - 2027",
    location: "Bhilai, Chhattisgarh",
    skills: ["Java", "Python (Programming Language)", "Data Structures", "Algorithms"],
    logo: "🎓"
  },
  {
    id: 2,
    institution: "Government Nagarjuna P.G. College of Science, Raipur",
    degree: "Bachelor in Computer Application (BCA)",
    field: "Computer Science",
    duration: "Jun 2021 - Jun 2024",
    location: "Raipur, Chhattisgarh",
    grade: "79.77%",
    achievements: ["🏆 1st Rank at College Level"],
    skills: ["Cascading Style Sheets (CSS)", "SQL", "JavaScript", "HTML", "PHP", "C Programming", "Database Management"],
    logo: "🎯"
  }
];