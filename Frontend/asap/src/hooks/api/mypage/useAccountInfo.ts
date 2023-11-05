import axiosInstance from 'utils/axiosInstance';
import { useEffect, useState } from 'react';

interface IMemberInfo {
  id: string;
  name: string;
  email: string;
}

const useAccountInfo = () => {
  const [memberInfo, setMemberInfo] = useState<IMemberInfo>();

  const getMemberInfo = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/member/me',
      });
      setMemberInfo(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getMemberInfo();
  }, []);

  return { getMemberInfo, memberInfo };
};

export default useAccountInfo;
