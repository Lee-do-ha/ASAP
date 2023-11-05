import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface ISupplyApply {
  id: number;
  title: string;
  content: string;
  input: JSON;
  ouput: JSON;
  tags: string[];
  progress: string;
}

const useSupplyApply = () => {
  const [loading, setLoading] = useState(true);
  const [supplyApplyList, setSupplyApplyList] = useState<ISupplyApply[] | null>(
    null,
  );

  const getSupplyApplyList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apply/my-list',
      });
      setSupplyApplyList(response.data);
      setLoading(false);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getSupplyApplyList();
  }, []);

  return { loading, supplyApplyList, getSupplyApplyList };
};

export default useSupplyApply;
