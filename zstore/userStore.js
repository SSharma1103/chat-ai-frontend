// userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  userId: '',
  chatId: '',
  
  setUsername: (name) => set({ username: name }),
  setUserId: (id) => set({ userId: id }),
 setChatId: (id) => set({ chatId: id }),
  
  clearUser: () => set({ username: '', userId: '', chatId: '' }),
}));

export default useUserStore;
