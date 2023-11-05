import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
// import { useEffect } from 'react';
interface ApiData {
  applyId: number;
  createDate: string;
  modifyDate: string;
  progress: string;
  title: string;
}

const useAdminApiList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [apis, setApiList] = useState<ApiData[]>([]);
  const [lastChanged, setLastChanged] = useState<number>(0);
  const adminApiList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apply/list',
      });
      setApiList(response.data);
      setLoading(false);
    } catch (error) {
      sessionStorage.clear();
      alert('관리자 인증을 다시 해주세요.');
      window.location.href = '/admin';
      console.log('서버오류', error);
    }
  };

  useEffect(() => {
    adminApiList();
  }, [lastChanged]);
  return { apis, setLastChanged, loading };
};
export default useAdminApiList;
