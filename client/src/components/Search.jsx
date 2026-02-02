import { useState } from "react";
import { searchProducts } from "../api/auth";
import { Card } from "./Card";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await searchProducts(query);
      setResults(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      setResults([]);
    }
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mt-2">Search</button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {results.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Search;
