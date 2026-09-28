import { z } from "zod";
import {
  castMemberSchema,
  genreSchema,
  genresResponseSchema,
  movieCreditsSchema,
  movieDetailsSchema,
  movieSchema,
  moviesResponseSchema,
  similarMoviesResponseSchema,
} from "@/common/schemas/schemas";


export type Movie = z.infer<typeof movieSchema>;

export type MoviesResponse = z.infer<
  typeof moviesResponseSchema
>;

export type Genre = z.infer<typeof genreSchema>;

export type GenresResponse = z.infer<
  typeof genresResponseSchema
>;

export type MovieDetails = z.infer<
  typeof movieDetailsSchema
>;

export type CastMember = z.infer<
  typeof castMemberSchema
>;

export type MovieCredits = z.infer<
  typeof movieCreditsSchema
>;

export type SimilarMoviesResponse = z.infer<
  typeof similarMoviesResponseSchema
>;


export type SearchFormValues = {
  query: string;
};


export type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "title.asc"
  | "title.desc";


export type MovieFilters = {
  sort_by: SortOption;
  vote_average_gte: number;
  vote_average_lte: number;
  with_genres: number[];
};


export type DiscoverMoviesParams = {
  page?: number;
  sort_by: SortOption;
  vote_average_gte?: number;
  vote_average_lte?: number;
  with_genres?: string;
};

