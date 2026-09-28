import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";

import {
  useGetMoviesByCategoryQuery,
} from "@/app/api/tmdbApi";

import type {
  MovieCategory,
} from "@/app/api/tmdbApi";

import {
  MovieCard,
  MovieGridSkeleton,
  Pagination,
} from "@/common/components";

import s from "./Categories.module.css";

const categories: {
  id: MovieCategory;
  title: string;
}[] = [
  {
    id: "popular",
    title: "Популярные фильмы",
  },
  {
    id: "top-rated",
    title: "Лучшие фильмы",
  },
  {
    id: "upcoming",
    title: "Скоро в кино",
  },
  {
    id: "now-playing",
    title: "Сейчас в кино",
  },
];

export const Categories = () => {
  const navigate = useNavigate();

  const { category: categoryParam } =
    useParams<{
      category?: string;
    }>();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const isValidCategory = categories.some(
    (item) => item.id === categoryParam
  );

  const category: MovieCategory =
    isValidCategory
      ? (categoryParam as MovieCategory)
      : "popular";

  const page =
    Number(searchParams.get("page")) || 1;

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetMoviesByCategoryQuery({
    category,
    page,
  });

  const activeCategory = categories.find(
    (item) => item.id === category
  );

  const handleCategoryChange = (
    categoryId: MovieCategory
  ) => {
    navigate(`/movies/${categoryId}`);
  };

  const handlePageChange = (
    newPage: number
  ) => {
    setSearchParams({
      page: String(newPage),
    });
  };

  if (isLoading) {
    return (
      <section className={s.category}>
        <div className="container">

          <h1
            className={`visually-hidden ${s.category__title}`}
          >
            Категории фильмов
          </h1>

          <div className={s.category__tabs}>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${s.category__tab} ${
                  category === item.id
                    ? s.category__tab_active
                    : ""
                }`}
                onClick={() =>
                  handleCategoryChange(item.id)
                }
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className={s.category__header}>
            <h2>
              {activeCategory?.title}
            </h2>
          </div>

          <div className={s.category__grid}>
            <MovieGridSkeleton count={20} />
          </div>

        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={s.category}>
        <div className="container">

          <h1
            className={`visually-hidden ${s.category__title}`}
          >
            Категории фильмов
          </h1>

          <div className={s.category__tabs}>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${s.category__tab} ${
                  category === item.id
                    ? s.category__tab_active
                    : ""
                }`}
                onClick={() =>
                  handleCategoryChange(item.id)
                }
              >
                {item.title}
              </button>
            ))}
          </div>

          <p>
            Не удалось загрузить фильмы
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className={s.category}>
      <div className="container">

        <h1
          className={`visually-hidden ${s.category__title}`}
        >
          Категории фильмов
        </h1>

        <div className={s.category__tabs}>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${s.category__tab} ${
                category === item.id
                  ? s.category__tab_active
                  : ""
              }`}
              onClick={() =>
                handleCategoryChange(item.id)
              }
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className={s.category__header}>
          <h2>
            {activeCategory?.title}
          </h2>

          {isFetching && (
            <span className={s.loading}>
              Обновление...
            </span>
          )}
        </div>

        <div className={s.category__grid}>
          {data?.results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>

        <Pagination
          currentPage={page}
          setCurrentPage={handlePageChange}
          pagesCount={
            data?.total_pages ?? 1
          }
        />

      </div>
    </section>
  );
};