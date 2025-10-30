import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createNew } from "../services/anecdotesService";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (e) => {
    e.preventDefault();
    let text = e.target.anecdote.value;
    e.target.anecdote.value = "";
    const newItem = await createNew(text);
    dispatch(addAnecdote(newItem));
  };

  return (
    <form onSubmit={newAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdotesForm;
