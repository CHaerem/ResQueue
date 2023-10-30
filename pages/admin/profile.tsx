// pages/admin/profile.tsx
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Profile</h1>
        <div className="mb-4">
          <strong>Name:</strong> {session.user?.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {session.user?.email}
        </div>
        <div className="mb-4">
          <strong>Image:</strong>
          <img
            src={session.user?.image || ""}
            alt="User Image"
            className="mt-2 rounded-full h-16 w-16"
          />
        </div>
      </div>
    </div>
  );
}
