import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

function Library() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (query = "", tagFilter = "") => {
    try {
      setLoading(true);
      const res = await fetch(`https://adl-api-ten.vercel.app/library?q=${encodeURIComponent(query)}&tag=${encodeURIComponent(tagFilter)}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      } else {
        handleError("Unable to load library");
      }
    } catch (err) {
      handleError("Server unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(q, tag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => loadData(q, tag);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Knowledge Library</p>
          <h1 className="text-2xl font-semibold text-gray-900">Stay informed & compliant</h1>
          <p className="text-sm text-gray-600">Quick access to GST rules, Income Tax Act sections, and compliance basics.</p>
        </div>
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100"
        >
          ← Back to Dashboard
        </button>
      </header>

      <main className="px-6 py-6 space-y-6">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-wrap gap-3 items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search laws, sections, or tags..."
            className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-4 py-2"
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="">All tags</option>
            <option value="GST">GST</option>
            <option value="Income Tax">Income Tax</option>
            <option value="Compliance">Compliance</option>
            <option value="TDS">TDS</option>
            <option value="PF">PF</option>
            <option value="ESI">ESI</option>
            <option value="Companies Act">Companies Act</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Search
          </button>
          <div className="text-sm text-gray-500">Powered by MongoDB-style text + tag search</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && (
            <div className="col-span-full text-center text-sm text-gray-500">Loading library...</div>
          )}
          {!loading && items.map((card) => (
            <article key={card.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {card.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">{card.summary}</p>
              <p className="text-xs text-gray-500 mb-3">{card.citation}</p>
              <a
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                href={card.link}
                target="_blank"
                rel="noreferrer"
              >
                View article ↗
              </a>
            </article>
          ))}
          {!loading && items.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-500">
              No matches yet. Try another search or tag.
            </div>
          )}
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default Library;

