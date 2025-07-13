export const getLanguageColor = (language: string | null): string => {
  if (!language) return '#ccc';

  const colors: Record<string, string> = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'React': '#61dafb',
    'Vue': '#41b883',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'Go': '#00ADD8',
    'Rust': '#dea584'
  };

  return colors[language] || '#6c63ff';
};