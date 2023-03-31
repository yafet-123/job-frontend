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
      className="bg-transparent flex items-center justify-center transition-all duration-300 focus:outline-none"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <BsSun className="text-black dark:text-white w-5 h-5" />
      ) : (
        <BsMoonStars className="text-black dark:text-white w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggler;