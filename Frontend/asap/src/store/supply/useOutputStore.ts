import { create } from 'zustand';

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}

interface PairStore {
  key: string;
  name: string;
  type: string;
  description: string;
  required: string;
  pairs: Pair[];
  jsonOutput: string;
  setPairs: (pairs: Pair[]) => void; // eslint-disable-line no-unused-vars
  setJsonOutput: (jsonOutput: string) => void; // eslint-disable-line no-unused-vars
  setKey: (key: string) => void; // eslint-disable-line no-unused-vars
  setName: (name: string) => void; // eslint-disable-line no-unused-vars
  setType: (type: string) => void; // eslint-disable-line no-unused-vars
  setDescription: (description: string) => void; // eslint-disable-line no-unused-vars
  toggleRequired: () => void; // eslint-disable-line no-unused-vars
  resetRequired: () => void; // eslint-disable-line no-unused-vars
  updatePair: (idx: number, updatedData: Pair) => void; // eslint-disable-line no-unused-vars
  deletePair: (idx: number) => void; // eslint-disable-line no-unused-vars
}

const useOutputStore = create<PairStore>((set) => ({
  key: '',
  name: '',
  type: '',
  description: '',
  required: 'false',
  pairs: [],
  jsonOutput: '',
  setPairs: (pairs) => set({ pairs }),
  setKey: (key) => set({ key }),
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  toggleRequired: () =>
    set((state) => ({
      required: state.required === 'true' ? 'false' : 'true',
    })),
  setDescription: (description) => set({ description }),
  resetRequired: () => set(() => ({ required: 'false' })),
  setJsonOutput: (jsonOutput) => set({ jsonOutput }),
  updatePair: (idx, updatedData) => {
    set((state) => {
      const updatedPairs = state.pairs.map((pair) =>
        pair.idx === idx ? { ...pair, ...updatedData } : pair,
      );
      const jsonData = JSON.stringify(updatedPairs, null, 2);
      return {
        pairs: updatedPairs,
        jsonOutput: jsonData,
      };
    });
  },
  deletePair: (idx) => {
    set((state) => {
      const filteredPairs = state.pairs.filter((pair) => pair.idx !== idx);
      const jsonData = JSON.stringify(filteredPairs, null, 2);
      return {
        pairs: filteredPairs,
        jsonOutput: jsonData,
      };
    });
  },
}));

export default useOutputStore;
