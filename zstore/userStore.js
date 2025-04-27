// userStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  userId: '',
  chatId: '',
  title: '',
  
  setUsername: (name) => set({ username: name }),
  setUserId: (id) => set({ userId: id }),
  setChatId: (id) => set({ chatId: id }),
  settitle: (title) => set({ title: title }),
  
  clearUser: () => set({ username: '', userId: '', chatId: '' ,title: ''}),
}));

export default useUserStore;
