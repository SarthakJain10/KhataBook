"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="pt-36 pb-24 px-6 bg-gray-50 dark:bg-neutral-900 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          text-transparent bg-clip-text"
        >
          One Stop Finance Platform
        </h1>
        
        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Smart, simple, and secure tools to take control of your money.
        </p>
        
        {/* Button */}
        <Link href="/dashboard">
          <Button
            size="lg"
            className="px-10 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition"
          >
            Get Started
          </Button>
        </Link>

        {/* Image */}
        <div className="mt-10 w-full max-w-5xl">
          <Image
            src="/expense-tracker.jpg"
            width={1600}
            height={900}
            alt="Dashboard Preview"
            className="rounded-lg shadow-2xl border border-gray-200 dark:border-neutral-700 mx-auto w-full object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
