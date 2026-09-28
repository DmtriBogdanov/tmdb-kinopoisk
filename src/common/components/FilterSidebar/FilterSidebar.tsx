import type {ChangeEvent} from "react";

import type {
  Genre,
  MovieFilters,
  SortOption,
} from "@/common/types";

import s from "./FilterSidebar.module.css";

type FilterSidebarProps = {
  filters: MovieFilters;
  genres: Genre[];
  onChange: (filters: MovieFilters) => void;
  onReset: () => void;
  mobile?: boolean;
};

const sortOptions: {
  value: SortOption;
  label: string;
}[] = [
  {
    value: "popularity.desc",
    label: "По популярности ↓",
  },
  {
    value: "popularity.asc",
    label: "По популярности ↑",
  },
  {
    value: "vote_average.desc",
    label: "По рейтингу ↓",
  },
  {
    value: "vote_average.asc",
    label: "По рейтингу ↑",
  },
  {
    value: "primary_release_date.desc",
    label: "По дате выхода ↓",
  },
  {
    value: "primary_release_date.asc",
    label: "По дате выхода ↑",
  },
  {
    value: "title.asc",
    label: "Название А–Я",
  },
  {
    value: "title.desc",
    label: "Название Я–А",
  },
];

export const FilterSidebar = ({
                                filters,
                                genres,
                                onChange,
                                onReset,
                                mobile = false,
                              }: FilterSidebarProps) => {
  const handleSortChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onChange({
      ...filters,
      sort_by:
        event.target.value as SortOption,
    });
  };

  const handleMinRatingChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(
      event.target.value
    );

    onChange({
      ...filters,
      vote_average_gte: Math.min(
        value,
        filters.vote_average_lte
      ),
    });
  };

  const handleMaxRatingChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(
      event.target.value
    );

    onChange({
      ...filters,
      vote_average_lte: Math.max(
        value,
        filters.vote_average_gte
      ),
    });
  };

  const handleGenreToggle = (
    genreId: number
  ) => {
    const isSelected =
      filters.with_genres.includes(
        genreId
      );

    const updatedGenres = isSelected
      ? filters.with_genres.filter(
        (id) => id !== genreId
      )
      : [
        ...filters.with_genres,
        genreId,
      ];

    onChange({
      ...filters,
      with_genres: updatedGenres,
    });
  };

  return (
    <aside
      className={`${s.sidebar} ${
        mobile ? s.sidebarMobile : ""
      }`}
    >

      <div className={s.block}>
        <h2 className={s.title}>
          Сортировка
        </h2>

        <select
          className={s.select}
          value={filters.sort_by}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={s.block}>
        <div className={s.titleRow}>
          <h2 className={s.title}>
            Рейтинг
          </h2>

          <span className={s.ratingValue}>
            {filters.vote_average_gte.toFixed(
              1
            )}
            {" — "}
            {filters.vote_average_lte.toFixed(
              1
            )}
          </span>
        </div>

        <div className={s.range}>
          <div className={s.rangeSlider}>
            <div className={s.rangeTrack} />

            <div
              className={s.rangeActive}
              style={{
                left: `${
                  filters.vote_average_gte * 10
                }%`,
                right: `${
                  100 -
                  filters.vote_average_lte *
                  10
                }%`,
              }}
            />

            <input
              type="range"
              className={`${s.rangeInput} ${s.rangeInputMin}`}
              min="0"
              max="10"
              step="0.1"
              value={
                filters.vote_average_gte
              }
              onChange={
                handleMinRatingChange
              }
              aria-label="Минимальный рейтинг"
            />

            <input
              type="range"
              className={`${s.rangeInput} ${s.rangeInputMax}`}
              min="0"
              max="10"
              step="0.1"
              value={
                filters.vote_average_lte
              }
              onChange={
                handleMaxRatingChange
              }
              aria-label="Максимальный рейтинг"
            />
          </div>

          <div className={s.rangeLabels}>
            <span>0</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <div className={s.block}>
        <h2 className={s.title}>
          Жанры
        </h2>

        <div className={s.genres}>
          {genres.map((genre) => {
            const isActive =
              filters.with_genres.includes(
                genre.id
              );

            return (
              <button
                key={genre.id}
                type="button"
                className={`${s.genre} ${
                  isActive
                    ? s.genre_active
                    : ""
                }`}
                onClick={() =>
                  handleGenreToggle(
                    genre.id
                  )
                }
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={s.reset}
        onClick={onReset}
      >
        Сбросить фильтры
      </button>
    </aside>
  );
};