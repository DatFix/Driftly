import { MoonIcon, SunIcon } from "@/components/icons/BaseIcon";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleSetTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleSetTheme}
      className="relative w-12 h-6 rounded-full bg-(--color-background) transition-colors duration-300 flex items-center cursor-pointer"
    >
      <div
        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-all duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-6 bg-gray-200" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <MoonIcon width={16} height={16} color="#000" />
        ) : (
          <SunIcon width={18} height={18} color="#ffb300" />
        )}
      </div>
    </button>
  );
}
