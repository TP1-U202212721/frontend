"use client";

import {
  Clock,
  Download,
  ExternalLink,
  Info,
  Monitor,
  Pin,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { DetectedBrowser, ExtensionStore } from "../../domain/Browser";
import { ExtensionStoreInfo, extensionStoreOrder, extensionStores } from "../../infrastructure/extensionStores";
import { useDetectedBrowser } from "../hooks/useDetectedBrowser";

const focusRing =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50";

function PrimaryStoreButton({ store, browserName }: { store: ExtensionStoreInfo; browserName: string }) {
  if (!store.url) {
    return (
      <div className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border-2 border-dashed border-blue-300 bg-white text-blue-800">
        <Clock size={28} aria-hidden="true" />
        <span className="text-left">
          <span className="block text-xl font-extrabold">Próximamente para {browserName}</span>
          <span className="block text-base font-medium text-slate-600">
            Aún no está publicada en {store.storeName}.
          </span>
        </span>
      </div>
    );
  }

  return (
    <a
      href={store.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition-all active:scale-95 ${focusRing}`}
    >
      <Download size={28} strokeWidth={2.5} aria-hidden="true" />
      <span className="text-left">
        <span className="block text-xl font-extrabold">Descargar la extensión para {browserName}</span>
        <span className="block text-base font-medium text-blue-100">
          Desde {store.storeName}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </span>
      </span>
    </a>
  );
}

function SecondaryStoreLink({ store, label }: { store: ExtensionStoreInfo; label?: string }) {
  const text = label ?? `Descargar para ${store.browserName}`;

  if (!store.url) {
    return (
      <li className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-600">
        <span className="font-bold">{label ?? store.browserName}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold uppercase tracking-wide">
          <Clock size={16} aria-hidden="true" />
          Próximamente
        </span>
      </li>
    );
  }

  return (
    <li>
      <a
        href={store.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-between gap-3 px-5 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-800 hover:border-blue-500 hover:text-blue-700 transition-colors font-bold ${focusRing}`}
      >
        <span>
          {text}
          <span className="sr-only"> desde {store.storeName} (se abre en una pestaña nueva)</span>
        </span>
        <ExternalLink size={18} aria-hidden="true" />
      </a>
    </li>
  );
}

function StoreList({ stores }: { stores: ExtensionStore[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3 w-full">
      {stores.map((id) => (
        <SecondaryStoreLink key={id} store={extensionStores[id]} />
      ))}
    </ul>
  );
}

function DesktopDownload({ browser }: { browser: DetectedBrowser | null }) {
  // Sin detección (render del servidor o navegador desconocido): todas las opciones al mismo nivel.
  if (!browser || !browser.store) {
    return (
      <div className="w-full max-w-3xl flex flex-col items-center gap-4">
        <p className="text-lg font-bold text-slate-700">Elige tu navegador para descargar la extensión:</p>
        <StoreList stores={extensionStoreOrder} />
      </div>
    );
  }

  const others = extensionStoreOrder.filter((id) => id !== browser.store);

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-6">
      <PrimaryStoreButton store={extensionStores[browser.store]} browserName={browser.name} />
      <div className="w-full flex flex-col items-center gap-3">
        <p className="text-base font-bold text-slate-600">¿Usas otro navegador?</p>
        <ul className="grid gap-3 sm:grid-cols-2 w-full max-w-xl">
          {others.map((id) => (
            <SecondaryStoreLink key={id} store={extensionStores[id]} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileDownload({ browser }: { browser: DetectedBrowser }) {
  const isIOS = browser.platform === "ios";
  const mobileStore = extensionStores[isIOS ? "safari" : "firefox"];
  const mobileLabel = isIOS ? "Safari para iPhone" : "Firefox para Android";

  let browserNote: string | null = null;
  if (isIOS && browser.store !== "safari") {
    browserNote = "En iPhone, las extensiones solo funcionan en Safari.";
  } else if (!isIOS && browser.store !== "firefox") {
    browserNote = "En Android, Chrome no admite extensiones.";
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-5 text-left">
      <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border-2 border-blue-200 bg-white">
        <Monitor size={32} className="text-blue-600 shrink-0 mt-1" aria-hidden="true" />
        <div>
          <p className="text-lg font-extrabold text-slate-800">Estás en un celular</p>
          <p className="text-base text-slate-600 font-medium mt-1">
            La extensión funciona en el navegador de tu computadora: Chrome, Edge, Brave, Firefox o Safari.
            Abre esta página desde ahí para instalarla.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-white">
        <Smartphone size={32} className="text-slate-500 shrink-0 mt-1" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-extrabold text-slate-800">¿Y en el celular?</p>
          <p className="text-base text-slate-600 font-medium mt-1 mb-4">
            {mobileStore.url
              ? `Ya puedes usarla en ${mobileLabel}.`
              : `Estará disponible en ${mobileLabel} cuando la publiquemos.`}
            {browserNote && ` ${browserNote}`}
          </p>
          <ul>
            <SecondaryStoreLink store={mobileStore} label={mobileLabel} />
          </ul>
        </div>
      </div>
    </div>
  );
}

const verdicts = [
  {
    label: "Riesgo alto",
    description: "Hay señales fuertes de posible estafa. Te recomendamos no pagar.",
    className: "text-rose-700 bg-rose-50 border-rose-200",
    Icon: ShieldAlert,
  },
  {
    label: "Riesgo moderado",
    description: "Hay señales de alerta. Verifica antes de pagar.",
    className: "text-amber-800 bg-amber-50 border-amber-200",
    Icon: ShieldAlert,
  },
  {
    label: "Riesgo bajo",
    description: "No encontramos señales de alerta, pero no es una garantía.",
    className: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Icon: ShieldCheck,
  },
  {
    label: "Evidencia insuficiente",
    description: "No hay datos suficientes para dar un veredicto.",
    className: "text-slate-700 bg-slate-100 border-slate-400 border-dashed",
    Icon: ShieldQuestion,
  },
];

function pinHint(store: ExtensionStore | null | undefined): string {
  switch (store) {
    case "chrome":
      return "Haz clic en el ícono de pieza de rompecabezas (Extensiones) y luego en el alfiler junto a ScamShield.";
    case "firefox":
      return "Abre el botón de Extensiones de la barra y elige «Fijar a la barra de herramientas» en ScamShield.";
    case "safari":
      return "Actívala en Safari › Ajustes › Extensiones; el escudo aparecerá junto a la barra de direcciones.";
    default:
      return "Fíjala desde el menú de extensiones de tu navegador para tener el escudo siempre a la vista.";
  }
}

function StepHeader({ number, title, Icon }: { number: number; title: string; Icon: typeof Pin }) {
  return (
    <div className="flex items-center gap-4 mb-3">
      <span
        className="w-11 h-11 shrink-0 rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-extrabold"
        aria-hidden="true"
      >
        {number}
      </span>
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
        <span className="sr-only">Paso {number}: </span>
        {title}
        <Icon size={22} className="text-blue-600 shrink-0" aria-hidden="true" />
      </h3>
    </div>
  );
}

export function ExtensionHomeView() {
  const browser = useDetectedBrowser();
  const isMobile = browser !== null && browser.platform !== "desktop";

  return (
    <div className="flex flex-col items-center flex-1 px-4 sm:px-6 py-10 sm:py-16 relative w-full">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <section
        aria-labelledby="hero-title"
        className="max-w-4xl w-full flex flex-col items-center text-center mb-16 sm:mb-20 animate-fade-in motion-reduce:animate-none"
      >
        <p className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-800 font-bold text-sm sm:text-base">
          <ShieldCheck size={18} aria-hidden="true" />
          Extensión para Chrome, Firefox y Safari
        </p>
        <h1
          id="hero-title"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 leading-tight"
        >
          Descarga la extensión y revisa al vendedor antes de pagar
        </h1>
        <p className="text-lg sm:text-2xl text-slate-600 font-medium mb-10 max-w-3xl">
          ScamShield analiza la ficha de producto que ya tienes abierta y te muestra un veredicto de riesgo
          ahí mismo, sin copiar ni pegar enlaces.
        </p>

        {isMobile ? <MobileDownload browser={browser} /> : <DesktopDownload browser={browser} />}
      </section>

      <section aria-labelledby="steps-title" className="max-w-4xl w-full mb-12 animate-slide-up motion-reduce:animate-none">
        <h2 id="steps-title" className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center mb-8 sm:mb-10">
          Cómo empezar en 4 pasos
        </h2>

        <ol className="flex flex-col gap-5 list-none">
          <li className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
            <StepHeader number={1} title="Instala la extensión" Icon={Download} />
            <p className="text-base sm:text-lg text-slate-600 font-medium sm:pl-15">
              Descárgala desde la tienda de tu navegador y acepta la instalación.
            </p>
          </li>

          <li className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
            <StepHeader number={2} title="Fíjala en la barra" Icon={Pin} />
            <p className="text-base sm:text-lg text-slate-600 font-medium sm:pl-15">
              {pinHint(browser?.store)}
            </p>
          </li>

          <li className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
            <StepHeader number={3} title="Abre una ficha de producto" Icon={ShoppingBag} />
            <p className="text-base sm:text-lg text-slate-600 font-medium sm:pl-15">
              Entra a la publicación que quieres comprar en MercadoLibre (u otro marketplace compatible).
              ScamShield revisa esa ficha y al vendedor.
            </p>
          </li>

          <li className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
            <StepHeader number={4} title="Lee el veredicto antes de pagar" Icon={ShieldCheck} />
            <p className="text-base sm:text-lg text-slate-600 font-medium mb-5 sm:pl-15">
              La extensión te muestra uno de estos cuatro resultados:
            </p>

            <ul className="grid gap-3 sm:grid-cols-2 mb-5 sm:pl-15">
              {verdicts.map(({ label, description, className, Icon }) => (
                <li key={label} className={`flex items-start gap-3 p-4 rounded-xl border-2 ${className}`}>
                  <Icon size={26} className="shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <span className="block font-black uppercase tracking-wide">{label}</span>
                    <span className="block text-sm sm:text-base font-medium text-slate-700">{description}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="sm:ml-15 flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-blue-50 border-l-4 border-blue-700">
              <ShieldQuestion size={26} className="text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-base sm:text-lg text-slate-800 font-medium">
                <strong className="font-extrabold">«Evidencia insuficiente» no significa que sea seguro.</strong>{" "}
                Significa que no hay datos suficientes para opinar sobre ese vendedor. Tómalo como una razón para
                verificar más, no como luz verde para pagar.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <p className="max-w-3xl text-center text-lg sm:text-xl text-slate-600 font-medium flex items-start sm:items-center justify-center gap-2">
        <Info size={24} className="text-blue-600 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        ScamShield puede equivocarse. Considera verificar los resultados antes de pagar.
      </p>
    </div>
  );
}
