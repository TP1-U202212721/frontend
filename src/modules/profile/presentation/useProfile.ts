"use client";

import { useState, useEffect } from "react";
import { ProfileRepositoryImpl } from "../infrastructure/ProfileRepositoryImpl";
import { IProfileRepository } from "../domain/IProfileRepository";
import { UserProfile } from "../domain/UserProfile";

const profileRepository: IProfileRepository = new ProfileRepositoryImpl();

export function useProfile(userId: string) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await profileRepository.getProfile(userId);
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!profile) return;
    setLoading(true);
    try {
      const newProfile = { ...profile, ...updatedData };
      const saved = await profileRepository.updateProfile(newProfile);
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
