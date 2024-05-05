"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return <>{children}</>; // Render children if authenticated
  }

  return null; // Or a placeholder for non-authenticated users
};

export default Auth;
