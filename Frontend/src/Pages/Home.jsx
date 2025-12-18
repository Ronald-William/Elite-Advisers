import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import {
  Bell,
  LogOut,
  User,
  BookOpen,
  Plus,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  FileText,
  RefreshCw,
  Calendar,
  Download,
  MessageSquare,
  BarChart3,
  Menu,
  X
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <div className="group relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="mt-3 text-5xl font-bold text-gray-900">{value}</p>
        {trend !== undefined && (
          <p className={`mt-3 text-sm font-semibold flex items-center gap-1.5 ${trend >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            <TrendingUp className={`w-5 h-5 ${trend < 0 ? "rotate-180" : ""}`} />
            {Math.abs(trend)}% {trend >= 0 ? "up" : "down"} this month
          </p>
        )}
      </div>
      <div className={`p-5 rounded-3xl ${color} shadow-2xl`}>
        <Icon className="w-10 h-10 text-white" />
      </div>
    </div>
  </div>
);

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    loadDashboard(token);
    fetch("https://adl-api-ten.vercel.app/admin/list")
      .then(res => res.json())
      .then(data => {
        if (data.success) setAdmins(data.admins || []);
      })
      .catch(() => {});
  }, [navigate]);

  const loadDashboard = async (token) => {
    try {
      const res = await fetch("https://adl-api-ten.vercel.app/auth/dashboard", {
        headers: { Authorization: token },
      });
      const result = await res.json();
      if (result.success) {
        setDashboard(result.data);
        const notes = (result.data.problems || []).map((p) => {
          const adminName = p.assignedAdmin?.name || "CA";
          if (p.adminMessage) {
            return { type: "message", text: `Message from ${adminName}: ${p.adminMessage}` };
          }
          return { type: "status", text: `Query "${p.title || "Untitled"}" is now ${p.status || "pending"}` };
        });
        setNotifications(notes.slice(-5).reverse());
      } else {
        handleError(result.message || "Unable to load dashboard");
      }
    } catch (err) {
      handleError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => navigate("/login"), 700);
  };

  const handleAddQuery = () => navigate("/query");
  const goToProfile = () => navigate("/profile");
  const goToLibrary = () => navigate("/library");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-indigo-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-24 h-24 border-8 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-10 text-2xl font-semibold text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <p className="text-2xl font-medium text-gray-700">Dashboard unavailable</p>
        </div>
      </div>
    );
  }

  const { fullName, picture, totals, serviceTrends, problems, assignedCA } = dashboard;
  const solvedCount = totals?.solvedProblems || 0;
  const openCount = Math.max((totals?.totalProblems || 0) - solvedCount, 0);

  // Use real serviceTrends or fallback
  const chartData = serviceTrends?.length > 0
    ? serviceTrends.map((item, i) => ({
        name: item.label || `Service ${i + 1}`,
        queries: item.value || 0
      }))
    : [
        { name: "GST", queries: 92 },
        { name: "ITR", queries: 78 },
        { name: "Audit", queries: 65 },
        { name: "ROC", queries: 58 },
        { name: "Others", queries: 42 }
      ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

        {/* Premium Navbar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-white/20 shadow-xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">

              {/* Logo + Brand */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl bg-white">
                  <img src="/src/assets/logo.png" alt="Elite Advisers" className="w-10 h-10 object-contain" />
                </div>
                <span className="brand-font text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-widest">
                  Elite Advisers
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-4 rounded-2xl hover:bg-gray-100/80 transition-all duration-300 group"
                >
                  <Bell className="w-6 h-6 text-gray-700 group-hover:text-indigo-600" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-xl ring-4 ring-white">
                      {notifications.length}
                    </span>
                  )}
                </button>

                <button onClick={goToProfile} className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-gray-100/80 transition font-medium text-gray-700 hover:text-indigo-600">
                  <User className="w-5 h-5" /> Profile
                </button>

                <button onClick={goToLibrary} className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-gray-100/80 transition font-medium text-gray-700 hover:text-indigo-600">
                  <BookOpen className="w-5 h-5" /> Library
                </button>

                <button onClick={handleAddQuery} className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all shadow-xl">
                  <Plus className="w-5 h-5" /> New Query
                </button>

                <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-red-50 transition font-medium text-gray-700 hover:text-red-600 group">
                  <LogOut className="w-5 h-5 group-hover:text-red-600" /> Logout
                </button>
              </nav>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl">
              <div className="px-6 py-6 space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <img
                    src={picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`}
                    alt="Profile"
                    className="w-14 h-14 rounded-full ring-4 ring-indigo-100"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{fullName}</p>
                    <p className="text-sm text-gray-500">Client Dashboard</p>
                  </div>
                </div>

                <button onClick={goToProfile} className="w-full text-left px-5 py-4 rounded-xl hover:bg-gray-100 flex items-center gap-4 text-lg font-medium">
                  <User className="w-6 h-6" /> Profile
                </button>
                <button onClick={goToLibrary} className="w-full text-left px-5 py-4 rounded-xl hover:bg-gray-100 flex items-center gap-4 text-lg font-medium">
                  <BookOpen className="w-6 h-6" /> Compliance Library
                </button>
                <button onClick={handleAddQuery} className="w-full px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg">
                  + New Query
                </button>
                <button onClick={handleLogout} className="w-full text-left px-5 py-4 rounded-xl hover:bg-red-50 text-red-600 flex items-center gap-4 font-medium">
                  <LogOut className="w-6 h-6" /> Logout
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Notifications Dropdown */}
{showNotifications && (
  <div className="fixed inset-0 z-50" onClick={() => setShowNotifications(false)}>
    <div
      className="absolute right-6 top-24 w-96 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
        <h3 className="text-xl font-bold">Recent Notifications</h3>
        <button
          onClick={() => setShowNotifications(false)}
          className="p-2 hover:bg-white/20 rounded-xl transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto p-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n, i) => (
            <div
              key={i}
              className="group relative flex gap-4 p-5 rounded-2xl hover:bg-gray-50 border border-gray-100 transition-all duration-200"
            >
              <MessageSquare className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-700 leading-relaxed flex-1 pr-8">{n.text}</p>

              {/* Close Button per Notification */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNotifications(prev => prev.filter((_, index) => index !== i));
                }}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg transition-all duration-200"
                title="Dismiss this notification"
              >
                <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center py-16 text-gray-500 font-medium">No new notifications</p>
        )}
      </div>
    </div>
  </div>
)}

        {/* Main Dashboard */}
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={FileText} label="Active Cases" value={totals?.activeCases || 0} color="bg-gradient-to-br from-blue-500 to-cyan-600" trend={12} />
            <StatCard icon={CheckCircle} label="Resolved" value={solvedCount} color="bg-gradient-to-br from-emerald-500 to-teal-600" trend={28} />
            <StatCard icon={Clock} label="Pending" value={openCount} color="bg-gradient-to-br from-amber-500 to-orange-600" trend={-8} />
            <StatCard icon={BarChart3} label="Total Queries" value={totals?.totalProblems || 0} color="bg-gradient-to-br from-purple-500 to-indigo-600" trend={18} />
          </div>

          {/* Chart + CAs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Service Demand Trends</h2>
                  <p className="text-gray-500 mt-2">Most requested compliance services</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" fontWeight="600" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ background: "white", borderRadius: "16px", border: "1px solid #e0e0e0" }} />
                  <Line type="monotone" dataKey="queries" stroke="#6366f1" strokeWidth={5} dot={{ fill: "#6366f1", r: 8 }} activeDot={{ r: 10 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Users className="w-8 h-8 text-indigo-600" />
                Assigned Advisors
              </h2>
              {assignedCA?.length > 0 ? (
                <div className="space-y-6">
                  {assignedCA.map((caId, i) => {
                    const admin = admins.find(a => a._id === caId);
                    return (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={admin?.photo || `https://ui-avatars.com/api/?name=${admin?.name || "CA"}`}
                              alt="CA"
                              className="w-16 h-16 rounded-full ring-4 ring-white shadow-lg"
                            />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white"></div>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{admin?.name || "Advisor"}</p>
                            <p className="text-sm text-gray-600">{admin?.bio || "Your compliance expert"}</p>
                          </div>
                        </div>
                        <span className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full text-sm">
                          Active
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center py-12 text-gray-500">No advisor assigned</p>
              )}
              <Link to="/query" className="block text-center mt-10 text-indigo-600 font-bold text-lg hover:text-indigo-700">
                Request Assignment
              </Link>
            </div>
          </div>

          {/* Active Cases */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Active Cases</h2>
                  <p className="mt-2 opacity-90">Real-time tracking of all your queries</p>
                </div>
                <Link to="/query" className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-gray-100 transition shadow-lg">
                  + Add New Case
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {problems?.length > 0 ? problems.map((item, i) => (
                <div key={i} className="p-8 hover:bg-gray-50/70 transition">
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex-1 space-y-5">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{item.title || "Untitled Query"}</h3>
                        <p className="mt-2 text-gray-600 text-lg">{item.description || "No description"}</p>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {item.assignedAdmin && (
                          <span className="inline-flex items-center gap-3 px-5 py-3 bg-indigo-100 text-indigo-700 rounded-2xl font-semibold">
                            <User className="w-5 h-5" />
                            {admins.find(a => a._id === item.assignedAdmin)?.name || "CA"}
                          </span>
                        )}
                        {item.adminMessage && (
                          <span className="inline-flex items-center gap-3 px-5 py-3 bg-purple-100 text-purple-700 rounded-2xl font-semibold">
                            <MessageSquare className="w-5 h-5" />
                            {item.adminMessage}
                          </span>
                        )}
                        {item.meetupDate && (
                          <span className="inline-flex items-center gap-3 px-5 py-3 bg-emerald-100 text-emerald-700 rounded-2xl font-semibold">
                            <Calendar className="w-5 h-5" />
                            {new Date(item.meetupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        )}
                      </div>

                      {item.attachments?.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {item.attachments.map((f, fi) => (
                            <a key={fi} href={`http://localhost:8080${f.url}`} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-3 px-5 py-3 bg-blue-100 text-blue-700 rounded-2xl font-semibold hover:bg-blue-200 transition">
                              <Download className="w-5 h-5" /> {f.name}
                            </a>
                          ))}
                        </div>
                      )}

                      {item.status === "closed" && (
                        <div className="flex items-center gap-6 pt-4">
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-700">Rate your experience:</span>
                            <select
                              defaultValue={item.rating || ""}
                              onChange={async (e) => {
                                const token = localStorage.getItem("token");
                                const res = await fetch(`http://localhost:8080/auth/query/${item._id}/rate`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json", Authorization: token },
                                  body: JSON.stringify({ rating: Number(e.target.value) })
                                });
                                const result = await res.json();
                                if (result.success) {
                                  handleSuccess("Thank you for your feedback!");
                                  loadDashboard(token);
                                }
                              }}
                              className="px-6 py-3 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 font-semibold"
                            >
                              <option value="">Select Rating</option>
                              {[1,2,3,4,5].map(n => (
                                <option key={n} value={n}>{n} Stars {n === 5 && "Excellent"}</option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={async () => {
                              const token = localStorage.getItem("token");
                              const res = await fetch(`http://localhost:8080/auth/query/${item._id}/reopen`, {
                                method: "POST",
                                headers: { Authorization: token }
                              });
                              const result = await res.json();
                              if (result.success) {
                                handleSuccess("Case reopened");
                                loadDashboard(token);
                              }
                            }}
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl hover:shadow-xl transition"
                          >
                            <RefreshCw className="w-5 h-5" /> Reopen Case
                          </button>
                        </div>
                      )}
                    </div>

                    <div className={`px-8 py-4 rounded-full text-lg font-bold shadow-lg ${
                      item.status === "closed" ? "bg-emerald-500 text-white" :
                      item.status === "in-progress" ? "bg-amber-500 text-white" :
                      "bg-gray-200 text-gray-700"
                    }`}>
                      {item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || "Pending"}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-32">
                  <FileText className="w-32 h-32 text-gray-300 mx-auto mb-6" />
                  <p className="text-2xl font-medium text-gray-500">No active cases</p>
                  <Link to="/query" className="mt-8 inline-block px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-2xl hover:shadow-2xl transition">
                    Start Your First Query
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
}

export default Home;
