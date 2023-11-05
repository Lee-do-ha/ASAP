import axiosInstance from 'utils/axiosInstance';
import { useEffect, useState, useCallback } from 'react';
import useMonthlyStore from 'store/chart/useMonthlyStore';

interface monthly {
  year: string;
  month: string;
}
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

/**
 * 사용자 - 월별 사용량 조회
 * month 포함 이전 3개월 조회
 * @returns 월간 사용량, 월간 사용량 로딩
 */

const useMonthlyUsage = () => {
  const {
    year,
    month,
    setMonthDate,
    setOneBeforeMonthDate,
    setTwoBeforeMonthDate,
    setMonthUsage,
    setOneBeforeMonthUsage,
    setTwoBeforeMonthUsage,
    setMonthlyPieChartContent,
    setMonthlyPieChartValue,
  } = useMonthlyStore();
  const [monthlyLoading, setMonthlyLoading] = useState<boolean>(true);

  const getMonthlyUsage = useCallback(
    async (paramsObject: monthly) => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/api/v1/apis/usage/monthly',
          params: paramsObject,
        });
        // 월별로 데이터 변환
        const monthlyData: Array<{ month: string; data: IMonthlyUsage[] }> =
          Object.keys(response.data).map((key) => {
            return { month: key, data: response.data[key] };
          });

        // 날짜 기준으로 monthlyData 정렬
        monthlyData.sort((a, b) => {
          return new Date(b.month).getTime() - new Date(a.month).getTime();
        });

        setMonthDate(monthlyData[0].month);
        setMonthUsage(monthlyData[0].data);

        setOneBeforeMonthDate(monthlyData[1].month);
        setOneBeforeMonthUsage(monthlyData[1].data);

        setMonthlyPieChartContent(monthlyData[0].data);
        setMonthlyPieChartValue(monthlyData[0].data);

        setTwoBeforeMonthDate(monthlyData[2].month);
        setTwoBeforeMonthUsage(monthlyData[2].data);

        setMonthlyLoading(false);
      } catch (error) {
        console.log('사용자 월별 사용량 조회 실패', error);
        setMonthlyLoading(false);
      }
    },
    [
      setMonthUsage,
      setOneBeforeMonthUsage,
      setTwoBeforeMonthUsage,
      setMonthDate,
      setOneBeforeMonthDate,
      setTwoBeforeMonthDate,
      setMonthlyPieChartContent,
      setMonthlyPieChartValue,
    ],
  );

  useEffect(() => {
    getMonthlyUsage({
      year,
      month,
    });
  }, [year, month, getMonthlyUsage]);

  return {
    monthlyLoading,
  };
};

export default useMonthlyUsage;
