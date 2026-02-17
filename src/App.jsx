import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/recipes/search?q=");
      const jsonData = await res.json();
      setRecipes(jsonData?.recipes);
    };

    fetchData();
  }, [input]);

  console.log(input);
  console.log(recipes);

  return (
    <div>
      <h1>Auto Complete Search</h1>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default App;
