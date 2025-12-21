"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className="flex items-center justify-center"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
}
