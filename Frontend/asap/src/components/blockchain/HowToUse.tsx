import React from 'react';
import 'styles/blockchain/HowToUse.scss';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as Fold } from 'assets/icons/fold.svg';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

interface HowToUseProps {
  isOpen: boolean;
  testOpen: boolean;
  setTestOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseHandler(): void;
}

function HowToUse({
  isOpen,
  testOpen,
  setTestOpen,
  onCloseHandler,
}: HowToUseProps) {
  const onCopyHandler = () => {
    alert('클립보드에 내용이 복사되었습니다');
  };
  const onCheckHandler = () => {
    Swal.fire({
      icon: 'success',
      title: '검증 결과',
      text: '데이터가 일치합니다.',
      confirmButtonColor: '#4caf50',
    });
  };

  return (
    <CSSTransition in={isOpen} timeout={600} classNames="fade" unmountOnExit>
      <div className="w-10/12 howtouse unmount">
        <div className="w-full flex items-center">
          <div className="number">1.</div>
          <div>
            조회할 API와 기간을 선택 후{' '}
            <button
              type="button"
              className="check-button"
              onClick={onCheckHandler}
            >
              검증하기
            </button>{' '}
            버튼을 클릭하세요
          </div>
        </div>
        <div className="w-full flex items-start">
          <div className="number">2.</div>
          <div className="w-11/12">
            <div>검증결과와 상세 데이터를 조회하실 수 있습니다</div>
            <div className="check-back data my-4">
              <div>
                ※ ASAP에서는 일주일 간격으로 API 사용량을 블록에 저장합니다
              </div>
              <div className="mb-3">
                ※ 블록에 사용량 저장시 사용량을 비롯한 API 정보를 해시값으로
                변환하여 저장합니다
              </div>
              <div className="pl-3">
                즉, 블록에 저장된 Hash값과 정산에 사용된 데이터의 해시값이
                동일하다면 정산에 사용된{' '}
                <span className="color-text">데이터가 변조가 되지 않았음</span>
                을 증명합니다
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start">
          <div className="number pt-1">3.</div>
          <div className="w-11/12 flex flex-col">
            <div className="flex items-center mb-2">
              정산에 사용된 데이터{' '}
              <Copy className="w-4 mx-2" onClick={onCopyHandler} />
              또는 원하는 데이터를 입력 후{' '}
              <button
                type="button"
                className="check-button mx-2"
                onClick={() => setTestOpen(true)}
              >
                변환하기
              </button>{' '}
              버튼을 클릭하면 해시값으로 직접 변환하여 확인도 가능합니다
            </div>
            {testOpen ? (
              <div>
                <Fade cascade damping={0.15}>
                  <div className="check-back flex justify-between data mt-4">
                    <div>
                      7b69577e36adbbff5e25cc1ddbefea649aafbc8afbdcca37902e9bee4f47e0e1
                    </div>
                    <div className="color-text">일치합니다</div>
                  </div>
                  <div className="check-back flex justify-between data mt-4">
                    <div>
                      b67ec20f64bb5fd73b73be1d9b330cc012e534d5eae2dd26e5fa12ccfcf2f8cc
                    </div>
                    <div className="color-text">일치하지 않습니다</div>
                  </div>
                </Fade>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onCloseHandler}
            className="fold-button up mt-7"
          >
            <Fold />
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default HowToUse;
