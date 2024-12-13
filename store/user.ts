import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { RegisterPayload } from "./step";

interface UserProps extends RegisterPayload {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  streak: number;
}

interface UserState {
  accessToken: string | null;
  user: UserProps | null;
  isFirstOpen: boolean;
  setUser: (user: UserProps) => void;
  resetUser: () => void;
  updateUser: (updatedFields: Partial<UserProps>) => void;
  setAccessToken: (accessToken: string) => void;
  setIsFirstOpenFalse: () => void;
  setIsFirstOpenTrue: () => void;
}

const useUserStore = create<UserState, [any]>(
  persist(
    (set) => ({
      accessToken: null,
      isFirstOpen: true,
      user: null,

      setIsFirstOpenFalse: () => set(() => ({ isFirstOpen: false })),
      setIsFirstOpenTrue: () => set(() => ({ isFirstOpen: true })),

      setAccessToken: (accessToken: string) => set(() => ({ accessToken })),

      setUser: (user) => set(() => ({ user })),

      resetUser: () => set(() => ({ user: null })),

      updateUser: (updatedFields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null,
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
