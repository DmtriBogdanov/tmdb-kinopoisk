import s from "./NotFound.module.css";
import {Link} from "react-router";

export const NotFound = () => {
  return (
    <section className={s.notFound}>
      <div className={s.content}>
        <span className={s.code}>404</span>

        <h1 className={s.title}>Страница не найдена</h1>

        <p className={s.text}>
          Похоже, такой страницы не существует или она была перемещена.
        </p>

        <Link to="/" className={s.link}>
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
};

