import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { BsFillPersonLinesFill, BsMoonStars, BsSun } from "react-icons/bs";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      className=" dark:bg-slate-800 flex items-center justify-center transition-all duration-300 focus:outline-none"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <BsSun className="text-white w-8 h-8" />
      ) : (
        <BsMoonStars className="text-white w-8 h-8" />
      )}
    </button>
  );
};

export default ThemeToggler;