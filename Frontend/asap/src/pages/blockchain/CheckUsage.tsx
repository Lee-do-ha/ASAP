import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckUsage from 'hooks/api/blockchain/useCheckUsage';
import useWeb3 from 'hooks/api/wallet/useWeb3';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import Header from 'components/common/Header';
import HowToUse from 'components/blockchain/HowToUse';
import Calendar from 'components/blockchain/Calendar';
import Dropdown from 'components/blockchain/Dropdown';
import Modal from 'components/common/Modal';
import { SHA256 } from 'crypto-js';
import explainIcon from 'assets/icons/Explain.png';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import { ReactComponent as Cal } from 'assets/icons/Calendar.svg';
import 'styles/blockchain/CheckUsage.scss';

// import Spinner from 'components/common/Spinner';

function CheckUsage() {
  const navigate = useNavigate();
  const { checkUsage } = useCheckUsage();
  const { useList } = useGetUseList();
  const { getTransaction } = useWeb3();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [apiTitle, setApiTitle] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [test, setTest] = useState<string>('');
  const [hash, setHash] = useState<string | null>(null);
  const [database, setDatabase] = useState<string | null>(null);
  const [recordHash, setRecordHash] = useState<string | null>(null);
  const [txInput, setTxInput] = useState<string | undefined | null>(null);
  const [header, setHeader] = useState<string | undefined | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onHowToUseHandler = () => {
    setIsOpen(!isOpen);
    console.log(isOpen, '확인');
  };

  const onPageHandler = () => {
    navigate('/myapi');
  };
  const onInputHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTest(event.target.value);
  };

  // 날짜 형식 수정 함수
  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // 복사하기
  const handleCopyClipBoard = async () => {
    if (database !== null) {
      try {
        await navigator.clipboard.writeText(database);
        alert('클립보드에 복사 되었습니다.');
      } catch (error) {
        console.log(error);
      }
    }
  };

  // x 버튼 클릭시
  const onClearHandler = () => {
    setHash(null);
    setTest('');
  };

  // 드롭다운에서 api 선택시
  const onSelectAPI = () => {
    if (apiTitle) {
      setStartDate(null);
      setEndDate(null);
    }
    setDatabase(null);
    setTxInput(null);
    setHeader(null);
    setHash(null);
    setTest('');
  };

  // 해시 변환하기
  const onHashHandler = () => {
    if (test) {
      const hashedValue = SHA256(test).toString();
      console.log(hashedValue, '변환값');
      setHash(hashedValue);
    } else {
      alert('값을 입력하세요');
    }
  };

  // 검증하기 버튼 클릭시 checkUsage 실행
  const onCheckHandler = async () => {
    if (startDate && endDate && apiTitle) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const data = await checkUsage({
        apiTitle,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      if (data) {
        setDatabase(data.hashToString);
        setRecordHash(data.recordHash);
        // transaction hash로 트랜잭션 조회
        const value = await getTransaction(data.transactionHash);
        const head = value?.slice(0, 10); // 앞 10자리
        const rest = value?.slice(10); // 나머지 부분
        setHeader(`[${head}]`);
        setTxInput(rest);

        setIsModalOpen(true);
      } else {
        setHeader(null);
        setTxInput('403');
        setDatabase('403');
        setRecordHash('403');
      }
    }
  };

  return (
    <div>
      <Header title="사용량 검증하기" />
      <div className="container mx-auto page-container relative">
        <button type="button" className="explain" onClick={onHowToUseHandler}>
          <img
            src={explainIcon}
            alt="explainIcon"
            className="w-7 h-auto mr-4"
          />
          <div>사용법 확인하기</div>
        </button>
        <div className="flex justify-center">
          <HowToUse isOpen={isOpen} />
        </div>
        <div className="flex items-center my-8">
          <div className="text-xl font-bold pr-7 w-3/12">
            조회할 API를 선택하세요
          </div>
          {useList ? (
            <Dropdown
              options={useList}
              apiTitle={apiTitle}
              setApiTitle={setApiTitle}
              onSelect={onSelectAPI}
            />
          ) : null}
        </div>
        <div className="flex items-center my-8">
          <div className="text-xl font-bold pr-7 w-3/12">
            조회 기간을 선택하세요
          </div>
          <label className="flex items-center pick-date">
            <Cal className="h-5" />
            <Calendar
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <div className="padding">
              {endDate
                ? `${endDate.getFullYear()}년 ${String(
                    endDate.getMonth() + 1,
                  ).padStart(2, '0')}월 ${String(endDate.getDate()).padStart(
                    2,
                    '0',
                  )}일`
                : null}
            </div>
          </label>
          {startDate && apiTitle ? (
            <button
              type="button"
              className="check-button"
              onClick={onCheckHandler}
            >
              검증하기
            </button>
          ) : null}
        </div>
        <hr />
        <div className="flex items-start my-4">
          <div className="text-xl font-bold w-3/12">
            데이터를 해시값으로 변환하기
          </div>
          <div className="flex w-9/12">
            <div className="flex flex-col w-full">
              <div className="flex">
                <textarea
                  value={test}
                  onChange={onInputHandler}
                  className="data-input"
                />
                <div className="flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={onClearHandler}
                    className="x-button w-full"
                  >
                    x
                  </button>
                  <button
                    type="button"
                    onClick={onHashHandler}
                    className="w-full check-button"
                  >
                    변환하기
                  </button>
                </div>
              </div>
              {hash ? <div className="check-back data mt-4">{hash}</div> : null}
            </div>
          </div>
        </div>
        <div className="flex items-start my-4">
          <div className="text-xl font-bold w-3/12 mt-2">
            블록에 저장된 데이터
          </div>
          <div className="w-9/12">
            <div className="check-back data">
              {!txInput ? '아직 선택된 데이터가 없습니다' : null}
              {txInput === '403' ? (
                '해당 기간에 사용한 내역이 없습니다'
              ) : (
                <div>
                  <span>{header}</span>
                  <span>{txInput}</span>
                </div>
              )}
            </div>
            {txInput && txInput !== '403' ? (
              <div className="mt-4 text-sm text-gray-600 font-medium">
                ※ 괄호 속 10자리는 스마트 컨트랙트에서 사용되는 함수 시그니처로
                데이터 검증과 무관합니다.
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-start my-4">
          <div className="text-xl font-bold w-3/12 mt-2">
            정산에 사용된 데이터
          </div>
          <div className="check-back data w-9/12">
            {/* {database && database !== '403' ? (
              <Copy className="copy" onClick={handleCopyClipBoard} />
            ) : null} */}
            {!database ? '아직 선택된 데이터가 없습니다' : null}
            {database && database === '403' ? (
              '해당 기간에 사용한 내역이 없습니다'
            ) : (
              <div className="flex">
                <div>{database}</div>
                <div>
                  {database ? (
                    <Copy className="copy" onClick={handleCopyClipBoard} />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col">
          <div className="flex text-xl font-bold justify-center mb-5">
            검증결과
          </div>
          {/* <div>블록체인에 저장된 데이터의 해시값 {txInput}</div>
          <div>정산에 사용된 데이터의 해시값 {recordHash}</div> */}
          <div className="flex justify-center">
            {txInput === recordHash ? '동일합니다' : '동일하지 않습니다'}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={closeModal}
              className="modal-button back-sky"
            >
              자세히 보기
            </button>
            <button
              type="button"
              onClick={onPageHandler}
              className="modal-button back-blue"
            >
              통계보기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CheckUsage;