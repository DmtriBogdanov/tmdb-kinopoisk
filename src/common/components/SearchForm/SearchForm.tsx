import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";

import type { SearchFormValues } from "@/common/types";

import s from "./SearchForm.module.css";

export const SearchForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get("query") || "";

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<SearchFormValues>({
    defaultValues: {
      query: currentQuery,
    },
  });

  const query = watch("query", "");

  useEffect(() => {
    reset({
      query: currentQuery,
    });
  }, [currentQuery, reset]);

  const onSubmit = (data: SearchFormValues) => {
    const query = data.query.trim();

    if (!query) return;

    navigate(
      `/search?query=${encodeURIComponent(query)}&page=1`
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.value) {
      reset({
        query: "",
      });

      if (window.location.pathname === "/search") {
        navigate("/search");
      }
    }
  };

  return (
    <form
      className={s.searchForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={s.searchForm__input}
        type="search"
        placeholder="Найти фильм..."
        {...register("query", {
          onChange: handleInputChange,
        })}
      />

      <button
        className={s.searchForm__button}
        type="submit"
        disabled={!query.trim()}
      >
        Поиск
      </button>
    </form>
  );
};