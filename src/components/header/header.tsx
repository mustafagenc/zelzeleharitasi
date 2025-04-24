"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/header/navbar";

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isTop;
}

export const Header = () => {
  const isTop = useIsScrollTop();
  return (
    <>
      <header
        className={`sticky top-0 z-20 flex w-full flex-col items-center py-2 ${
          isTop
            ? "border-none"
            : "border-b border-gray-200 dark:border-gray-800"
        } bg-opacity-30 dark:bg-opacity-30 bg-background px-1 backdrop-blur-lg backdrop-saturate-150 backdrop-filter lg:px-0`}
      >
        <Navbar />
      </header>
    </>
  );
};
