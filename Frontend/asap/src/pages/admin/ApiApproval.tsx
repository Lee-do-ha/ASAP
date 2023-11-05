import React, { useState, useEffect } from 'react';
import 'styles/admin/apiApproval.scss';
import useAdminApiList from 'hooks/api/admin/useAdminApiList';
import useAdminApiProgress from 'hooks/api/admin/useAdminApiProgress';
import useAdminApiRejectReason from 'hooks/api/admin/useAdminApiRejectReason';
import useAdminApiDetail from 'hooks/api/admin/useAdminApiDetail';
import useAdminApiApprove from 'hooks/api/admin/useAdminApiApprove';

import Header from 'components/common/Header';
import Modal from 'components/common/Modal';
import { Tabs, TabsHeader, Tab, Button } from '@material-tailwind/react';
import { Collapse, Ripple, initTE } from 'tw-elements';
import { ReactComponent as Copy } from 'assets/icons/copybutton.svg';

import Table from 'components/mypage/InfoTable';
import 'styles/common/Input.scss';
import JsonTable from 'components/common/JsonTable';
import PrettyJson from 'components/common/PrettyJson';

initTE({ Collapse, Ripple });

interface APIDetail {
  api: string;
  input: string;
  inputExample: string;
  output: string;
  outputExample: string;
  price: number;
  progress: string;
  title: string;
  content: string;
  provideDate: string;
  createDate: 'T' | string;
  id: string;
  name: string;
  tags: string;
  method: string;
}

interface ApiDetailProps {
  apiDetail: APIDetail | undefined; // Define the prop 'apiDetail' with type 'APIDetail'
}

