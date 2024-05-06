import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "~/icons";
import Link from "next/link";
import Image from "next/image";
import NavigationLinks from "../Common/NavigationLinks";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-between py-3 flex-none">
      <div className="flex items-center">
        <Link href="/" passHref>
          <Image
            src="/img/hn.svg"
            alt="Hacker News Logo"
            width={40}
            height={40}
            className="mr-2"
          />
        </Link>
        <Link href="/" passHref>
          <h2 className="text-xl md:text-2xl text-primary font-extrabold">
            Hacker News
          </h2>
        </Link>
        <div className="ml-5">
          <NavigationLinks />
        </div>
      </div>
      <span onClick={toggleTheme} style={{ cursor: "pointer" }}>
        {theme === "dark" ? (
          <SunIcon className="h-4 w-4 text-icon" />
        ) : (
          <MoonIcon className="h-4 w-4 text-icon" />
        )}
      </span>
    </div>
  );
};

export default Header;
