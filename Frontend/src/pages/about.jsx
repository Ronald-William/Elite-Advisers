import React from "react";
import { BlockReveal, TextReveal } from "../component/ScrollReveal";
import about from "../assets/about.png"
import Navbar from "../component/navbar";
export default function AboutUsSection() {
  const statistics = [
    { number: "150+", label: "clients", description: "Successfully served clients across various industries." },
    { number: "7+", label: "years", description: "Years of industry experience in accounting and finance." },
    { number: "30+", label: "members", description: "Dedicated team members who are committed to delivering excellence." },
  ];

  return (
    <>
    <Navbar/>
    <BlockReveal>
        
      <div className="min-h-screen bg-[#0C2B4E] text-white flex items-center pt-20">
        <section className="px-6 lg:px-10 py-10 w-full">
          <div className="max-w-7xl mx-auto">

            {/* Main Row */}
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* LEFT CONTENT */}
              <div>
                <h1 className="text-5xl font-bold mb-6">About Us</h1>
                <TextReveal
                  text="We're a team of passionate chartered accountants and financial experts building exceptional solutions for businesses across India."
                  className="text-lg md:text-xl text-gray-200"
                />
              </div>

              {/* RIGHT BIG HORIZONTAL CARD */}
              <div className="flex justify-center">
                <div className="w-full max-w-xl bg-[#1D546C] rounded-2xl overflow-hidden shadow-2xl border border-gray-600">
                  <img
                    src={about}
                    alt="About"
                    className="w-full h-80 object-fit bg-gray-800"
                  />
                </div>
              </div>

            </div>

            {/* STATISTICS */}
            <div className="mt-10">
              <h2 className="text-4xl font-bold ">Key Statistics</h2>

              <div className="grid md:grid-cols-3 gap-6 mt-3">
                {statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-[#1A3D64] border border-gray-700 rounded-2xl p-6 transition hover:bg-[#254F73] hover:border-gray-400 shadow-lg"
                  >
                    <div className="text-5xl font-bold mb-3">{stat.number}</div>
                    
                    <p className="text-gray-300 text-lg">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </div>
    </BlockReveal>
    </>
  );
  
}
