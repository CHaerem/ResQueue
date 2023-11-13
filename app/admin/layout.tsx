// pages/admin/layout.tsx

import Auth from "@/components/Auth";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <Auth>{children}</Auth>;
};

export default AdminLayout;
