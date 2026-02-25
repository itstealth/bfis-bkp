"use client";

import { usePathname } from "next/navigation";
import AdminNav from "./components/AdminNav";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
