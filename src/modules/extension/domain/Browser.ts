export type ExtensionStore = "chrome" | "firefox" | "safari";

export type Platform = "desktop" | "ios" | "android";

export interface DetectedBrowser {
  platform: Platform;
  // Tienda de la que el navegador del visitante instala la extensión.
  // null cuando no se reconoce (o, en móvil, cuando no admite extensiones).
  store: ExtensionStore | null;
  // Nombre que se muestra en pantalla: "Edge", "Brave", "Firefox"...
  name: string;
}

export interface BrowserHints {
  isBrave?: boolean;
  maxTouchPoints?: number;
}

export function detectBrowser(userAgent: string, hints: BrowserHints = {}): DetectedBrowser {
  const ua = userAgent;

  // iPadOS se presenta como Mac de escritorio; se distingue por la pantalla táctil.
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && (hints.maxTouchPoints ?? 0) > 1);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    // En iPhone solo Safari admite extensiones.
    const isSafari = !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
    return { platform: "ios", store: isSafari ? "safari" : null, name: isSafari ? "Safari" : "tu navegador" };
  }

  if (isAndroid) {
    // En Android solo Firefox admite extensiones de su tienda.
    const isFirefox = /Firefox/i.test(ua);
    return { platform: "android", store: isFirefox ? "firefox" : null, name: isFirefox ? "Firefox" : "tu navegador" };
  }

  if (/Firefox/i.test(ua)) return { platform: "desktop", store: "firefox", name: "Firefox" };
  if (/Edg\//i.test(ua)) return { platform: "desktop", store: "chrome", name: "Edge" };
  if (/OPR\//i.test(ua)) return { platform: "desktop", store: "chrome", name: "Opera" };
  if (/Chrome|Chromium/i.test(ua)) {
    return { platform: "desktop", store: "chrome", name: hints.isBrave ? "Brave" : "Chrome" };
  }
  if (/Safari/i.test(ua)) return { platform: "desktop", store: "safari", name: "Safari" };

  return { platform: "desktop", store: null, name: "tu navegador" };
}
