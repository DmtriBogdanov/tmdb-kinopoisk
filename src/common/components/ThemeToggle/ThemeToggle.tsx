import s from './ThemeToggle.module.css';

type ThemeToggleProps = {
  checked: boolean;
  onChange: () => void;
};

export const ThemeToggle = ({
                              checked,
                              onChange,
                            }: ThemeToggleProps) => {
  return (
    <button
      className={`${s.themeToggle} ${checked ? s.themeToggle_dark : ''}`}
      type="button"
      onClick={onChange}
      aria-label={checked ? 'Включить светлую тему' : 'Включить тёмную тему'}
      aria-pressed={checked}
    >
      <span className={`${s.themeToggle__icon} ${s.themeToggle__sun}`}>
        ☀
      </span>

      <span className={`${s.themeToggle__icon} ${s.themeToggle__moon}`}>
        ☾
      </span>

      <span className={s.themeToggle__thumb} />
    </button>
  );
};