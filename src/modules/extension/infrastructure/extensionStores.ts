import { ExtensionStore } from "../domain/Browser";

export interface ExtensionStoreInfo {
  id: ExtensionStore;
  browserName: string;
  storeName: string;
  // null mientras la extensión no esté publicada en esa tienda.
  url: string | null;
}

// NEXT_PUBLIC_* se inyecta en tiempo de build (en Coolify, como build variable)
// y solo se reemplaza si se lee con el nombre literal, por eso no se arma
// dinámicamente. Un valor vacío o que no sea https cuenta como no configurado.
function toStoreUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    return new URL(trimmed).protocol === "https:" ? trimmed : null;
  } catch {
    return null;
  }
}

export const extensionStores: Record<ExtensionStore, ExtensionStoreInfo> = {
  chrome: {
    id: "chrome",
    browserName: "Chrome",
    storeName: "Chrome Web Store",
    url: toStoreUrl(process.env.NEXT_PUBLIC_EXT_URL_CHROME),
  },
  firefox: {
    id: "firefox",
    browserName: "Firefox",
    storeName: "Firefox Add-ons",
    url: toStoreUrl(process.env.NEXT_PUBLIC_EXT_URL_FIREFOX),
  },
  safari: {
    id: "safari",
    browserName: "Safari",
    storeName: "App Store",
    url: toStoreUrl(process.env.NEXT_PUBLIC_EXT_URL_SAFARI),
  },
};

export const extensionStoreOrder: ExtensionStore[] = ["chrome", "firefox", "safari"];
