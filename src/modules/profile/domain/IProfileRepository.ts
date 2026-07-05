import { UserProfile } from "./UserProfile";

export interface IProfileRepository {
  getProfile(email: string): Promise<UserProfile>;
  updateProfile(id:number,profile: UserProfile): Promise<UserProfile>;
}
