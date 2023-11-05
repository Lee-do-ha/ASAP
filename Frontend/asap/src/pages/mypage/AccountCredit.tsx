import React, { useState } from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/data/mypage-menus';
import CreditCardRegistration from 'components/mypage/CreditCardRegistration';
import CardImg from 'assets/images/card.png';
import useGetCreditCard from 'hooks/api/credit/useGetCreditCard';
import usePaymentList from 'hooks/api/payment/usePaymentList';
import Spinner from 'components/common/Spinner';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store/auth/useAuthStore';
import Modal from 'components/common/Modal';

// 카드 등록 페이지
function AccountCredit() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  const { loading, creditCard } = useGetCreditCard();
  const { paymentListLoading, paymentList } = usePaymentList();
  const { setLoginType, loginType } = useAuthStore();

  // 알림창 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  // 알림창 모달 닫기
  const closeModal = () => {
    if (redirectTo) {
      navigate(redirectTo);
      setRedirectTo(null);
    }
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModal(!isModal);
    if (loading) {
      console.log(loading);
    }
  };

  // 결제 상세 내역으로 이동
  const goDetail = (date: string) => {
    const [year, month] = date.split('-');
    const targetURL = `/myapi/detail?year=${year}&month=${month}`;
    if (loginType === 'supplier') {
      setModalMessage('사용자 모드로 전환 후 이동합니다.');
      setIsModalOpen(true);
      setRedirectTo(targetURL);
      setLoginType('user');
    } else {
      navigate(targetURL);
    }
  };

  // 카드 번호 포맷팅
  const formatCardNumber = (cardNumber: string) => {
    if (cardNumber.length !== 16) return cardNumber;
    const firstFour = cardNumber.slice(0, 4);
    const lastFour = cardNumber.slice(-4);
    return `${firstFour}-****-****-${lastFour}`;
  };

  // 결제 내역 출력
  const renderPaymentList = () => {
    if (paymentListLoading) {
      return (
        <div className="flex justify-center">
          <Spinner size="12" />
        </div>
      );
    }

    if (paymentList && paymentList.length === 0) {
      return (
        <div className="flex justify-center items-center p-2">
          결제내역이 없습니다.
        </div>
      );
    }

    return (
      <div>
        {paymentList?.map((pay) => (
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-2 p-2">{pay.payDate}</div>
            <div className="col-span-2 p-2">{pay.cardCompany}</div>
            <div className="col-span-4 p-2">
              {formatCardNumber(pay.cardNumber)}
            </div>
            <div className="col-span-2 p-2">{pay.price.toLocaleString()}</div>
            <div className="col-span-2 p-2 flex justify-center items-center">
              <div
                className="bg-gray-600 text-white py-1 rounded w-28 cursor-pointer"
                aria-hidden="true"
                onClick={() => goDetail(pay.payDate)}
              >
                상세보기
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header title="결제 수단 관리" />
      {/* sidebar */}
      <div className="container mx-auto page-container grid grid-cols-12">
        <div className="col-span-2 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        {/* 오른쪽부분 */}
        <div className="col-span-10 ml-2">
          <p className="text-2xl font-bold mb-4">등록된 카드</p>

          {/* 모달창 */}
          {isModal && (
            <CreditCardRegistration closeModal={() => setIsModal(false)} />
          )}
          <div className="">
            <div className="bg-gray-200 h-44 rounded-lg items-center flex justify-between px-8">
              {/* 카드 이미지 */}
              <div className="h-36 relative font-sans font-normal text-sm">
                <img
                  src={CardImg}
                  alt="card"
                  className="max-w-full max-h-full rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4">
                  <div className="text-white">Credit</div>
                  <div className="flex flex-col items-start">
                    <div className="text-white">
                      {creditCard
                        ? `${creditCard.cardCompany}카드`
                        : '등록된 카드가 없습니다.'}
                    </div>
                    <div className="text-white mt-0.5">
                      {creditCard
                        ? `${creditCard.cardNumber.slice(
                            0,
                            4,
                          )} ${creditCard.cardNumber.slice(5, 9)} **** ****`
                        : '카드를 등록해주세요.'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-bold text-lg">
                {creditCard
                  ? `${creditCard.cardCompany}카드 (${
                      creditCard.cardNumber
                        ? creditCard.cardNumber.slice(0, 4)
                        : ''
                    })`
                  : '등록된 카드가 없습니다.'}
              </div>

              {/* 카드 정보 등록 버튼 */}
              <div
                aria-hidden="true"
                className="rounded text-white py-1.5 px-5 text-md w-36 text-center font-medium cursor-pointer flex items-center justify-center"
                onClick={handleButtonClick}
                style={{ backgroundColor: '#004096' }}
              >
                {creditCard ? '카드정보 변경' : '카드정보 등록'}
              </div>
            </div>
          </div>

          {/* 결제내역 */}
          <p className="text-2xl font-bold mt-12 mb-4">결제 내역</p>
          <div className="text-center text-base font-medium border">
            {/* Header */}
            <div className=" grid grid-cols-12 items-center">
              <div className="col-span-2 bg-blue-300 text-white p-2">
                결제일자
              </div>
              <div className="col-span-2 bg-blue-300 text-white p-2">
                카드사
              </div>
              <div className="col-span-4 bg-blue-300 text-white p-2">
                카드번호
              </div>
              <div className="col-span-2 bg-blue-300 text-white p-2">
                결제금액
              </div>
              <div className="col-span-2 bg-blue-300 text-white p-2">비고</div>
            </div>

            {/* Row */}
            {renderPaymentList()}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        confirm
        message={modalMessage}
      />
    </div>
  );
}

export default AccountCredit;
