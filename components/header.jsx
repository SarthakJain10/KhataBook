"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div id="company" className="flex items-center gap-3 cursor-pointer">
            <img
              src="/favicon.jpg"
              alt="logo"
              className="w-12 h-12 rounded-full object-cover border border-gray-700 dark:border-gray-300 shadow-md"
            />
            <p className="text-xl font-semibold text-black dark:text-white">
              KhataBook
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-800 flex gap-2">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex gap-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                <PenBox size={18} />
                <span>Add transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <ThemeToggle />

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-800">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </SignedIn>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 dark:text-gray-200"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">

            <SignedOut>
              <a
                href="#features"
                className="block text-gray-700 dark:text-gray-300"
                onClick={() => setOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block text-gray-700 dark:text-gray-300"
                onClick={() => setOpen(false)}
              >
                Testimonials
              </a>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="block"
                onClick={() => setOpen(false)}
              >
                <Button variant="outline" className="w-full flex gap-2 justify-center dark:border-neutral-700">
                  <LayoutDashboard size={18} /> Dashboard
                </Button>
              </Link>

              <Link
                href="/transaction/create"
                className="block"
                onClick={() => setOpen(false)}
              >
                <Button className="w-full flex gap-2 justify-center dark:bg-blue-600 dark:hover:bg-blue-700">
                  <PenBox size={18} /> Add Transaction
                </Button>
              </Link>
            </SignedIn>

            <div className="flex items-center justify-between">
              <ThemeToggle />

              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard">
                  <Button variant="outline" className="dark:border-neutral-700">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
