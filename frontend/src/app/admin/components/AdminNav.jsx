"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { LogOut, Home, Calendar, Newspaper } from "lucide-react";

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/news-coverage", label: "News Coverage", icon: Newspaper },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-nblue text-white text-sm font-semibold">
                BF
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-nblue">
                  BFIS Admin
                </span>
                <span className="text-xs text-gray-500">
                  Manage events & news coverage
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-1 py-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}>
                    <button
                      type="button"
                      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        isActive
                          ? "bg-white text-nblue shadow-sm"
                          : "text-gray-600 hover:bg-white hover:text-nblue"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs md:text-sm"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
