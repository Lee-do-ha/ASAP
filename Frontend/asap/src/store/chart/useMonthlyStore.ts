import { create } from 'zustand';

interface IApiResponse {
  apiId: number;
  walletId: number;
  price: number;
  title: string;
}

interface IMonthlyUsage {
  amount: number;
  apiResponse: IApiResponse;
  price: number;
}

interface IMonthlyStore {
  // axios 요청시 년도-월
  year: string;
  month: string;

  // 날짜 정보
  twoBeforeMonthDate: string;
  oneBeforeMonthDate: string;
  monthDate: string;

  // 사용량 정보
  twoBeforeMonthUsage: IMonthlyUsage[] | null;
  oneBeforeMonthUsage: IMonthlyUsage[] | null;
  monthUsage: IMonthlyUsage[] | null;

  // 사용량, 비용 합
  twoBeforeTotalAmount: number;
  twoBeforeTotalPrice: number;
  oneBeforeTotalAmount: number;
  oneBeforeTotalPrice: number;
  totalAmount: number;
  totalPrice: number;

  // 차트에 필요한 데이터
  monthlyPieChartContent: string[];
  monthlyPieChartValue: number[];

  setTwoBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setMonthDate: (monthDate: string) => void; // eslint-disable-line no-unused-vars
  setTwoBeforeMonthUsage: (monthUsage: IMonthlyUsage[]) => void; // eslint-disable-line no-unused-vars
  setOneBeforeMonthUsage: (monthUsage: IMonthlyUsage[]) => void; // eslint-disable-line no-unused-vars
  setMonthUsage: (monthUsage: IMonthlyUsage[]) => void; // eslint-disable-line no-unused-vars
  setYear: (year: string) => void; // eslint-disable-line no-unused-vars
  setMonth: (month: string) => void; // eslint-disable-line no-unused-vars
  setMonthlyPieChartContent: (monthUsage: IMonthlyUsage[]) => void; // eslint-disable-line no-unused-vars
  setMonthlyPieChartValue: (monthUsage: IMonthlyUsage[]) => void; // eslint-disable-line no-unused-vars
}

/**
 * 사용자 월간 사용량
 */

const getCurrentYearAndMonth = () => {
  const date = new Date();
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
  };
};

const useMonthlyStore = create<IMonthlyStore>((set) => ({
  ...getCurrentYearAndMonth(), // 현재 날짜 기준으로 year, month 초기값 설정
  twoBeforeMonthDate: '',
  oneBeforeMonthDate: '',
  monthDate: '', // 날짜 텍스트
  twoBeforeMonthUsage: null,
  oneBeforeMonthUsage: null,
  monthUsage: null, // 월별 사용량
  twoBeforeTotalAmount: 0,
  twoBeforeTotalPrice: 0,
  oneBeforeTotalAmount: 0,
  oneBeforeTotalPrice: 0,
  totalAmount: 0,
  totalPrice: 0,
  monthlyPieChartContent: [],
  monthlyPieChartValue: [],
  setTwoBeforeMonthDate: (monthDate: string) =>
    set({ twoBeforeMonthDate: monthDate }),
  setOneBeforeMonthDate: (monthDate: string) =>
    set({ oneBeforeMonthDate: monthDate }),
  setMonthDate: (monthDate: string) => set({ monthDate }),
  setTwoBeforeMonthUsage: (monthUsage: IMonthlyUsage[]) => {
    const totalAmount = monthUsage.reduce((acc, curr) => acc + curr.amount, 0);
    const totalPrice = monthUsage.reduce((acc, curr) => acc + curr.price, 0);
    set({
      twoBeforeMonthUsage: monthUsage,
      twoBeforeTotalAmount: totalAmount,
      twoBeforeTotalPrice: totalPrice,
    });
  },
  setOneBeforeMonthUsage: (monthUsage: IMonthlyUsage[]) => {
    const totalAmount = monthUsage.reduce((acc, curr) => acc + curr.amount, 0);
    const totalPrice = monthUsage.reduce((acc, curr) => acc + curr.price, 0);
    set({
      oneBeforeMonthUsage: monthUsage,
      oneBeforeTotalAmount: totalAmount,
      oneBeforeTotalPrice: totalPrice,
    });
  },
  setMonthUsage: (monthUsage: IMonthlyUsage[]) => {
    const totalAmount = monthUsage.reduce((acc, curr) => acc + curr.amount, 0);
    const totalPrice = monthUsage.reduce((acc, curr) => acc + curr.price, 0);
    set({ monthUsage, totalAmount, totalPrice });
  },
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setMonthlyPieChartContent: (monthUsage: IMonthlyUsage[]) => {
    let content: string[] = [];
    // 처음 5개 항목만 가져옵니다.
    const topItems = monthUsage.slice(0, 5);
    content = topItems.map((item) => item.apiResponse.title);
    // 6번째 항목부터는 '기타'로 표기합니다.
    if (monthUsage.length > 5) {
      content.push('기타');
    }
    if (!monthUsage.length) {
      content.push('내역이 없습니다.');
    }
    set({ monthlyPieChartContent: content });
  },
  setMonthlyPieChartValue: (monthUsage: IMonthlyUsage[]) => {
    let value: number[] = [];
    // 처음 5개 항목만 가져옵니다.
    const topItems = monthUsage.slice(0, 5);
    value = topItems.map((item) => item.price);
    // 6번째 항목부터는 '기타' 항목
    if (monthUsage.length > 5) {
      const otherItems = monthUsage.slice(5);
      const totalOtherValue = otherItems.reduce(
        (accum, item) => accum + item.price,
        0,
      );
      value.push(totalOtherValue);
    }
    if (!monthUsage.length) {
      value.push(0);
    }
    set({ monthlyPieChartValue: value });
  },
}));

export default useMonthlyStore;
