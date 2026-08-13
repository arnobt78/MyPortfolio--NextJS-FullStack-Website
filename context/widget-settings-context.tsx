"use client";

import * as React from "react";
import { useEffect } from "react";
import type { FontSize, WidgetPosition, Theme } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants";
import { useSyncedStorage } from "@/hooks/use-synced-storage";

interface WidgetSettingsContextValue {
  theme: Theme;
  fontSize: FontSize;
  position: WidgetPosition;
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
  setPosition: (position: WidgetPosition) => void;
}

const WidgetSettingsContext = React.createContext<
  WidgetSettingsContextValue | undefined
>(undefined);

/**
 * Widget Settings Provider
 * Manages widget settings state and shares it across all components via Context
 * This ensures immediate UI updates when settings change without page refresh
 */
export function WidgetSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useSyncedStorage<Theme>(
    STORAGE_KEYS.THEME,
    "dark",
    ["light", "dark"],
  );
  const [fontSize, setFontSize] = useSyncedStorage<FontSize>(
    STORAGE_KEYS.FONT_SIZE,
    "medium",
    ["small", "medium", "large"],
  );
  const [position, setPosition] = useSyncedStorage<WidgetPosition>(
    STORAGE_KEYS.WIDGET_POSITION,
    "bottom-right",
    ["bottom-right", "bottom-left"],
  );

  // Apply theme to widget elements
  // Apply dark class to BOTH html (for Tailwind dark: classes) AND widget container (for our CSS)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const widget = document.getElementById("cb");
    const widgetReact = document.getElementById("cb-react");

    // Determine if dark mode should be active
    // Simple toggle: dark = true, light = false
    const isDark = theme === "dark";

    // Apply dark class to HTML root (for Tailwind dark: classes to work)
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // ALSO apply dark class directly to widget containers (for our CSS overrides)
    // This ensures both Tailwind classes and our CSS rules work
    if (widget) {
      if (isDark) {
        widget.classList.add("dark");
      } else {
        widget.classList.remove("dark");
      }
    }

    if (widgetReact) {
      if (isDark) {
        widgetReact.classList.add("dark");
      } else {
        widgetReact.classList.remove("dark");
      }
    }
  }, [theme]);

  const value: WidgetSettingsContextValue = {
    theme,
    fontSize,
    position,
    setTheme,
    setFontSize,
    setPosition,
  };

  return (
    <WidgetSettingsContext.Provider value={value}>
      {children}
    </WidgetSettingsContext.Provider>
  );
}

/**
 * Hook to access widget settings from context
 * Must be used within WidgetSettingsProvider
 */
export function useWidgetSettings() {
  const context = React.useContext(WidgetSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useWidgetSettings must be used within a WidgetSettingsProvider",
    );
  }
  return context;
}
