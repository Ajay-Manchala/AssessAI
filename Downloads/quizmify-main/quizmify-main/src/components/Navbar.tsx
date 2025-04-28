'use client';

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import SignInButton from "./SignInButton";

interface NavbarClientProps {
  session: any;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ session }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-zinc-300 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl h-16 px-6 mx-auto">
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black dark:border-white px-2 py-1 text-xl font-bold transition-transform hover:-translate-y-[2px]">
              Assess AI
            </p>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link
              href="/sample-quizzes"
              className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
            >
              CoreCheck
            </Link>
            <Link
              href="/prepare"
              className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
            >
              CorpCrack
            </Link>
            <Link
              href="/govt-prep"
              className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
            >
              CivilCraft
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden md:block ml-4">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </form>
        </div>

        {/* Right: Theme + Auth */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarClient;
