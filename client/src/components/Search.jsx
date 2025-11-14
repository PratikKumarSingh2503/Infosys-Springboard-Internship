import { useState } from "react";
import { searchProducts } from "../api/auth";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const res = await searchProducts(query);
    setResults(res.data.data);
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
          <Link to={`/product/${product._id}`} key={product._id} className="border p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover"/>
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
