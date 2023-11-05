// 제공자 - 산업군 비율 조회
// 산업군 비율 조회

import axiosInstance from 'utils/axiosInstance';
import useDetailStore from 'store/chart/useDetailStore';
import { useCallback } from 'react';
import useIndustryRateStore from 'store/chart/useIndustryRateStore';

const useIndustryRate = () => {
  const { apiId } = useDetailStore();
  const { setIndustry, setCount } = useIndustryRateStore();

  const industryRate = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/api/v1/purpose/rate/${apiId}`,
      });
      if (response.data && Array.isArray(response.data)) {
        const industries = response.data.map((item) => item.industry);
        const counts = response.data.map((item) => item.count);
        setIndustry(industries);
        setCount(counts);
      }
    } catch (error) {
      console.log('산업군 비율 조회 실패', error);
    }
  }, [apiId, setIndustry, setCount]);
  return { industryRate };
};

export default useIndustryRate;
