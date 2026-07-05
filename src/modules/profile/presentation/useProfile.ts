"use client";

import { useState, useEffect } from "react";
import { ProfileRepositoryImpl } from "../infrastructure/ProfileRepositoryImpl";
import { IProfileRepository } from "../domain/IProfileRepository";
import { UserProfile } from "../domain/UserProfile";
import { useGlobal } from "@/modules/shared/presentation/useGlobal";

const profileRepository: IProfileRepository = new ProfileRepositoryImpl();

export function useProfile(email: string) {
  const { loading, setLoading } = useGlobal()
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, [email]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await profileRepository.getProfile(email);
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id:number,updatedData: any) => {
    if (!profile) return;
    setLoading(true);
    try {
      const newProfile = { ...profile, ...updatedData };
      const saved = await profileRepository.updateProfile(id, newProfile);
      setProfile(saved);
      return saved;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, profile, updateProfile };
}
