"use client";

import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Home, Clock, User, ShieldCheck, AlertTriangle, ShieldQuestion, FileText, ChartNoAxesColumn } from "lucide-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="h-[80px] sm:h-[100px] bg-blue-700 text-white flex items-center justify-between px-6 sm:px-8 shrink-0 shadow-md relative z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Abrir menú"
          >
            {isSidebarOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
          <div className="hidden sm:flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <ShieldCheck size={32} />
            <span className="text-2xl font-bold tracking-tight">ScamShield</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/profile")}
          className="p-2 bg-white text-blue-700 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Mi Perfil"
        >
          <User size={32} />
        </button>
      </header>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 transition-opacity"
          onClick={closeSidebar}
        />
      )}
      <aside
        className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out flex flex-col"
        style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div className="h-[80px] sm:h-[100px] bg-blue-700 flex items-center px-6 text-white shrink-0">
          <ShieldCheck size={32} className="mr-2" />
          <span className="text-2xl font-bold tracking-tight">ScamShield</span>
          <button onClick={closeSidebar} className="ml-auto p-2 hover:bg-blue-600 rounded-full">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <Link
            href="/"
            onClick={closeSidebar}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold ${isActive("/") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <Home size={24} />
            <span className="text-lg">Inicio</span>
          </Link>
          <Link
            href="/history"
            onClick={closeSidebar}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold ${isActive("/history") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <Clock size={24} />
            <span className="text-lg">Historial de Consultas</span>
          </Link>
          <Link
            href="/ranking"
            onClick={closeSidebar}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold ${isActive("/ranking") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <ChartNoAxesColumn size={24} />
            <span className="text-lg">Ranking de Vendedores</span>
          </Link>
          <Link
            href="/report"
            onClick={closeSidebar}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold ${isActive("/report") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <AlertTriangle size={24} />
            <span className="text-lg">Reportar Vendedor</span>
          </Link>
          <Link
            href="/profile"
            onClick={closeSidebar}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold ${isActive("/profile") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <User size={24} />
            <span className="text-lg">Mi Perfil</span>
          </Link>
          <Link
            href="/faq"
            onClick={closeSidebar}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold ${isActive("/faq") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <ShieldQuestion size={24} />
            <span className="text-lg">FAQ</span>
          </Link>
          <Link
            href="/terms"
            onClick={closeSidebar}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-bold ${isActive("/terms") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <FileText size={24} />
            <span className="text-lg">Términos y Condiciones</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => {
              closeSidebar();
              Cookies.remove("token");
              router.push("/login");
            }}
            className="w-full py-3 text-center text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col relative w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
