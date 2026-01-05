import { useDispatch, useSelector } from "react-redux";
import { addVote, notification } from "../reducers/anecdoteReducer";
import { updateVote } from "../services/anecdotesService";

const AnecdoteList = () => {
  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter((x) => x.content.includes(filter));
    }
    return anecdotes;
  });

  const dispatch = useDispatch();

  const vote = async (id) => {
    const eVote = await updateVote(id);
    dispatch(addVote(eVote));
    setTimeout(() => {
      dispatch(
        notification({
          message: "",
          display: false,
        })
      );
    }, 3000);
    dispatch(
      notification({
        message: `voted for ${anecdotesList.map((ls) =>
          ls.id === id ? ls.content : ""
        )}`,
        display: true,
      })
    );
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
