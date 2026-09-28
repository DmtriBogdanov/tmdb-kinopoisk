export const Path = {
  Main: "/",
  Movies: "/movies",
  MoviesCategory: "/movies/:category",

  Movie: "/movie/:id",

  Filtered: "/filtered",
  Search: "/search",
  Favorite: "/favorite",

  NotFound: "*",
} as const;