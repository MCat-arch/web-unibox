"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavbarTransparencyContext = createContext(false);

export function useNavbarTransparency() {
  return useContext(NavbarTransparencyContext);
}

export function NavbarScrollState({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setScrolled(true);
        return;
      }

      const hero = document.getElementById("hero-section");
      const threshold = hero ? hero.offsetHeight - 80 : window.innerHeight - 80;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome]);

  const isTransparent = isHome && !scrolled;

  return (
    <NavbarTransparencyContext.Provider value={isTransparent}>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${isTransparent
            ? "bg-transparent border-b border-transparent text-white py-2"
            : "bg-white/95 border-b border-slate-200/80 shadow-md shadow-slate-900/5 backdrop-blur-xl text-slate-800 py-0"
          }`}
      >
        {children}
      </header>
    </NavbarTransparencyContext.Provider>
  );
}
