import Link from 'next/link';
import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="../images/logo.svg" alt="ig.news" />
        <nav>
          {/* <ActiveLink activeClassName={styles.active} href="/"> */}
          <Link href="/">
            Home
          </Link>
          {/* </ActiveLink> */}
          {/* <ActiveLink activeClassName={styles.active} href="/posts" prefetch> */}
          <Link href='/posts'>
            Posts
          </Link>
          {/* </ActiveLink> */}
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
