// app/govt-prep/page.tsx
import Link from "next/link";

const govtExams = [
  "UPSC Civil Services",
  "SSC CGL",
  "SSC CHSL",
  "RRB NTPC",
  "RRB Group D",
  "IBPS PO",
  "IBPS Clerk",
  "SBI PO",
  "SBI Clerk",
  "NABARD",
  "LIC AAO",
  "DRDO",
  "ISRO",
  "BHEL",
  "GATE",
  "UGC NET",
];

export default function GovtPrepPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prepare for Government Jobs</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Government Exams</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {govtExams.map((exam) => (
            <Link
              key={exam}
              href={`/govt-prep/exams/${exam.toLowerCase().replace(/\s+/g, "-")}`}
              className="p-4 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 border dark:border-zinc-700"
            >
              {exam}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
