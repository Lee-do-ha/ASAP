import React, { useEffect, useState, FormEvent } from 'react';
import useGetApiUsage from 'hooks/api/api/useGetApiUsage';
import useApiTest from 'hooks/api/api/useApiTest';
import useFormattedJson from 'hooks/custom/useFormattedJson';
import useGetWallet from 'hooks/api/wallet/useGetWallet';
import useAuthStore from 'store/auth/useAuthStore';
import useQueryParamsStore from 'store/api/queryParamsStore';
import useTestStore from 'store/api/useTestStore';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import { Button, Card } from '@material-tailwind/react';
import Modal from 'components/common/Modal';
import Editor from '@monaco-editor/react';
import 'styles/api/ApiTest.scss';
import Spinner from 'components/common/Spinner';
import TooltipHelper from 'components/common/TooltipHelper';
import useTrialCount from 'hooks/api/api/useTrialCount';

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}

function ApiTest() {
  const { apiUsage } = useGetApiUsage();
  const { wallet } = useGetWallet();
  const { isLoggedIn } = useAuthStore();
  const { params, setParam, resetParams } = useQueryParamsStore();
  const { trialLoading } = useTrialCount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [data, setData] = useState<Pair[]>([]);
  const { apiTest } = useApiTest();
  const { testResponse, status, loading, setLoading, trial, resetStatus } =
    useTestStore();
  const { formattedJson } = useFormattedJson(testResponse);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editorOptions = {
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  };

  useEffect(() => {
    try {
      if (apiUsage?.input) {
        const parsedData = JSON.parse(apiUsage?.input);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
    // 언마운트 될 때 스토어 값 초기화
    return () => {
      resetStatus();
      resetParams();
    };
  }, [apiUsage?.input, resetParams, resetStatus]);

  if (!data || data.length === 0) {
    return null;
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = apiUsage?.api;
    if (!isLoggedIn) {
      setModalMessage('로그인이 필요한 서비스입니다.');
      setIsModalOpen(true);
      return;
    }
    if (trial === 0) {
      setModalMessage('일일 테스트 가능량을 초과하였습니다.');
      setIsModalOpen(true);
      return;
    }
    setLoading(true);
    if (wallet) {
      apiTest({ url, params, wallet, method: apiUsage?.method });
    }
  };

  // 복사 함수
  const handleCopyClipBoard = async (text: string | '') => {
    try {
      await navigator.clipboard.writeText(text);
      setModalMessage('클립보드에 복사되었습니다.');
      setIsModalOpen(true);
    } catch (e) {
      setModalMessage('복사에 실패하였습니다.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto page-container">
      {/* 헤더 */}
      <div className="mb-8">
        <p className="font-bold text-4xl">{apiUsage?.title}</p>
        <p className="text-gray-600 mt-1">{apiUsage?.api}</p>
      </div>

      {/* 무료 테스트 횟수 */}
      {trialLoading ? null : (
        <div className="flex justify-end">
          <div className="font-bold text-lg flex">
            <div>무료 테스트 {trial} / 100 회</div>
            <TooltipHelper message="일 100회 무료 테스트 제공" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
          {/* Headers */}
          <div className="text-xl font-bold text-blue flex">
            Headers
            <TooltipHelper message="지갑 주소" />
          </div>
          <Card className="bg-gray-200 rounded-lg p-5 flex mb-4">
            <div className="input-container custom-input w-full">
              <input placeholder="headers" value={wallet || ''} />
            </div>
          </Card>
          {/* Query Params */}
          <div className="text-xl font-bold text-blue">Query Params</div>
          <Card className="p-5 bg-gray-200">
            {data.map((item) => (
              <div
                key={item.idx}
                className="flex items-center mt-3 grid grid-cols-3"
              >
                <div className="ps-2 font-semibold col-span-1 flex gap-1">
                  {item.key}
                  <TooltipHelper message={item.description} />
                </div>

                <div className="ps-2 font-semibold col-span-1">{item.type}</div>

                <div
                  className={`input-container col-span-1 custom-input ${
                    item.required === 'true' ? 'required' : ''
                  }`}
                >
                  <input
                    placeholder={item.key}
                    value={params[item.key] || ''}
                    onChange={(e) => setParam(item.key, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </Card>

          <div className="flex justify-center my-8">
            <Button ripple type="submit" className="bg-blue text-base w-44">
              TEST
            </Button>
          </div>
        </form>

        {/* Response */}
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-blue">Response</div>

          <Card className="bg-gray-200 rounded-lg p-5">
            <div className="flex gap-5 items-center">
              <div
                className={`w-5 h-5 rounded-full ${
                  status && status.toString().startsWith('2')
                    ? 'bg-green-600'
                    : 'bg-red-600'
                }`}
              />
              <div className="font-bold">{status}</div>
            </div>
          </Card>

          {/* Result */}
          <Card
            className={`bg-gray-200 rounded-lg p-5 ${
              loading
                ? 'ring-blue-700 ring-1 ring-offset-2  blinking-effect'
                : ''
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="text-xl font-bold flex gap-3 items-center">
                <p
                  className={`${
                    apiUsage?.method === 'GET' ? 'bg-blue' : 'bg-green-600'
                  }  p-2 px-5 text-white font-bold rounded-lg text-sm`}
                >
                  {apiUsage?.method}
                </p>
                <div>Result</div>
                {loading && <Spinner size="5" />}
              </div>

              <div>
                <Copy
                  className="w-5 h-auto me-1 cursor-pointer"
                  onClick={() => {
                    handleCopyClipBoard(formattedJson);
                  }}
                />
              </div>
            </div>
            <div className="rounded-editor">
              <Editor
                height="500px"
                language="json"
                value={formattedJson}
                theme="vs-dark"
                options={editorOptions}
              />
            </div>
          </Card>
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

export default ApiTest;
