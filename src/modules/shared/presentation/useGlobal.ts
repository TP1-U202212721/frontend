"use client";
import React from "react";
import { useState } from "react";

export function useGlobal() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return { loading, setLoading, error, setError, success, setSuccess, isModalOpen, setIsModalOpen };
}

export const GlobalContext = React.createContext<ReturnType<typeof useGlobal> | null>(null);

export function useGlobalContext() {
    const context = React.useContext(GlobalContext);
    if (!context) throw new Error("useGlobalContext debe usarse dentro de GlobalProvider");
    return context;
}
