"use client";

import { useSyncExternalStore } from "react";
import { DetectedBrowser, detectBrowser } from "../../domain/Browser";

let cached: DetectedBrowser | null = null;

function getSnapshot(): DetectedBrowser {
  if (!cached) {
    const nav = navigator as Navigator & { brave?: unknown };
    cached = detectBrowser(nav.userAgent, {
      isBrave: typeof nav.brave !== "undefined",
      maxTouchPoints: nav.maxTouchPoints,
    });
  }
  return cached;
}

const subscribe = () => () => {};

// En el servidor no hay navegador que detectar: devuelve null y el cliente
// completa la detección tras hidratar, sin desajustes de marcado.
export function useDetectedBrowser(): DetectedBrowser | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
