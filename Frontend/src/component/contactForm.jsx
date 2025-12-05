import { useState } from "react";
import {BlockReveal,TextReveal} from "../component/ScrollReveal";
import axios from "axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/contact", formData);
      alert("Your request has been submitted!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send. Try again later.");
    }
  };

  return (
    <BlockReveal delay={0.2}>
      <form
        onSubmit={handleSubmit}
        className="bg-[#0C2B4E] p-10 rounded-3xl shadow-2xl"
      >
        <h3 className="text-3xl font-bold text-white mb-6">
          <TextReveal text="Request a Callback" />
        </h3>

        <p className="text-[#F4F4F4] mb-8">
          Fill out the form and we'll get back to you within 24 hours
        </p>

        <div className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 rounded-xl focus:ring-2 focus:ring-[#1A3D64] focus:border-transparent outline-none backdrop-blur-sm"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 rounded-xl focus:ring-2 focus:ring-[#1A3D64] focus:border-transparent outline-none backdrop-blur-sm"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 rounded-xl focus:ring-2 focus:ring-[#1A3D64] focus:border-transparent outline-none backdrop-blur-sm"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 rounded-xl focus:ring-2 focus:ring-[#1A3D64] focus:border-transparent outline-none backdrop-blur-sm"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#F4F4F4] text-[#0C2B4E] px-6 py-4 rounded-xl font-bold text-lg hover:bg-white transition transform hover:scale-105"
          >
            Submit Request
          </button>
        </div>
      </form>
    </BlockReveal>
  );
}
