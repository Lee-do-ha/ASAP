import React, { useEffect, useState } from 'react';
import useSupplyApplyList from 'hooks/api/supply/useSupplyApplyList';
import { useNavigate } from 'react-router-dom';
import Header from 'components/common/Header';
import { Tabs, TabsHeader, Tab, Card } from '@material-tailwind/react';
import { Collapse, Ripple, initTE } from 'tw-elements';

import Table from 'components/mypage/InfoTable';
import 'styles/common/Input.scss';
import '../../styles/supply/supplyApplyList.scss';
import JsonTable from 'components/common/JsonTable';
import useAdminApiDetail from 'hooks/api/admin/useAdminApiDetail';

initTE({ Collapse, Ripple });

/* apiDetail 화면 출력 함수 */
function ApiDetail(
  { apiDetail = {} }: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  const TABLE_HEAD = ['key', 'name', 'type', 'required', 'description'];
  const headGrid = (head: string) => {
    if (head === 'description') {
      return 'col-span-5';
    }
    if (head === 'required') {
      return 'col-span-1';
    }
    return 'col-span-2';
  };
  return (
    <div className="my-5">
      {!apiDetail ? (
        <div>Loading</div>
      ) : (
        // {/* 표 테두리 */}
        <div className="border-2">
          <Table
            left="API 제목"
            right={apiDetail?.title}
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
          <hr />
          <Table
            left="EndPoint"
            right={apiDetail?.api}
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
          <hr />
          <Table
            left="Method"
            right={apiDetail?.method}
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
          <hr />
          <Table
            left="상세 내용"
            right={apiDetail?.content}
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
          <hr />
          <Table
            left="1회 요청 비용"
            right={apiDetail?.price}
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
          <hr />
          <Table
            left="제공 종료 날짜"
            right={apiDetail?.provideDate}
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
          <hr />
          <Table
            left="관련 태그"
            right={
              apiDetail.tags
                ? JSON.parse(apiDetail.tags).map((tag: string) => (
                    <p key={tag}>#{tag}</p>
                  ))
                : ''
            }
            height="100%"
            leftGrid="2"
            rightGrid="10"
          />

          <hr />
          <Table
            left="INPUT"
            right={
              <Card className="w-full h-full container mx-auto my-3 p-5 bg-gray-200">
                {/* 표 헤더 */}
                <div className="grid grid-cols-12 bg-gray-200">
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
                <JsonTable jsonData={apiDetail.input} />
              </Card>
            }
            height="100%"
            leftGrid="2"
            rightGrid="10"
          />

          <hr />
          <Table
            left="OUTPUT"
            right={
              <Card className="w-full h-full container mx-auto my-3 p-5 bg-gray-200">
                {/* 표 헤더 */}
                <div className="grid grid-cols-12 bg-gray-200">
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
                <JsonTable jsonData={apiDetail.output} />
              </Card>
            }
            height="100%"
            leftGrid="2"
            rightGrid="10"
          />

          <hr />
          <Table
            left="API 제공 신청자"
            right={`${apiDetail?.name} (${apiDetail?.id})`}
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
          <hr />
          <Table
            left="제공 신청 날짜"
            right={
              apiDetail &&
              apiDetail.createDate &&
              apiDetail.createDate.includes('T')
                ? apiDetail.createDate.split('T')[0]
                : ''
            }
            height="55px"
            leftGrid="2"
            rightGrid="10"
          />
        </div>
      )}
    </div>
  );
}

