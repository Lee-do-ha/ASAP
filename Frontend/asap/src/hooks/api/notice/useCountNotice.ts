import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';

/**
 * 읽지 않은 메시지 개수 조회
 * @returns {number} noticeCount 읽지 않은 메시지 개수
 */

const useCountNotice = () => {
  const [noticeCount, setNoticeCount] = useState<number>(0);

  const getNoticeCount = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/notice/list-count',
      });
      setNoticeCount(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getNoticeCount();
  }, []);

  return { getNoticeCount, noticeCount };
};

export default useCountNotice;
