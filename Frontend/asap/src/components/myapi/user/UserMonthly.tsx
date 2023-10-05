import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMonthlyUsage from 'hooks/api/chart/useMonthlyUsage';
import useMonthlyStore from 'store/chart/useMonthlyStore';
import Spinner from 'components/common/Spinner';
import { Card, Button } from '@material-tailwind/react';
import PieChart from 'components/chart/PieChart';
import BarChart from 'components/chart/BarChart';
import SelectDate from '../common/SelectDate';

function UserMonthly() {
  const navigate = useNavigate();
  const { monthlyLoading } = useMonthlyUsage(); // 사용자 월별 api 사용량 받기

  const {
    totalAmount,
    totalPrice,
    year,
    month,
    monthUsage,
    oneBeforeTotalPrice,
    twoBeforeTotalPrice,
    oneBeforeMonthDate,
    twoBeforeMonthDate,
    monthDate,
  } = useMonthlyStore();
  // 사용 요금과 사용 가격 1000 단위로 쉼표
  const formattedTotalAmount = totalAmount.toLocaleString();
  const formattedTotalPrice = totalPrice.toLocaleString();

  // 왼상단 파이 차트 데이터
  let monthlyPieChartContent;
  let monthlyPieChartValue;

  if (monthUsage && monthUsage.length > 0) {
    // 처음 5개 항목만 가져옵니다.
    const topItems = monthUsage.slice(0, 5);

    monthlyPieChartContent = topItems.map((item) => item.apiResponse.title);
    monthlyPieChartValue = topItems.map((item) => item.price);

    // 6번째 항목부터는 '기타'로 합칩니다.
    if (monthUsage.length > 5) {
      const otherItems = monthUsage.slice(5);

      const totalOtherValue = otherItems.reduce(
        (accum, item) => accum + item.amount * item.price,
        0,
      );

      monthlyPieChartContent.push('기타');
      monthlyPieChartValue.push(totalOtherValue);
    }
  } else {
    monthlyPieChartContent = ['사용 내역이 없습니다'];
    monthlyPieChartValue = [0];
  }

  // 우상단 막대 데이터
  const barChartContent = [twoBeforeMonthDate, oneBeforeMonthDate, monthDate];
  const barChartValue = [twoBeforeTotalPrice, oneBeforeTotalPrice, totalPrice];

  return (
    <div className="container mx-auto mt-20">
      <div>
        <div className="font-bold text-3xl">API 사용 통계</div>
        {/* 날짜 선택 */}
        <SelectDate />

        <Card className="p-5">
          {/* 사용량, 사용 요금 */}
          <div className="flex grid grid-cols-2 gap-4 text-black">
            <div className="col-span-1 flex justify-center border border-blue-600 text-lg p-2 rounded-lg gap-3">
              <p>당월 API 요청량</p>
              <p>
                <span className="text-blue-700">{formattedTotalAmount}</span> 건
              </p>
            </div>
            <div className="col-span-1 flex justify-center border border-blue-600 text-lg p-2 rounded-lg gap-3">
              <p>당월 API 이용 요금</p>
              <p>
                <span className="text-blue-700">{formattedTotalPrice}</span> 원
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
                  title={
                    monthlyPieChartContent[0] === '사용 내역이 없습니다'
                      ? `${month}월 API 사용 내역이 없습니다`
                      : `${month}월 API 지출 비율`
                  }
                  content={monthlyPieChartContent}
                  value={monthlyPieChartValue}
                />
              </div>
              {/* 우상단 막대차트 */}
              <div className="flex col-span-1">
                <BarChart
                  title="월별 지출 비교 [단위:원]"
                  content={barChartContent}
                  value={barChartValue}
                />
              </div>
            </div>
          )}
        </Card>
        <div className="mt-4 flex justify-end">
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