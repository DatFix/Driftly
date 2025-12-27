"use client";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AdminSlideBar from "@/layouts/auth/admin/dashboard/commons/AdminSlideBar";
import ThemeToggle from "@/layouts/home/nav/others/ThemeToggle";
import { Search } from "lucide-react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSlideBar />
      <SidebarInset>
        <header className="flex h-20 shrink-0 items-center gap-2 px-4 bg-(--color-card) shadow-lg sticky top-0 left-0 z-50">
          <SidebarTrigger />
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-(--color-text) border-2 border-(--color-dark-light) rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4 bg-(--color-background)">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
