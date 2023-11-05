import axiosInstance from 'utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import useTestStore from 'store/api/useTestStore';

interface apiItem {
  method: string;
  title: string;
  api: string;
  input: string;
  inputExample: string;
  output: string;
  outputExample: string;
}

const useGetApiUsage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiUsage, setApiUsage] = useState<apiItem>();
  const { apiId } = useParams() as { apiId: string };
  const { setTestResponse } = useTestStore();

  const getApiUsage = useCallback(
    async (id: string) => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: `/api/v1/apis/guide/${id}`,
        });
        setApiUsage(response.data);
        setTestResponse(response.data.outputExample);
        setLoading(true);
      } catch (error) {
        console.log('서버 오류:', error);
      }
    },
    [setTestResponse],
  );

  useEffect(() => {
    getApiUsage(apiId);
  }, [apiId, getApiUsage]);

  return { getApiUsage, apiId, apiUsage, loading };
};

export default useGetApiUsage;
