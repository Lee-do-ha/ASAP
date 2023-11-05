import React, { useState } from 'react';
import SideBar from 'components/nav/SideBar';
import Header from 'components/common/Header';
import menus from 'router/data/mypage-menus';
import useGetWallet from 'hooks/api/wallet/useGetWallet';
import './AccountKey.scss';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import Modal from 'components/common/Modal';

function AccountKey() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { wallet } = useGetWallet();
  // 클릭하면 복사 함수
  const handleCopyClipBoard = async (text: string | null) => {
    if (text !== null) {
      try {
        await navigator.clipboard.writeText(text);
        setModalMessage('클립보드에 복사되었습니다.');
        setIsModalOpen(true);
      } catch (error) {
        setModalMessage('복사에 실패하였습니다.');
        setIsModalOpen(true);
      }
    }
  };
  return (
    <div>
      {/* 헤더 */}
      <Header title="키 관리" />
      <div className="container mx-auto page-container grid grid-cols-12">
        {/* 좌측 사이드바 */}
        <div className="col-span-2 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        {/* 우측 publickey */}
        <div className="col-span-10 text-2xl font-bold">
          <div>public_key</div>
          <div className="mt-4 py-1 pl-1 pr-1 border-black rounded border outer flex">
            {/* 안쪽 회색박스 */}
            <div
              aria-hidden="true"
              className="rounded bg-gray-300 inner text-base font-medium flex items-center cursor-pointer"
              onClick={() => handleCopyClipBoard(wallet)}
            >
              <p className="ml-2">{wallet} </p>
            </div>
            {/* copy icon */}
            <div className="iconbox ml-2 cursor-pointer">
              <Copy onClick={() => handleCopyClipBoard(wallet)} />
            </div>
          </div>
          {/* 아래 text */}
          <div className="mt-4 text-sm text-gray-600 font-medium">
            ※ API key가 노출되면 계정에 예상치 못한 청구나 할당량 변경과 같은
            상황이 발생할 수 있습니다.
          </div>
          <div className="mt-1 text-sm text-gray-600 font-medium">
            ※ API key 노출로 인한 문제에 대해서는 사용자에게 책임이 있습니다.
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

export default AccountKey;
