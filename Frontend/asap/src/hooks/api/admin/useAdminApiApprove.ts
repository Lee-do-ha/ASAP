import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface APIApprove {
  applyId: number;
  category: string;
  api: string;
}

const useAdminApiApprove = () => {
  const [approveCategory, setApproveCategory] = useState([]);

  const adminApiApprove = async ({ applyId, category, api }: APIApprove) => {
    try {
      await axiosInstance({
        method: 'PUT',
        url: '/api/v1/apply/approve',
        data: {
          applyId,
          category,
          api,
        },
      });
    } catch (error) {
      console.log('서버 오류');
    }
  };

  const adminApiApproveCategory = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/category/list',
      });
      setApproveCategory(response.data);
    } catch (error) {
      console.log('서버 오류');
    }
  };
  useEffect(() => {
    adminApiApproveCategory();
  }, []);

  return { adminApiApprove, adminApiApproveCategory, approveCategory };
};

export default useAdminApiApprove;
