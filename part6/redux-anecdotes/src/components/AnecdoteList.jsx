import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  notify,
  setNotification,
  vote,
} from "../reducers/anecdoteReducer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateVote } from "../services/anecdotesService";

const AnecdoteList = () => {
  const anecdotesList = useSelector(({ anecdotes, filter, noti }) => {
    if (filter) {
      return anecdotes.filter((x) => x.content.includes(filter));
    }
    return anecdotes;
  });
  // const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const iVote = async (id) => {
    let vote = 1;
    const slVote = anecdotesList.map((ls) => (ls.id === id ? ls.content : ""));
    voteMutation.mutate({ id, vote });
    // dispatch(vote(id, xVote));
    // dispatch(notify(`Voted for ${slVote}`, 3000));
  };

  const anecdotes = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  const anecdotesData = anecdotes;
  // console.log(anecdotes.isSuccess);

  return (
    <div>
      {!anecdotesData.isSuccess ? (
        <>
          {" "}
          <h2>anecdote service not available due to problem in the server</h2>
        </>
      ) : (
        <>
          {" "}
          {anecdotesData.data.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => iVote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))}{" "}
        </>
      )}

      {/* <button onClick={()=>console.log(anecdotes)}>click</button> */}
    </div>
  );
};

export default AnecdoteList;
