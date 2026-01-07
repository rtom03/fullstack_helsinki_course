import { useDispatch } from "react-redux";
import { appendAnnecdote } from "../reducers/anecdoteReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../services/anecdotesService";

const AnecdotesForm = () => {
  const dispatch = useDispatch();
  // const getId = () => `hdy45${100000 * Math.random().toFixed(0)}`;
  const queryClient = useQueryClient();

  const anecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  const newAnecdote = async (e) => {
    e.preventDefault();
    let text = e.target.anecdote.value;
    e.target.anecdote.value = "";
    // dispatch(appendAnnecdote(text));
    anecdoteMutation.mutate(text);
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
