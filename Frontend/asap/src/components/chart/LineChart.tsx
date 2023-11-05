import React, { useRef, useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import useNewUserStore from 'store/chart/useNewUserStore';
import useNewUser from 'hooks/api/chart/useNewUser';
import Spinner from 'components/common/Spinner';

function LineChart() {
  const chartRef = useRef(null);
  const { newUserLoading } = useNewUser();

  const {
    fourBeforeMonthDate,
    threeBeforeMonthDate,
    twoBeforeMonthDate,
    oneBeforeMonthDate,
    monthDate,
    fourBeforeMonthCount,
    threeBeforeMonthCount,
    twoBeforeMonthCount,
    oneBeforeMonthCount,
    monthCount,
  } = useNewUserStore();

  const dateArr = useMemo(
    () => [
      fourBeforeMonthDate,
      threeBeforeMonthDate,
      twoBeforeMonthDate,
      oneBeforeMonthDate,
      monthDate,
    ],
    [
      fourBeforeMonthDate,
      threeBeforeMonthDate,
      twoBeforeMonthDate,
      oneBeforeMonthDate,
      monthDate,
    ],
  );
  const countArr = useMemo(
    () => [
      fourBeforeMonthCount,
      threeBeforeMonthCount,
      twoBeforeMonthCount,
      oneBeforeMonthCount,
      monthCount,
    ],
    [
      fourBeforeMonthCount,
      threeBeforeMonthCount,
      twoBeforeMonthCount,
      oneBeforeMonthCount,
      monthCount,
    ],
  );

  // count 값 최대값 계산
  const maxCount = Math.max(...countArr);

  // count값이 5보다 적을때, 클때 계산
  const yAxisConfig = useMemo(() => {
    if (maxCount <= 5) {
      return {
        type: 'value',
        min: 0,
        max: 5,
        interval: 1,
      };
    }
    const roundedMax = Math.ceil(maxCount / 5) * 5; // maxCount를 5의 배수로 올림
    return {
      type: 'value',
      min: 0,
      max: roundedMax,
      interval: Math.ceil(roundedMax / 5),
    };
  }, [maxCount]);

  const options = useMemo(
    () => ({
      // X축 데이터 포인트 위에 마우스를 가져갈 때 표시
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: dateArr,
      },
      yAxis: yAxisConfig,
      series: [{ name: '신규 사용자', data: countArr, type: 'line' }],
    }),
    [dateArr, countArr, yAxisConfig],
  );

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const chart = echarts.init(chartRef.current);
    chart.setOption(options);
    return () => chart.dispose();
  }, [options, newUserLoading]);

  if (newUserLoading) {
    return <Spinner size="12" />;
  }

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

export default LineChart;
