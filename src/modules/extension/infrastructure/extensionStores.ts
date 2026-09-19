import { ExtensionStore } from "../domain/Browser";

export interface ExtensionStoreInfo {
  id: ExtensionStore;
  browserName: string;
  storeName: string;
  // null mientras la extensión no esté publicada en esa tienda.
  url: string | null;
  // .zip para instalación manual (piloto). Solo se usa si no hay url de tienda.
  zipUrl: string | null;
}

// "store": se instala desde la tienda. "manual": se descarga el .zip y se carga
// a mano. null: todavía no hay forma de instalarla en ese navegador.
export type InstallMode = "store" | "manual";

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

// El .zip puede estar en otro dominio (https) o servido por esta misma app ("/...").
function toDownloadUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  return toStoreUrl(trimmed);
}

export const extensionStores: Record<ExtensionStore, ExtensionStoreInfo> = {
  chrome: {
    id: "chrome",
    browserName: "Chrome",
    storeName: "Chrome Web Store",
    url: toStoreUrl(process.env.NEXT_PUBLIC_EXT_URL_CHROME),
    zipUrl: toDownloadUrl(process.env.NEXT_PUBLIC_EXT_ZIP_CHROME),
  },
  firefox: {
    id: "firefox",
    browserName: "Firefox",
    storeName: "Firefox Add-ons",
    url: toStoreUrl(process.env.NEXT_PUBLIC_EXT_URL_FIREFOX),
    // Sin .zip: Firefox solo carga extensiones sin firmar como temporales y las
    // borra al cerrarse. Hasta tener el .xpi firmado por Mozilla, queda en "Próximamente".
    zipUrl: null,
  },
  safari: {
    id: "safari",
    browserName: "Safari",
    storeName: "App Store",
    url: toStoreUrl(process.env.NEXT_PUBLIC_EXT_URL_SAFARI),
    // Sin .zip: cargarla a mano en Safari exige Xcode y un permiso que se
    // reinicia cada vez que se abre el navegador.
    zipUrl: null,
  },
};

export const extensionStoreOrder: ExtensionStore[] = ["chrome", "firefox", "safari"];

export function installModeOf(store: ExtensionStoreInfo): InstallMode | null {
  if (store.url) return "store";
  if (store.zipUrl) return "manual";
  return null;
}

// Versión vigente de la extensión, para que quien la instaló a mano sepa si está al día.
export const extensionVersion = process.env.NEXT_PUBLIC_EXT_VERSION?.trim() || null;
