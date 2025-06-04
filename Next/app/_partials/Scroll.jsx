"use client";

import { useEffect, useState } from 'react';

export default function Scroll() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="body-overlay"></div>
      <div className="sidebar-overlay"></div>
      <a
        onClick={handleTop}
        className={`scroll-top ${showScrollTop ? 'show' : ''}`}
      >
        <i className="fas fa-angle-double-up"></i>
      </a>
    </>
  );
}
