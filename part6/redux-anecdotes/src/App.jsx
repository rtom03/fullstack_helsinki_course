import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteFiltering from "./components/AnecdoteFiltering";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "./services/anecdotesService";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // getAnecdotes().then((res) => dispatch(allAnecdotes(res)));
  //   dispatch(initializeAnecdotes());
  // }, [dispatch]);
  const anecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes(),
  });
  console.log(anecdotes);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFiltering />
      <AnecdoteList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
