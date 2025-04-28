// app/prepare/page.tsx
import Link from "next/link";

const platforms = [
  "AMCAT",
  "CoCubes",
  "DevSquare",
  "eLitmus",
  "First Naukri",
  "HackerRank",
  "HirePro",
  "Merittrac",
  "Mettl",
  "MyAnatomy",
  "WeCP",
];

const companies = [
  "Deloitte NLA",
  "Accenture",
  "Capgemini",
  "Cognizant GenC",
  "Infosys",
  "TCS NQT",
  "TCS Digital",
  "TCS Ninja",
  "HackWithInfy",
  "LTI Mindtree",
  "TCS Smart Hiring",
  "Tech Mahindra",
  "VMware",
  "Virtusa",
  "Wipro",
  "Wipro NTH",
  "Wipro WILP",
  "Zs Associates",
];

export default function PreparePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prepare for These Companies</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Platforms</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Link
              key={platform}
              href={`/prepare/platforms/${platform.toLowerCase().replace(/\s+/g, "-")}`}
              className="p-4 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 border dark:border-zinc-700"
            >
              {platform}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Companies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {companies.map((company) => (
            <Link
              key={company}
              href={`/prepare/companies/${company.toLowerCase().replace(/\s+/g, "-")}`}
              className="p-4 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 border dark:border-zinc-700"
            >
              {company}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
