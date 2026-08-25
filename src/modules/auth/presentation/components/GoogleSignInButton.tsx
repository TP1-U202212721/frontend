"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type GoogleCredentialResponse = {
  credential?: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, string | number>
          ) => void;
        };
      };
    };
  }
}

// NEXT_PUBLIC_* se inyecta en tiempo de build, por lo que en Coolify debe
// estar marcada como build variable, igual que NEXT_PUBLIC_API_URL.
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface GoogleSignInButtonProps {
  // Recibe el id_token de Google; el backend lo verifica contra el JWKS.
  onCredential: (idToken: string) => void;
  disabled?: boolean;
}

export function GoogleSignInButton({ onCredential, disabled = false }: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onCredential);
  const isRendered = useRef(false);
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    callbackRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!isScriptReady || !CLIENT_ID || isRendered.current) return;

    const container = containerRef.current;
    const google = window.google;
    if (!container || !google) return;

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (response) => {
        if (response.credential) {
          callbackRef.current(response.credential);
        }
      },
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "signin_with",
      shape: "pill",
      logo_alignment: "left",
      locale: "es",
      // El ancho de Google admite hasta 400px.
      width: Math.min(container.clientWidth || 320, 400),
    });

    isRendered.current = true;
  }, [isScriptReady]);

  if (!CLIENT_ID) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="w-full text-center text-blue-100 text-sm font-medium mb-6">
        Configura NEXT_PUBLIC_GOOGLE_CLIENT_ID para habilitar el inicio de sesión con Google.
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setIsScriptReady(true)}
      />
      <div
        ref={containerRef}
        className={`w-full flex justify-center mb-6 min-h-[44px] ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      />
    </>
  );
}
