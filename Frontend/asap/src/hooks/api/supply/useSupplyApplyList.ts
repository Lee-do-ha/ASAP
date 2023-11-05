import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface ISupplyApply {
  applyId: number;
  title: string;
  content: string;
  input: JSON;
  ouput: JSON;
  tags: string[];
  progress: string;
  createDate: string;
}

const useSupplyApplyList = () => {
  const [loading, setLoading] = useState(true);
  const [supplyApplyList, setSupplyApplyList] = useState<ISupplyApply[]>([]);

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

export default useSupplyApplyList;
