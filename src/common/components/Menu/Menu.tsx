import {NavLink} from "react-router";
import {Path} from "@/common/routing";
import s from "./Menu.module.css";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  {
    to: Path.Main,
    label: "Главная",
  },
  {
    to: Path.Movies,
    label: "Категории",
  },
  {
    to: Path.Filtered,
    label: "Фильмы",
  },
  {
    to: Path.Search,
    label: "Поиск",
  },
  {
    to: Path.Favorite,
    label: "Избранное",
  },
];

export const Menu = ({isOpen, onClose}: MenuProps) => {
  return (
    <nav
      className={`${s.menu} ${isOpen ? s.open : ""}`}
    >
      <ul className={s.menuList}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({isActive}) =>
                `${s.link} ${
                  isActive ? s.activeLink : ""
                }`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

