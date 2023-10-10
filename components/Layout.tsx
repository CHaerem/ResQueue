import Link from 'next/link';
import { Fragment } from 'react';
import { Button } from '@nextui-org/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <header>
        <Link href="/">
          <Button autoFocus>Home</Button>
        </Link>
        <Link href="/about">
          <Button autoFocus>About</Button>
        </Link>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2023 Resqueue</p>
      </footer>
    </Fragment>
  );
}
