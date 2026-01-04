import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createNew } from "../services/anecdotesService";

const AnecdotesForm = () => {
  const dispatch = useDispatch();
  const getId = () => `hdy45${100000 * Math.random().toFixed(0)}`;

  const newAnecdote = async (e) => {
    e.preventDefault();
    let text = e.target.anecdote.value;
    let id = getId();
    e.target.anecdote.value = "";
    let item = await createNew(text);
    dispatch(addAnecdote(item));
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
