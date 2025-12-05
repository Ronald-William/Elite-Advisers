import logo from '../assets/logo.png'
import { useState } from 'react';
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-white backdrop-blur-sm shadow-md z-50 border-b-2 border-[#1A3D64]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <img className="rounded-full" src={logo} alt="logo" />
                        </div>
                        <span className="text-2xl font-bold text-[#0C2B4E]">Elite Advisers</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/">
                            <div className="text-[#0C2B4E] hover:text-white hover:bg-[#0C2B4E] p-2 hover:rounded-xl font-medium transition-all duration-500 ease-in-out">Home
                            </div>
                        </Link>

                        {/* Dropdown Container */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 text-[#0C2B4E] hover:text-white hover:bg-[#0C2B4E] px-2 py-2 rounded-xl font-medium transition-all duration-500 ease-in-out"
                            >
                                Services
                                <span className={`transform transition-transform duration-300 text-xl${dropdownOpen ? "rotate-180" : ""}`}>
                                    ▾
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg border p-3 w-60 z-50">
                                    <a
                                        href="#general"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-3 py-2 text-[#0C2B4E] hover:bg-gray-100 rounded"
                                    >
                                        General Consultancy
                                    </a>
                                    <a
                                        href="#taxation"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-3 py-2 text-[#0C2B4E] hover:bg-gray-100 rounded"
                                    >
                                        Taxation & Return Filing
                                    </a>
                                    <a
                                        href="#accounting"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-3 py-2 text-[#0C2B4E] hover:bg-gray-100 rounded"
                                    >
                                        Accounting & Bookkeeping
                                    </a>
                                    <a
                                        href="#audit"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-3 py-2 text-[#0C2B4E] hover:bg-gray-100 rounded"
                                    >
                                        Audit & Assurance
                                    </a>
                                </div>
                            )}
                        </div>

                        <Link to="/about">
                            <div className="text-[#0C2B4E] hover:text-white hover:bg-[#0C2B4E] p-2 hover:rounded-xl font-medium transition-all duration-500 ease-in-out">About</div>
                        </Link>
                        <a
                            href="#contact"
                            className="text-[#0C2B4E] hover:text-white hover:bg-[#0C2B4E] p-2 hover:rounded-xl font-medium transition-all duration-500 ease-in-out"
                        >
                            Contact
                        </a>

                        <button className="bg-gradient-to-r from-[#1D546C] to-[#0C2B4E] text-white px-6 py-3 rounded-xl hover:shadow-lg transition transform hover:scale-105">
                            Sign Up
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#0C2B4E]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t-2 border-[#1A3D64]">
                    <div className="px-4 py-4 space-y-4">
                        <Link to="/">
                            <div className="block text-[#0C2B4E] hover:text-[#1D546C] font-medium">Home</div>
                        </Link>
                        {/* Mobile Dropdown */}
                        <div>
                            <button
                                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                className="w-full text-left text-[#0C2B4E] font-medium"
                            >
                                Services ▾
                            </button>

                            {mobileDropdownOpen && (
                                <div className="ml-4 mt-2 space-y-2">
                                    <a href="#general" className="block text-[#0C2B4E] hover:text-[#1D546C]">General Consultancy</a>
                                    <a href="#taxation" className="block text-[#0C2B4E] hover:text-[#1D546C]">Taxation & Return Filing</a>
                                    <a href="#accounting" className="block text-[#0C2B4E] hover:text-[#1D546C]">Accounting & Bookkeeping</a>
                                    <a href="#audit" className="block text-[#0C2B4E] hover:text-[#1D546C]">Audit & Assurance</a>
                                </div>
                            )}
                        </div>

                        <Link to="/about"><div className="block text-[#0C2B4E] hover:text-[#1D546C] font-medium">About</div></Link>
                        <a href="#contact" className="block text-[#0C2B4E] hover:text-[#1D546C] font-medium">Contact</a>

                        <button className="w-full bg-gradient-to-r from-[#1D546C] to-[#0C2B4E] text-white px-6 py-3 rounded-xl">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