/* 함수 */
function SupplyApplyList() {
  const navigate = useNavigate();
  const { supplyApplyList } = useSupplyApplyList();
  const { adminApiDetail, apiDetail } = useAdminApiDetail(); // api 상세 내용 불러오기

  const [stateApis, setStateApis] = useState(supplyApplyList);

  const [detailApplyId, setDetailApplyId] = useState<number | null>(null); // 상세 내용 볼 api Id
  const [isOpened, setIsOpened] = useState(false); // 상세 내용 창이 열렸는지 유무(true/false)
  /* 스크롤 위치 파악 */
  const [position, setPosition] = useState(0);
  const onScroll = () => {
    setPosition(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* 특정 api의 상세 내용 조회 */
  const showDetail = async (applyId: number) => {
    if (detailApplyId === applyId) {
      setIsOpened(!isOpened);
    } else {
      setIsOpened(true);
      setDetailApplyId(applyId);
      adminApiDetail(applyId);
    }
  };

  const [selectedItem, setSelectItem] = useState('전체 조회'); // 조희 아이템 (저체/대기/승인/진행/거절)
  /* 조회 아이템 관리 */
  const handleItemClick = (item: string) => {
    setSelectItem(item);
    setStateApis(
      supplyApplyList.filter((api) => api.progress === item.slice(0, 2)),
    );
    setDetailApplyId(null);
    setIsOpened(false);
  };

  const getClassName = (progress: string) => {
    switch (progress) {
      case '대기':
        return 'wait';
      case '승인':
        return 'approve';
      case '진행':
        return 'proceed';
      case '거절':
        return 'reject';
      default:
        return '';
    }
  };

  /* 전체 조회 api 리스트 화면 관리 */
  const allApis = () => {
    if (supplyApplyList.length === 0) {
      return (
        <div className="my-5">
          {selectedItem.slice(0, 2)} api 내역이 없습니다
        </div>
      );
    }
    return supplyApplyList.map((api) => (
      <div className="w-full grid grid-cols-5 my-5" key={api.applyId}>
        <div className="col-span-1 text-center font-medium">
          {api.createDate.split('T')[0]}
        </div>
        <div className="col-span-3 text-center font-medium">
          <div
            role="button"
            tabIndex={0}
            className="col-span-3 text-center font-medium"
            onClick={() => showDetail(api.applyId)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Space') {
                showDetail(api.applyId);
              }
            }}
          >
            {api.title}
          </div>
        </div>

        <div className="col-span-1 text-center">
          <button
            // className="col-span-1 text-center font-medium"
            type="button"
            className={getClassName(api.progress)}
            disabled
          >
            {api.progress}
          </button>
        </div>
        <div className="col-span-5">
          {detailApplyId === api.applyId && isOpened && (
            <ApiDetail apiDetail={apiDetail} />
          )}
        </div>
      </div>
    ));
  };

  /* 대기,승인,진행,거절조회 api 리스트 화면 관리 */
  const filterdApis = () => {
    if (stateApis.length === 0) {
      return (
        <div className="my-5">
          {selectedItem.slice(0, 2)} api 내역이 없습니다
        </div>
      );
    }
    return stateApis.map((api) => (
      <div className="w-full grid grid-cols-5 my-5">
        <div className="col-span-1 text-center font-medium">
          {api.createDate.split('T')[0]}
        </div>
        <div className="col-span-3 text-center font-medium">
          <div
            role="button"
            tabIndex={0}
            className="col-span-3 text-center font-medium"
            onClick={() => showDetail(api.applyId)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Space') {
                showDetail(api.applyId);
              }
            }}
          >
            {api.title}
          </div>
        </div>

        <div className="col-span-1 text-center font-medium flex justify-center">
          <div className={getClassName(api.progress)}>{api.progress}</div>
        </div>
        <div className="col-span-5">
          {detailApplyId === api.applyId && isOpened && (
            <ApiDetail apiDetail={apiDetail} />
          )}
        </div>
      </div>
    ));
  };
  /* 조회 종류 */
  const data = [
    {
      label: '전체 조회',
      value: '전체 조회',
    },
    {
      label: '대기 조회',
      value: '대기 조회',
    },
    {
      label: '승인 조회',
      value: '승인 조회',
    },
    {
      label: '진행 조회',
      value: '진행 조회',
    },
    {
      label: '거절 조회',
      value: '거절 조회',
    },
  ];
  return (
    <div>
      <Header title="API 신청내역" />

      <div className="flex justify-arouond w-full mt-8 h-auto">
        <div
          className="leftMenu border-right w-1/6 flex flex-col items-center text-center my-4"
          style={{ backgroundPositionY: position }}
          data-hs-scrollspy="#scrollspy-2"
          data-hs-scrollspy-scrollable-parent="#scrollspy-scrollable-parent-2"
        >
          <Tabs value={selectedItem} orientation="vertical" className="up">
            <TabsHeader className="w-40">
              {data.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className="place-items-start"
                  onClick={() => handleItemClick(label)}
                >
                  <button type="button" className=" flex items-center gap-2">
                    {label}
                  </button>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
        <div className="w-5/6 px-8 flex flex-col">
          <div className="flex justify-end mb-5">
            <button
              type="button"
              onClick={() => {
                navigate('/supply/submit');
              }}
              className="supply-button black-back"
            >
              API 제공 신청하기
            </button>
          </div>

          <div className="mt-4 w-full grid grid-cols-5 grid-rows-auto border-bottom py-3">
            <div className="col-span-1 text-center text-lg font-bold">
              신청일자
            </div>
            <div className="col-span-3 text-center text-lg font-bold">
              API 제목
            </div>
            <div className="col-span-1 text-center text-lg font-bold">상태</div>
          </div>

          <div className="mb-6 w-full border-bottom text-center">
            {selectedItem === '전체 조회' ? allApis() : filterdApis()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplyApplyList;
