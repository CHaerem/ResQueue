import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/admin/profile' });
      // handle success, if needed
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };  

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <button onClick={handleSignIn} className="text-white bg-blue-500 p-4 rounded w-full">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
