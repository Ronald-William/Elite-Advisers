import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    { title: "Welcome Back", description: "Your audits, teams, and deadlines — all in one place", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=90" },
    { title: "Work Together, Seamlessly", description: "Real-time collaboration across partners and staff", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=90" },
    { title: "Smarter Audits with AI", description: "Detect risks and insights automatically", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=90" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => setLoginInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError('Please fill in all fields');

    try {
      const res = await fetch("https://adl-api-ten.vercel.app/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
      });
      const result = await res.json();

      if (result.success) {
        handleSuccess(`Welcome back, ${result.name}!`);
        localStorage.setItem('token', result.jwtToken);
        localStorage.setItem('loggedInUser', result.name);
        setTimeout(() => navigate('/home'), 1200);
      } else {
        handleError(result.message || "Invalid credentials");
      }
    } catch (err) {
      handleError("Connection failed. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex font-['Inter'] bg-gray-50">
        {/* LEFT - Hero Carousel */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          {slides.map((slide, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img src={slide.image} alt="" className="w-full h-full object-cover brightness-75" />
              <div className="absolute mb-20 inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 p-16 text-white max-w-2xl">
                <h3 className="text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {slide.title}
                </h3>
                <p className="text-xl text-gray-100 leading-relaxed">{slide.description}</p>
              </div>
            </div>
          ))}

          {/* Logo */}
          <div className="absolute top-10 left-12 z-20">
            <h1 className="text-6xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Elite Advisers
            </h1>
            <p className="text-lg text-gray-300 mt-1">Practice Management Platform</p>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}
                className={`h-1 rounded-full transition-all ${i === currentSlide ? 'w-16 bg-white' : 'w-10 bg-white/40'}`} />
            ))}
          </div>
        </div>

        {/* RIGHT - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md">
            
            <div className="lg:hidden text-center mb-6 md:mb-10">
              <h1 className="brand-font text-3xl sm:text-4xl md:text-5xl text-gray-900">
                Elite Advisers
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Welcome back to your practice</p>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-200/50">
              <div className="text-center mb-6 md:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Sign In
                </h2>
                <p className="text-gray-600 mt-2 md:mt-3 text-sm md:text-base">Access your Elite Advisers dashboard</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email" name="email" value={loginInfo.email} onChange={handleChange}
                    placeholder="name@yourfirm.com"
                    className="mt-2 w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-300 text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password" name="password" value={loginInfo.password} onChange={handleChange}
                    placeholder="••••••••"
                    className="mt-2 w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-300 text-sm md:text-base"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 md:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Sign In
                </button>
              </form>

              <p className="text-center mt-8 text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Create one
                </Link>
              </p>

              {/* ⭐ ADMIN LOGIN BUTTON ADDED HERE ⭐ */}
              <div className="text-center mt-4">
                <Link
                  to="/admin-login"
                  className="inline-block px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-200"
                >
                  Admin Login
                </Link>
              </div>

            </div>

            <p className="text-center mt-8 text-sm text-gray-500">
              © 2025 Elite Advisers • Trusted by 5,000+ CA firms in India
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} theme="light" />
    </>
  );
}

export default Login;
