import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect, useCallback } from 'react';
import useDetailStore from 'store/chart/useDetailStore';

interface IapiId {
  apiId: number | undefined;
}

interface IDailyUsage {
  date: string;
  amount: number;
  price: number;
}

/**
 * 사용자 - 일간 사용량 조회
 * 30 일간 해당 API 사용량 조회
 * @returns 30일간 사용량, 일간 사용량 로딩
 */

const useDailyUsage = () => {
  const { apiId, setDailyUsageStore } = useDetailStore();
  const [dailyLoading, setDailyLoading] = useState<boolean>(true);
  const [dailyUsage, setDailyUsage] = useState<IDailyUsage[] | null>();

  const getDailyUsage = useCallback(
    async (paramsObject: IapiId) => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/api/v1/apis/usage/daily',
          params: paramsObject,
        });
        setDailyUsage(response.data);
        setDailyUsageStore(response.data);
        setDailyLoading(false);
      } catch (error) {
        setDailyLoading(false);
        console.log('사용자 일별 사용량 조회 실패', error);
      }
    },
    [setDailyUsageStore],
  );

  useEffect(() => {
    getDailyUsage({ apiId });
  }, [getDailyUsage, apiId]);

  return { getDailyUsage, dailyLoading, dailyUsage };
};

export default useDailyUsage;
