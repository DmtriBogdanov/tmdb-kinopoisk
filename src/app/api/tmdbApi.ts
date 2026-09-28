import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import type {
  DiscoverMoviesParams,
  GenresResponse,
  MovieCredits,
  MovieDetails,
  MoviesResponse,
  SimilarMoviesResponse,
} from "@/common/types";

import {
  handleErrors,
  handleSchemaError,
} from "@/common/utils";

import {
  genresResponseSchema,
  movieCreditsSchema,
  movieDetailsSchema,
  moviesResponseSchema,
  similarMoviesResponseSchema,
} from "@/common/schemas";

export type MovieCategory =
  | "popular"
  | "now-playing"
  | "top-rated"
  | "upcoming";

const categoryEndpoints: Record<
  MovieCategory,
  string
> = {
  popular: "popular",
  "now-playing": "now_playing",
  "top-rated": "top_rated",
  upcoming: "upcoming",
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,

  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",

  baseQuery: async (
    args,
    api,
    extraOptions
  ) => {
    const result = await baseQuery(
      args,
      api,
      extraOptions
    );

    if (result.error) {
      handleErrors(result.error);
    }

    return result;
  },

  catchSchemaFailure: (error) => {
    handleSchemaError(error);

    return {
      status: "CUSTOM_ERROR" as const,
      error: "Schema validation failed",
    };
  },

  endpoints: (build) => ({
    getMoviesByCategory: build.query<
      MoviesResponse,
      {
        category: MovieCategory;
        page: number;
      }
    >({
      query: ({
        category,
        page,
      }) => ({
        method: "get",
        url: `/movie/${categoryEndpoints[category]}`,
        params: {
          language: "ru-RU",
          page,
        },
      }),

      responseSchema: moviesResponseSchema,
    }),

    searchMovies: build.query<
      MoviesResponse,
      {
        query: string;
        page: number;
      }
    >({
      query: ({
        query,
        page,
      }) => ({
        method: "get",
        url: "/search/movie",
        params: {
          query,
          language: "ru-RU",
          page,
        },
      }),

      responseSchema: moviesResponseSchema,
    }),

    getFilteredMovies: build.query<
      MoviesResponse,
      DiscoverMoviesParams
    >({
      query: ({
        page = 1,
        sort_by,
        vote_average_gte,
        vote_average_lte,
        with_genres,
      }) => ({
        method: "get",
        url: "/discover/movie",
        params: {
          language: "ru-RU",
          page,
          sort_by,
          "vote_average.gte":
            vote_average_gte,
          "vote_average.lte":
            vote_average_lte,
          with_genres,
        },
      }),

      responseSchema: moviesResponseSchema,
    }),

    getMovieGenres: build.query<
      GenresResponse,
      void
    >({
      query: () => ({
        method: "get",
        url: "/genre/movie/list",
        params: {
          language: "ru-RU",
        },
      }),

      responseSchema: genresResponseSchema,
    }),

    getMovieDetails: build.query<
      MovieDetails,
      number
    >({
      query: (movieId) => ({
        method: "get",
        url: `/movie/${movieId}`,
        params: {
          language: "ru-RU",
        },
      }),

      responseSchema: movieDetailsSchema,
    }),

    getMovieCredits: build.query<
      MovieCredits,
      number
    >({
      query: (movieId) => ({
        method: "get",
        url: `/movie/${movieId}/credits`,
}),

responseSchema: movieCreditsSchema,
}),

getSimilarMovies: build.query<
  SimilarMoviesResponse,
  number
>({
  query: (movieId) => ({
    method: "get",
    url: `/movie/${movieId}/similar`,
    params: {
      language: "ru-RU",
      page: 1,
    },
  }),

  responseSchema: similarMoviesResponseSchema,
}),
}),
});

export const {
  useGetMoviesByCategoryQuery,
  useSearchMoviesQuery,
  useGetFilteredMoviesQuery,
  useGetMovieGenresQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
} = tmdbApi;

