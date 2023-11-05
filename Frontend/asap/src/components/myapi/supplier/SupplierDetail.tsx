import React, { useEffect } from 'react';
import useGetOfferList from 'hooks/api/chart/useGetOfferList';
import useDetailStore from 'store/chart/useDetailStore';
import ChartFrame from 'components/chart/ChartFramee';
import CurvedLineChart from 'components/chart/CurvedLineChart';
import LineChart from 'components/chart/LineChart';
import PieChart from 'components/chart/PieChart';
import useIndustryRate from 'hooks/api/chart/useIndustryRate';
import useIndustryRateStore from 'store/chart/useIndustryRateStore';
import Spinner from 'components/common/Spinner';
import SupplierDailyChart from './SupplierDailyChart';

function SupplierDetail() {
  const { offerListLoading, offerList } = useGetOfferList();
  const { apiId, setApiId, setApiTitle, apiTitle, resetApiDetails } =
    useDetailStore();
  const { industry, count } = useIndustryRateStore();
  const { industryRate } = useIndustryRate();

  const handleItemClick = (id: number, title: string) => {
    setApiId(id);
    setApiTitle(title);
  };

  useEffect(() => {
    industryRate(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId]);

  useEffect(() => {
    return () => resetApiDetails();
  }, [resetApiDetails]);

  const renderApiTitile = () => {
    if (offerListLoading) {
      return <Spinner size="8" />;
    }
    if (!apiTitle) {
      return <div>제공 중인 API가 없습니다.</div>;
    }
    return (
      <div>
        <span className="ms-2">&apos;{apiTitle}&apos;</span> <span>통계</span>
      </div>
    );
  };

  return (
    <div
      className="container mx-auto mt-12 grid grid-cols-9 gap-10 flex justify-center"
      style={{ width: '85%' }}
    >
      {/* 제공중 리스트 */}
      <div className="border rounded-lg border-gray-300 p-4 col-span-2 min-h-screen">
        {offerListLoading ? null : (
          <div>
            <div className="font-bold text-2xl">API 제공 상세</div>
            {offerList?.length === 0 && (
              <div className="my-3">제공중인 API가 없습니다.</div>
            )}
            {offerList?.map((offer) => (
              <div
                key={offer.apiId}
                className={`my-3 cursor-pointer ${
                  offer.apiId === apiId ? 'color-blue' : 'text-gray-700'
                }`}
                onClick={() => handleItemClick(offer.apiId, offer.title)}
                aria-hidden="true"
              >
                {offer.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 제공 차트 */}
      <div className="col-span-7">
        <div className="font-bold text-3xl mb-12 ml-8">{renderApiTitile()}</div>
        <div className="flex flex-col items-center justify-around">
          <div className="w-full flex justify-evenly">
            <div>
              <ChartFrame
                width="450px"
                height="450px"
                title="신규 사용자"
                fontSize="20px"
                chart={<LineChart />}
              />
            </div>
            <div>
              <ChartFrame
                width="450px"
                height="450px"
                title="산업군 비율"
                fontSize="20px"
                chart={<PieChart title="" content={industry} value={count} />}
              />
            </div>
          </div>

          <div className="mt-16" style={{ width: '94%' }}>
            <ChartFrame
              width="100%"
              height="430px"
              title="동일 카테고리 API 제공량 비교"
              fontSize="20px"
              chart={<CurvedLineChart />}
            />
          </div>
          <SupplierDailyChart />
        </div>
      </div>
    </div>
  );
}

export default SupplierDetail;
