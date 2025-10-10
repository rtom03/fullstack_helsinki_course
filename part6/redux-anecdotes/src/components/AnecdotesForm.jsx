import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    let text = e.target.anecdote.value;
    dispatch(appendAnecdote(text));
    e.target.anecdote.value = "";
  };
  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdotesForm;
