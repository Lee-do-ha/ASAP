import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect, useCallback } from 'react';
import useDetailStore from 'store/chart/useDetailStore';

interface IApi {
  apiId: number;
  title: string;
}

/**
 * 제공자가 제공중인 api 리스트
 * @returns 제공중인 리스트, 로딩 여부
 */

const useGetOfferList = () => {
  const [offerListLoading, setOfferListLoading] = useState<boolean>(true);
  const [offerList, setOfferList] = useState<IApi[] | null>();
  const { setApiId, setApiTitle } = useDetailStore();

  const getOfferList = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apis/offerList',
      });
      setOfferList(response.data);
      if (response.data.length >= 1) {
        setApiId(response.data[0].apiId);
        setApiTitle(response.data[0].title);
      }
      setOfferListLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [setApiId, setApiTitle]);

  useEffect(() => {
    getOfferList();
  }, [getOfferList]);

  return { offerListLoading, offerList };
};

export default useGetOfferList;
