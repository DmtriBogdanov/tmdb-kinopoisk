import s from "./Burger.module.css";

type BurgerProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const Burger = ({
  isOpen,
  onClick,
}: BurgerProps) => {
  return (
    <button
      type="button"
      className={`${s.burger} ${isOpen ? s.open : ""}`}
      onClick={onClick}
      aria-label={
        isOpen
          ? "Закрыть меню"
          : "Открыть меню"
      }
      aria-expanded={isOpen}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

