import React from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { BlockReveal, TextReveal } from "../component/ScrollReveal";
import ContactForm from "../component/contactForm";

export default function GeneralConsultancy() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#0C2B4E] to-[#1a3d66] text-white pt-30 pb-10 px-6 md:px-10">
                <div className="max-w-6xl mx-auto text-center">
                    <TextReveal delay={0.2} text="General Consultancy Services" className="font-bold text-4xl md:text-5xl lg:text-5xl mb-4" />
                    <br />
                    <TextReveal delay={0.4} text="Strategic Business Advisory and Management Solutions for Growth" className="text-lg md:text-xl text-gray-200 max-w-3xl" />
                </div>
            </div>

            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto py-16 px-6 md:px-10">
                    {/* What is General Consultancy Section */}
                    <BlockReveal>
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-[#0C2B4E] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                    1
                                </div>
                                <div className="flex-1">
                                    <TextReveal delay={0.3} text="What is General Consultancy?" className="font-bold text-2xl md:text-3xl text-[#0C2B4E] mb-4" />
                                </div>
                            </div>
                            <BlockReveal>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                    General consultancy encompasses a comprehensive range of professional advisory services provided by Chartered Accountants to help businesses navigate complex financial, operational, and strategic challenges. Unlike specialized services that focus on a single area, general consultancy takes a holistic approach to understanding and improving all aspects of business operations.
                                </p>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                                    These services extend beyond traditional accounting and compliance work to include strategic planning, financial management, business process optimization, and growth advisory. General consultancy helps organizations make informed decisions, identify opportunities for improvement, and implement effective solutions that drive sustainable growth and profitability.
                                </p>
                            </BlockReveal>
                            <BlockReveal>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                                    CA firms offering general consultancy services act as trusted business partners, bringing deep financial expertise combined with practical business acumen. They help clients understand their current position, identify goals, and develop actionable strategies to bridge the gap between where they are and where they want to be.
                                </p>
                                <div className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                                    Key areas covered under general consultancy include:
                                    <ul className="list-disc p-5">
                                        <li>Business planning and strategy development</li>
                                        <li>Financial management and performance improvement</li>
                                        <li>Cash flow and working capital management</li>
                                        <li>Risk assessment and mitigation strategies</li>
                                        <li>Operational efficiency and process optimization</li>
                                        <li>Management information systems and reporting</li>
                                    </ul>
                                </div>
                            </BlockReveal>
                        </div>
                    </BlockReveal>

                    {/* Business Advisory Section */}
                    <BlockReveal>
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-[#0C2B4E] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                    2
                                </div>
                                <div className="flex-1">
                                    <TextReveal delay={0.3} text="Business Advisory and Strategic Planning" className="font-bold text-2xl md:text-3xl text-[#0C2B4E] mb-4" />
                                </div>
                            </div>
                            <BlockReveal>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                    Business advisory services form the cornerstone of general consultancy, providing strategic guidance that helps organizations navigate challenges and capitalize on opportunities. CA firms work closely with management to develop comprehensive business plans, conduct feasibility studies, and create roadmaps for achieving long-term objectives.
                                </p>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                                    Strategic planning involves analyzing the competitive landscape, assessing internal capabilities, identifying growth opportunities, and formulating actionable strategies. This includes market analysis, competitive positioning, expansion planning, and diversification strategies. Consultants help businesses set realistic goals, allocate resources effectively, and establish key performance indicators to track progress.
                                </p>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                                    Beyond planning, business advisory encompasses ongoing support in decision-making processes, whether related to investments, partnerships, mergers and acquisitions, or operational changes. The objective is to provide objective, data-driven insights that enable informed choices and reduce business risks.
                                </p>
                            </BlockReveal>
                        </div>
                    </BlockReveal>

                    {/* Financial Planning Section */}
                    <BlockReveal>
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-[#0C2B4E] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                    3
                                </div>
                                <div className="flex-1">
                                    <TextReveal delay={0.3} text="Financial Planning and Management" className="font-bold text-2xl md:text-3xl text-[#0C2B4E] mb-4" />
                                </div>
                            </div>
                            <BlockReveal>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                    Financial planning and management consultancy helps businesses establish robust financial frameworks that support sustainable growth. This includes budgeting and forecasting, cash flow management, working capital optimization, and capital structure planning. Consultants help design financial models that provide insights into future performance under various scenarios.
                                </p>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                                    Effective financial management also involves establishing management information systems that provide timely, accurate data for decision-making. This includes developing key performance indicators, financial dashboards, and reporting frameworks that give management clear visibility into business performance. Regular financial analysis helps identify trends, variances, and opportunities for improvement.
                                </p>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                                    CA firms also assist with financing strategies, helping businesses identify optimal funding sources, prepare documentation for lenders or investors, and negotiate favorable terms. This support extends to project finance, debt restructuring, and treasury management.
                                </p>
                            </BlockReveal>
                        </div>
                    </BlockReveal>

                    {/* Why Choose Section */}
                    <BlockReveal>
                        <div className="bg-gradient-to-br from-[#0C2B4E] to-[#1a3d66] text-white rounded-2xl shadow-xl p-8 md:p-10 mb-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-white text-[#0C2B4E] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                    4
                                </div>
                                <div className="flex-1">
                                    <TextReveal delay={0.3} text="Why Choose General Consultancy Services?" className="font-bold text-2xl md:text-3xl mb-4" />
                                </div>
                            </div>
                            <BlockReveal>
                                <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                                    General consultancy services offer businesses the advantage of comprehensive support across multiple functional areas without the need to engage separate specialists for each domain. This integrated approach ensures that all aspects of business operations work together cohesively towards common goals.
                                </p>
                                <p className="text-gray-100 text-base md:text-lg leading-relaxed mt-4">
                                    CA firms bring technical expertise, industry knowledge, and objective perspectives that help businesses see beyond day-to-day operations. They provide access to best practices, benchmarking data, and proven methodologies that have been refined across numerous client engagements. This experience translates into practical solutions that are both effective and implementable.
                                </p>
                            </BlockReveal>
                        </div>
                    </BlockReveal>

                    {/* When to Engage Section */}
                    <BlockReveal>
                        <div className="bg-gradient-to-br from-[#0C2B4E] to-[#1a3d66] text-white rounded-2xl shadow-xl p-8 md:p-10 mb-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-white text-[#0C2B4E] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                    5
                                </div>
                                <div className="flex-1">
                                    <TextReveal delay={0.3} text="When to Engage General Consultancy Services?" className="font-bold text-2xl md:text-3xl mb-4" />
                                </div>
                            </div>
                            <BlockReveal>
                                <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                                    General consultancy services are valuable at various stages of business lifecycle. Startups and new ventures benefit from guidance on business structuring, financial planning, and establishing proper systems and controls. Growing businesses need support in scaling operations, managing increased complexity, and maintaining financial discipline during expansion.
                                </p>
                                <p className="text-gray-100 text-base md:text-lg leading-relaxed mt-4">
                                    Established organizations engage consultants when facing specific challenges such as declining profitability, cash flow issues, operational inefficiencies, or when contemplating major decisions like expansions, acquisitions, or restructuring. Even well-performing businesses benefit from periodic strategic reviews and external perspectives to identify improvement opportunities and stay competitive.
                                </p>
                                <p className="text-gray-100 text-base md:text-lg leading-relaxed mt-4">
                                    The flexibility of general consultancy allows businesses to access expert guidance on an as-needed basis, making it a cost-effective alternative to building in-house capabilities for specialized functions. Whether addressing immediate issues or planning for long-term success, general consultancy provides the expertise and support businesses need to thrive.
                                </p>
                            </BlockReveal>
                        </div>
                    </BlockReveal>

                </div>
            </div>
            
            <Footer />
        </>
    );
}