import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import useAuthStore from 'store/auth/useAuthStore';

interface monthly {
  year: string | null;
  month: string | null;
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

const useMonthlyDetail = () => {
  const [searchParams] = useSearchParams();
  const [monthlyLoading, setMonthlyLoading] = useState<boolean>(true);
  const [monthlyDetail, setMonthlyDetail] = useState<IMonthlyUsage[] | null>();
  const [monthDate, setMonthDate] = useState<string>('');
  const { loginType } = useAuthStore((state) => state);

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const getMonthlyDetail = useCallback(
    async (paramsObject: monthly) => {
      try {
        setMonthlyLoading(true);
        if (loginType === 'user') {
          const response = await axiosInstance({
            method: 'GET',
            url: '/api/v1/apis/usage/monthly/one',
            params: paramsObject,
          });
          const monthlyData: Array<{ month: string; data: IMonthlyUsage[] }> =
            Object.keys(response.data).map((key) => {
              return { month: key, data: response.data[key] };
            });
          if (monthlyData[0]) {
            setMonthDate(monthlyData[0].month);
            setMonthlyDetail(monthlyData[0].data);
          }
        } else {
          const response = await axiosInstance({
            method: 'GET',
            url: '/api/v1/apis/providing/monthly/one',
            params: paramsObject,
          });
          const monthlyData: Array<{ month: string; data: IMonthlyUsage[] }> =
            Object.keys(response.data).map((key) => {
              return { month: key, data: response.data[key] };
            });
          if (monthlyData[0]) {
            setMonthDate(monthlyData[0].month);
            setMonthlyDetail(monthlyData[0].data);
          }
        }
        setMonthlyLoading(false);
      } catch (error) {
        console.log(error);
        setMonthlyLoading(false);
      }
    },
    [loginType],
  );

  useEffect(() => {
    getMonthlyDetail({ year, month });
  }, [getMonthlyDetail, month, year]);

  return { monthlyLoading, monthlyDetail, monthDate };
};

export default useMonthlyDetail;
