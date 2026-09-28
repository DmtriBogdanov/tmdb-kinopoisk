import { useEffect, useState } from "react";

import type { Movie } from "@/common/types";

import { MovieCard } from "@/common/components";
import {
  FAVORITES_KEY,
} from "@/common/components/MovieCard/MovieCard";

import s from "./Favorites.module.css";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    ) as Movie[];

    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteChange = (
    movie: Movie,
    isFavorite: boolean
  ) => {
    if (!isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (favoriteMovie) => favoriteMovie.id !== movie.id
        )
      );
    }
  };

  return (
    <section className={s.favorites}>
      <div className="container">
        <h1 className={s.title}>Любимые фильмы</h1>

        {favorites.length > 0 ? (
          <div className={s.grid}>
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        ) : (
          <p className={s.empty}>
            Вы пока не добавили фильмы в любимые.
          </p>
        )}
      </div>
    </section>
  );
};