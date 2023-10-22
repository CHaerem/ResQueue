import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/isAdmin?email=${session.user.email}`);
        const data = await res.json();
        if (!data.isAdmin) {
          router.push('/');
        }
      } else {
        router.push('/login');
      }
    })();
  }, [session]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Your admin page content */}
      Admin Dashboard
    </div>
  );
}
