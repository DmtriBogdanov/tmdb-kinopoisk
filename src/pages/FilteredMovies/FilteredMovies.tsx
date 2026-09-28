import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import type { MovieFilters } from "@/common/types";

import s from "./FilteredMovies.module.css";

import { useDebounce } from "@/common/hooks";

import {
  useGetFilteredMoviesQuery,
  useGetMovieGenresQuery,
} from "@/app/api/tmdbApi";

import {
  FilterSidebar,
  MovieCard,
  MovieGridSkeleton,
  Pagination,
} from "@/common/components";

const initialFilters: MovieFilters = {
  sort_by: "popularity.desc",
  vote_average_gte: 0,
  vote_average_lte: 10,
  with_genres: [],
};

export const FilteredMovies = () => {
  const [filters, setFilters] =
    useState<MovieFilters>(initialFilters);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isFiltersOpen, setIsFiltersOpen] =
    useState(false);

  const debouncedMinRating =
    useDebounce(
      filters.vote_average_gte,
      200
    );

  const debouncedMaxRating =
    useDebounce(
      filters.vote_average_lte,
      200
    );

  const {
    data: moviesData,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useGetFilteredMoviesQuery({
    page: currentPage,
    sort_by: filters.sort_by,
    vote_average_gte:
    debouncedMinRating,
    vote_average_lte:
    debouncedMaxRating,
    with_genres:
      filters.with_genres.length > 0
        ? filters.with_genres.join(",")
        : undefined,
  });

  const {
    data: genresData,
    isLoading: isGenresLoading,
  } = useGetMovieGenresQuery();

  useEffect(() => {
    if (isFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFiltersOpen]);

  const handleFiltersChange = (
    newFilters: MovieFilters
  ) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handleOpenFilters = () => {
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  if (
    isMoviesLoading ||
    isGenresLoading
  ) {
    return (
      <section className={s.page}>
        <div className={s.container}>
          <h1 className={s.title}>
            Фильмы
          </h1>

          <div className={s.content}>
            <aside
              className={s.filtersSkeleton}
            >
              <Skeleton
                height={40}
                width="70%"
              />

              <Skeleton height={44} />

              <Skeleton
                height={24}
                width="55%"
              />

              <Skeleton height={10} />

              <Skeleton
                height={24}
                width="45%"
              />

              <div
                className={
                  s.genresSkeleton
                }
              >
                {Array.from({
                  length: 10,
                }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width={`${60 + (index % 4) * 15}px`}
                    height={34}
                  />
                ))}
              </div>

              <Skeleton height={42} />
            </aside>

            <div className={s.results}>
              <div className={s.grid}>
                <MovieGridSkeleton count={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isMoviesError) {
    return (
      <section className={s.page}>
        <div className={s.container}>
          <div className={s.error}>
            <h1>
              Не удалось загрузить фильмы
            </h1>

            <p>
              Попробуйте обновить страницу.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const movies =
    moviesData?.results ?? [];

  const genres =
    genresData?.genres ?? [];

  return (
    <section className={s.page}>
      <div className={s.container}>
        <h1 className={s.title}>
          Фильмы
        </h1>

        <div className={s.content}>
          <div className={s.desktopFilters}>
            <FilterSidebar
              filters={filters}
              genres={genres}
              onChange={handleFiltersChange}
              onReset={handleReset}
            />
          </div>

          <button
            type="button"
            className={s.filtersButton}
            onClick={handleOpenFilters}
          >
            Фильтры
          </button>

          {isFiltersOpen && (
            <div
              className={s.mobileFilters}
              role="dialog"
              aria-modal="true"
              aria-label="Фильтры фильмов"
            >
              <div
                className={
                  s.mobileFiltersHeader
                }
              >
                <h2>Фильтры</h2>

                <button
                  type="button"
                  className={s.closeButton}
                  onClick={handleCloseFilters}
                  aria-label="Закрыть фильтры"
                >
                  ×
                </button>
              </div>

              <div
                className={
                  s.mobileFiltersContent
                }
              >
                <FilterSidebar
                  filters={filters}
                  genres={genres}
                  onChange={
                    handleFiltersChange
                  }
                  onReset={handleReset}
                  mobile
                />
              </div>

              <div
                className={
                  s.mobileFiltersFooter
                }
              >
                <button
                  type="button"
                  className={s.applyButton}
                  onClick={handleCloseFilters}
                >
                  Применить
                </button>
              </div>
            </div>
          )}

          <div className={s.results}>
            {movies.length === 0 ? (
              <div className={s.empty}>
                <h2>
                  Фильмы не найдены
                </h2>

                <p>
                  Попробуйте изменить
                  параметры фильтрации.
                </p>
              </div>
            ) : (
              <div className={s.grid}>
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                ))}
              </div>
            )}

            {moviesData &&
              moviesData.total_pages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={
                    setCurrentPage
                  }
                  pagesCount={
                    moviesData.total_pages
                  }
                />
              )}
          </div>
        </div>
      </div>
    </section>
  );
};