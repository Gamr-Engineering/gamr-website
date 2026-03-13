import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InsightSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/insights/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search insights, tags, keywords..."
          className="w-full bg-gray-900 border border-white/10 text-white placeholder-gray-500 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-blue-500 transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full disabled:opacity-50 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default InsightSearch;
