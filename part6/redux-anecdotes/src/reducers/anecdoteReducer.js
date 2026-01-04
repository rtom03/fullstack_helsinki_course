import { createSlice } from "@reduxjs/toolkit";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const voteAnecdote = state.find((x) => x.id === id);
      const changedAnecdotes = {
        ...voteAnecdote,
        votes: voteAnecdote.votes + 1,
      };
      return [...state]
        .map((x) => (x.id === id ? changedAnecdotes : x))
        .sort((a, b) => b.votes - a.votes);
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },

    allAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdotes(state, action) {
      const search = action.payload;
      return (state = search);
    },
  },
});

const notiSlice = createSlice({
  name: "noti",
  initialState: [],
  reducers: {
    notification(state, action) {
      return [action.payload];
    },
  },
});

export const anecdotesReducer = anecdotesSlice.reducer;
export const filterReducer = filterSlice.reducer;
export const notificationReducer = notiSlice.reducer;

export const { filterAnecdotes } = filterSlice.actions;
export const { notification } = notiSlice.actions;
export const { addVote, addAnecdote, allAnecdotes } = anecdotesSlice.actions;
