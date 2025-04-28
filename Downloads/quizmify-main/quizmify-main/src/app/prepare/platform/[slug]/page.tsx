// app/prepare/platforms/[slug]/page.tsx
const platformData: Record<string, { title: string; description: string; tips: string[] }> = {
    amcat: {
      title: "AMCAT",
      description: "AMCAT is an adaptive test used by many companies for fresher hiring.",
      tips: [
        "Practice Quant, Verbal and Logical reasoning sections.",
        "Prepare for subject-specific modules like Computer Science.",
        "Focus on time management.",
      ],
    },
    cocubes: {
      title: "CoCubes",
      description: "CoCubes is a popular employability assessment used by service companies.",
      tips: [
        "Revise core subjects — DBMS, OOP, OS.",
        "Aptitude and verbal sections are key.",
        "Get familiar with test interface by practicing online.",
      ],
    },
    devsquare: {
      title: "DevSquare",
      description: "DevSquare is a coding and aptitude assessment platform used by IT companies.",
      tips: [
        "Practice problem-solving and basic coding questions.",
        "Work on logical and analytical reasoning.",
        "Be ready for scenario-based questions.",
      ],
    },
    elitmus: {
      title: "eLitmus",
      description: "eLitmus is a national-level assessment platform used for hiring fresh graduates.",
      tips: [
        "Focus on high-level aptitude: quant, logical, and verbal.",
        "Avoid guesswork due to negative marking.",
        "Time management is critical to attempt all sections.",
      ],
    },
    "first-naukri": {
      title: "First Naukri",
      description: "First Naukri offers skill-based assessments and job matching for freshers.",
      tips: [
        "Take skill tests seriously; they influence your profile visibility.",
        "Build a detailed resume highlighting internships or projects.",
        "Prepare for behavioral and technical interview questions.",
      ],
    },
    hackerrank: {
      title: "HackerRank",
      description: "HackerRank is a popular platform used for coding assessments during tech hiring.",
      tips: [
        "Master data structures and algorithms.",
        "Practice company-specific mock tests on the platform.",
        "Be familiar with time complexity and edge cases.",
      ],
    },
    hirepro: {
      title: "HirePro",
      description: "HirePro is a digital recruitment platform used for assessments and interviews.",
      tips: [
        "Practice communication and technical MCQs.",
        "Check your system and webcam setup beforehand.",
        "Be ready for live coding or technical interviews.",
      ],
    },
    merittrac: {
      title: "MeritTrac",
      description: "MeritTrac offers aptitude and behavioral assessments for campus hiring.",
      tips: [
        "Brush up on verbal ability and logical reasoning.",
        "Stay calm during proctored assessments.",
        "Understand the exam interface beforehand.",
      ],
    },
    mettl: {
      title: "Mettl",
      description: "Mettl is used by companies for technical, aptitude, and psychometric tests.",
      tips: [
        "Practice coding under time pressure.",
        "Prepare for scenario-based and behavioral questions.",
        "Focus on integrity during monitored tests.",
      ],
    },
    myanatomy: {
      title: "MyAnatomy",
      description: "MyAnatomy is a widely used platform for assessments and virtual hiring drives.",
      tips: [
        "Practice previous year pattern-based questions.",
        "Prepare for MCQs on programming, OS, DBMS.",
        "Be ready for recorded video interview rounds.",
      ],
    },
    wecp: {
      title: "WeCP (We Create Problems)",
      description: "WeCP is a tech assessment platform known for its coding and aptitude tests.",
      tips: [
        "Strengthen DSA and basic coding in C/C++/Java/Python.",
        "Prepare for multi-format questions: MCQ, coding, DB queries.",
        "Take practice tests to get used to the interface.",
      ],
    },
  };
  
  export default function PlatformPage({ params }: { params: { slug: string } }) {
    const info = platformData[params.slug];
  
    if (!info) return <div className="p-6 text-red-500">Platform not found</div>;
  
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{info.title}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{info.description}</p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">Preparation Tips</h2>
        <ul className="list-disc pl-6 space-y-1">
          {info.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    );
  }
  