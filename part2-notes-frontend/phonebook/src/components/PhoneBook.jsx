import React from "react";

const PhoneBook = ({ phonebook }) => {
  return (
    <div>
      {phonebook.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};

export default PhoneBook;
