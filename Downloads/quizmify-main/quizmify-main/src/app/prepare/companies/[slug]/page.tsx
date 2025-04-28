import { notFound } from "next/navigation";

const companyData: Record<string, { title: string; process: string[]; tips: string[] }> = {
  "accenture": {
    title: "Accenture",
    process: [
      "Cognitive and Technical Assessment",
      "Coding Round",
      "Communication Assessment",
      "Technical + HR Interview",
    ],
    tips: [
      "Practice problem-solving and basic DSA.",
      "Work on your communication and analytical thinking.",
      "Prepare with Accenture-specific sample questions.",
    ],
  },
  "tcs-nqt": {
    title: "TCS NQT",
    process: [
      "Foundation Section",
      "Advanced Section",
      "Coding Round",
      "Interview",
    ],
    tips: [
      "Focus on Verbal, Reasoning, and Programming Logic.",
      "Revise CS fundamentals and practice coding.",
      "Take previous year mock tests.",
    ],
  },
  "deloitte-nla": {
    title: "Deloitte NLA",
    process: [
      "Online Aptitude + Technical MCQ",
      "Group Exercise/Case Study",
      "Technical + HR Interview",
    ],
    tips: [
      "Practice consulting case studies.",
      "Work on group discussion and logical skills.",
      "Highlight analytical and communication skills.",
    ],
  },
  "capgemini": {
    title: "Capgemini",
    process: [
      "Game-based Aptitude",
      "Behavioral Competency Test",
      "Technical + HR Interview",
    ],
    tips: [
      "Familiarize yourself with game-based assessments.",
      "Be confident in your communication.",
      "Practice logical reasoning and situational judgment tests.",
    ],
  },
  "cognizant-genc": {
    title: "Cognizant GenC",
    process: [
      "Aptitude and Logical Test",
      "Technical Interview",
      "HR Interview",
    ],
    tips: [
      "Be strong in fundamentals like OOP, DBMS, OS.",
      "Prepare for common HR questions.",
      "Work on resume-based questions.",
    ],
  },
  "infosys": {
    title: "Infosys",
    process: [
      "Online Test (Aptitude + Technical)",
      "Technical Interview",
      "HR Interview",
    ],
    tips: [
      "Practice aptitude questions extensively.",
      "Revise CS basics and be ready to explain your projects.",
      "Be clear and confident during interviews.",
    ],
  },
  "tcs-digital": {
    title: "TCS Digital",
    process: [
      "Online Test (Advanced Level)",
      "Technical Interview",
      "Managerial + HR Round",
    ],
    tips: [
      "Strong DSA and CS fundamentals are crucial.",
      "Be prepared for deep technical grilling.",
      "Highlight innovation and leadership experiences.",
    ],
  },
  "tcs-ninja": {
    title: "TCS Ninja",
    process: [
      "Online Assessment (Basic Level)",
      "Interview",
    ],
    tips: [
      "Practice basic aptitude and programming logic.",
      "Focus on clear explanation and strong communication.",
      "Prepare simple yet impactful project discussions.",
    ],
  },
  "hackwithinfy": {
    title: "HackWithInfy",
    process: [
      "Coding Contest (3 Rounds)",
      "Pre-Placement Interview",
    ],
    tips: [
      "Practice competitive programming.",
      "Focus on recursion, DSA, and optimization.",
      "Use platforms like CodeChef, LeetCode, HackerRank.",
    ],
  },
  "lti-mindtree": {
    title: "LTI Mindtree",
    process: [
      "Online Test (Aptitude + Coding)",
      "Technical Interview",
      "HR Interview",
    ],
    tips: [
      "Practice C/C++/Java programming questions.",
      "Understand real-world scenarios for technical rounds.",
      "Show enthusiasm to work in multiple domains.",
    ],
  },
  "tcs-smart-hiring": {
    title: "TCS Smart Hiring",
    process: [
      "Foundation Online Assessment",
      "Interview Round",
    ],
    tips: [
      "Focus on reasoning and verbal ability.",
      "Emphasize trainability and learning ability.",
      "Be confident even if you're from non-CS background.",
    ],
  },
  "tech-mahindra": {
    title: "Tech Mahindra",
    process: [
      "Online Test (Aptitude, Verbal, Technical)",
      "Essay Writing",
      "Tech + HR Interview",
    ],
    tips: [
      "Work on grammar, email writing, and essay formats.",
      "Be ready for programming logic and MCQs.",
      "Stay updated with Tech Mahindra's business model.",
    ],
  },
  "vmware": {
    title: "VMware",
    process: [
      "Online Coding Assessment",
      "Technical Interviews (2-3 Rounds)",
      "Managerial + HR Round",
    ],
    tips: [
      "Focus on in-depth DSA and system design basics.",
      "Expect behavioral and scenario-based questions.",
      "Demonstrate curiosity and problem-solving mindset.",
    ],
  },
  "virtusa": {
    title: "Virtusa",
    process: [
      "Aptitude and Coding Test",
      "Technical Interview",
      "HR Interview",
    ],
    tips: [
      "Revise Java, DBMS, and SDLC concepts.",
      "Be ready to explain your final year project.",
      "Have good communication skills.",
    ],
  },
  "wipro": {
    title: "Wipro",
    process: [
      "Online Test",
      "Technical Interview",
      "HR Interview",
    ],
    tips: [
      "Prepare aptitude and verbal reasoning.",
      "Brush up on technical fundamentals.",
      "Display your teamwork and adaptability.",
    ],
  },
  "wipro-nth": {
    title: "Wipro NTH",
    process: [
      "Online Test (Quant, Verbal, Coding)",
      "Interview",
    ],
    tips: [
      "Practice from Wipro-specific mock tests.",
      "Stay calm and confident during coding round.",
      "Be ready for situational and HR questions.",
    ],
  },
  "wipro-wilp": {
    title: "Wipro WILP",
    process: [
      "Online Assessment",
      "Business Discussion",
    ],
    tips: [
      "Focus on aptitude and logical reasoning.",
      "Be prepared to balance work and study.",
      "Highlight your willingness to learn.",
    ],
  },
  "zs-associates": {
    title: "Zs Associates",
    process: [
      "Aptitude + Business Analytics Test",
      "Case Study Round",
      "Technical + HR Interviews",
    ],
    tips: [
      "Understand analytics basics and Excel proficiency.",
      "Practice case studies and structured problem solving.",
      "Show analytical thinking and clear communication.",
    ],
  },
};

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const info = companyData[params.slug];

  if (!info) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{info.title} Hiring Process</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Hiring Steps</h2>
      <ul className="list-disc pl-6 space-y-1">
        {info.process.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Preparation Tips</h2>
      <ul className="list-disc pl-6 space-y-1">
        {info.tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
