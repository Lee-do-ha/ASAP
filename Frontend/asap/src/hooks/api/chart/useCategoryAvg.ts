// 제공자 - 동일 카테고리 비교
// 카테고리 평균 조회

import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect, useCallback } from 'react';
import useDetailStore from 'store/chart/useDetailStore';
import useCategoryStore from 'store/chart/useCategoryStore';

interface categoryAvgInfo {
  apiId: number | undefined;
  year: string;
  month: string;
}

interface CategoryInfo {
  categoryAverage: number;
  myApi: number;
}

const useCategoryAvg = () => {
  const [categoryAvgLoading, setCategoryAvgLoading] = useState<boolean>(true);
  const { apiId } = useDetailStore();
  const {
    year,
    month,
    setFourBeforeMonthDate,
    setThreeBeforeMonthDate,
    setTwoBeforeMonthDate,
    setOneBeforeMonthDate,
    setMonthDate,
    setFourBeforeMonthUsage,
    setThreeBeforeMonthUsage,
    setTwoBeforeMonthUsage,
    setOneBeforeMonthUsage,
    setMonthUsage,
  } = useCategoryStore();

  const getCategoryAvg = useCallback(
    async (paramsObject: categoryAvgInfo) => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/api/v1/apis/average/category',
          params: paramsObject,
        });
        // 월별로 데이터 변환
        const monthlyData: Array<{ month: string; data: CategoryInfo }> =
          Object.keys(response.data).map((key) => {
            return { month: key, data: response.data[key] };
          });
        // monthlyData를 기반으로 스토어 상태 업데이트
        if (monthlyData[0]) {
          setMonthDate(monthlyData[0].month);
          setMonthUsage(monthlyData[0].data);
        }
        if (monthlyData[1]) {
          setOneBeforeMonthDate(monthlyData[1].month);
          setOneBeforeMonthUsage(monthlyData[1].data);
        }
        if (monthlyData[2]) {
          setTwoBeforeMonthDate(monthlyData[2].month);
          setTwoBeforeMonthUsage(monthlyData[2].data);
        }
        if (monthlyData[3]) {
          setThreeBeforeMonthDate(monthlyData[3].month);
          setThreeBeforeMonthUsage(monthlyData[3].data);
        }
        if (monthlyData[4]) {
          setFourBeforeMonthDate(monthlyData[4].month);
          setFourBeforeMonthUsage(monthlyData[4].data);
        }

        setCategoryAvgLoading(false);
      } catch (error) {
        console.log('다른 카테고리 평균 조회 실패', error);
        setCategoryAvgLoading(false);
      }
    },
    [
      setFourBeforeMonthDate,
      setThreeBeforeMonthDate,
      setTwoBeforeMonthDate,
      setOneBeforeMonthDate,
      setMonthDate,
      setFourBeforeMonthUsage,
      setThreeBeforeMonthUsage,
      setTwoBeforeMonthUsage,
      setOneBeforeMonthUsage,
      setMonthUsage,
    ],
  );
  useEffect(() => {
    getCategoryAvg({ apiId, year, month });
  }, [apiId, year, month, getCategoryAvg]);
  return { categoryAvgLoading };
};

export default useCategoryAvg;
