import React, { useState, useRef } from 'react';
import './CreditCardRegistration.scss';
import { ReactComponent as Cross } from 'assets/icons/Cross2.svg';
import usePostCreditCard from 'hooks/api/credit/usePostCreditCard';
import useChangeCard from 'hooks/api/credit/useChangeCreditCard';
import useGetCreditCard from 'hooks/api/credit/useGetCreditCard';

type CreditCardRegistrationProps = {
  closeModal: () => void;
};

function CreditCardRegistration({ closeModal }: CreditCardRegistrationProps) {
  const [checkboxCount, setCheckboxCount] = useState(0);
  const { postCreditCard } = usePostCreditCard();
  const { changeCreditCard } = useChangeCard();
  const { creditCard } = useGetCreditCard();
  const isNewRegister = creditCard == null;

  // 이용약관 동의 됐을때
  const handleCheckboxClick = () => {
    setCheckboxCount((prevCount) => prevCount + 1);
  };
  const cardCompanyRef = useRef<HTMLInputElement>(null);
  const cardNumberRef1 = useRef<HTMLInputElement>(null);
  const cardNumberRef2 = useRef<HTMLInputElement>(null);
  const cardNumberRef3 = useRef<HTMLInputElement>(null);
  const cardNumberRef4 = useRef<HTMLInputElement>(null);

  const refreshPage = () => {
    window.location.reload();
  };
  const handleButtonClick = () => {
    if (checkboxCount === 2) {
      const cardCompany = cardCompanyRef.current?.value;
      const cardNumber = [
        cardNumberRef1.current?.value,
        cardNumberRef2.current?.value,
        cardNumberRef3.current?.value,
        cardNumberRef4.current?.value,
      ].join('');

      // 카드 정보가 입력되지 않았다면 경고 메시지 출력
      if (!cardCompany || !cardNumber) {
        alert('카드 정보를 모두 입력해주세요.');
        return;
      }

      // 사용자에게 확인 대화 상자 표시
      const userConfirmed = window.confirm('정말로 카드를 등록하시겠습니까?');

      if (userConfirmed) {
        if (isNewRegister) {
          // 등록되지 않은 상태에서 등록 버튼을 누른 경우
          // 등록 API 호출
          const onPostCreditCard = async () => {
            await postCreditCard({
              cardCompany,
              cardNumber,
            });
          };
          onPostCreditCard();

          // 상태를 'registered'로 변경
          alert('카드 정보가 등록되었습니다.');
          refreshPage();
        } else {
          // 등록된 상태에서 버튼을 누른 경우
          // 변경 API 호출
          const onChangeCreditCard = async () => {
            await changeCreditCard({
              cardCompany,
              cardNumber,
            });
          };
          onChangeCreditCard();

          // 상태를 'registered'로 유지
          alert('카드 정보가 변경되었습니다.');
          refreshPage();
        }

        closeModal();
      }
    } else {
      alert('모든 약관에 동의해주세요.');
    }
  };

  return (
    <div className="overlay">
      <div className="px-8 py-8 credit-modal border-2 rounded bg-white">
        {/* 카드정보 */}
        <div className="flex justify-between cross items-center">
          <p className="text-xl font-bold">카드정보</p>
          {/* 닫기버튼 */}
          <div
            className="mt-1 cursor-pointer"
            aria-hidden="true"
            onClick={closeModal}
          >
            <Cross />
          </div>
        </div>
        {/* 카드회사 */}
        <div className="mt-6 flex justify-between items-center border rounded-lg py-2 px-4 credit-input-box">
          <div>카드회사</div>
          <div className="flex ">
            <input
              type="text"
              ref={cardCompanyRef}
              className="company-input credit-input-number rounded text-center mx-1 card-company"
            />
            <span className="flex items-center">카드</span>
          </div>
        </div>
        {/* 카드번호 */}
        <div className="mt-6 flex justify-between items-center border rounded-lg py-2 px-4 credit-input-box">
          <div>카드번호</div>
          <div className="flex ">
            <input
              type="text"
              ref={cardNumberRef1}
              className="credit-input credit-input-number rounded text-center mx-1 card-number"
              maxLength={4}
            />
            <input
              type="text"
              ref={cardNumberRef2}
              className="credit-input credit-input-number rounded text-center mx-1"
              maxLength={4}
            />
            <input
              type="password"
              ref={cardNumberRef3}
              className="credit-input credit-input-number rounded text-center mx-1"
              maxLength={4}
            />
            <input
              type="password"
              ref={cardNumberRef4}
              className="credit-input credit-input-number rounded text-center mx-1"
              maxLength={4}
            />
          </div>
        </div>
        {/* 유효기간 */}
        <div className="mt-4 flex justify-between items-center border rounded-lg py-2 px-4 credit-input-box">
          <div>유효기간</div>
          <div className="flex justify-end items-center input-date">
            <div className="mr-2">
              <input
                type="text"
                placeholder="MM"
                className="date-input-1 mr-1 rounded"
                maxLength={2}
              />
              월
            </div>
            <div>
              <input
                type="text"
                placeholder="YYYY"
                className="date-input-2 mr-1"
                maxLength={4}
              />
              년
            </div>
          </div>
        </div>
        {/* 카드비밀번호 */}
        <div className="mt-4 flex justify-between">
          <div className="flex justify-between credit-input-box credit-input-half items-center border rounded-lg py-5 px-4">
            <div>카드비밀번호 앞2자리</div>
            <input
              type="password"
              className="pw-input rounded-lg"
              maxLength={2}
            />
          </div>
          <div className="flex justify-between credit-input-box credit-input-half items-center border rounded-lg py-5 px-4">
            <div>CVC번호</div>
            <input
              type="password"
              className="pw-input rounded-lg"
              maxLength={3}
            />
          </div>
        </div>
        {/* 주민등록번호 */}
        <div className="mt-4 flex justify-between items-center border rounded-lg py-2 px-4 credit-input-box">
          <div>주민등록번호 앞6자리</div>
          <div className="flex justify-end items-center input-date">
            <div className="mr-2" />
            <div>
              <input
                type="text"
                placeholder="여기에 입력해주세요"
                className="idnumber-input mr-1 rounded-lg"
                maxLength={6}
                style={{ textAlign: 'center' }}
              />
            </div>
          </div>
        </div>
        {/* 알림텍스트 */}
        <div className="mt-5 middle-text-box ml-2 text-xs font-bold">
          <div>
            * 등록된 카드로 <span className="text-red-600">매달 1일</span>{' '}
            서비스 이용 요금이 결제됩니다.
          </div>
          <div className="mt-1">
            * 마이 페이지 - 결제 수단 관리 카드 정보를 변경할 수 있습니다.
          </div>
        </div>

        {/* 동의체크 */}
        <div className="check-box mt-6 ml-2 font-bold">
          <div className="">
            <div className="mb-2 flex items-center">
              <input
                id="default-checkbox-1"
                type="checkbox"
                value=""
                className="rounded w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600"
                onClick={handleCheckboxClick}
              />
              <p className="ml-2">개인정보 수집 및 이용 동의</p>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox-2"
                type="checkbox"
                value=""
                className="rounded w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600"
                onClick={handleCheckboxClick}
              />
              <p className="ml-2">ASAP 유료서비스 이용 동의</p>
            </div>
          </div>
          <div className="flex justify-center">
            {/* confirm 추가해서 예 누르면 통신 */}
            <div
              aria-hidden="true"
              className="rounded bg-blue-700 text-white py-2 px-5 text-xs w-28 text-center font-bold cursor-pointer"
              onClick={handleButtonClick}
            >
              {isNewRegister ? '카드 등록' : '카드 변경'}
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}

export default CreditCardRegistration;
