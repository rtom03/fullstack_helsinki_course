import { useDispatch } from "react-redux";
import { appendAnnecdote } from "../reducers/anecdoteReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../services/anecdotesService";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const AnecdotesForm = () => {
  const dispatch = useDispatch();
  // const getId = () => `hdy45${100000 * Math.random().toFixed(0)}`;
  const queryClient = useQueryClient();
  const { notificationDispatch } = useContext(NotificationContext);

  const anecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: () => {
      notificationDispatch({
        type: "NOTIFY",
        payload: `anecdotes length must not be less than 5`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "NULLIFY" });
      }, 6000);
    },
  });
  const newAnecdote = async (e) => {
    e.preventDefault();
    let text = e.target.anecdote.value;
    console.log(text.length);
    e.target.anecdote.value = "";
    // dispatch(appendAnnecdote(text));

    anecdoteMutation.mutate(text);
    notificationDispatch({
      type: "NOTIFY",
      payload: `Added ${text} to anecdotes`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "NULLIFY" });
    }, 3000);
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
