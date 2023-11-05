import React from 'react';
import usePayment from 'hooks/api/payment/usePayment';
import usePaymentList from 'hooks/api/payment/usePaymentList';
import usePaymentDetail from 'hooks/api/payment/usePaymentDetail';
import { Button } from '@material-tailwind/react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/data/mypage-menus';

function AccountPay() {
  const { payment } = usePayment();
  const { getPaymentList } = usePaymentList();
  const { paymentDetail } = usePaymentDetail();

  const setPayment = async () => {
    await payment({
      cardCompany: '농협',
      cardNumber: '123',
      createAt: '2023-09-15T06:16:48.539Z',
      fee: 0,
    });
  };
  return (
    <div>
      <Header title="결제 내역" />
      <div className="container mx-auto page-container grid grid-cols-4">
        <div className="col-span-1 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        <div className="col-span-3">
          <h1>API 신청내역</h1>
          <Button onClick={setPayment}>결제하기</Button>

          <Button onClick={getPaymentList}>결제 내역 확인하기</Button>

          <Button onClick={() => paymentDetail(1)}>
            결제 상세 내역 확인하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountPay;
