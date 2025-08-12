import { useState } from "react";
import PhoneBook from "./components/PhoneBook";
import Filter from "./components/Filter";
import Form from "./components/Form";
import { create, getAll, recycle } from "./services/personsService.js";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "456-980-201", id: "io9" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  getAll().then((response) => setPersons(response.data));

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
      create(newObject).then((response) =>
        setPersons(persons.concat(response.data))
      );
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

  const handleRecycle = (id) => {
    const person = persons.filter((person) => person.id === id);

    window.confirm(`Delete ${person.map((p) => p.name).join(", ")}?`)
      ? recycle(id).then((response) => response.data)
      : "";
    console.log(person);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={getSearch}>
        filter shown with
        <input type="text" value={search} onChange={handleSearchChange} />
      </form>
      <Form
        value={newName}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        numValue={newNumber}
        handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>
      {!searchData.length ? (
        <>
          <PhoneBook phonebook={persons} handleDelete={handleRecycle} />
        </>
      ) : (
        <>
          <Filter filterData={searchData} />
        </>
      )}
    </div>
  );
};

export default App;
