// components/Header.tsx

"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { status } = useSession();
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        {status === "authenticated" && <Link href="/admin">Admin</Link>}
        {status === "authenticated" && (
          <Link href="/admin/profile">Profile</Link>
        )}
        {status === "authenticated" && (
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
