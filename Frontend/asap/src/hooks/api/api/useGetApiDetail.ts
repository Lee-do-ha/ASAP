import axiosInstance from 'utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface IApi {
  id: string;
  title: string;
  category: string;
  memberName: string;
  content: string;
  output: string;
  tags: string;
  price: string;
}

const useGetApiDetail = () => {
  const [apiDetail, setApiDetail] = useState<IApi | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { apiId } = useParams() as { apiId: string };
  const getApiDetail = async (id: string) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `https://j9c202.p.ssafy.io/api/v1/apis/detail/${id}`,
      });
      setApiDetail(response.data);
      setLoading(false);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getApiDetail(apiId);
  }, [apiId]);

  return { apiDetail, getApiDetail, apiId, loading };
};

export default useGetApiDetail;
