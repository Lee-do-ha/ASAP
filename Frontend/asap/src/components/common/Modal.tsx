import React, { useEffect } from 'react';
import 'styles/common/Modal.scss';
import { ReactComponent as Cross } from 'assets/icons/Cross.svg';
import { Button } from '@material-tailwind/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  confirm?: boolean;
  children?: React.ReactNode;
}

function Modal({ isOpen, onClose, message, confirm, children }: ModalProps) {
  // 모달이 열려있을 때는 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (confirm) {
    return (
      <div className="overlay">
        <div
          className="modal"
          onClick={(e) => e.stopPropagation}
          aria-hidden="true"
        >
          <button type="button" onClick={onClose} className="close-button">
            <Cross className="close-button-img" />
          </button>
          <div className="w-96">
            <div className="flex justify-start">
              <p className="text-lg mt-5 ms-2 font-bold">{message}</p>
            </div>
            <div className="flex flex-row-reverse my-2">
              <Button ripple onClick={onClose} className="bg-blue-500">
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay" aria-hidden="true">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation}
        aria-hidden="true"
      >
        <button type="button" onClick={onClose} className="close-button">
          <Cross className="close-button-img" />
        </button>
        <div className="my-4 mx-4">{children}</div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  message: null,
  children: null,
  confirm: false,
};

export default Modal;
