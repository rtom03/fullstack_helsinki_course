const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VOTE": {
      const id = action.payload.id;
      const voteAnecdote = state.find((x) => x.id === id);
      const changedAnecdotes = {
        ...voteAnecdote,
        votes: voteAnecdote.votes + 1,
      };
      return [...state]
        .map((x) => (x.id === id ? changedAnecdotes : x))
        .sort((a, b) => b.votes - a.votes);
    }
    case "ADD_ANECDOTE": {
      const content = action.payload.content;
      const newAnecdote = { content: content, id: getId(), votes: 0 };
      return state.concat(newAnecdote);
    }
    default: {
      const highestVote = state.sort((a, b) => (b.votes > a.votes ? a : b));
      return highestVote;
    }
  }
};

export const vote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: { id },
  };
};
export const appendAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    payload: { content },
  };
};
export default reducer;
