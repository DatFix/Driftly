import { IUser } from "@/interfaces/public/IUser.interface";
import { create } from "zustand";


interface UserDataState {
  userData: IUser | null;
  setUserData: (userData: IUser) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserDataState>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),
  clearUserData: () => set({ userData: null }),
}));
