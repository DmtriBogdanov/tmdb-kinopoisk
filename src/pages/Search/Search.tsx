import { useSearchParams } from "react-router";

import { useSearchMoviesQuery } from "@/app/api/tmdbApi";

import {
  MovieCard,
  MovieGridSkeleton,
  Pagination,
} from "@/common/components";

import { SearchForm } from "@/common/components/SearchForm/SearchForm";

import s from "./Search.module.css";

export const Search = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const query =
    searchParams.get("query") || "";

  const currentPage =
    Number(searchParams.get("page")) || 1;

  const {
    data,
    isLoading,
    isError,
  } = useSearchMoviesQuery(
    {
      query,
      page: currentPage,
    },
    {
      skip: !query,
    }
  );

  const handlePageChange = (
    page: number
  ) => {
    setSearchParams({
      query,
      page: String(page),
    });
  };

  return (
    <section className={s.search}>
      <div className="container">

        <h1 className={s.title}>
          Поиск фильмов
        </h1>

        <SearchForm />

        {!query && (
          <p className={s.message}>
            Введите название фильма,
            чтобы начать поиск
          </p>
        )}

        {query && (
          <p className={s.query}>
            По запросу:{" "}
            <strong>{query}</strong>
          </p>
        )}

        {query && isLoading && (
          <div className={s.grid}>
            <MovieGridSkeleton count={20} />
          </div>
        )}

        {isError && (
          <p className={s.message}>
            Не удалось загрузить фильмы
          </p>
        )}

        {!isLoading &&
          !isError &&
          query &&
          data &&
          data.results.length === 0 && (
            <p className={s.message}>
              По запросу «{query}»
              ничего не найдено
            </p>
          )}

        {query &&
          data &&
          data.results.length > 0 && (
            <>
              <div className={s.grid}>
                {data.results.map(
                  (movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />
                  )
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                pagesCount={Math.min(
                  data.total_pages,
                  500
                )}
                setCurrentPage={
                  handlePageChange
                }
              />
            </>
          )}

      </div>
    </section>
  );
};