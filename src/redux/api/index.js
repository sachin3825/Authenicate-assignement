import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://www.omdbapi.com",
  }),
  endpoints: (builder) => ({
    fetchMovie: builder.mutation({
      query: (movieTitle) => ({
        url: "/",
        params: {
          apikey: "70f19e51",
          t: movieTitle,
        },
      }),
    }),
  }),
});

export const { useFetchMovieMutation } = movieApi;
