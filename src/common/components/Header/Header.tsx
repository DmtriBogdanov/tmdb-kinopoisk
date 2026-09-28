import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Logo, Menu, ThemeToggle, Burger} from "@/common/components";
import type {AppDispatch, RootState} from "@/app/model/store";
import {toggleTheme} from "@/features/themeSlice";
import s from "./Header.module.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const theme = useSelector(
    (state: RootState) => state.theme.mode
  );

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={s.header}>
      <div className={`container ${s.header__inner}`}>
        <Logo />

        <Menu
          isOpen={isMenuOpen}
          onClose={closeMenu}
        />

        <div className={s.actions}>
          <ThemeToggle
            checked={theme === "dark"}
            onChange={() => dispatch(toggleTheme())}
          />

          <Burger
            isOpen={isMenuOpen}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </header>
  );
};

