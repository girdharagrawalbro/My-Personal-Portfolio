export type Skill = {
  name: string;
  percent: number;
};

export type SkillCategory = {
  title: string;
  icon: string;
  skills: Skill[];
};