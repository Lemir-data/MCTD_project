"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextType>({ isDark: false, toggle: () => {} });

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem("mctd_admin_dark") === "true");
  }, []);

  const toggle = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem("mctd_admin_dark", String(next));
      return next;
    });
  };

  return (
    <AdminThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export const useAdminTheme = () => useContext(AdminThemeContext);
