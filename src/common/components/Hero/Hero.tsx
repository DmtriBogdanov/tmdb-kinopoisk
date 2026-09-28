import s from "./Hero.module.css";

import { SearchForm } from "@/common/components/SearchForm/SearchForm";
import { useGetMoviesByCategoryQuery } from "@/app/api/tmdbApi";

export const Hero = () => {
  const {
    data,
    isLoading,
  } = useGetMoviesByCategoryQuery({
    category: "popular",
    page: 1,
  });

  const moviesWithBackdrop =
    data?.results.filter(
      (movie) => movie.backdrop_path
    ) ?? [];

  const randomMovie =
    moviesWithBackdrop.length > 0
      ? moviesWithBackdrop[
        Math.floor(
          Math.random() *
          moviesWithBackdrop.length
        )
        ]
      : null;

  return (
    <section
      className={`${s.hero} ${
        isLoading || !randomMovie
          ? s.hero_loading
          : ""
      }`}
      style={
        randomMovie
          ? {
            backgroundImage: `url(http://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`,
          }
          : undefined
      }
    >
      <div className={`container ${s.hero__inner}`}>
        <div className={s.hero__content}>
          <span className={s.hero__subtitle}>
            Добро пожаловать!
          </span>

          <h1 className={s.hero__title}>
            Мир кино <br /> в одном месте
          </h1>

          <p className={s.hero__description}>
            Откройте для себя тысячи фильмов,
            сериалов и мультфильмов на любой вкус.
          </p>

          <SearchForm />
        </div>

        <a
          href="#movies"
          className={s.hero__scroll}
          aria-label="Прокрутить вниз"
        >
          <span className={s.hero__scrollIcon}></span>
        </a>
      </div>
    </section>
  );
};