import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    lists: [],
    isLoggedIn: false,
  },
  reducers: {
    logIn: (state, action) => {
      state.email = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.email = null;
      state.lists = [];
      state.isLoggedIn = false;
    },
    createList: (state, action) => {
      const existingListIndex = state.lists.findIndex(
        (list) => list.listName.toLowerCase() === action.payload.toLowerCase()
      );

      if (existingListIndex === -1) {
        state.lists.push({
          listName: action.payload,
          movies: [],
        });
        toast.success("List created!");
      } else {
        toast.error("A list with that name already exists!");
      }
    },
    updateListName: (state, action) => {
      const { oldListName, newListName } = action.payload;
      const existingListIndex = state.lists.findIndex(
        (list) => list.listName.toLowerCase() === newListName.toLowerCase()
      );

      if (existingListIndex === -1) {
        const listIndex = state.lists.findIndex(
          (list) => list.listName === oldListName
        );
        if (listIndex !== -1) {
          state.lists[listIndex].listName = newListName;
          toast.success("List name updated!");
        }
      } else {
        toast.error("A list with that name already exists!");
      }
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter(
        (list) => list.listName !== action.payload
      );
    },
    addMovieToList: (state, action) => {
      const { listName, movie } = action.payload;
      const list = state.lists.find((list) => list.listName === listName);
      if (list) {
        const movieExists = list.movies.find((m) => m.imdbID === movie.imdbID);
        if (movieExists) {
          toast.error(`Movie already exists in the ${list} list! `);
        } else {
          list.movies.push(movie);
          toast.success("Movie added to the list!");
        }
      }
    },
    removeMovieFromList: (state, action) => {
      const { listName, movieId } = action.payload;
      const list = state.lists.find((list) => list.listName === listName);
      if (list) {
        list.movies = list.movies.filter((movie) => movie.imdbID !== movieId);
      }
    },
  },
});

export const {
  logIn,
  logOut,
  createList,
  removeList,
  addMovieToList,
  removeMovieFromList,
  updateListName,
} = userSlice.actions;

export default userSlice.reducer;
