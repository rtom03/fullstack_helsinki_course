import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter((x) =>
        filter.Capitalized()
          ? x.content.includes(filter.Capitalized())
          : x.content.includes(filter)
      );
    }
    return anecdotes;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };
  return (
    <div>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      {/* <button onClick={()=>console.log(anecdotes)}>click</button> */}
    </div>
  );
};

export default AnecdoteList;
