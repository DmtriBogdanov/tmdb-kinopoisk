import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import { Path } from "@/common/routing/Path";

import {
  Categories,
  Favorites,
  FilteredMovies,
  Home,
  MovieDetails,
  NotFound,
  Search,
} from "@/pages";

export const Routing = () => (
  <Routes>
    <Route
      path={Path.Main}
      element={<Home />}
    />

    <Route
      path={Path.Movies}
      element={
        <Navigate
          to="/movies/popular"
          replace
        />
      }
    />

    <Route
      path={Path.MoviesCategory}
      element={<Categories />}
    />

    <Route
      path={Path.Movie}
      element={<MovieDetails />}
    />

    <Route
      path={Path.Filtered}
      element={<FilteredMovies />}
    />

    <Route
      path={Path.Search}
      element={<Search />}
    />

    <Route
      path={Path.Favorite}
      element={<Favorites />}
    />

    <Route
      path={Path.NotFound}
      element={<NotFound />}
    />
  </Routes>
);