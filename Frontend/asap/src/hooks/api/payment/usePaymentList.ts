import { useState, useEffect } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface IPayInfo {
  price: number;
  cardNumber: string;
  cardCompany: string;
  payDate: string;
}

const usePaymentList = () => {
  const [paymentListLoading, setPaymentListLoading] = useState<boolean>(true);
  const [paymentList, setPaymentList] = useState<IPayInfo[] | null>();

  const getPaymentList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/payment/list',
      });
      setPaymentList(response.data);
      setPaymentListLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentList();
  }, []);

  return { paymentList, paymentListLoading, getPaymentList };
};

export default usePaymentList;
