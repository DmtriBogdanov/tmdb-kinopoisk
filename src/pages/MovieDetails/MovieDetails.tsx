import {
  useNavigate,
  useParams,
} from "react-router";

import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from "@/app/api/tmdbApi";

import {
  MovieCard,
} from "@/common/components";

import noPoster from "@/assets/img/no-poster.png";
import noPerson from "@/assets/img/no-person.png";

import s from "./MovieDetails.module.css";

const formatRuntime = (
  runtime: number | null
) => {
  if (!runtime) {
    return "—";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes} мин`;
  }

  return `${hours} ч ${minutes} мин`;
};

const getReleaseYear = (
  releaseDate: string
) => {
  if (!releaseDate) {
    return "—";
  }

  return new Date(releaseDate).getFullYear();
};

export const MovieDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const movieId = Number(id);

  const isValidId =
    Number.isInteger(movieId) &&
    movieId > 0;

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useGetMovieDetailsQuery(movieId, {
    skip: !isValidId,
  });

  const {
    data: credits,
    isLoading: isCreditsLoading,
  } = useGetMovieCreditsQuery(movieId, {
    skip: !isValidId,
  });

  const {
    data: similarMovies,
    isLoading: isSimilarLoading,
  } = useGetSimilarMoviesQuery(movieId, {
    skip: !isValidId,
  });

  if (!isValidId) {
    return (
      <section className={s.movie}>
        <div className="container">
          <button
            type="button"
            className={s.movie__back}
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>

          <div className={s.movie__error}>
            <h1>Фильм не найден</h1>

            <p>
              Некорректный идентификатор фильма.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isMovieLoading) {
    return (
      <section className={s.movie}>
        <div className="container">
          <button
            type="button"
            className={s.movie__back}
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>

          <div className={s.movie__loading}>
            <div
              className={
                s.movie__loading_poster
              }
            />

            <div
              className={
                s.movie__loading_content
              }
            >
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isMovieError || !movie) {
    return (
      <section className={s.movie}>
        <div className="container">
          <button
            type="button"
            className={s.movie__back}
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>

          <div className={s.movie__error}>
            <h1>
              Не удалось загрузить фильм
            </h1>

            <p>
              Попробуйте обновить страницу.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : noPoster;

  const ratingClass =
    movie.vote_average >= 7
      ? s.movie__rating_green
      : movie.vote_average >= 5
        ? s.movie__rating_yellow
        : s.movie__rating_red;

  const actors =
    credits?.cast
      ?.filter((actor) => actor.name)
      .sort(
        (a, b) =>
          a.order - b.order
      )
      .slice(0, 6) ?? [];

  const similar =
    similarMovies?.results
      ?.filter(
        (similarMovie) =>
          similarMovie.poster_path
      )
      .slice(0, 6) ?? [];

  return (
    <section className={s.movie}>
      <div className="container">

        <button
          type="button"
          className={s.movie__back}
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>


        <article className={s.movie__info}>

          <div className={s.movie__poster}>
            <img
              src={posterUrl}
              alt={movie.title}
              onError={(event) => {
                event.currentTarget.src =
                  noPoster;
              }}
            />
          </div>

          <div className={s.movie__content}>

            <h1 className={s.movie__title}>
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className={s.movie__tagline}>
                {movie.tagline}
              </p>
            )}

            <div className={s.movie__meta}>

              <span className={s.movie__year}>
                {getReleaseYear(
                  movie.release_date
                )}
              </span>

              <span
                className={`${s.movie__rating} ${ratingClass}`}
              >
                ★{" "}
                {movie.vote_average.toFixed(
                  1
                )}
              </span>

              <span>
                {formatRuntime(
                  movie.runtime
                )}
              </span>

            </div>

            <div className={s.movie__genres}>
              {movie.genres.map(
                (genre) => (
                  <span
                    key={genre.id}
                    className={
                      s.movie__genre
                    }
                  >
                    {genre.name}
                  </span>
                )
              )}
            </div>

            <div className={s.movie__description}>

              <h2>
                Описание
              </h2>

              <p>
                {movie.overview ||
                  "Описание отсутствует."}
              </p>

            </div>

          </div>
        </article>


        <section className={s.movie__section}>

          <div className={s.movie__section_header}>
            <h2>
              В главных ролях
            </h2>
          </div>

          {isCreditsLoading ? (
            <div className={s.cast}>
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className={
                    s.cast__skeleton
                  }
                >
                  <div
                    className={
                      s.cast__skeleton_image
                    }
                  />

                  <div
                    className={
                      s.cast__skeleton_text
                    }
                  />

                  <div
                    className={
                      s.cast__skeleton_text_short
                    }
                  />
                </div>
              ))}
            </div>
          ) : actors.length > 0 ? (
            <div className={s.cast}>
              {actors.map((actor) => {
                const actorPhoto =
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : noPerson;

                return (
                  <article
                    key={actor.id}
                    className={s.cast__card}
                  >
                    <div
                      className={
                        s.cast__image
                      }
                    >
                      <img
                        src={actorPhoto}
                        alt={actor.name}
                        onError={(
                          event
                        ) => {
                          event.currentTarget.src =
                            noPerson;
                        }}
                      />
                    </div>

                    <div
                      className={
                        s.cast__content
                      }
                    >
                      <h3>
                        {actor.name}
                      </h3>

                      <p>
                        {actor.character ||
                          "Персонаж неизвестен"}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className={s.movie__empty}>
              Информация об актёрах
              отсутствует.
            </p>
          )}

        </section>


        <section className={s.movie__section}>

          <div className={s.movie__section_header}>
            <h2>
              Похожие фильмы
            </h2>
          </div>

          {isSimilarLoading ? (
            <div className={s.movie__similar_grid}>
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className={
                    s.movie__similar_skeleton
                  }
                />
              ))}
            </div>
          ) : similar.length > 0 ? (
            <div className={s.movie__similar_grid}>
              {similar.map((similarMovie) => (
                <MovieCard
                  key={similarMovie.id}
                  movie={similarMovie}
                />
              ))}
            </div>
          ) : (
            <p className={s.movie__empty}>
              Похожих фильмов не найдено.
            </p>
          )}

        </section>

      </div>
    </section>
  );
};