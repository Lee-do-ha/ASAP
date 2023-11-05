import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect, useCallback } from 'react';
import useDetailStore from 'store/chart/useDetailStore';

interface IApi {
  apiId: number;
  title: string;
}

/**
 * 사용자가 사용중인 리스트
 * @returns 사용자가 사용중인 리스트, 로딩 여부
 */

const useGetUseList = () => {
  const [useListLoading, setUseListLoading] = useState<boolean>(true);
  const [useList, setUseList] = useState<IApi[] | null>();
  const { setApiId, setApiTitle } = useDetailStore();

  const getUseList = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/purpose/useList',
      });
      setUseList(response.data);
      if (response.data.length >= 1) {
        setApiId(response.data[0].apiId);
        setApiTitle(response.data[0].title);
      }
      setUseListLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [setApiId, setApiTitle]);

  useEffect(() => {
    getUseList();
  }, [getUseList]);

  return { useListLoading, useList };
};

export default useGetUseList;
