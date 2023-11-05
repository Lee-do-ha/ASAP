import React, { ChangeEvent, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from 'components/common/Header';
import Modal from 'components/common/Modal';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import 'styles/common/Input.scss';
import 'styles/member/ApiApply.scss';
import useSetUserInfo from 'hooks/api/api/useSetUserInfo';

function ApiApply() {
  const location = useLocation();
  const { setUserInfo } = useSetUserInfo();
  const apiId = location.state?.apiId;
  const apiTitle = location.state?.apiTitle;

  // 사용자 신청 후 입력 받아야하는 값
  const [purpose, setPurpose] = useState<string>('');
  const industrys = ['제조업', '서비스업', '금융업', '유통업', 'IT', '기타'];
  const [industry, setIndustry] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  /* 모달 open/close */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* select box Open */
  const onOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  /* select box 요소 선택 */
  const onChengeItemHandler = (data: string) => {
    setIndustry(data);
    setIsOpen(false);
  };

  /* 사용 목적 */
  const onPurposeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPurpose(event.target.value);
  };

  /* 신청서 제출 */
  const onSubmitHandler = async () => {
    if (!purpose) {
      alert('목적을 입력해주세요.');
      return;
    }
    if (!industry) {
      alert('산업군을 입력해주세요.');
      return;
    }
    await setUserInfo({
      apiId,
      purpose,
      industry,
    });
    await openModal();
  };

  const onOkHandler = () => {
    setIsModalOpen(false);
    window.location.href = `/api_list/${apiId}`;
  };
  return (
    <div>
      <Header title="API 사용 신청하기" />
      <div className="container mx-auto page-container flex flex-col justify-center items-center">
        <div className="contain">
          <p className="text-lg font-bold mb-2 pt-1">API 이름</p>
          <div className="inputcontain">
            <input value={apiTitle} type="text" disabled />
          </div>
        </div>
        <div className="contain">
          <p className="text-lg font-bold mb-2 pt-1">사용 목적</p>
          <div className="inputcontain">
            <textarea
              placeholder="사용 목적"
              value={purpose}
              onChange={onPurposeHandler}
            />
          </div>
        </div>

        <div className="contain">
          <p className="text-lg font-bold mb-2">직업군</p>
          <div className="industrycontain">
            <div
              aria-hidden="true"
              className="dropdown-box"
              onClick={() => {
                onOpenHandler();
              }}
            >
              {industry}
              <div className="arrow">▼</div>
            </div>
            {isOpen ? (
              <div className="select-wrapper z-50">
                {industrys.map((data) => (
                  <div
                    key={data}
                    aria-hidden="true"
                    className="select-options"
                    onClick={() => {
                      onChengeItemHandler(data);
                    }}
                  >
                    {data}
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className=" flex justify-center my-10">
          <Button
            ripple
            onClick={onSubmitHandler}
            className="submitButton text-lg bg-blue"
          >
            신청하기
          </Button>
        </div>
      </div>
      {isModalOpen ? (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col justify-center items-center font-bold gap-2.5">
            <div className="text-xl text-center m-1 pt-3">
              <p style={{ color: '#004FB9' }}>{apiTitle}</p>
              <p>API 신청이 완료되었습니다</p>
            </div>
            <div className="text-base flex flex-col gap-1">
              <Link to="/mypage/keys" className="move-text">
                • 마이페이지 &gt; 키 관리로 이동하기
              </Link>
              <Link to="/myapi" className="move-text">
                • My API로 이동하기
              </Link>
            </div>
            <button
              type="button"
              onClick={onOkHandler}
              className="w-2/6 rounded-md check"
            >
              확인
            </button>
          </div>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
}

export default ApiApply;