/* apiDetail 화면 출력 함수 */
function ApiDetail({ apiDetail }: ApiDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
  // 복사 함수
  const handleCopyClipBoardJSON = async (text: string | '') => {
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
              <div style={{ margin: '5px 10px 5px 0px' }}>
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
                <JsonTable jsonData={apiDetail?.input} />

                {/* Input Example */}
                <div className="my-8 bg-gray-300 rounded-lg p-5">
                  <div className="flex justify-between">
                    <p className="mb-2 font-bold">입력부</p>
                    {apiDetail && (
                      <Copy
                        className="w-5 h-auto me-2 cursor-pointer"
                        onClick={() => {
                          handleCopyClipBoardJSON(apiDetail?.inputExample);
                        }}
                      />
                    )}
                  </div>
                  <PrettyJson jsonData={apiDetail?.inputExample} />
                </div>
              </div>
            }
            height="100%"
            leftGrid="2"
            rightGrid="10"
          />

          <hr />
          <Table
            left="OUTPUT"
            right={
              <div style={{ margin: '5px 10px 5px 0px' }}>
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
                <JsonTable jsonData={apiDetail?.output} />

                {/* Output Example */}
                <div className="my-8 bg-gray-300 rounded-lg p-5">
                  <div className="flex justify-between">
                    <p className="mb-2 font-bold">출력부</p>
                    {apiDetail && (
                      <Copy
                        className="w-5 h-auto me-2 cursor-pointer"
                        onClick={() => {
                          handleCopyClipBoardJSON(apiDetail?.outputExample);
                        }}
                      />
                    )}
                  </div>
                  <PrettyJson jsonData={apiDetail?.outputExample} />
                </div>
              </div>
            }
            height="100%"
            leftGrid="2"
            rightGrid="10"
          />
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="w-96">
              <div className="flex justify-start">
                <p className="text-lg mt-5 font-bold">
                  클립보드에 복사되었습니다.
                </p>
              </div>
              <div className="flex flex-row-reverse my-5">
                <Button ripple onClick={closeModal} className="bg-blue-500">
                  확인
                </Button>
              </div>
            </div>
          </Modal>

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
function ApiApproval() {
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

  /* api hook */
  const { apis, setLastChanged, loading } = useAdminApiList(); // 전체 api 신청 리스트 받아오기
  const { adminApiProgress } = useAdminApiProgress(); // 현재 api 상태 불러오기
  const { adminApiRejectReason } = useAdminApiRejectReason(); // api 거절 사유 보내기
  const { adminApiDetail, apiDetail } = useAdminApiDetail(); // api 상세 내용 불러오기
  const { adminApiApprove, approveCategory } = useAdminApiApprove(); // api 승인하기, 승인 카테고리 불러오기

  const [stateApis, setStateApis] = useState(apis); // 상태에 따른 api 리스트
  const [nowApiId, setNowApiId] = useState(-1); // 현재 선택된 api ID
  const [nowApiTitle, setNowApiTitle] = useState(''); // 현재 선택된 api Title
  const [wantRejectState, setWantRejectState] = useState(false); // 거절 하고싶은상태(true/false)
  const [rejectReason, setRejectReason] = useState(''); // 거절 이유
  const [wantApproveState, setWantApproveState] = useState(false); // 승인 하고싶은상태(true/false)
  const [selectedCategory, setSelectedCategory] = useState(''); // 승인 카테고리
  const [changeApi, setChangeApi] = useState(''); // API 사용가능하게 변경한 new api
  const [clicked, setClicked] = useState(false); // 클릭 상태(true/false)

  /* 모달 open/close */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setClicked(false);
    setWantApproveState(false);
    setWantRejectState(false);
  };

  /* 거절 상태 관리 */
  const handleRejectState = async () => {
    adminApiRejectReason({
      applyId: nowApiId,
      title: nowApiTitle,
      content: rejectReason,
    });
    adminApiProgress({ applyId: nowApiId, progress: '거절' });

    // setRejectState(false); // 거절 상태 false로 돌려놓음(거절 상태에 따라 거절 사유를 입력할 수 있도록 밑에서 설정해놓았기 때문)
    closeModal();
    window.location.reload();
  };
  /* 거절 이유 관리 */
  const handleRejectReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRejectReason(e.target.value);
  };

  /* 승인 상태 관리 */
  const handleApproveState = async () => {
    if (changeApi) {
      adminApiApprove({
        applyId: nowApiId,
        category: selectedCategory,
        api: changeApi,
      });
      adminApiProgress({ applyId: nowApiId, progress: '승인' });

      // setApproveState(true); // 승인 상태 false로 돌려놓음(승인 상태에 따라 카테고리 고를 수 있도록 밑에서 설정해놓았기 때문)
      closeModal();
      window.location.reload();
      // setApproveState(false);
    } else {
      alert('url을 입력하세요');
    }
  };
  /* 승인 카테고리 관리 */
  const handleApproveCategory = (category: string) => {
    setSelectedCategory(category);
  };

  /* api 상태 관리 */
  const changeState = (applyId: number, newState: string) => {
    const doChange = async () => {
      // await adminApiList();
      await setLastChanged(new Date().getTime());
      if (newState === '거절') {
        setWantRejectState(true);
        openModal();
      } else if (newState === '승인') {
        setWantApproveState(true);
        openModal();
      } else {
        window.location.reload();
        adminApiProgress({ applyId, progress: newState });
      }
    };
    doChange();
  };
  /* 선택된 api 상태에 따라 className 변경하기 위한 부분 */
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

  /* 특정 api 클릭 시 변경 될 부분 */
  const handleClick = (applyId: number, title: string) => {
    setClicked(!clicked);
    setNowApiId(applyId);
    setNowApiTitle(title);
  };

  const [detailApplyId, setDetailApplyId] = useState<number | null>(null); // 상세 내용 볼 api Id
  const [isOpened, setIsOpened] = useState(false); // 상세 내용 창이 열렸는지 유무(true/false)
  /* 특정 api의 상세 내용 조회 */
  const showDetail = async (applyId: number) => {
    if (detailApplyId === applyId) {
      setIsOpened(!isOpened);
    } else {
      setIsOpened(true);
      setDetailApplyId(applyId);
      adminApiDetail(applyId);
      setIsModalOpen(!isModalOpen);
    }
  };

  const [selectedItem, setSelectItem] = useState('전체 조회'); // 조희 아이템 (저체/대기/승인/진행/거절)
  /* 조회 아이템 관리 */
  const handleItemClick = (item: string) => {
    setSelectItem(item);
    setStateApis(apis.filter((api) => api.progress === item.slice(0, 2)));
    setDetailApplyId(null);
    setIsOpened(false);
  };

  const handleChangeApi = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeApi(e.target.value);
  };

  /* 전체 조회 api 리스트 화면 관리 */
  const allApis = () => {
    if (apis.length === 0) {
      return <div>신청 api 내역이 없습니다</div>;
    }

    return apis.map((api) => (
      <div key={api.applyId}>
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
              type="button"
              onClick={() => {
                if (api.progress !== '승인' && api.progress !== '거절') {
                  handleClick(api.applyId, api.title);
                }
              }}
              className={getClassName(api.progress)}
            >
              {api.progress}
            </button>
            {clicked && api.applyId === nowApiId ? (
              <ul className="ulTag">
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '대기')}
                  >
                    대기
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '승인')}
                  >
                    승인
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '진행')}
                  >
                    진행
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => changeState(api.applyId, '거절')}
                  >
                    거절
                  </button>
                </li>
              </ul>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
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
      return <div>신청 api 내역이 없습니다</div>;
    }

    return stateApis.map((api) => (
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
            type="button"
            onClick={() => {
              if (api.progress !== '승인' && api.progress !== '거절') {
                handleClick(api.applyId, api.title);
              }
            }}
            className={getClassName(api.progress)}
          >
            {api.progress}
          </button>
          {clicked && api.applyId === nowApiId ? (
            <ul className="ulTag">
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '대기')}
                >
                  대기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '승인')}
                >
                  승인
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '진행')}
                >
                  진행
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => changeState(api.applyId, '거절')}
                >
                  거절
                </button>
              </li>
            </ul>
          ) : (
            ''
          )}
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
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Header title="API 신청내역" />

          <div className="flex justify-arouond w-full mt-8 h-auto">
            {/* 왼쪽 네브바 조회 누르는 부분 */}
            <div
              className="leftMenu border-right w-1/6 flex flex-col items-center text-center my-4"
              style={{ backgroundPositionY: position }}
              data-hs-scrollspy="#scrollspy-2"
              data-hs-scrollspy-scrollable-parent="#scrollspy-scrollable-parent-2"
            >
              <Tabs value={selectedItem} orientation="vertical">
                <TabsHeader className="w-40">
                  {data.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      className="place-items-start"
                      onClick={() => handleItemClick(label)}
                    >
                      <button
                        type="button"
                        className=" flex items-center gap-2"
                      >
                        {label}
                      </button>
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>

            {/* 오른쪽 신청일자,  API 제목, 상태 부분 */}
            <div className="w-5/6 px-8">
              <div className="my-4 w-full grid grid-cols-5 border-bottom py-3">
                <div className="col-span-1 text-center text-lg font-bold">
                  신청일자
                </div>
                <div className="col-span-3 text-center text-lg font-bold">
                  API 제목
                </div>
                <div className="col-span-1 text-center text-lg font-bold">
                  상태
                </div>
              </div>

              {/* 왼쪽 네브바 눌렀을 때 조회되는 리스트 부분 */}
              <div className="my-6 w-full border-bottom">
                {selectedItem === '전체 조회' ? allApis() : filterdApis()}
              </div>

              {/* 거절을 눌렀을 때 거절사유 입력 모달 뜨는 부분 */}
              {wantRejectState ? (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <div className="flex flex-col justify-center content-center font-semibold">
                    <p>거절 사유를 입력하세요</p>
                    <textarea
                      className="rejectTextarea"
                      onChange={(e) => handleRejectReason(e)}
                    />
                    <button
                      type="button"
                      onClick={handleRejectState}
                      className="rejectButton"
                    >
                      완료
                    </button>
                  </div>
                </Modal>
              ) : (
                ''
              )}
              {/* 승인을 눌렀을 대 승인 카테고리 선택 모달 뜨는 부분 */}
              {wantApproveState ? (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <div className="flex flex-col justify-center content-center font-semibold">
                    <p className="text-lg m-2">API url을 입력하세요</p>

                    <input
                      type="text"
                      value={changeApi}
                      onChange={handleChangeApi}
                      style={{
                        border: '0.5px solid #cecece',
                        borderRadius: '5px',
                      }}
                      placeholder="&nbsp;url 주소를 입력하세요"
                    />
                    <p className="text-lg m-2">API 카테고리를 선택하세요</p>
                    <hr />
                    {/* <p>{approveCategory}</p> */}
                    <div className="flex justify-items-stretch content-center text-center font-semibold grid grid-cols-2 m-3">
                      {approveCategory.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleApproveCategory(category)}
                          className={`${
                            selectedCategory === category
                              ? 'selectedCategory'
                              : 'noSelectedCategory'
                          } col-span-1 p-1 justify-self-center`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                    <hr />
                    <button
                      type="button"
                      onClick={handleApproveState}
                      className="approveButton"
                    >
                      완료
                    </button>
                  </div>
                </Modal>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiApproval;
