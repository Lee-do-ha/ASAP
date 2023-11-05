import React, { useEffect } from 'react';
import useGetUseList from 'hooks/api/chart/useGetUseList';
import useDetailStore from 'store/chart/useDetailStore';
import Spinner from 'components/common/Spinner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import UserDailyChart from './UserDailyChart';

function UserDetail() {
  const navigate = useNavigate();
  const { useListLoading, useList } = useGetUseList();
  const { apiId, setApiId, setApiTitle, apiTitle, resetApiDetails } =
    useDetailStore();

  const onApiUsageHandler = () => {
    navigate(`/api_list/${apiId}/usage`);
  };

  const onApiDetailHandler = () => {
    navigate(`/api_list/${apiId}`);
  };

  const renderApiTitile = () => {
    if (useListLoading) {
      return <Spinner size="8" />;
    }
    if (!apiTitle) {
      return <div>사용 중인 API가 없습니다.</div>;
    }
    return (
      <div>
        <span className="ms-2 page-text">&apos;{apiTitle}&apos;</span>{' '}
        <span>통계</span>
      </div>
    );
  };

  const handleItemClick = (id: number, title: string) => {
    setApiId(id);
    setApiTitle(title);
  };

  useEffect(() => {
    return () => resetApiDetails();
  }, [resetApiDetails]);

  return (
    <div
      className="container mx-auto mt-12 grid grid-cols-9 gap-10 flex justify-center"
      style={{ width: '85%' }}
    >
      {/* 사용중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-2 min-h-screen">
        {useListLoading ? null : (
          <div>
            <div className="font-bold text-2xl">API 사용 상세</div>
            {useList?.length === 0 && (
              <div className="my-3">사용중인 API가 없습니다.</div>
            )}
            {useList?.map((use) => (
              <div
                key={use.apiId}
                className={`my-3 cursor-pointer ${
                  use.apiId === apiId ? 'color-blue' : 'text-gray-700'
                }`}
                onClick={() => handleItemClick(use.apiId, use.title)}
                aria-hidden="true"
              >
                {use.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 사용 차트 */}
      <div className="col-span-7">
        <button
          type="button"
          className="font-bold text-3xl mb-12 ml-8"
          onClick={onApiDetailHandler}
        >
          {renderApiTitile()}
        </button>
        <div className="flex flex-col items-center justify-around">
          <div className="w-full flex justify-evenly">
            <UserDailyChart />
          </div>
          <div className="flex justify-end mt-5" style={{ width: '94%' }}>
            <Button
              onClick={onApiUsageHandler}
              style={{ backgroundColor: '#004096' }}
            >
              사용법 확인하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
