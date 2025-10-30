import { configureStore } from "@reduxjs/toolkit";
import {
  anecdotesReducer,
  filterReducer,
  notificationReducer,
} from "./anecdoteReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    noti: notificationReducer,
  },
});

export default store;
