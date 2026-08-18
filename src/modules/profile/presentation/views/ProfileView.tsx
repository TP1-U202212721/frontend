"use client";

import { useMemo, useState } from "react";
import { User, Mail, UserRound } from "lucide-react";
import { Loader } from "@/modules/shared/presentation/Loader";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useProfile } from "../hooks/useProfile";


export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const email = useMemo(() => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const payload: any = jwtDecode(token);
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    } catch {
      return null;
    }
  }, []);
  const { profile, updateProfile, loading } = useProfile(email);
  const [editName, setEditName] = useState("");

  const handleEditClick = () => {
    if (profile) {
      setEditName(profile.fullName);
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateProfile(profile!.id, { fullName: editName });
    setIsEditing(false);
  };

  if (!profile || loading) return <div className="h-screen w-full"><Loader /></div>

  return (
    <div className="flex flex-col items-center flex-1 p-4 sm:p-8 animate-fade-in relative w-full h-full min-h-[calc(100vh-100px)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700/5 rounded-b-[50px] -z-10" />

      <div className="max-w-4xl w-full">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-blue-700 mb-10 tracking-tight text-center sm:text-left">
          Mi perfil
        </h1>

        <div className="bg-blue-700 rounded-[32px] sm:rounded-[40px] shadow-2xl p-8 sm:p-16 relative overflow-hidden flex flex-col items-center">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-800 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center mb-12">
            <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-[24px] shadow-inner flex items-center justify-center text-blue-700 mb-6 transform hover:scale-105 transition-transform duration-300">
              <User size={80} className="sm:w-32 sm:h-32" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              {profile.username}
            </h2>
          </div>
          <div className="w-full max-w-2xl space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-xl sm:text-2xl font-bold text-blue-100 flex items-center gap-3 ml-2">
                <UserRound size={24} />
                Nombre Completo
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={isEditing ? editName : profile.fullName}
                  onChange={(e) => setEditName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-6 text-xl sm:text-2xl rounded-2xl font-bold transition-all shadow-inner outline-none ${isEditing
                    ? "bg-white text-slate-800 border-4 border-blue-400 focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                    : "bg-white/90 text-slate-800 border-transparent disabled:opacity-100"
                    }`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xl sm:text-2xl font-bold text-blue-100 flex items-center gap-3 ml-2">
                <Mail size={24} />
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled={true}
                  value={profile.email}
                  className={`w-full p-6 text-xl sm:text-2xl rounded-2xl font-bold transition-all shadow-inner outline-none bg-white/90 text-slate-800 border-transparent`}
                />
              </div>
            </div>
          </div>
          <div className="mt-16 w-full max-w-md relative z-10">
            {isEditing ? (
              <div className="space-y-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full py-5 bg-black text-white rounded-2xl text-2xl font-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:cursor-pointer transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                >
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full py-5 bg-black text-white rounded-2xl text-2xl font-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:cursor-pointer transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="w-full py-5 bg-black text-white rounded-2xl text-2xl font-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:cursor-pointer transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
              >
                Editar Perfil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
