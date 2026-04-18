import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <AuthNavigation />
          <li className={css.navigationItem}>
            <Link href="/about" className={css.navigationLink}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
