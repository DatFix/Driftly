"use client";
import { useEffect, useState } from "react";

export function useScrollStatus() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // chạy 1 lần để khởi tạo giá trị ban đầu

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
}
