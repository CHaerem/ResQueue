// components/Auth.tsx

"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <>{children}</>; // Render children if authenticated
  }

  return null; // Or a placeholder for non-authenticated users
};

export default Auth;
