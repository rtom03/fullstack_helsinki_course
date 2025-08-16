import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  // const [weather, setWeather] = useState([]);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  console.log(api_key);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setAllCountries(response.data))
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${api_key}`
  //     )
  //     .then(
  //       (response) => console.log("WEATHER DATA:", response.data)
  //       // setWeather(response.data)
  //     );
  // });

  useEffect(() => {
    const results = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(results);
    setFiltered(results);
  }, [query, allCountries]);

  const showInfo = (countryName) => {
    const selected = allCountries.filter(
      (country) => country.name.common === countryName
    );
    setFiltered(selected);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search country..."
      />

      {filtered.length === 1 ? (
        <div>
          <h2>{filtered[0].name.common}</h2>
          <p>
            <strong>Capital:</strong> {filtered[0].capital?.[0]}
          </p>
          <p>
            <strong>Area:</strong> {filtered[0].area} km²
          </p>
          <h4>Languages:</h4>
          <ul>
            {Object.values(filtered[0].languages || {}).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={filtered[0].flags.png}
            alt={`Flag of ${filtered[0].name.common}`}
            width="150"
          />
          {/* <p>{weather}</p> */}
        </div>
      ) : (
        <ul>
          {filtered.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => showInfo(country.name.common)}>
                Show
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
