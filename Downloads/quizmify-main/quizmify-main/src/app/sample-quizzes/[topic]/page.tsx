"use client";

import { useParams } from "next/navigation";
import { deslugify } from "@/lib/topics";
import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const sampleQuestions: Record<string, Question[]> = {
  "data-structures-algorithms": [
    { question: "What is a binary tree?", options: ["Tree with two children max", "List", "Graph", "Queue"], answer: "Tree with two children max" },
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: "O(log n)" },
    { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
    { question: "What is the height of an AVL tree?", options: ["Balanced", "Unbalanced", "Skewed", "Random"], answer: "Balanced" },
    { question: "Which algorithm uses divide and conquer?", options: ["Quick Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], answer: "Quick Sort" },
    { question: "Which structure is LIFO?", options: ["Queue", "Tree", "Stack", "Graph"], answer: "Stack" },
    { question: "Best case for QuickSort?", options: ["Already sorted", "Random", "Middle pivot", "Worst case"], answer: "Middle pivot" },
    { question: "Which is used in BFS?", options: ["Stack", "Queue", "Set", "Map"], answer: "Queue" },
    { question: "In-order traversal of BST gives?", options: ["Random", "Sorted", "Reverse", "Balanced"], answer: "Sorted" },
    { question: "What is dynamic programming?", options: ["Recursive + memoization", "Sorting", "Looping", "Greedy"], answer: "Recursive + memoization" },
  ],
  "system-design": [
    { question: "What is load balancing?", options: ["Distribute traffic", "Add delay", "Cache removal", "Queueing"], answer: "Distribute traffic" },
    { question: "What is horizontal scaling?", options: ["Add servers", "Add CPU", "Add RAM", "Add SSD"], answer: "Add servers" },
    { question: "Which DB is good for scaling?", options: ["SQL", "NoSQL", "FileSystem", "Excel"], answer: "NoSQL" },
    { question: "What is CAP theorem?", options: ["Consistency, Availability, Partition Tolerance", "CPU, Availability, Performance", "Cache, API, Protocols", "None"], answer: "Consistency, Availability, Partition Tolerance" },
    { question: "What is CDN?", options: ["Content Delivery Network", "Code Debug Node", "Content Design Network", "None"], answer: "Content Delivery Network" },
    { question: "What does cache do?", options: ["Speeds up access", "Slow things down", "Logs data", "Deletes data"], answer: "Speeds up access" },
    { question: "What is microservices?", options: ["Small services", "Monolithic", "Middleware", "None"], answer: "Small services" },
    { question: "What is API Gateway?", options: ["Entry point", "Database", "Message broker", "Scheduler"], answer: "Entry point" },
    { question: "What is a message queue?", options: ["Async communication", "Database", "Queue in DB", "None"], answer: "Async communication" },
    { question: "How to handle failure?", options: ["Retries", "Ignore", "Log only", "Abort"], answer: "Retries" },
  ],
  aptitude: [
    { question: "20% of 80 is?", options: ["16", "20", "8", "12"], answer: "16" },
    { question: "3x + 5 = 14. x = ?", options: ["3", "2", "1", "5"], answer: "3" },
    { question: "Average of 5, 10, 15?", options: ["10", "9", "12", "11"], answer: "10" },
    { question: "Ratio of 4:5, part of 180?", options: ["80,100", "90,90", "70,110", "60,120"], answer: "80,100" },
    { question: "Simple interest: P=1000, R=10%, T=2 yrs", options: ["200", "100", "250", "300"], answer: "200" },
    { question: "Speed = Distance/Time, D=60, T=2", options: ["30", "60", "20", "40"], answer: "30" },
    { question: "LCM of 4 and 6?", options: ["12", "6", "8", "24"], answer: "12" },
    { question: "HCF of 12 and 18?", options: ["6", "12", "3", "2"], answer: "6" },
    { question: "Solve: (2 + 3) × 2", options: ["10", "8", "12", "6"], answer: "10" },
    { question: "Square root of 81?", options: ["9", "8", "7", "6"], answer: "9" },
  ],
  "operating-systems": [
    { question: "What is a deadlock?", options: ["Process waiting forever", "High CPU usage", "Memory leak", "None"], answer: "Process waiting forever" },
    { question: "What is context switching?", options: ["Switch between processes", "Kill process", "Reboot OS", "None"], answer: "Switch between processes" },
    { question: "What is a semaphore?", options: ["Sync tool", "Compiler", "Driver", "Thread"], answer: "Sync tool" },
    { question: "Paging is?", options: ["Memory management", "Printing", "Disk usage", "I/O"], answer: "Memory management" },
    { question: "Which is not OS?", options: ["Windows", "Linux", "Mac", "Oracle"], answer: "Oracle" },
    { question: "Round Robin is a?", options: ["Scheduling algo", "Sorting algo", "OS feature", "Deadlock"], answer: "Scheduling algo" },
    { question: "Thrashing is?", options: ["Excessive paging", "High CPU", "Process wait", "None"], answer: "Excessive paging" },
    { question: "Interrupt is?", options: ["Signal to CPU", "Stop process", "Power off", "Error"], answer: "Signal to CPU" },
    { question: "Multitasking means?", options: ["Multiple apps run", "Multiple users", "Sleep mode", "None"], answer: "Multiple apps run" },
    { question: "Kernel is?", options: ["Core of OS", "Driver", "GUI", "None"], answer: "Core of OS" },
  ],
  dbms: [
    { question: "What is normalization?", options: ["Reduce redundancy", "Duplicate data", "Speed up", "Delete data"], answer: "Reduce redundancy" },
    { question: "ACID stands for?", options: ["Atomicity, Consistency, Isolation, Durability", "Auto, Cache, Integrity, DB", "None", "Accuracy, Commit, Index, Delay"], answer: "Atomicity, Consistency, Isolation, Durability" },
    { question: "SQL is?", options: ["Query language", "Programming language", "NoSQL", "Markup"], answer: "Query language" },
    { question: "Primary key?", options: ["Unique ID", "Null", "Duplicate", "None"], answer: "Unique ID" },
    { question: "Foreign key?", options: ["Reference key", "Main key", "Fake key", "None"], answer: "Reference key" },
    { question: "Indexing helps in?", options: ["Faster retrieval", "Insert", "Drop", "None"], answer: "Faster retrieval" },
    { question: "DDL stands for?", options: ["Data Def Lang", "Design Dev Lang", "Database D Lang", "None"], answer: "Data Def Lang" },
    { question: "Which is not SQL?", options: ["DELETE", "INSERT", "DROP", "RUN"], answer: "RUN" },
    { question: "Join combines?", options: ["Tables", "Rows", "Columns", "Schemas"], answer: "Tables" },
    { question: "Which is not a key?", options: ["Surrogate", "Primary", "Foreign", "Secondary"], answer: "Secondary" },
  ],
  // Add Computer Networks, Web Dev, SE, AI/ML, DevOps similarly...
  "computer-networks": [
    { question: "Which model has 7 layers?", options: ["OSI", "TCP/IP", "HTTP", "FTP"], answer: "OSI" },
    { question: "IP address is used for?", options: ["Identification", "Storage", "Encryption", "Login"], answer: "Identification" },
    { question: "Which protocol is connection-oriented?", options: ["TCP", "UDP", "ICMP", "FTP"], answer: "TCP" },
    { question: "DNS translates?", options: ["Domain to IP", "IP to domain", "HTTP to FTP", "Port to address"], answer: "Domain to IP" },
    { question: "Ping uses which protocol?", options: ["ICMP", "TCP", "UDP", "HTTP"], answer: "ICMP" },
    { question: "HTTP stands for?", options: ["HyperText Transfer Protocol", "HyperTransfer Text Page", "None", "Hyper Terminal Transfer Protocol"], answer: "HyperText Transfer Protocol" },
    { question: "Switch operates at which layer?", options: ["Data Link", "Network", "Application", "Physical"], answer: "Data Link" },
    { question: "Router works on?", options: ["Network layer", "Physical layer", "Transport layer", "Application layer"], answer: "Network layer" },
    { question: "What is MAC address?", options: ["Hardware address", "IP address", "Hostname", "Domain"], answer: "Hardware address" },
    { question: "Which protocol sends email?", options: ["SMTP", "HTTP", "FTP", "POP3"], answer: "SMTP" },
  ],

  "web-development": [
    { question: "HTML is used for?", options: ["Structure", "Logic", "Database", "Styling"], answer: "Structure" },
    { question: "CSS is used for?", options: ["Styling", "Backend", "Logic", "Database"], answer: "Styling" },
    { question: "Which is JavaScript framework?", options: ["React", "Django", "Laravel", "Flask"], answer: "React" },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Data Output Model", "Design Order Model", "None"], answer: "Document Object Model" },
    { question: "Which tag is used for images?", options: ["<img>", "<image>", "<pic>", "<photo>"], answer: "<img>" },
    { question: "Which is valid CSS syntax?", options: ["color: red;", "text-color=red;", "text:red;", "font:red"], answer: "color: red;" },
    { question: "JavaScript is?", options: ["Interpreted", "Compiled", "Markup", "Query language"], answer: "Interpreted" },
    { question: "React is developed by?", options: ["Meta", "Google", "Microsoft", "Apple"], answer: "Meta" },
    { question: "Which is responsive framework?", options: ["Bootstrap", "TensorFlow", "SQL", "Flask"], answer: "Bootstrap" },
    { question: "Node.js is used for?", options: ["Backend", "Frontend", "Styling", "Databases"], answer: "Backend" },
  ],

  "software-engineering": [
    { question: "SDLC stands for?", options: ["Software Development Life Cycle", "System Design Loop Code", "Software Debugging Loop Cycle", "System Dev Life Cycle"], answer: "Software Development Life Cycle" },
    { question: "Agile is a?", options: ["Methodology", "Language", "Framework", "Tool"], answer: "Methodology" },
    { question: "Waterfall is?", options: ["Linear model", "Iterative", "Agile method", "None"], answer: "Linear model" },
    { question: "UML is used for?", options: ["Modeling", "Coding", "Testing", "Deployment"], answer: "Modeling" },
    { question: "Requirement gathering is done in?", options: ["Analysis phase", "Testing", "Deployment", "Design"], answer: "Analysis phase" },
    { question: "SRS stands for?", options: ["Software Requirements Specification", "Software Release Schedule", "System Record Setup", "None"], answer: "Software Requirements Specification" },
    { question: "Which is not a SDLC model?", options: ["V-Model", "Agile", "Spiral", "React"], answer: "React" },
    { question: "Which phase tests bugs?", options: ["Testing", "Coding", "Design", "Deployment"], answer: "Testing" },
    { question: "Unit testing checks?", options: ["Individual modules", "Whole app", "UI only", "Client side"], answer: "Individual modules" },
    { question: "What is version control?", options: ["Code tracking", "Bug fixing", "Software release", "Deployment"], answer: "Code tracking" },
  ],

  "ai-ml": [
    { question: "What is AI?", options: ["Simulating human intelligence", "Database", "Algorithm", "Compiler"], answer: "Simulating human intelligence" },
    { question: "ML stands for?", options: ["Machine Learning", "Meta Learning", "Main Logic", "Manual Logic"], answer: "Machine Learning" },
    { question: "Which is ML type?", options: ["Supervised", "Compiled", "Derived", "Injected"], answer: "Supervised" },
    { question: "Regression is used for?", options: ["Prediction", "Classification", "Encryption", "Clustering"], answer: "Prediction" },
    { question: "KNN is?", options: ["K-Nearest Neighbors", "Kernel Neural Net", "Knowledge Net", "None"], answer: "K-Nearest Neighbors" },
    { question: "Which is not ML library?", options: ["NumPy", "TensorFlow", "Scikit-Learn", "Flask"], answer: "Flask" },
    { question: "AI full form?", options: ["Artificial Intelligence", "Automated Interface", "Auto Integration", "None"], answer: "Artificial Intelligence" },
    { question: "Which is used for clustering?", options: ["K-Means", "Logistic Regression", "Linear Regression", "None"], answer: "K-Means" },
    { question: "Deep learning uses?", options: ["Neural Networks", "Databases", "Compilers", "OS"], answer: "Neural Networks" },
    { question: "What is NLP?", options: ["Natural Language Processing", "Neural Logic Program", "New Learning Pattern", "None"], answer: "Natural Language Processing" },
  ],

  "devops": [
    { question: "DevOps combines?", options: ["Development + Operations", "Design + Testing", "Dev + Debug", "Deploy + Optimize"], answer: "Development + Operations" },
    { question: "CI stands for?", options: ["Continuous Integration", "Code Inject", "Compiler Interface", "Control Input"], answer: "Continuous Integration" },
    { question: "CD in DevOps means?", options: ["Continuous Delivery", "Control Debug", "Code Drop", "Compile & Deploy"], answer: "Continuous Delivery" },
    { question: "Which is a CI/CD tool?", options: ["Jenkins", "Postman", "VS Code", "MySQL"], answer: "Jenkins" },
    { question: "Docker is used for?", options: ["Containerization", "Testing", "Monitoring", "Coding"], answer: "Containerization" },
    { question: "Kubernetes manages?", options: ["Containers", "Databases", "Servers", "Websites"], answer: "Containers" },
    { question: "Git is for?", options: ["Version Control", "Monitoring", "Deployment", "Hosting"], answer: "Version Control" },
    { question: "Terraform is a?", options: ["IaC tool", "Language", "API", "DBMS"], answer: "IaC tool" },
    { question: "Which is monitoring tool?", options: ["Prometheus", "Docker", "Redis", "YAML"], answer: "Prometheus" },
    { question: "YAML is used in?", options: ["Configuration files", "SQL Queries", "Web design", "Scripting"], answer: "Configuration files" },
  ]

};

export default function QuizTopicPage() {
  const params = useParams();
  const topicSlug = params.topic as string;
  const readableTopic = deslugify(topicSlug);
  const questions = sampleQuestions[topicSlug] || [];

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (index: number, option: string) => {
    const updated = [...selectedAnswers];
    updated[index] = option;
    setSelectedAnswers(updated);
  };

  const handleSubmit = () => {
    let tempScore = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) tempScore += 1;
    });
    setScore(tempScore);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">{readableTopic}</h1>
      {questions.length > 0 ? (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
              <div className="space-y-1">
                {q.options.map((opt) => (
                  <label key={opt} className="block">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={opt}
                      checked={selectedAnswers[index] === opt}
                      onChange={() => handleSelect(index, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {score === null ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="text-xl font-semibold text-green-700">
              You scored {score} out of {questions.length}
            </div>
          )}
        </div>
      ) : (
        <p>No questions found for this topic.</p>
      )}
    </div>
  );
}
