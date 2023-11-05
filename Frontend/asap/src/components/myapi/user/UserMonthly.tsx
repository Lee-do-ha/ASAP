import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useMonthlyUsage from 'hooks/api/chart/useMonthlyUsage';
import useMonthlyStore from 'store/chart/useMonthlyStore';
import Spinner from 'components/common/Spinner';
import { Card, Button } from '@material-tailwind/react';
import PieChart from 'components/chart/PieChart';
import BarChart from 'components/chart/BarChart';
import useBatchTime from 'hooks/api/chart/useBatchTime';
import TooltipHelper from 'components/common/TooltipHelper';
import SelectDate from '../common/SelectDate';

function UserMonthly() {
  const navigate = useNavigate();
  const { monthlyLoading } = useMonthlyUsage(); // 사용자 월별 api 사용량 받기
  const { batchTime, batchTimeLoading } = useBatchTime();

  const {
    totalAmount,
    totalPrice,
    year,
    month,
    monthlyPieChartContent,
    monthlyPieChartValue,
    oneBeforeTotalPrice,
    twoBeforeTotalPrice,
    oneBeforeMonthDate,
    twoBeforeMonthDate,
    monthDate,
  } = useMonthlyStore();

  // 우상단 막대 데이터
  const [barChartContent, barChartValue] = useMemo(() => {
    return [
      [twoBeforeMonthDate, oneBeforeMonthDate, monthDate],
      [twoBeforeTotalPrice, oneBeforeTotalPrice, totalPrice],
    ];
  }, [
    twoBeforeMonthDate,
    oneBeforeMonthDate,
    monthDate,
    twoBeforeTotalPrice,
    oneBeforeTotalPrice,
    totalPrice,
  ]);

  return (
    <div className="container mx-auto mt-20">
      <div>
        <div className="flex">
          <div className="font-bold text-3xl flex">
            <div className="mr-1">API 사용 통계</div>
            <TooltipHelper message="통계 데이터는 3분 마다 갱신됩니다." />
          </div>
        </div>
        {/* 날짜 선택 */}
        <SelectDate />

        <Card className="p-5">
          {/* 사용량, 사용 요금 */}
          <div className="flex grid grid-cols-2 gap-4 text-black">
            <div className="col-span-1 flex justify-center border border-blue-600 text-lg p-2 rounded-lg gap-3">
              <p>당월 API 요청량</p>
              <p>
                <span className="text-blue-700">
                  {totalAmount.toLocaleString()}
                </span>{' '}
                건
              </p>
            </div>
            <div className="col-span-1 flex justify-center border border-blue-600 text-lg p-2 rounded-lg gap-3">
              <p>당월 API 이용 요금</p>
              <p>
                <span className="text-blue-700">
                  {totalPrice.toLocaleString()}
                </span>{' '}
                원
              </p>
            </div>
          </div>
          {/* 차트 컨테이너 */}
          {monthlyLoading ? (
            <div className="flex justify-center items-center h-72">
              <Spinner size="12" />
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2">
              {/* 좌상단 파이차트 */}
              <div className="flex col-span-1">
                <PieChart
                  title="API 지출 비율"
                  content={monthlyPieChartContent}
                  value={monthlyPieChartValue}
                />
              </div>
              {/* 우상단 막대차트 */}
              <div className="flex col-span-1">
                <BarChart
                  title="최근 3개월 지출 비교 [단위:원]"
                  content={barChartContent}
                  value={barChartValue}
                />
              </div>
            </div>
          )}
        </Card>
        <div className="mt-4 flex justify-between">
          <div>
            {batchTimeLoading ? (
              <Spinner size="8" />
            ) : (
              <div>조회 기준 시간 : {batchTime}</div>
            )}
          </div>
          <Button
            onClick={() =>
              navigate(`/myapi/detail?year=${year}&month=${month}`)
            }
          >
            상세 보기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserMonthly;
