import { useState, useEffect, useCallback } from 'react';
import axiosInstance from 'utils/axiosInstance';
import useTestStore from 'store/api/useTestStore';

const useTrialCount = () => {
  const { setTrial } = useTestStore();
  const [trialLoading, setTrialLoading] = useState<boolean>(true);

  const getTrialCount = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/redis/test',
      });
      setTrial(100 - response.data);
      setTrialLoading(false);
    } catch (error) {
      console.log('서버 오류 :', error);
    }
  }, [setTrial]);

  useEffect(() => {
    getTrialCount();
  }, [getTrialCount]);

  return { getTrialCount, trialLoading };
};

export default useTrialCount;
