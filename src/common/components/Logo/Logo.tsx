import tmdbLogo from '@/assets/img/logo.svg'
import {Link} from "react-router";
import s from './Logo.module.css'

export const Logo = () => {
  return (
    <Link to='/' className={s.logo}>
      <img
        src={tmdbLogo}
        alt="Logo"
        width="120"
        height="100%"
      />
    </Link>
  );
};
