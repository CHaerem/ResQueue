// components/Header.tsx

"use client";
import React from "react";
import Link from "next/link";

const Header = () => (
  <header>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  </header>
);

export default Header;
