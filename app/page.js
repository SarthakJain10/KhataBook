import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  howItWorksData,
  testimonialsData,
  featuresData,
} from "@/data/landing";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors">

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors">
        <div className="container mx-auto px-4">

          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900 dark:text-white">
            Everything you need to manage your finances
          </h2>

          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center mb-20 gap-12 transition-transform duration-500 ease-in-out hover:scale-105 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="md:w-1/2 overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-neutral-700">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="md:w-1/2 space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="w-16 h-1 bg-indigo-500 rounded-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border bg-white dark:bg-neutral-900
                border-gray-200 dark:border-neutral-700
                shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/40 
                text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 mx-auto">
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                  {step.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-center mt-3">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors overflow-hidden">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            What Our Users Say
          </h2>

          {/* Infinite scroll */}
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll">

              {testimonialsData.concat(testimonialsData).map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-6 mr-6 flex-shrink-0 w-80 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 transition-colors"
                >
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">
                      {testimonial.quote}
                    </p>
                  </CardContent>
                </Card>
              ))}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
