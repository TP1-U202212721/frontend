import { IProfileRepository } from "../domain/IProfileRepository";
import { UserProfile } from "../domain/UserProfile";

export class ProfileRepositoryImpl implements IProfileRepository {
  async getProfile(userId: string): Promise<UserProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: userId,
          username: "LordMathi2741",
          fullName: "Mathias Alejandro Jave Diaz",
          createdAt: "21/04/2026",
        });
      }, 500);
    });
  }

  async updateProfile(profile: UserProfile): Promise<UserProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(profile);
      }, 800);
    });
  }
}
