import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteFiltering from "./components/AnecdoteFiltering";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // getAnecdotes().then((res) => dispatch(allAnecdotes(res)));
    dispatch(initializeAnecdotes());
  }, [dispatch]);

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
