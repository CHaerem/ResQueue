import Link from "next/link";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <header>
        <Link href="/">
          <button autoFocus>Home</button>
        </Link>
        <Link href="/about">
          <button autoFocus>About</button>
        </Link>
        <Link href="/admin/profile">
          <button autoFocus>Profile</button>
        </Link>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2023 ResQueue</p>
      </footer>
    </Fragment>
  );
}
