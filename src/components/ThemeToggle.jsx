import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const isLight = savedTheme === "light";
    setIsDark(!isLight);
    if (isLight) {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
