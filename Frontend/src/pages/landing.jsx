import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, FileText, Calculator, Users, Award, Phone, Mail, MapPin, CheckCircle, TrendingUp, Shield, Briefcase } from 'lucide-react';
import Navbar from '../component/navbar'
import ContactForm from '../component/contactForm';
import { ScrollReveal, BlockReveal, TextReveal } from "../component/ScrollReveal"
import {Link} from 'react-router-dom';
export default function Landing() {

    const services = [
        {
            icon: <FileText className="w-12 h-12" />,
            title: "Taxation & Return Filing",
            description: "End-to-end income tax filing, TDS compliance, and tax planning strategies tailored to individuals and businesses.",
            color: "from-[#1A3D64] to-[#1D546C]"
        },
        {
           
            icon: <Calculator className="w-12 h-12" />,
            title: "General Consultancy",
            description: "Expert advisory services to support strategic decision-making, business planning, compliance, and operational guidance.",
            color: "from-[#1D546C] to-[#0C2B4E]"
        

        },
{
    icon: <Award className="w-12 h-12" />,
        title: "Accounting & Bookkeeping",
            description: "Accurate bookkeeping, payroll management, and financial statement preparation to support informed decision-making.",
                color: "from-[#1A3D64] to-[#1D546C]"
},
{
    icon: <Users className="w-12 h-12" />,
        title: "Audit & Assurance",
            description: "Independent audits and financial verification services to ensure transparency, compliance, and operational integrity.",
                color: "from-[#1D546C] to-[#0C2B4E]"
}
    ];


return (
    <div className="min-h-screen bg-[#F4F4F4]">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="relative h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070)`,
                }}
            >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-[#0C2B4E]/45"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl">
                <div className="inline-block mb-6">
                    <span className="bg-[#0C2B4E] text-white px-6 py-2 rounded-full text-sm font-semibold">
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
                    <button className="bg-gradient-to-r bg-[#0C2B4E] text-white px-10 py-4 rounded-xl shadow-black shadow-lg hover:shadow-2xl hover:shadow-white transition transform hover:scale-105 flex items-center justify-center text-lg font-semibold">
                        Schedule Consultation
                        <ChevronRight className="ml-2 w-9 h-9" />
                    </button>
                </div>
            </div>
        </section>

        {/* Services Section */}
<section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C2B4E]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <TextReveal text="WHAT WE OFFER" className="text-white font-semibold text-lg" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
                        <TextReveal text="Our Services" delay={0.2} />
                    </h2>
                    <div className="text-xl text-white max-w-2xl mx-auto">
                        <ScrollReveal delay={0.4}>
                            Comprehensive financial solutions tailored to your unique business needs
                        </ScrollReveal>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <BlockReveal key={index} delay={index * 0.15}>
                            <div className="relative group">
                                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-[0_20px_80px_rgba(255,255,255,0.7)] transition-all duration-300 h-full border-2 border-transparent group-hover:border-white group-hover:border-4 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0C2B4E] mb-3">{service.title}</h3>
                                    <p className="text-[#1D546C] text-lg leading-relaxed">{service.description}</p>
                                    <button className="mt-6 text-[#1D546C] font-semibold flex items-center group-hover:text-[#0C2B4E] transition-colors duration-300">
                                        Learn More
                                        <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
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
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <BlockReveal>
                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-full h-full bg-[#0C2B4E] rounded-3xl -z-10"></div>
                            <div className="bg-[#F4F4F4] p-10 rounded-3xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#0C2B4E] mb-6">
                                    <TextReveal text="Why Choose Us" />
                                </h2>
                                <p className="text-[#1D546C] text-lg mb-8 leading-relaxed">
                                    With over 15 years of experience, we've been helping businesses navigate complex financial landscapes with confidence. Our team brings expertise, integrity, and dedication to every client relationship.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start bg-white p-4 rounded-xl">
                                        <CheckCircle className="w-6 h-6 text-[#1D546C] mr-4 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-[#0C2B4E] mb-1">Certified Professionals</h4>
                                            <p className="text-[#1D546C]">Experienced chartered accountants at your service</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start bg-white p-4 rounded-xl">
                                        <CheckCircle className="w-6 h-6 text-[#1D546C] mr-4 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-[#0C2B4E] mb-1">Personalized Service</h4>
                                            <p className="text-[#1D546C]">Tailored solutions for your unique needs</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start bg-white p-4 rounded-xl">
                                        <CheckCircle className="w-6 h-6 text-[#1D546C] mr-4 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-[#0C2B4E] mb-1">Technology-Driven</h4>
                                            <p className="text-[#1D546C]">Modern tools for efficient service delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlockReveal>

                    <ContactForm/>
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-[#F4F4F4] px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <TextReveal text="GET IN TOUCH" className="text-[#1D546C] font-semibold text-lg" />
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0C2B4E] mt-2 mb-4">
                        <TextReveal text="Contact Us" delay={0.2} />
                    </h2>
                    <div className="text-xl text-[#1D546C]">
                        <ScrollReveal delay={0.4}>
                            We're here to help with all your financial needs
                        </ScrollReveal>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <BlockReveal delay={0.1}>
                        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition text-center group">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A3D64] to-[#1D546C] rounded-2xl mb-6 group-hover:scale-110 transition">
                                <Phone className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0C2B4E] mb-3">Phone</h3>
                            <p className="text-[#1D546C] text-lg">+91 98765 43210</p>
                        </div>
                    </BlockReveal>
                    <BlockReveal delay={0.25}>
                        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition text-center group">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A3D64] to-[#1D546C] rounded-2xl mb-6 group-hover:scale-110 transition">
                                <Mail className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0C2B4E] mb-3">Email</h3>
                            <p className="text-[#1D546C] text-lg">elite.advisers@gmail.com</p>
                        </div>
                    </BlockReveal>
                    <BlockReveal delay={0.4}>
                        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition text-center group">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A3D64] to-[#1D546C] rounded-2xl mb-6 group-hover:scale-110 transition">
                                <MapPin className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0C2B4E] mb-3">Location</h3>
                            <p className="text-[#1D546C] text-lg">Dwarka, New Delhi</p>
                        </div>
                    </BlockReveal>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0C2B4E] text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-br from-[#1A3D64] to-[#1D546C] p-3 rounded-xl">
                                <Calculator className="w-7 h-7 text-white" />
                            </div>
                            <span className="ml-3 text-2xl font-bold">Elite Advisers</span>
                        </div>
                        <p className="text-[#F4F4F4]/80">Your trusted partner in financial excellence and business growth.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Services</h4>
                        <ul className="space-y-3 text-[#F4F4F4]/80">
                            <li className="hover:text-white transition cursor-pointer">Taxation and return filing</li>
                            <li className="hover:text-white transition cursor-pointer">General Consultancy</li>
                            <li className="hover:text-white transition cursor-pointer">Accounting and BookKeeping</li>
                            <li className="hover:text-white transition cursor-pointer">Audit and Assurance</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-3 text-[#F4F4F4]/80">
                            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#services" className="hover:text-white transition">Our Services</a></li>
                            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Connect With Us</h4>
                        <p className="text-[#F4F4F4]/80 mb-4">Follow us on social media for updates and insights</p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-[#1D546C] rounded-lg flex items-center justify-center hover:bg-[#1A3D64] transition">
                                <span className="text-white font-bold">in</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#1D546C] rounded-lg flex items-center justify-center hover:bg-[#1A3D64] transition">
                                <span className="text-white font-bold">X</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[#1D546C] pt-8 text-center text-[#F4F4F4]/80">
                    <p>&copy; 2025 Elite Advisers. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
);
}