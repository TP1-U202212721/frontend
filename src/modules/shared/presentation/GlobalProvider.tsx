    
"use client";
import { GlobalContext, useGlobal } from "./useGlobal";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const global = useGlobal();
    return (
        <GlobalContext.Provider value={global}>
            {children}
        </GlobalContext.Provider>
    );
}
