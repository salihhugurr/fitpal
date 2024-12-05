import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  age: number;
  weight: number;
  height: number;
  streak: number;
};

interface UserState {
  accessToken: string | null;
  user: UserProps | null;
  isFirstOpen: boolean;
  setUser: (user: UserProps) => void;
  resetUser: () => void;
  updateUser: (updatedFields: Partial<UserProps>) => void;
  setAccessToken: (accessToken: string) => void;
  setIsFirstOpenFalse: () => void;
}

const useUserStore = create<UserState, [any]>(
  persist(
    (set) => ({
      accessToken: null,
      isFirstOpen: true,
      user: null,

      setIsFirstOpenFalse: () => set(() => ({ isFirstOpen: false })),

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
