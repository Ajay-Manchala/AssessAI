"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { topicsMap } from "@/lib/topics";

const SampleQuizzesPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Attempt Sample Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(topicsMap).map(([slug, name]) => (
          <Link
            href={`/sample-quizzes/${slug}`}
            key={slug}
            className="transition-transform duration-200 hover:scale-105"
          >
            <Card className="hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <CardContent className="p-6 text-center font-semibold text-lg">
                {name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SampleQuizzesPage;
