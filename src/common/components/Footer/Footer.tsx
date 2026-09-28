import s from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.footer__inner}`}>
        <p className={s.footer__copyright}>
          © {new Date().getFullYear()} Kinopoisk Demo.
          <span className={s.footer__tmdb}>
            {'Данные предоставлены '}
            <a
              className={s.footer__link}
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              TMDB
            </a>
            .
          </span>
        </p>
      </div>
    </footer>
  );
};

