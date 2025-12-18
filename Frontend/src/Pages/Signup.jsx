import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '', phone: '' });
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "The Future of CA Practice",
      description: "Run your entire firm — audits, compliance, team & clients — from one intelligent platform",
      image: "https://i.pinimg.com/1200x/de/2d/f3/de2df3eb035c9e5a72886cedfb9668ce.jpg"
    },
    {
      title: "Automate. Don’t Operate.",
      description: "Reduce manual work by 80% with AI-powered workflows and smart reminders",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=90"
    },
    {
      title: "Security You Can Trust",
      description: "Bank-grade encryption • ISO 27001 • Daily backups • Made for Indian CAs",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=90"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => setSignupInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Step 1: Submit form + trigger OTP
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) return handleError('Name, email & password are required');

    try {
      // 1. Register user
      const res = await fetch("https://adl-api-ten.vercel.app/auth/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });
      const result = await res.json();
      if (!result.success) return handleError(result.message || "Signup failed");

      // 2. Send OTP
      const otpRes = await fetch("https://adl-api-ten.vercel.app/api/otp/send-otp", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupInfo.email, phone: signupInfo.phone })
      });
      const otpData = await otpRes.json();

      if (otpData.success) {
        handleSuccess("OTP sent to your email/phone!");
        setShowOtpScreen(true);
      } else {
        handleError("Failed to send OTP");
      }
    } catch (err) {
      handleError("Connection failed. Please try again.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return handleError("Enter valid 6-digit OTP");

    try {
      const res = await fetch("https://adl-api-ten.vercel.app/api/otp/verify-otp", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: signupInfo.email, 
          otp,
          name: signupInfo.name,
          password: signupInfo.password,
          phone: signupInfo.phone
        })
      });
      const result = await res.json();

      if (result.success) {
        handleSuccess("Account verified successfully!");
        setTimeout(() => navigate('/login'), 1500);
      } else {
        handleError(result.message || "Invalid OTP");
      }
    } catch (err) {
      handleError("Verification failed");
    }
  };

  return (
    <>
      {/* Font Link (Add to public/index.html) */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"> */}

      {/* OTP MODAL */}
      {showOtpScreen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-gray-200">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">Lock</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Verify Your Account
              </h2>
              <p className="text-gray-600 mt-3">
                We sent a 6-digit code to <br />
                <strong>{signupInfo.email}</strong>
                {signupInfo.phone && ` and ${signupInfo.phone}`}
              </p>
            </div>

            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full text-center text-4xl font-mono tracking-widest py-6 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none transition"
              autoFocus
            />

            <button
              onClick={handleVerifyOtp}
              className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Verify & Continue
            </button>

            <p className="text-center mt-6 text-sm text-gray-500">
              Didn’t receive it? <button className="text-indigo-600 font-medium">Resend OTP</button>
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen flex font-['Inter'] bg-gray-50">
        {/* LEFT - Hero Carousel */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          {slides.map((slide, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img src={slide.image} alt="" className="w-full h-full object-cover brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-16 text-white max-w-2xl">
                <h3 className="text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {slide.title}
                </h3>
                <p className="text-xl text-gray-100 leading-relaxed">{slide.description}</p>
              </div>
            </div>
          ))}

          <div className="absolute top-10 left-12 z-20">
            <h1 className="brand-font text-6xl font-bold text-white">
              Elite Advisers
            </h1>
            <p className="text-lg text-gray-300 mt-1">Practice Management Platform</p>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}
                className={`h-1 rounded-full transition-all ${i === currentSlide ? 'w-16 bg-white' : 'w-10 bg-white/40'}`} />
            ))}
          </div>
        </div>

        {/* RIGHT - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-10">
              <h1 className="brand-font text-5xl font-bold text-gray-900">
                Elite Advisers
              </h1>
              <p className="text-gray-600 mt-2">Join thousands of modern CA firms</p>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-10 border border-gray-200/50">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Create Account
                </h2>
                <p className="text-gray-600 mt-3">Start your 14-day free trial</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text" name="name" value={signupInfo.name} onChange={handleChange}
                    placeholder="CA Rajesh Sharma"
                    className="mt-2 w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Work Email</label>
                  <input
                    type="email" name="email" value={signupInfo.email} onChange={handleChange}
                    placeholder="rajesh@yourfirm.com"
                    className="mt-2 w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text" name="phone" value={signupInfo.phone} onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password" name="password" value={signupInfo.password} onChange={handleChange}
                    placeholder="Create a strong password"
                    className="mt-2 w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Continue → Verify OTP
                </button>
              </form>

              <p className="text-center mt-8 text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Sign In
                </Link>
              </p>

              <p className="text-center mt-6 text-xs text-gray-500">
                By signing up, you agree to our <a href="#" className="text-indigo-600 hover:underline">Terms</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
              </p>
            </div>

            <p className="text-center mt-8 text-sm text-gray-500">
              © 2025 Elite Advisers • Trusted by 5,000+ Chartered Accountants in India
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} theme="light" />
    </>
  );
}

export default Signup;
