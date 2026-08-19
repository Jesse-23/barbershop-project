"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, Menu, X, LogOut } from "lucide-react";

interface NavbarProps {
  isAuth?: boolean;
}

export default function Navbar({ isAuth = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isAuth) {
      // Check localStorage to verify if the logged-in user is you
      const storedName = localStorage.getItem("user_name");
      const storedEmail = localStorage.getItem("user_email");
      
      // Update this email string to match your exact admin login email
      if (storedName === "jessemaduka85" || storedEmail === "your-email@example.com") {
        setIsAdmin(true);
      }
    }
  }, [isAuth]);

  // Helper to dynamically style active links
  const getLinkStyle = (path: string) => {
    return pathname === path 
      ? "text-[#dfb771] transition-colors" 
      : "hover:text-[#dfb771] transition-colors";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[#dfb771]">
          <Scissors size={24} />
          <span className="text-xl font-serif tracking-wide">CutCraft</span>
        </Link>
        
        {/* Desktop Links */}
        <div className={`hidden md:flex items-center ${isAuth ? "gap-8" : ""} text-sm font-medium`}>
          {isAuth ? (
            <>
              <Link href="/" className={getLinkStyle("/")}>Home</Link>
              <Link href="/dashboard" className={getLinkStyle("/dashboard")}>Dashboard</Link>
              <Link href="/book" className={getLinkStyle("/book")}>Book</Link>
              <Link href="/appointments" className={getLinkStyle("/appointments")}>My appointments</Link>
              {/* Only render Admin link if the user is authorized */}
              {isAdmin && (
                <Link href="/admin" className={getLinkStyle("/admin")}>Admin</Link>
              )}
            </>
          ) : (
            <Link href="/" className={getLinkStyle("/")}>Home</Link>
          )}
        </div>
        
        {/* Desktop Right Side (Auth vs Non-Auth) */}
        <div className={`hidden md:flex items-center ${!isAuth ? "gap-6" : ""} text-sm font-medium`}>
          {isAuth ? (
            <Link href="/" className="flex items-center gap-2 hover:text-[#dfb771] transition-colors">
              <LogOut size={16} />
              <span>Sign out</span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hover:text-[#dfb771] transition-colors">Login</Link>
              <Link 
                href="/signup" 
                className="bg-[#dfb771] text-black px-5 py-2.5 rounded hover:bg-[#cda661] transition-colors"
              >
                Book now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-[#0a0a0a] border-b border-white/10 flex flex-col shadow-2xl animate-in slide-in-from-top-2 duration-200 z-50">
          <div className="flex justify-between items-center px-8 py-6">
            <Link href="/" className="flex items-center gap-2 text-[#dfb771]" onClick={() => setIsMobileMenuOpen(false)}>
              <Scissors size={24} />
              <span className="text-xl font-serif tracking-wide">CutCraft</span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col px-8 pb-8 gap-6 text-sm font-medium">
            <Link href="/" className={getLinkStyle("/")} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>

            {isAuth ? (
              <>
                <Link href="/dashboard" className={getLinkStyle("/dashboard")} onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/book" className={getLinkStyle("/book")} onClick={() => setIsMobileMenuOpen(false)}>
                  Book
                </Link>
                <Link href="/appointments" className={getLinkStyle("/appointments")} onClick={() => setIsMobileMenuOpen(false)}>
                  My appointments
                </Link>
                {isAdmin && (
                  <Link href="/admin" className={getLinkStyle("/admin")} onClick={() => setIsMobileMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                <div className="pt-2">
                  <Link href="/" className="flex items-center gap-3 hover:text-[#dfb771] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogOut size={18} />
                    <span>Sign out</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-[#dfb771] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <div className="pt-2">
                  <Link 
                    href="/signup" 
                    className="inline-block bg-[#dfb771] text-black px-5 py-2.5 rounded hover:bg-[#cda661] transition-colors text-center w-full sm:w-auto"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book now
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}