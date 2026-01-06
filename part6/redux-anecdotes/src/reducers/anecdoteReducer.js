import { createSlice } from "@reduxjs/toolkit";
import {
  createNew,
  getAnecdotes,
  updateVote,
} from "../services/anecdotesService";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id;
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
    setNotification(state, action) {
      console.log(action.payload);
      return [action.payload];
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(allAnecdotes(anecdotes));
  };
};

export const appendAnnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const vote = (id, vote) => {
  return async (dispatch) => {
    const iVote = await updateVote(id, vote);
    dispatch(addVote(iVote));
  };
};

export const notify = (content, timer) => {
  return async (dispatch) => {
    dispatch(setNotification(content));

    setTimeout(() => {
      dispatch(clearNotification());
    }, timer);
  };
};

export const anecdotesReducer = anecdotesSlice.reducer;
export const filterReducer = filterSlice.reducer;
export const notificationReducer = notiSlice.reducer;

export const { filterAnecdotes } = filterSlice.actions;
export const { setNotification, clearNotification } = notiSlice.actions;
export const { addAnecdote, addVote, allAnecdotes } = anecdotesSlice.actions;
