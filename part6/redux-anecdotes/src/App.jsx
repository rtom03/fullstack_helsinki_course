import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteFiltering from "./components/AnecdoteFiltering";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { getAnecdotes } from "./services/anecdotesService";
import { useDispatch } from "react-redux";
import { allAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAnecdotes().then((res) => dispatch(allAnecdotes(res)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFiltering />
      <AnecdoteList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
