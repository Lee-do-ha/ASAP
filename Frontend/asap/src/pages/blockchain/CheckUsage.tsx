import React, { useState, ChangeEvent } from 'react';
import useCheckUsage from 'hooks/api/blockchain/useCheckUsage';
import useWeb3 from 'hooks/api/wallet/useWeb3';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import Header from 'components/common/Header';
import HowToUse from 'components/blockchain/HowToUse';
import Calendar from 'components/blockchain/Calendar';
import Dropdown from 'components/blockchain/Dropdown';
import TooltipHelper from 'components/common/TooltipHelper';
import { SHA256 } from 'crypto-js';
import explainIcon from 'assets/icons/Explain.png';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';
import { ReactComponent as Cal } from 'assets/icons/Calendar.svg';
import Swal from 'sweetalert2';
import 'styles/blockchain/CheckUsage.scss';
import Spinner from 'components/common/Spinner';

function CheckUsage() {
  const { checkUsage } = useCheckUsage();
  const { useList } = useGetUseList();
  const { getTransaction } = useWeb3();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [apiTitle, setApiTitle] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [testOpen, setTestOpen] = useState<boolean>(false);

  const [displayedChars, setDisplayedChars] = useState<number>(1482);
  const [loading, setLoading] = useState<boolean>(false);
  const [test, setTest] = useState<string>('');
  const [hash, setHash] = useState<string | null>(null);
  const [database, setDatabase] =
    useState<string>('아직 조회된 데이터가 없습니다');
  const [recordHash, setRecordHash] = useState<string | null>(null);
  const [txInput, setTxInput] = useState<string | undefined>(
    '아직 조회된 데이터가 없습니다',
  );
  const [header, setHeader] = useState<string | undefined | null>(null);

  const onHowToUseHandler = () => {
    setIsOpen(!isOpen);
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

  // HowToUse
  const onCloseHandler = () => {
    setTestOpen(false);
    setIsOpen(false);
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
    setDatabase('아직 조회된 데이터가 없습니다');
    setTxInput('아직 조회된 데이터가 없습니다');
    setHeader(null);
    setHash(null);
    setTest('');
    setRecordHash(null);
  };

  // 해시 변환하기
  const onHashHandler = () => {
    if (test) {
      const hashedValue = SHA256(test).toString();
      setHash(hashedValue);
    } else {
      alert('값을 입력하세요');
    }
  };

  // 검증하기 버튼 클릭시 checkUsage 실행
  const onCheckHandler = async () => {
    setDisplayedChars(1482);
    if (startDate && endDate && apiTitle) {
      setLoading(true);
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const data = await checkUsage({
        apiTitle,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      if (data) {
        setLoading(false);
        setDatabase(data.hashToString);
        setRecordHash(data.recordHash);
        // transaction hash로 트랜잭션 조회
        const value = await getTransaction(data.transactionHash);
        const head = value?.slice(0, 10); // 앞 10자리
        const rest = value?.slice(10); // 나머지 부분
        setHeader(`[${head}]`);
        setTxInput(rest);

        if (rest === data.recordHash) {
          Swal.fire({
            icon: 'success',
            title: '검증 결과',
            text: '데이터가 일치합니다.',
            confirmButtonColor: '#4caf50',
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: '검증 결과',
            text: '데이터가 일치하지 않습니다.',
            confirmButtonColor: '#f44336',
          });
        }
      } else {
        setHeader(null);
        setTxInput('해당 기간에 사용한 내역이 없습니다');
        setDatabase('해당 기간에 사용한 내역이 없습니다');
        setRecordHash('403');
        setLoading(false);
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
          <HowToUse
            isOpen={isOpen}
            testOpen={testOpen}
            setTestOpen={setTestOpen}
            onCloseHandler={onCloseHandler}
          />
        </div>
        <div className="flex items-center my-8">
          <div className="text-xl font-bold pr-7 w-3/12 flex">
            조회할 API를 선택하세요
            <TooltipHelper message="사용중인 API 중 검증이 필요한 API를 선택하세요" />
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
          <div className="text-xl font-bold pr-7 w-3/12 flex">
            조회 기간을 선택하세요
            <TooltipHelper
              message={
                <div>
                  <div>
                    ASAP에서는 일주일 간격으로 API 사용량을 블록에 저장합니다
                  </div>
                  <div>검증을 원하는 주를 선택하세요</div>
                </div>
              }
            />
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
          <div className="text-xl font-bold w-3/12 flex">
            데이터를 해시값으로 변환하기
            <TooltipHelper
              message={
                <div>
                  <div>원하는 데이터를 입력 후 버튼을 클릭하면</div>
                  <div>해시값으로 직접 변환 및 검증이 가능합니다</div>
                </div>
              }
            />
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
                    변환 및 검증
                  </button>
                </div>
              </div>
              {hash ? (
                <div className="check-back flex justify-between data mt-4">
                  <div>{hash}</div>
                  <div className="color-text">
                    {recordHash && recordHash !== '403' && hash === txInput
                      ? '일치합니다'
                      : null}
                    {recordHash && recordHash !== '403' && hash !== txInput
                      ? '일치하지 않습니다'
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-start my-4">
          <div className="text-xl font-bold w-3/12 mt-2 flex">
            블록에 저장된 데이터
            <TooltipHelper
              message="블록에 저장된 데이터와 정산에 사용된 데이터의 해시값이 동일하다면 데이터가
              변조되지 않았음을 의미합니다"
            />
          </div>
          <div className="w-9/12">
            <div className="check-back data">
              {loading ? (
                <div className="flex w-full justify-center">
                  <Spinner size="6.5" />
                </div>
              ) : (
                <div>
                  <span>{header}</span>
                  <span>{txInput}</span>
                </div>
              )}
            </div>
            {header ? (
              <div className="mt-4 text-sm text-gray-600 font-medium">
                ※ 괄호 속 10자리는 스마트 컨트랙트에서 사용되는 함수 시그니처로
                데이터 검증과 무관합니다.
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-start my-4">
          <div className="text-xl font-bold w-3/12 mt-2 flex">
            정산에 사용된 데이터
            <TooltipHelper
              message={
                <div>
                  <div>
                    오른쪽 상단의 복사버튼 클릭한 뒤 데이터 변환칸에 입력하면
                  </div>
                  <div>해시값 변환 및 직접 검증이 가능합니다</div>
                </div>
              }
            />
          </div>
          <div className="check-back data w-9/12">
            {loading ? (
              <div className="flex w-full justify-center">
                <Spinner size="6.5" />
              </div>
            ) : (
              <div className="flex">
                <div className="flex flex-col">
                  <div className="break-all">
                    {database?.slice(0, displayedChars)}
                  </div>
                  {database && database.length > displayedChars && (
                    <button
                      type="button"
                      onClick={() => setDisplayedChars((prev) => prev + 1482)}
                      className="load-more-button"
                    >
                      이후 데이터를 보고싶다면 클릭하세요
                    </button>
                  )}
                </div>
                <div>
                  {database && recordHash && recordHash !== '403' ? (
                    <Copy className="copy" onClick={handleCopyClipBoard} />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckUsage;
