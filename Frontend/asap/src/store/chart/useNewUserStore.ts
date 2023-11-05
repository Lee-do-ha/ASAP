import { create } from 'zustand';

interface newUserStore {
  fourBeforeMonthDate: string;
  threeBeforeMonthDate: string;
  twoBeforeMonthDate: string;
  oneBeforeMonthDate: string;
  monthDate: string;
  fourBeforeMonthCount: number;
  threeBeforeMonthCount: number;
  twoBeforeMonthCount: number;
  oneBeforeMonthCount: number;
  monthCount: number;

  setFourBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setThreeBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setTwoBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setFourBeforeMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars
  setThreeBeforeMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars
  setTwoBeforeMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars
  setMonthCount: (monthCount: number) => void; // eslint-disable-line no-unused-vars

  resetNewUser: () => void; // eslint-disable-line no-unused-vars
}
const useNewUserStore = create<newUserStore>((set) => ({
  fourBeforeMonthDate: '',
  threeBeforeMonthDate: '',
  twoBeforeMonthDate: '',
  oneBeforeMonthDate: '',
  monthDate: '',
  fourBeforeMonthCount: 0,
  threeBeforeMonthCount: 0,
  twoBeforeMonthCount: 0,
  oneBeforeMonthCount: 0,
  monthCount: 0,

  setFourBeforeMonthDate: (monthDate: string) =>
    set({ fourBeforeMonthDate: monthDate }),
  setThreeBeforeMonthDate: (monthDate: string) =>
    set({ threeBeforeMonthDate: monthDate }),
  setTwoBeforeMonthDate: (monthDate: string) =>
    set({ twoBeforeMonthDate: monthDate }),
  setOneBeforeMonthDate: (monthDate: string) =>
    set({ oneBeforeMonthDate: monthDate }),
  setMonthDate: (monthDate: string) => set({ monthDate }),
  setFourBeforeMonthCount: (monthCount: number) =>
    set({ fourBeforeMonthCount: monthCount }),
  setThreeBeforeMonthCount: (monthCount: number) =>
    set({ threeBeforeMonthCount: monthCount }),
  setTwoBeforeMonthCount: (monthCount: number) =>
    set({ twoBeforeMonthCount: monthCount }),
  setOneBeforeMonthCount: (monthCount: number) =>
    set({ oneBeforeMonthCount: monthCount }),
  setMonthCount: (monthCount: number) => set({ monthCount }),
  resetNewUser: () => {
    set({
      fourBeforeMonthDate: '',
      threeBeforeMonthDate: '',
      twoBeforeMonthDate: '',
      oneBeforeMonthDate: '',
      monthDate: '',
      fourBeforeMonthCount: 0,
      threeBeforeMonthCount: 0,
      twoBeforeMonthCount: 0,
      oneBeforeMonthCount: 0,
      monthCount: 0,
    });
  },
}));

export default useNewUserStore;
