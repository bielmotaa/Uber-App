import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UserStoreDTO } from '../models/user/user-data'


interface UserStore {
  user: UserStoreDTO | null
  clearUser: () => void
  save: (newUser: UserStoreDTO) => void
}


export const useUserStore = create<UserStore>()(
    persist(
      (set) => ({
        user: null,
        clearUser: () => set({ user: undefined }),
        save: (newUser: UserStoreDTO) => set({ user: newUser }),
      }),
      {
        name: 'uber:user',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );