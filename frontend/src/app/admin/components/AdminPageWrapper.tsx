"use client";
import { useAdminTheme } from "@/contexts/AdminThemeContext";

export function AdminCard({ className = "", style = {}, children }: {
  className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  const { isDark } = useAdminTheme();
  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors ${className}`}
      style={{
        backgroundColor: isDark ? "#1F2937" : "#ffffff",
        borderColor: isDark ? "#374151" : "#E5E7EB",
        ...style,
      }}>
      {children}
    </div>
  );
}

export function useThemeVars() {
  const { isDark } = useAdminTheme();
  return {
    isDark,
    bg:          isDark ? "#111827" : "#F8FAFC",
    cardBg:      isDark ? "#1F2937" : "#ffffff",
    cardBorder:  isDark ? "#374151" : "#E5E7EB",
    text:        isDark ? "#F9FAFB" : "#111827",
    textMuted:   isDark ? "#9CA3AF" : "#6B7280",
    textSub:     isDark ? "#6B7280" : "#9CA3AF",
    inputBg:     isDark ? "#374151" : "#ffffff",
    inputBorder: isDark ? "#4B5563" : "#E5E7EB",
    hoverBg:     isDark ? "#374151" : "#F9FAFB",
    rowHover:    isDark ? "#374151" : "#F9FAFB",
    divider:     isDark ? "#374151" : "#F3F4F6",
    selectBg:    isDark ? "#374151" : "#ffffff",
  };
}
