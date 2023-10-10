import { signIn, signOut, useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "loading") {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Layout>
      <div>
        {!session && (
          <>
            <p>You are not signed in</p>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            {session && session.user && (
              <p>Signed in as {session.user.email}</p>
            )}
            <button onClick={handleSignOut}>Sign out</button>
          </>
        )}
      </div>
    </Layout>
  );
}