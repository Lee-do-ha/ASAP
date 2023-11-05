import { useState } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface APIDetail {
  api: string;
  input: string;
  inputExample: string;
  output: string;
  outputExample: string;
  price: number;
  progress: string;
  title: string;
  content: string;
  provideDate: string;
  createDate: 'T' | string;
  id: string;
  name: string;
  tags: string;
  method: string;
}
const useAdminApiDetail = () => {
  const [apiDetail, setApiDetail] = useState<APIDetail>();
  const adminApiDetail = async (applyId: number) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/api/v1/apply/detail/${applyId}`,
      });
      setApiDetail(response.data);
    } catch (error) {
      console.log('서버 오류');
    }
  };

  return { adminApiDetail, apiDetail };
};

export default useAdminApiDetail;
