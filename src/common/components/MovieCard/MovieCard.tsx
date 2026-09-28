import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router";

import type { Movie } from "@/common/types";

import noPoster from "@/assets/img/no-poster.png";

import s from "./MovieCard.module.css";

type MovieCardProps = {
  movie: Movie;
  onFavoriteChange?: (
    movie: Movie,
    isFavorite: boolean
  ) => void;
};

export const FAVORITES_KEY =
  "favorite_movies";

export const MovieCard = ({
                            movie,
                            onFavoriteChange,
                          }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] =
    useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : noPoster;

  const releaseYear = movie.release_date
    ? new Date(
      movie.release_date
    ).getFullYear()
    : "—";

  const ratingClass =
    movie.vote_average >= 7
      ? s.card__rating_green
      : movie.vote_average >= 5
        ? s.card__rating_yellow
        : s.card__rating_red;

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem(
        FAVORITES_KEY
      ) || "[]"
    ) as Movie[];

    setIsFavorite(
      favorites.some(
        (favoriteMovie) =>
          favoriteMovie.id === movie.id
      )
    );
  }, [movie.id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem(
        FAVORITES_KEY
      ) || "[]"
    ) as Movie[];

    if (isFavorite) {
      const updatedFavorites =
        favorites.filter(
          (favoriteMovie) =>
            favoriteMovie.id !== movie.id
        );

      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);

      onFavoriteChange?.(
        movie,
        false
      );

      return;
    }

    const updatedFavorites = [
      ...favorites,
      movie,
    ];

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(true);

    onFavoriteChange?.(
      movie,
      true
    );
  };

  return (
    <article className={s.card}>
      <Link
        to={`/movie/${movie.id}`}
        className={s.card__link}
      >
        <div className={s.card__poster}>
          <img
            src={posterUrl}
            alt={movie.title}
            className={s.card__image}
            onError={(event) => {
              event.currentTarget.src =
                noPoster;
            }}
          />

          <span
            className={`${s.card__rating} ${ratingClass}`}
          >
            ★{" "}
            {movie.vote_average.toFixed(
              1
            )}
          </span>
        </div>

        <div className={s.card__content}>
          <h3 className={s.card__title}>
            {movie.title}
          </h3>

          <span className={s.card__year}>
            {releaseYear}
          </span>
        </div>
      </Link>

      <button
        type="button"
        className={`${s.card__favorite} ${
          isFavorite
            ? s.card__favorite_active
            : ""
        }`}
        onClick={handleFavorite}
        aria-label={
          isFavorite
            ? "Удалить из любимых"
            : "Добавить в любимые"
        }
        aria-pressed={isFavorite}
      >
        {isFavorite ? "❤️" : "♡"}
      </button>
    </article>
  );
};