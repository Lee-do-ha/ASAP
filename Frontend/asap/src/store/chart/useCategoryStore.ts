import { create } from 'zustand';

interface CategoryInfo {
  categoryAverage: number;
  myApi: number;
}

interface CategoryStore {
  // axios 요청시 apiId-년도-월
  year: string;
  month: string;

  // 날짜 정보
  fourBeforeMonthDate: string;
  threeBeforeMonthDate: string;
  twoBeforeMonthDate: string;
  oneBeforeMonthDate: string;
  monthDate: string;

  // 카테고리  정보
  fourBeforeMonthUsage: CategoryInfo | null;
  threeBeforeMonthUsage: CategoryInfo | null;
  twoBeforeMonthUsage: CategoryInfo | null;
  oneBeforeMonthUsage: CategoryInfo | null;
  monthUsage: CategoryInfo | null;

  setFourBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setThreeBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setTwoBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars

  setFourBeforeMonthUsage: (monthUsage: CategoryInfo) => void; // eslint-disable-line no-unused-vars
  setThreeBeforeMonthUsage: (monthUsage: CategoryInfo) => void; // eslint-disable-line no-unused-vars
  setTwoBeforeMonthUsage: (monthUsage: CategoryInfo) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthUsage: (monthUsage: CategoryInfo) => void; // eslint-disable-line no-unused-vars
  setMonthUsage: (monthUsage: CategoryInfo) => void; // eslint-disable-line no-unused-vars

  setYear: (year: string) => void; // eslint-disable-line no-unused-vars
  setMonth: (month: string) => void; // eslint-disable-line no-unused-vars

  resetApiCategory: () => void; // eslint-disable-line no-unused-vars
}

const getCurrentYearAndMonth = () => {
  const date = new Date();
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
  };
};

const useCategoryStore = create<CategoryStore>((set) => ({
  ...getCurrentYearAndMonth(), // 현재 날짜 기준으로 year, month 초기값 설정
  fourBeforeMonthDate: '',
  threeBeforeMonthDate: '',
  twoBeforeMonthDate: '',
  oneBeforeMonthDate: '',
  monthDate: '',

  fourBeforeMonthUsage: null,
  threeBeforeMonthUsage: null,
  twoBeforeMonthUsage: null,
  oneBeforeMonthUsage: null,
  monthUsage: null,

  setFourBeforeMonthDate: (monthDate: string) =>
    set({ fourBeforeMonthDate: monthDate }),
  setThreeBeforeMonthDate: (monthDate: string) =>
    set({ threeBeforeMonthDate: monthDate }),
  setTwoBeforeMonthDate: (monthDate: string) =>
    set({ twoBeforeMonthDate: monthDate }),
  setOneBeforeMonthDate: (monthDate: string) =>
    set({ oneBeforeMonthDate: monthDate }),
  setMonthDate: (monthDate: string) => set({ monthDate }),

  setFourBeforeMonthUsage: (monthUsage: CategoryInfo) => {
    set({ fourBeforeMonthUsage: monthUsage });
  },
  setThreeBeforeMonthUsage: (monthUsage: CategoryInfo) => {
    set({ threeBeforeMonthUsage: monthUsage });
  },
  setTwoBeforeMonthUsage: (monthUsage: CategoryInfo) => {
    set({ twoBeforeMonthUsage: monthUsage });
  },
  setOneBeforeMonthUsage: (monthUsage: CategoryInfo) => {
    set({ oneBeforeMonthUsage: monthUsage });
  },
  setMonthUsage: (monthUsage: CategoryInfo) => {
    set({ monthUsage });
  },

  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),

  resetApiCategory: () => {
    set({
      fourBeforeMonthDate: '',
      threeBeforeMonthDate: '',
      twoBeforeMonthDate: '',
      oneBeforeMonthDate: '',
      monthDate: '',

      fourBeforeMonthUsage: null,
      threeBeforeMonthUsage: null,
      twoBeforeMonthUsage: null,
      oneBeforeMonthUsage: null,
      monthUsage: null,
    });
  },
}));

export default useCategoryStore;
