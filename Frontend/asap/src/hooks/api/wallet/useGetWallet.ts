import axiosInstance from 'utils/axiosInstance';
import { useEffect, useState } from 'react';

const useGetWallet = () => {
  const [wallet, setWallet] = useState<string | null>(null);
  const getWallet = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/member/getAddress',
      });
      setWallet(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return { getWallet, wallet };
};

export default useGetWallet;
