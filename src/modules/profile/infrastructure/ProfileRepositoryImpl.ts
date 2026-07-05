import { api } from "@/modules/shared/infrastructure/api";
import { IProfileRepository } from "../domain/IProfileRepository";
import { UserProfile } from "../domain/UserProfile";

export class ProfileRepositoryImpl implements IProfileRepository {
  async getProfile(email: string): Promise<UserProfile> {
    var profile = await api.get(`/Profile/${email}`);
    var data = profile.data.item as UserProfile;
    return data;
  }

  async updateProfile(id: number, profile: UserProfile): Promise<UserProfile> {
    var updatedProfile = await api.put(`/Profile/${id}`, profile);
    var data = updatedProfile.data.item as UserProfile;
    return data;
  }
}
