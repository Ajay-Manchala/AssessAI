export const topicsMap: Record<string, string> = {
    "data-structures-algorithms": "Data Structures & Algorithms",
    "system-design": "System Design",
    aptitude: "Aptitude",
    "operating-systems": "Operating Systems",
    dbms: "DBMS",
    "computer-networks": "Computer Networks",
    "web-development": "Web Development",
    "software-engineering": "Software Engineering",
    "ai-ml": "AI/ML",
    devops: "DevOps",
  };
  
  export function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  
  export function deslugify(slug: string): string {
    return topicsMap[slug] || slug.replace(/-/g, " ");
  }
  