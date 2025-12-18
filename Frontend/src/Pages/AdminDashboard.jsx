import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import {
  Bell,
  LogOut,
  User,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Plus,
  Edit3,
  Save,
  X,
  Star,
  Calendar,
  Download,
  MessageSquare,
  BookOpen,
  TrendingUp,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  const [profile, setProfile] = useState({ name: "", email: "", photo: "", bio: "" });
  const [problems, setProblems] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [clock, setClock] = useState(new Date());
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [article, setArticle] = useState({ title: "", tags: "", summary: "", citation: "", link: "" });

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-login");
      return;
    }
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, [adminToken, navigate]);

  useEffect(() => {
    if (!adminToken) return;
    fetch("https://adl-api-ten.vercel.app/admin/list")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAdmins(data.admins || []);
          const me = data.admins?.find(a => a.email === profile.email) || data.admins?.[0];
          if (me && !profile.name) setProfile(prev => ({ ...prev, ...me }));
        }
      })
      .catch(() => {});
    loadProblems();
  }, []);

  const loadProblems = async () => {
    try {
      const res = await fetch("https://adl-api-ten.vercel.app/admin/problems", {
        headers: { Authorization: adminToken },
      });
      const data = await res.json();
      if (data.success) {
        setProblems(data.problems || []);
      } else {
        handleError(data.message || "Failed to load problems");
      }
    } catch (err) {
      handleError("Server unavailable");
    }
  };

  const handleProfileSave = async () => {
    try {
      const res = await fetch("https://adl-api-ten.vercel.app/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: adminToken },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        handleSuccess("Profile updated successfully");
        setShowProfileForm(false);
      } else {
        handleError(data.message || "Update failed");
      }
    } catch (err) {
      handleError("Server unavailable");
    }
  };

  const updateProblem = async (problemId, payload) => {
    try {
      const res = await fetch(`https://adl-api-ten.vercel.app/admin/problems/${problemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: adminToken },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        handleSuccess("Query updated");
        loadProblems();
      } else {
        handleError(data.message || "Update failed");
      }
    } catch (err) {
      handleError("Server unavailable");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    handleSuccess("Logged out");
    navigate("/admin-login");
  };

  const handleArticleSubmit = async () => {
    if (!article.title || !article.summary) return handleError("Title and summary required");
    try {
      const res = await fetch("https://adl-api-ten.vercel.app/library", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: adminToken },
        body: JSON.stringify(article),
      });
      const data = await res.json();
      if (data.success) {
        handleSuccess("Article published to library");
        setArticle({ title: "", tags: "", summary: "", citation: "", link: "" });
      } else {
        handleError(data.message || "Failed to add article");
      }
    } catch (err) {
      handleError("Server unavailable");
    }
  };

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

        {/* Header - Responsive */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Logo + Title */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-white">
                  <img src="/src/assets/logo.png" alt="Elite Advisers" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Compliance Advisor Panel</p>
                  <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                    Elite Advisers Admin
                  </h1>
                </div>
              </div>

              {/* Profile + Clock + Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Profile info - hidden on mobile, shown on md+ */}
                <div className="hidden md:flex items-center gap-4">
                  <img
                    src={profile.photo || `https://ui-avatars.com/api/?name=${profile.name || "CA"}&background=6366f1&color=fff&bold=true`}
                    alt="admin"
                    className="w-12 h-12 rounded-full ring-2 ring-indigo-100 shadow-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{profile.name || "Compliance Advisor"}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatTime(clock)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowProfileForm(!showProfileForm)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition"
                  >
                    <Edit3 className="w-4 h-4" />
                    {showProfileForm ? "Cancel" : "Edit Profile"}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium rounded-xl hover:shadow-lg transition"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

          {/* Profile Edit Card */}
          {showProfileForm && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <User className="w-7 h-7 text-indigo-600" />
                  Update Profile
                </h2>
                <button onClick={() => setShowProfileForm(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <img
                      src={profile.photo || `https://ui-avatars.com/api/?name=${profile.name || "CA"}`}
                      alt="admin"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl ring-8 ring-indigo-100 shadow-xl object-cover"
                    />
                    <div className="flex-1 space-y-4 w-full">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                        <input
                          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          placeholder="Your professional name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Photo URL</label>
                        <input
                          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                          value={profile.photo}
                          onChange={(e) => setProfile({ ...profile, photo: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Professional Bio</label>
                    <textarea
                      rows={4}
                      className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="e.g. 10+ years in GST & Corporate Audit | CA | Ex-Big4"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleProfileSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
                    >
                      <Save className="w-5 h-5" /> Save Profile
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Queries</span>
                      <span className="font-bold text-indigo-600">{problems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assigned to You</span>
                      <span className="font-bold text-emerald-600">{problems.filter(p => p.assignedAdmin?._id === profile._id).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unassigned</span>
                      <span className="font-bold text-amber-600">{problems.filter(p => !p.assignedAdmin).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closed Today</span>
                      <span className="font-bold text-purple-600">{problems.filter(p => p.status === "closed").length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Client Queries */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 overflow-hidden">
            <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10" />
                Client Queries
              </h2>
              <p className="mt-1 text-sm sm:text-base opacity-90">Manage and respond to compliance requests</p>
            </div>

            <div className="divide-y divide-gray-100">
              {problems.filter(p => p.status !== "closed").length > 0 ? (
                problems.filter(p => p.status !== "closed").map((p) => (
                  <div key={p.problemId} className="p-6 sm:p-8 hover:bg-gray-50/70 transition">
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{p.title}</h3>
                        <p className="mt-2 text-base sm:text-lg text-gray-600">{p.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2 sm:gap-3 text-sm">
                          <span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-xl font-medium">
                            {p.userName} • {p.userEmail}
                          </span>
                          {p.assignedAdmin && (
                            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl font-medium">
                              Assigned to {p.assignedAdmin.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {p.attachments?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {p.attachments.map((f, fi) => (
                            <a
                              key={fi}
                              href={`http://localhost:8080${f.url}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition"
                            >
                              <Download className="w-4 h-4" /> {f.name}
                            </a>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                        <div>
                          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" /> Message to Client
                          </label>
                          <textarea
                            rows={3}
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none"
                            placeholder="Type your response or update..."
                            value={p.adminMessage || ""}
                            onChange={(e) => setProblems(prev => prev.map(pr => pr.problemId === p.problemId ? { ...pr, adminMessage: e.target.value } : pr))}
                          />
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                              <Calendar className="w-5 h-5" /> Schedule Meetup
                            </label>
                            <input
                              type="date"
                              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                              value={p.meetupDate ? new Date(p.meetupDate).toISOString().substring(0,10) : ""}
                              onChange={(e) => setProblems(prev => prev.map(pr => pr.problemId === p.problemId ? { ...pr, meetupDate: e.target.value } : pr))}
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-600">Status</label>
                              <select
                                value={p.status || "pending"}
                                onChange={(e) => setProblems(prev => prev.map(pr => pr.problemId === p.problemId ? { ...pr, status: e.target.value } : pr))}
                                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 font-medium"
                              >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="closed">Closed</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Assign To</label>
                              <select
                                value={p.assignedAdmin?._id || ""}
                                onChange={(e) => setProblems(prev => prev.map(pr => pr.problemId === p.problemId ? { ...pr, assignTo: e.target.value || null } : pr))}
                                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 font-medium"
                              >
                                <option value="">Unassigned</option>
                                {admins.map((a) => (
                                  <option key={a._id} value={a._id}>{a.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                        <div className={`px-6 py-2 rounded-full text-base font-bold shadow-md ${
                          p.status === "closed" ? "bg-emerald-500 text-white" :
                          p.status === "in-progress" ? "bg-amber-500 text-white" :
                          "bg-gray-200 text-gray-700"
                        }`}>
                          {p.status?.charAt(0).toUpperCase() + p.status?.slice(1) || "Pending"}
                        </div>
                        <button
                          onClick={() => updateProblem(p.problemId, {
                            adminMessage: p.adminMessage,
                            status: p.status,
                            assignTo: p.assignTo,
                            meetupDate: p.meetupDate
                          })}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
                        >
                          <Save className="w-5 h-5" /> Update Query
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 sm:py-24">
                  <AlertCircle className="w-20 h-20 sm:w-28 sm:h-28 text-gray-300 mx-auto mb-4 sm:mb-6" />
                  <p className="text-xl sm:text-2xl font-medium text-gray-500">No queries assigned yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Publish Article */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
              Publish Compliance Article
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">Article Title</label>
                  <input
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    placeholder="e.g., GST Input Tax Credit – Latest Amendments 2025"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tags (comma separated)</label>
                  <input
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    value={article.tags}
                    onChange={(e) => setArticle({ ...article, tags: e.target.value })}
                    placeholder="GST, ITC, Section 16, Finance Act 2025"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Official Citation</label>
                  <input
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    value={article.citation}
                    onChange={(e) => setArticle({ ...article, citation: e.target.value })}
                    placeholder="Section 16(2)(aa) of CGST Act"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Reference Link (optional)</label>
                  <input
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    value={article.link}
                    onChange={(e) => setArticle({ ...article, link: e.target.value })}
                    placeholder="https://cbic.gov.in/..."
                  />
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">Summary (for users)</label>
                  <textarea
                    rows={10}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none"
                    value={article.summary}
                    onChange={(e) => setArticle({ ...article, summary: e.target.value })}
                    placeholder="Explain the key changes in simple terms..."
                  />
                </div>
                <div className="text-right">
                  <button
                    onClick={handleArticleSubmit}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition"
                  >
                    <Plus className="w-6 h-6" /> Publish to Library
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Closed Cases */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              Closed Cases & Client Feedback
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {problems.filter(p => p.status === "closed").length > 0 ? (
                problems.filter(p => p.status === "closed").map((p) => (
                  <div key={p.problemId} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border border-emerald-100">
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">{p.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">by {p.userName}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-600">
                        {p.rating ? `${p.rating} Stars` : "—"}
                      </span>
                      {p.rating ? <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500 fill-current" /> : <Star className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />}
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-lg sm:text-xl text-gray-500 py-12 sm:py-16">
                  No closed cases yet. Keep up the great work!
                </p>
              )}
            </div>
          </div>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
}

export default AdminDashboard;