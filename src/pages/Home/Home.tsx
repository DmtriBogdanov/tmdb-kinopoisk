import {
  Hero,
  MovieSection,
} from "@/common/components";

export const Home = () => {
  return (
    <>
      <Hero />

      <MovieSection
        category="popular"
        title="Популярные фильмы"
      />

      <MovieSection
        category="top-rated"
        title="Лучшие фильмы"
      />

      <MovieSection
        category="upcoming"
        title="Скоро в кино"
      />

      <MovieSection
        category="now-playing"
        title="Сейчас в кино"
      />

    </>
  );
};