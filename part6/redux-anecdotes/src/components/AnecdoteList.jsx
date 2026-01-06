import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  notify,
  setNotification,
  vote,
} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotesList = useSelector(({ anecdotes, filter, noti }) => {
    if (filter) {
      return anecdotes.filter((x) => x.content.includes(filter));
    }
    return anecdotes;
  });
  const dispatch = useDispatch();

  const iVote = async (id) => {
    let xVote = 1;
    const slVote = anecdotesList.map((ls) => (ls.id === id ? ls.content : ""));
    dispatch(vote(id, xVote));
    dispatch(notify(`Voted for ${slVote}`, 3000));
  };
  return (
    <div>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => iVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      {/* <button onClick={()=>console.log(anecdotes)}>click</button> */}
    </div>
  );
};

export default AnecdoteList;
