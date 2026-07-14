"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ref-based mobile check for use inside useFrame/imperative handles,
 * where a state update would be too slow or cause unwanted re-renders.
 */
export function useIsMobileRef(breakpoint = 768) {
  const isMobileRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const update = () => {
      isMobileRef.current = mq.matches;
    };

    update();

    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobileRef;
}

/**
 * State-based mobile check for use in regular component render logic
 * (e.g. choosing which cameraViews entry to pass down).
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const update = () => setIsMobile(mq.matches);

    update();

    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}