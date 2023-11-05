import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect, useCallback } from 'react';

const useBatchTime = () => {
  const [batchTimeLoading, setBatchTimeLoading] = useState<boolean>(true);
  const [batchTime, setBatchTime] = useState<string | null>();

  const getBatchTime = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/batch/api/v1/batch',
      });
      setBatchTime(response.data);
      setBatchTimeLoading(false);
    } catch (error) {
      setBatchTimeLoading(false);
    }
  }, []);

  useEffect(() => {
    getBatchTime();
  }, [getBatchTime]);

  return { batchTimeLoading, batchTime };
};

export default useBatchTime;
