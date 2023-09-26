import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetApiUsage from 'hooks/api/api/useGetApiUsage';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import { Button } from '@material-tailwind/react';
import JsonTable from 'components/common/JsonTable';
import Modal from 'components/common/Modal';
import PrettyJson from 'components/common/PrettyJson';
import 'styles/common/Input.scss';

function ApiUsage() {
  const { apiId, apiUsage } = useGetApiUsage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 표 헤더
  const TABLE_HEAD = ['key', 'name', 'type', 'required', 'description'];

  // head grid
  const headGrid = (head: string) => {
    if (head === 'description') {
      return 'col-span-5';
    }
    if (head === 'required') {
      return 'col-span-1';
    }
    return 'col-span-2';
  };

  // 복사 함수
  const handleCopyClipBoard = async (text: string | '') => {
    const formattedJson = JSON.stringify(JSON.parse(text || '{}'), null, 2);
    try {
      await navigator.clipboard.writeText(formattedJson);
      setIsModalOpen(true);
    } catch (e) {
      setIsModalOpen(true);
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <div className="container mx-auto page-container">
      {/* 헤더 */}
      <div className="mb-8">
        <p className="font-bold text-4xl">{apiUsage?.title}</p>
      </div>

      {/* EndPoint */}
      <div className="mb-5">
        <p className="text-lg font-bold mb-2 text-blue-700">ENDPOINT</p>
        <div className="flex grid grid-cols-10">
          <div className="flex justify-between items-center border p-2 rounded-lg col-span-9 me-2">
            <div className="ms-2">{apiUsage?.api}</div>
            {apiUsage && (
              <Copy
                className="w-5 h-auto me-2 cursor-pointer"
                onClick={() => {
                  handleCopyClipBoard(apiUsage.api);
                }}
              />
            )}
          </div>
          <Button
            className="bg-blue"
            onClick={() => navigate(`/api_list/${apiId}/test`)}
          >
            API 테스트
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="mb-5">
        <p className="text-lg font-bold mb-2 text-blue-700">INPUT</p>
        <div className="grid grid-cols-12 bg-blue-50">
          {TABLE_HEAD.map((head) => (
            <div
              key={head}
              className={`${headGrid(head)} p-2 font-bold text-xl h-11`}
            >
              {head}
            </div>
          ))}
        </div>
        <hr className="h-0.5 bg-gray-500" />
        <JsonTable jsonData={apiUsage?.input} />
      </div>

      {/* Input Example */}
      <div className="my-8 bg-gray-300 rounded-lg p-5">
        <div className="flex justify-between">
          <p className="mb-2 font-bold">입력부</p>
          {apiUsage && (
            <Copy
              className="w-5 h-auto me-2 cursor-pointer"
              onClick={() => {
                handleCopyClipBoard(apiUsage?.inputExample);
              }}
            />
          )}
        </div>
        <PrettyJson jsonData={apiUsage?.inputExample} />
      </div>

      {/* Output */}
      <div>
        <p className="text-lg font-bold mb-2 text-blue-700">OUTPUT</p>
        <div className="grid grid-cols-12 bg-blue-50">
          {TABLE_HEAD.map((head) => (
            <div
              key={head}
              className={`${headGrid(head)} p-2 font-bold text-xl h-11`}
            >
              {head}
            </div>
          ))}
        </div>
        <hr className="h-0.5 bg-gray-500" />
        <JsonTable jsonData={apiUsage?.output} />
      </div>

      {/* Output Example */}
      <div className="my-8 bg-gray-300 rounded-lg p-5">
        <div className="flex justify-between">
          <p className="mb-2 font-bold">출력부</p>
          {apiUsage && (
            <Copy
              className="w-5 h-auto me-2 cursor-pointer"
              onClick={() => {
                handleCopyClipBoard(apiUsage?.outputExample);
              }}
            />
          )}
        </div>
        <PrettyJson jsonData={apiUsage?.outputExample} />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-96">
          <div className="flex justify-start">
            <p className="text-lg mt-5 font-bold">클립보드에 복사되었습니다.</p>
          </div>
          <div className="flex flex-row-reverse my-5">
            <Button ripple onClick={closeModal} className="bg-blue-500">
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ApiUsage;
