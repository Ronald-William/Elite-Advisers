import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    picture: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    loadProfile(token);
  }, [navigate]);

  const loadProfile = async (token) => {
    try {
      const res = await fetch("https://adl-api-ten.vercel.app/auth/me", {
        headers: { Authorization: token },
      });
      const result = await res.json();
      if (result.success) {
        setForm({
          name: result.user.name || "",
          email: result.user.email || "",
          phone: result.user.phone || "",
          password: "",
          picture: result.user.picture || "",
        });
      } else {
        handleError(result.message || "Unable to load profile");
      }
    } catch (err) {
      handleError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return handleError("Please login again");

    try {
      const res = await fetch("https://adl-api-ten.vercel.app/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        handleSuccess("Profile updated");
        localStorage.setItem("loggedInUser", form.name || "");
        setTimeout(() => navigate("/home"), 800);
      } else {
        handleError(result.message || "Unable to update profile");
      }
    } catch (err) {
      handleError("Update failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-sm text-gray-600 mb-6">Update your personal details and avatar.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3"
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Profile Picture URL</label>
                <input
                  type="text"
                  name="picture"
                  value={form.picture}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3"
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="px-5 py-3 rounded-lg border border-gray-200 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}

export default EditProfile;

