import { useState } from "react";
import "./App.css";
import { useDebounce } from "./useDebounce";

function App() {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);

  const fetchData = async (query) => {
    if (!query.trim()) return;
    const res = await fetch("https://dummyjson.com/recipes/search?q=" + query);
    const jsonData = await res.json();
    setRecipes(jsonData?.recipes);
  };

  const debouncedFetch = useDebounce(fetchData, 300);

  return (
    <div>
      <h1>Auto Complete Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            debouncedFetch(e.target.value);
          }}
          onFocus={() => setShowRecipes(true)}
          onBlur={() => setShowRecipes(false)}
        />
        {showRecipes && input && (
          <div className="search-results">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="search-result">
                {recipe.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
