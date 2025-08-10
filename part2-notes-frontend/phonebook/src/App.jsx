import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "456-980-201" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };
    const existedName = persons.some((name) => name.name === newObject.name);
    if (existedName) {
      alert(`${newObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const getSearch = (event) => {
    event.preventDefault();
    const existData = persons.filter(
      (ps) => ps.name.toLocaleLowerCase() === search
    );
    console.log(existData);
    setSearchData(searchData.concat(existData));
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={getSearch}>
        filter shown with
        <input type="text" value={search} onChange={handleSearchChange} />
      </form>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleChange} />
          <br />
          number:
          <input type="text" value={newNumber} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {!searchData.length ? (
        <>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
        </>
      ) : (
        <>
          {searchData.map((ps) => (
            <li key={ps.name}>
              {ps.name} {ps.number}
            </li>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
