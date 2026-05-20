import { UserProfile } from "./UserProfile";

export interface IProfileRepository {
  getProfile(userId: string): Promise<UserProfile>;
  updateProfile(profile: UserProfile): Promise<UserProfile>;
}
