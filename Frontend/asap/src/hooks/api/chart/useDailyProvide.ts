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
 * 제공자 - 일간 제공량 조회
 * 30 일간 해당 API 제공량 조회
 * @returns 30일간 제공량, 일간 제공량 로딩
 */

const useDailyProvide = () => {
  const { apiId, setDailyUsageStore } = useDetailStore();
  const [dailyLoading, setDailyLoading] = useState<boolean>(true);
  const [dailyUsage, setDailyUsage] = useState<IDailyUsage[] | null>();

  const getDailyProvide = useCallback(
    async (paramsObject: IapiId) => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/api/v1/apis/providing/daily',
          params: paramsObject,
        });
        setDailyUsage(response.data);
        setDailyUsageStore(response.data);
        setDailyLoading(false);
      } catch (error) {
        console.log('제공자 일별 사용량 조회 실패', error);
        setDailyLoading(false);
      }
    },
    [setDailyUsageStore],
  );

  useEffect(() => {
    getDailyProvide({ apiId });
  }, [getDailyProvide, apiId]);

  return { getDailyProvide, dailyLoading, dailyUsage };
};

export default useDailyProvide;
