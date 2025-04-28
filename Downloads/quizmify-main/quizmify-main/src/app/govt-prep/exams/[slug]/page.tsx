import { notFound } from "next/navigation";

const govtExamData: Record<string, { title: string; description: string; sampleQuestions: string[] }> = {
  "upsc-civil-services": {
    title: "UPSC Civil Services",
    description: "Prepare for India’s toughest administrative exam with focused mock questions.",
    sampleQuestions: [
      "Which Article of the Constitution deals with the Election Commission?",
      "Discuss the role of civil society in Indian democracy.",
      "What are the salient features of the Indian Constitution?",
      "Explain the concept of federalism in India.",
      "List the functions of the Union Public Service Commission.",
      "Who appoints the Chief Election Commissioner of India?",
      "What is the significance of Fundamental Duties?",
      "Differentiate between Parliamentary and Presidential forms of government.",
      "Discuss the role of the Finance Commission in India.",
      "What is the Doctrine of Separation of Powers?"
    ],
  },
  "ssc-cgl": {
    title: "SSC CGL",
    description: "Practice Quant, Reasoning, and English for SSC CGL.",
    sampleQuestions: [
      "Solve: (x+3)^2 = 49",
      "Choose the correct synonym for 'Alleviate'.",
      "A train running at 60 km/hr crosses a pole in 30 seconds. Find the length of the train.",
      "Find the missing number in the series: 3, 6, 18, 72, ?",
      "Which word is opposite in meaning to 'Eminent'?",
      "What is the capital of Jharkhand?",
      "Who is the current Chief Election Commissioner of India?",
      "Rearrange to form a meaningful sentence: 'Time / valuable / is / very'",
      "Find the odd one out: Apple, Banana, Carrot, Mango",
      "Which planet is known as the Red Planet?"
    ]
  },
  "ssc-chsl": {
    title: "SSC CHSL",
    description: "Mock tests to strengthen your foundation for SSC CHSL.",
    sampleQuestions: [
      "Simplify: 15% of 200 + 10% of 150",
      "Choose the correctly spelt word.",
      "Select the antonym of the word 'Hostile'.",
      "Who is the author of 'Discovery of India'?",
      "What is the SI unit of pressure?",
      "Which Mughal emperor built the Red Fort?",
      "In which year did India become a Republic?",
      "Which part of the body is affected by Jaundice?",
      "Find the missing number: 5, 10, 20, 40, ?",
      "The synonym of 'Enormous' is?"
    ]
  },
  "rrb-ntpc": {
    title: "RRB NTPC",
    description: "Questions for General Awareness, Reasoning, and Aptitude.",
    sampleQuestions: [
      "Who was the first President of India?",
      "Which is the longest river in India?",
      "Find the odd one out: 2, 3, 5, 9, 11",
      "Which of these is not a union territory?",
      "Solve: 25% of 600 = ?",
      "Which gas is used in refrigerators?",
      "What is the currency of Japan?",
      "What comes next in the series: Z, X, V, T, ?",
      "When was the Indian Railways nationalized?",
      "What does CPU stand for in computers?"
    ]
  },
  "rrb-group-d": {
    title: "RRB Group D",
    description: "Entry-level exam preparation for Indian Railways jobs.",
    sampleQuestions: [
      "Which planet is closest to the Sun?",
      "Simplify: 48 ÷ 4 + 6 × 2",
      "Identify the synonym of 'Happy'.",
      "When did India gain independence?",
      "What is H2O commonly known as?",
      "Find the odd number: 10, 12, 14, 17, 18",
      "Who wrote the National Anthem of India?",
      "How many states are there in India?",
      "What is the capital of Punjab?",
      "Choose the correct spelling: Recieve / Receive / Receeve / Recive"
    ]
  },
  "ibps-po": {
    title: "IBPS PO",
    description: "Prepare for Probationary Officer recruitment in banks.",
    sampleQuestions: [
      "What is a demand draft?",
      "Solve: 15 × 1.2 + 3.5",
      "Choose the synonym of 'Resilient'.",
      "What is the full form of IFSC?",
      "Who regulates banking in India?",
      "Which article deals with the RBI?",
      "What is a Non-Performing Asset (NPA)?",
      "Explain monetary policy in brief.",
      "What is repo rate?",
      "Define inflation."
    ]
  },
  "ibps-clerk": {
    title: "IBPS Clerk",
    description: "Mock questions for Clerical Cadre banking jobs.",
    sampleQuestions: [
      "Solve: 125 ÷ 5 × 2",
      "What does MICR stand for?",
      "Choose the antonym of 'Transparent'.",
      "Who is the Finance Minister of India?",
      "What is the function of a bank clerk?",
      "Which bank is known as the Banker's Bank?",
      "Find the odd word: Loan, Deposit, Ledger, Vehicle",
      "Explain cheque truncation system.",
      "What is KYC in banking?",
      "Define fixed deposit."
    ]
  },
  "sbi-po": {
    title: "SBI PO",
    description: "Questions to prepare for the SBI Probationary Officer role.",
    sampleQuestions: [
      "What is the tagline of SBI?",
      "Find the next number: 2, 6, 12, 20, ?",
      "Who is the current SBI Chairperson?",
      "What is CRR in banking?",
      "Explain the difference between debit and credit card.",
      "What does NEFT stand for?",
      "Define core banking solution.",
      "What is the eligibility for SBI PO?",
      "What is a savings account?",
      "Which year was SBI established?"
    ]
  },
  "sbi-clerk": {
    title: "SBI Clerk",
    description: "Clerical cadre practice questions for SBI recruitment.",
    sampleQuestions: [
      "Simplify: 45 + 25 - 12 × 2",
      "Who introduced GST in India?",
      "Choose the correct spelling.",
      "Explain ATM and its types.",
      "What is the full form of RTGS?",
      "What is passbook in banking?",
      "Define cash credit.",
      "What is SBI YONO?",
      "List 3 services provided by a bank clerk.",
      "Define recurring deposit."
    ]
  },
  "nabard": {
    title: "NABARD",
    description: "Practice questions for the National Bank for Agriculture and Rural Development exam.",
    sampleQuestions: [
      "What is NABARD's primary function?",
      "Explain Priority Sector Lending.",
      "What is RIDF?",
      "Define SHG and its significance.",
      "What is rural infrastructure?",
      "Who is the current chairman of NABARD?",
      "When was NABARD established?",
      "What is the full form of KCC?",
      "List schemes under NABARD.",
      "Define refinance in rural banking."
    ]
  },
  "lic-aao": {
    title: "LIC AAO",
    description: "Mock tests for Assistant Administrative Officer post at LIC.",
    sampleQuestions: [
      "What is LIC?",
      "Who regulates insurance in India?",
      "What is term insurance?",
      "Define sum assured.",
      "Explain premium and maturity value.",
      "What is IRDAI?",
      "What is ULIP?",
      "When was LIC established?",
      "Define annuity.",
      "What are the duties of an AAO?"
    ]
  },
  "drdo": {
    title: "DRDO",
    description: "Prepare for Defence Research and Development Organisation exams.",
    sampleQuestions: [
      "What does DRDO stand for?",
      "When was DRDO established?",
      "Name any 2 DRDO labs.",
      "Which missile was developed by DRDO?",
      "Explain the role of DRDO in defense.",
      "What is the full form of ISRO?",
      "Name DRDO's combat drone project.",
      "Where is DRDO headquarters?",
      "Explain technology transfer in defense.",
      "What is Astra missile?"
    ]
  },
  "isro": {
    title: "ISRO",
    description: "Mock questions for Indian Space Research Organisation recruitment.",
    sampleQuestions: [
      "Full form of ISRO?",
      "Who founded ISRO?",
      "What is PSLV?",
      "When was Chandrayaan-2 launched?",
      "Define satellite propulsion.",
      "What is GSLV used for?",
      "Name India’s first satellite.",
      "Where is ISRO HQ?",
      "What is Antrix Corporation?",
      "What is the role of ISRO in communication?"
    ]
  },
  "bhel": {
    title: "BHEL",
    description: "Practice for Bharat Heavy Electricals Limited technical exams.",
    sampleQuestions: [
      "What does BHEL stand for?",
      "What is a transformer?",
      "Explain working of a steam turbine.",
      "When was BHEL established?",
      "Name 2 BHEL power projects.",
      "Define thermal power generation.",
      "What is meant by insulation resistance?",
      "What is the role of BHEL in India’s energy sector?",
      "Name the major components of a generator.",
      "Explain the term load factor."
    ]
  },
  "gate": {
    title: "GATE",
    description: "Graduate Aptitude Test in Engineering mock questions.",
    sampleQuestions: [
      "What is Ohm's Law?",
      "Define Laplace transform.",
      "What is eigenvalue in matrices?",
      "State Thevenin’s theorem.",
      "What is a semiconductor?",
      "Define impulse response.",
      "What is the use of Z-transform?",
      "What is the meaning of FFT?",
      "What is PID control?",
      "Explain convolution."
    ]
  },
  "ugc-net": {
    title: "UGC NET",
    description: "Mock questions for National Eligibility Test (NET) by UGC.",
    sampleQuestions: [
      "Define research methodology.",
      "What is sampling in statistics?",
      "Difference between qualitative and quantitative research.",
      "What is a hypothesis?",
      "Define plagiarism.",
      "What is peer review?",
      "Explain ICT in teaching.",
      "What is Bloom’s taxonomy?",
      "Define teaching aptitude.",
      "What is the meaning of mass communication?"
    ]
  }
};

export default function GovtExamQuizPage({ params }: { params: { slug: string } }) {
  const exam = govtExamData[params.slug];
  if (!exam) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{exam.title} Sample Questions</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{exam.description}</p>
      <ul className="list-disc pl-5 space-y-2">
        {exam.sampleQuestions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}
