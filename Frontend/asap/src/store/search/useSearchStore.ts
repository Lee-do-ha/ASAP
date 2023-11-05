import { create } from 'zustand';

interface SearchStore {
  searchDropdown: boolean;
  toggleSearchDropdown: () => void; // eslint-disable-line no-unused-vars
  setSearchDropdown: (searchDropdown: boolean) => void; // eslint-disable-line no-unused-vars
}

const useSearchStore = create<SearchStore>((set) => ({
  searchDropdown: false,
  setSearchDropdown: (searchDropdown) => set({ searchDropdown }),
  toggleSearchDropdown: () =>
    set((state) => ({ searchDropdown: !state.searchDropdown })),
}));

export default useSearchStore;
