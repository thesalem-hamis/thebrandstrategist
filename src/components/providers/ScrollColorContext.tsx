import { createContext, useContext, useState, type ReactNode } from "react";

interface ScrollColorContextValue {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

const ScrollColorContext = createContext<ScrollColorContextValue | null>(null);

export function ScrollColorProvider({ children }: { children: ReactNode }) {
  const [activeColor, setActiveColor] = useState("#ffffff");

  return (
    <ScrollColorContext.Provider value={{ activeColor, setActiveColor }}>
      {children}
    </ScrollColorContext.Provider>
  );
}

export function useScrollColor() {
  const ctx = useContext(ScrollColorContext);
  if (!ctx) {
    throw new Error("useScrollColor must be used within a ScrollColorProvider");
  }
  return ctx;
}