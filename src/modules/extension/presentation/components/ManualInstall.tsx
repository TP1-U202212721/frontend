"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download, FolderOpen, FolderX, Info, Pin, RefreshCw, Settings, ToggleRight } from "lucide-react";
import { extensionStores, extensionVersion } from "../../infrastructure/extensionStores";
import { Step, focusRing, stepText } from "./Step";

const extensionPages = [
  { browser: "Chrome", address: "chrome://extensions" },
  { browser: "Edge", address: "edge://extensions" },
  { browser: "Brave", address: "brave://extensions" },
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: se deja el texto seleccionado para copiarlo a mano.
      inputRef.current?.select();
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className="flex items-stretch gap-2">
        <input
          ref={inputRef}
          readOnly
          value={value}
          aria-label={`Dirección de extensiones de ${label}`}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 font-mono text-base text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
        />
        <button
          type="button"
          onClick={copy}
          className={`shrink-0 inline-flex items-center gap-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all active:scale-95 ${focusRing}`}
        >
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          <span>{copied ? "Copiado" : "Copiar"}</span>
          <span className="sr-only"> la dirección {value}</span>
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? `${value} copiado al portapapeles` : ""}
      </span>
    </div>
  );
}

export function ManualInstallNotices() {
  return (
    <div className="flex flex-col gap-3 mb-8 p-5 sm:p-6 rounded-2xl bg-white border-2 border-blue-200">
      <p className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
        <Info size={22} className="text-blue-600 shrink-0" aria-hidden="true" />
        Antes de empezar, ten en cuenta
      </p>
      <ul className="flex flex-col gap-3 text-base text-slate-700 font-medium">
        <li className="flex items-start gap-3">
          <RefreshCw size={20} className="text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong className="font-extrabold text-slate-800">No se actualiza sola.</strong> Cuando haya una versión
            nueva, descarga el .zip otra vez y repite la carga.
            {extensionVersion && (
              <>
                {" "}La versión vigente es la <strong className="font-extrabold text-slate-800">{extensionVersion}</strong>;
                la tuya aparece debajo del nombre de ScamShield en la página de extensiones.
              </>
            )}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <FolderX size={20} className="text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong className="font-extrabold text-slate-800">No borres la carpeta.</strong> El navegador carga la
            extensión desde ahí: si la borras o la mueves, deja de funcionar.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Info size={20} className="text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong className="font-extrabold text-slate-800">Es normal que el navegador te avise.</strong> Al
            abrirlo, Chrome puede mostrar un aviso sobre extensiones en modo de desarrollador. Aparece con cualquier
            extensión instalada a mano, no es una alerta sobre ScamShield. Puedes cerrarlo. Cuando la extensión esté
            en la tienda, podrás instalarla desde ahí y el aviso ya no saldrá.
          </span>
        </li>
      </ul>
    </div>
  );
}

// Pasos 1 a 5 de la instalación manual en Chrome, Edge y Brave.
export function ManualInstallSteps({ browserName }: { browserName: string | undefined }) {
  const zipUrl = extensionStores.chrome.zipUrl;
  // La dirección del navegador detectado va primero.
  const pages = [...extensionPages].sort(
    (a, b) => Number(b.browser === browserName) - Number(a.browser === browserName),
  );

  return (
    <>
      <Step number={1} title="Descarga el .zip y descomprímelo" Icon={Download}>
        <p className={stepText}>
          Descomprímelo en una carpeta que no vayas a borrar, por ejemplo Documentos › ScamShield.
        </p>
        {zipUrl && (
          <a
            href={zipUrl}
            download
            className={`mt-4 sm:ml-15 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold transition-colors ${focusRing}`}
          >
            <Download size={20} aria-hidden="true" />
            Descargar ScamShield{extensionVersion ? ` ${extensionVersion}` : ""} (.zip)
          </a>
        )}
      </Step>

      <Step number={2} title="Abre la página de extensiones" Icon={Settings}>
        <p className={`${stepText} mb-4`}>
          Copia la dirección de tu navegador y pégala en la barra de direcciones. El navegador no permite abrirla
          desde un enlace.
        </p>
        <div className="grid gap-4 sm:pl-15">
          {pages.map(({ browser, address }) => (
            <CopyField key={address} label={browser} value={address} />
          ))}
        </div>
      </Step>

      <Step number={3} title="Activa el Modo de desarrollador" Icon={ToggleRight}>
        <p className={stepText}>
          Es un interruptor arriba a la derecha de esa página. En Edge está en el panel de la izquierda.
        </p>
      </Step>

      <Step number={4} title="Pulsa «Cargar descomprimida»" Icon={FolderOpen}>
        <p className={stepText}>
          Elige la carpeta del paso 1: la que contiene el archivo manifest.json. En Edge el botón puede llamarse
          «Cargar desempaquetada».
        </p>
      </Step>

      <Step number={5} title="Fíjala en la barra" Icon={Pin}>
        <p className={stepText}>
          Haz clic en el ícono de pieza de rompecabezas (Extensiones) y luego en el alfiler junto a ScamShield.
        </p>
      </Step>
    </>
  );
}
