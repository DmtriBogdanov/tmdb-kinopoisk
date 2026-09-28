import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import {
  useGetMoviesByCategoryQuery,
} from "@/app/api/tmdbApi";

import type {
  MovieCategory,
} from "@/app/api/tmdbApi";

import { MovieCard } from "@/common/components/MovieCard/MovieCard";

import {
  MovieGridSkeleton,
} from "@/common/components/MovieGridSkeleton/MovieGridSkeleton";

import s from "./MovieSection.module.css";

type MovieSectionProps = {
  category: MovieCategory;
  title: string;
};

export const MovieSection = ({
                               category,
                               title,
                             }: MovieSectionProps) => {
  const {
    data,
    isLoading,
    isError,
  } = useGetMoviesByCategoryQuery({
    category,
    page: 1,
  });

  if (isLoading) {
    return (
      <section className={s.section}>
        <div className="container">

          <div className={s.section__header}>
            <h2 className={s.section__title}>
              {title}
            </h2>

            <Link
              to={`/movies/${category}`}
              className={s.section__link}
            >
              Смотреть все
            </Link>
          </div>

          <div className={s.section__grid}>
            <MovieGridSkeleton count={6} />
          </div>

        </div>
      </section>
    );
  }

  if (isError || !data?.results.length) {
    return (
      <section className={s.section}>
        <div className="container">

          <h2 className={s.section__title}>
            {title}
          </h2>

          <p>
            Не удалось загрузить фильмы
          </p>

        </div>
      </section>
    );
  }

  const movies = data.results.slice(0, 6);

  return (
    <section
      className={s.section}
      id="movies"
    >
      <div className="container">

        <div className={s.section__header}>
          <h2 className={s.section__title}>
            {title}
          </h2>

          <Link
            to={`/movies/${category}`}
            className={s.section__link}
          >
            Смотреть все
          </Link>
        </div>

        <Swiper
          className={s.slider}
          spaceBetween={20}
          slidesPerView={6}
          loop
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 12,
            },
            375: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 18,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className={s.slide}
            >
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};