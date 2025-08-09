import { useState } from "react";

function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newNotes, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNote = {
      content: newNotes,
      important: Math.random() < 5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(newNote));
    setNewNotes("");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewNotes(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <>
      <div>
        {notesToShow.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </div>
      <button onClick={() => setShowAll(!showAll)}>
        {" "}
        show {showAll ? "important" : "all"}
      </button>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={newNotes} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
}

export default App;
