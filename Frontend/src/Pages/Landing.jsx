import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, FileText, Calculator, Users, Award, Phone, Mail, MapPin, CheckCircle, TrendingUp, Shield, Briefcase } from 'lucide-react';
import Navbar from '../component/navbar.jsx';
import ContactForm from '../component/contactForm';
import { ScrollReveal, BlockReveal, TextReveal } from "../component/ScrollReveal.jsx";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../component/footer.jsx';
import heroImage from "../assets/heroImage.jpg";

export default function Landing() {

    const navigate = useNavigate();

    const services = [
        {
            icon: <FileText className="w-12 h-12" />,
            link: "/taxation",
            title: "Taxation & Return Filing",
            description: "End-to-end income tax filing, TDS compliance, and tax planning strategies tailored to individuals and businesses.",
            color: "from-[#123359] to-[#1a4573]"
        },
        {
            icon: <Calculator className="w-12 h-12" />,
            link: "/consultancy",
            title: "General Consultancy",
            description: "Expert advisory services to support strategic decision-making, business planning, compliance, and operational guidance.",
            color: "from-[#1a4573] to-[#0d2440]"
        },
        {
            icon: <Award className="w-12 h-12" />,
            link: "/accounting",
            title: "Accounting & Bookkeeping",
            description: "Accurate bookkeeping, payroll management, and financial statement preparation to support informed decision-making.",
            color: "from-[#123359] to-[#1a4573]"
        },
        {
            icon: <Users className="w-12 h-12" />,
            link: "/auditing",
            title: "Audit & Assurance",
            description: "Independent audits and financial verification services to ensure transparency, compliance, and operational integrity.",
            color: "from-[#1a4573] to-[#0d2440]"
        }
    ];


    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section id="home" className="relative h-screen w-full flex items-center pt-10 justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover "
                    style={{
                        backgroundImage: `url(${heroImage})`,
                    }}
                >
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-[#123359]/70"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl">
                    <div className="inline-block mb-6">
                        <span className="bg-[#123359] text-white px-6 py-2 rounded-full text-sm font-semibold">
                            Trusted Financial Partners Since 2018
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                        <TextReveal delay={0.4}
                            text="Expert Financial Solutions for Your Business"
                            className="drop-shadow-2xl"
                        />
                    </h1>

                    <p className="text-xl text-white/90 mb-10 leading-relaxed drop-shadow-lg">
                        Comprehensive audit, tax, and advisory services designed to help your business thrive in today's competitive landscape.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center">
                        <button
                          className="bg-[#123359] hover:bg-[#1a4573] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 flex items-center justify-center text-base md:text-lg font-semibold"
                          onClick={() => navigate('/login')}
                        >
                          Schedule Consultation
                          <ChevronRight className="ml-2 w-6 h-6 md:w-8 md:h-8" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <TextReveal text="WHAT WE OFFER" className="text-[#123359] font-semibold text-lg" />
                        <h2 className="text-4xl md:text-5xl font-bold text-[#123359] mt-2 mb-4">
                            <TextReveal text="Our Services" delay={0.2} />
                        </h2>
                        <div className="text-xl text-[#123359]/80 max-w-2xl mx-auto">
                            <ScrollReveal delay={0.4}>
                                Comprehensive financial solutions tailored to your unique business needs
                            </ScrollReveal>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <BlockReveal key={index} delay={index * 0.15}>
                                <div className="relative group">
                                    <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-[0_20px_80px_rgba(18,51,89,0.3)] transition-all duration-300 h-full border border-[#123359]/10 group-hover:border-[#123359]/30 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#123359] mb-3">{service.title}</h3>
                                        <p className="text-[#123359]/70 text-lg leading-relaxed">{service.description}</p>
                                        <Link to={service.link}>
                                            <button className="mt-6 text-[#123359] font-semibold flex items-center group-hover:text-[#1a4573] transition-colors duration-300">
                                                Learn More
                                                <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </BlockReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-1 items-center">
                        <BlockReveal>
                            <div className="relative">
                                <div className="absolute -top-6 -left-6 w-full h-full bg-[#123359] rounded-3xl -z-10 shadow-2xl shadow-[#123359]/30"></div>
                                <div className="bg-gray-50 p-10 rounded-3xl">
                                    <h2 className="text-3xl md:text-4xl font-bold text-[#123359] mb-6">
                                        <TextReveal text="Why Choose Us" />
                                    </h2>
                                    <p className="text-[#123359]/80 text-lg mb-8 leading-relaxed">
                                        With over 15 years of experience, we've been helping businesses navigate complex financial landscapes with confidence. Our team brings expertise, integrity, and dedication to every client relationship.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-start bg-white p-4 rounded-xl">
                                            <CheckCircle className="w-6 h-6 text-[#123359] mr-4 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-bold text-[#123359] mb-1">Certified Professionals</h4>
                                                <p className="text-[#123359]/70">Experienced chartered accountants at your service</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start bg-white p-4 rounded-xl">
                                            <CheckCircle className="w-6 h-6 text-[#123359] mr-4 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-bold text-[#123359] mb-1">Personalized Service</h4>
                                                <p className="text-[#123359]/70">Tailored solutions for your unique needs</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start bg-white p-4 rounded-xl">
                                            <CheckCircle className="w-6 h-6 text-[#123359] mr-4 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-bold text-[#123359] mb-1">Technology-Driven</h4>
                                                <p className="text-[#123359]/70">Modern tools for efficient service delivery</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BlockReveal>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
                <h1 className='text-center text-4xl font-bold pb-10 text-[#123359]'>Get In Touch with Us</h1>
                <ContactForm />
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}