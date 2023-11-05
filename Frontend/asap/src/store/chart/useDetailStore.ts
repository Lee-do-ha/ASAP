import { create } from 'zustand';

interface IDailyUsage {
  date: string;
  amount: number;
  price: number;
}

interface IDetailStore {
  // axios 요청할 apiId
  apiId: number | undefined;
  apiTitle: string;
  dailyUsageStore: IDailyUsage[] | null;
  setDailyUsageStore: (dailyUsageStore: IDailyUsage[]) => void; // eslint-disable-line no-unused-vars
  setApiId: (apiId: number) => void; // eslint-disable-line no-unused-vars
  setApiTitle: (apiTitle: string) => void; // eslint-disable-line no-unused-vars
  resetApiDetails: () => void; // eslint-disable-line no-unused-vars
}

const useDetailStore = create<IDetailStore>((set) => ({
  apiId: undefined,
  apiTitle: '',
  dailyUsageStore: null,
  setApiId: (apiId: number) => set({ apiId }),
  setApiTitle: (apiTitle: string) => set({ apiTitle }),
  setDailyUsageStore: (dailyUsageStore: IDailyUsage[]) =>
    set({ dailyUsageStore }),
  resetApiDetails: () => {
    set({
      apiId: undefined,
      apiTitle: '',
      dailyUsageStore: null,
    });
  },
}));

export default useDetailStore;
