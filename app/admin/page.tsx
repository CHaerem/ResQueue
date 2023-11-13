// app/admin/page.tsx

"use client";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session, status } = useSession();
  return (
    <>
      <h1>Hi {session?.user?.name}</h1>
    </>
  );
}
