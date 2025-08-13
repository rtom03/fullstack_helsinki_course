import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Fetch all countries once when component mounts
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setAllCountries(response.data))
      .catch(console.error);
  }, []);

  // Filter whenever query changes
  useEffect(() => {
    const results = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  }, [query, allCountries]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Type part of country name"
      />
      <ul>
        {query && filtered.map((c) => <li key={c.cca3}>{c.name.common}</li>)}
      </ul>
    </div>
  );
}

export default App;
