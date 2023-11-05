import { create } from 'zustand';

interface apiItem {
  title: string;
  api: string;
  input: string;
  inputExample: string;
  output: string;
  outputExample: string;
}

interface UsageState {
  apiUsage: apiItem;
  setApiUsage: (apiUsage: apiItem) => void; // eslint-disable-line no-unused-vars
}

const initialApiUsage: apiItem = {
  title: '',
  api: '',
  input: '',
  inputExample: '',
  output: '',
  outputExample: '',
};

const useUsageStore = create<UsageState>((set) => ({
  apiUsage: initialApiUsage,
  setApiUsage: (apiUsage) => set(() => ({ apiUsage })),
}));

export default useUsageStore;
