"use client";

import { useEffect, useState } from "react";

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
};

export type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < BREAKPOINTS.mobile) setBp("mobile");
      else if (w < BREAKPOINTS.tablet) setBp("tablet");
      else setBp("desktop");
    };

    compute();

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return bp;
}