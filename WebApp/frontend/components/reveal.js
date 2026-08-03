"use client";

// Bọc nội dung để xuất hiện mượt khi cuộn tới (tôn trọng prefers-reduced-motion).

import { useEffect, useRef } from "react";

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={"reveal " + className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
