import { create } from 'zustand';

interface IAuthStore {
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  loginType: string | null;
  setLoginType: (loginType: string) => void; // eslint-disable-line no-unused-vars
}

const useAuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
  isLoggedIn: !!sessionStorage.getItem('authToken'),
  loginType: sessionStorage.getItem('loginType'),
  setLoginType: (newLoginType) => {
    sessionStorage.setItem('loginType', newLoginType);
    set({ loginType: newLoginType });
  },
}));

export default useAuthStore;
