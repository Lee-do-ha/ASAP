import { useState, useEffect, useCallback } from 'react';
import axiosInstance from 'utils/axiosInstance';
import useNoticeStore from 'store/notice/useNoticeStore';

interface INotice {
  noticeId: number;
  title: string;
  content: string;
  read: boolean;
  createDate: string;
}

const useNoticeList = () => {
  const [loading, setLoading] = useState(true);
  const [noticeList, setNoticeList] = useState<INotice[] | null>(null);
  const { setNotices } = useNoticeStore((state) => state);

  const getNoticeList = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/notice/list',
      });
      // 알림을 최신 순으로 정렬
      const sortedNoticeList = response.data.sort((a: INotice, b: INotice) => {
        return (
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        );
      });
      setNoticeList(sortedNoticeList); // state 업데이트
      setNotices(sortedNoticeList); // 스토어에 저장
      setLoading(false);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  }, [setNotices]);

  useEffect(() => {
    getNoticeList();
  }, [getNoticeList]);

  return { getNoticeList, loading, noticeList };
};

export default useNoticeList;
