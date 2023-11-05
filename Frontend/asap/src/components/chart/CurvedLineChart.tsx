import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import useCategoryStore from 'store/chart/useCategoryStore';
import useCategoryAvg from 'hooks/api/chart/useCategoryAvg';
import Spinner from 'components/common/Spinner';

function CurvedLineChart() {
  const chartRef = useRef(null);
  const { categoryAvgLoading } = useCategoryAvg();
  const {
    monthDate,
    oneBeforeMonthDate,
    twoBeforeMonthDate,
    threeBeforeMonthDate,
    fourBeforeMonthDate,
    monthUsage,
    oneBeforeMonthUsage,
    twoBeforeMonthUsage,
    threeBeforeMonthUsage,
    fourBeforeMonthUsage,
  } = useCategoryStore();

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

  const myApiArr = useMemo(
    () => [
      fourBeforeMonthUsage?.myApi,
      threeBeforeMonthUsage?.myApi,
      twoBeforeMonthUsage?.myApi,
      oneBeforeMonthUsage?.myApi,
      monthUsage?.myApi,
    ],
    [
      fourBeforeMonthUsage,
      threeBeforeMonthUsage,
      twoBeforeMonthUsage,
      oneBeforeMonthUsage,
      monthUsage,
    ],
  );

  const categoryAvgArr = useMemo(
    () => [
      fourBeforeMonthUsage?.categoryAverage,
      threeBeforeMonthUsage?.categoryAverage,
      twoBeforeMonthUsage?.categoryAverage,
      oneBeforeMonthUsage?.categoryAverage,
      monthUsage?.categoryAverage,
    ],
    [
      fourBeforeMonthUsage,
      threeBeforeMonthUsage,
      twoBeforeMonthUsage,
      oneBeforeMonthUsage,
      monthUsage,
    ],
  );
  const options = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        showContent: false,
      },
      legend: {
        orient: 'horizontal',
        bottom: 2,
        data: ['내 API 제공량', '동일 카테고리 평균 제공량'],
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateArr,
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        top: '10%',
        bottom: '20%',
      },
      series: [
        {
          name: '내 API 제공량',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: '#F94144',
          areaStyle: { opacity: 0.25, color: '#F94144' },
          data: myApiArr,
        },
        {
          name: '동일 카테고리 평균 제공량',
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          color: '#F9C74F',
          areaStyle: { opacity: 0.25, color: '#F9C74F' },

          data: categoryAvgArr,
        },
      ],
    }),
    [dateArr, myApiArr, categoryAvgArr],
  );

  useEffect(() => {
    if (!chartRef.current) return undefined;
    const chart = echarts.init(chartRef.current);
    chart.setOption(options);
    return () => chart.dispose();
  }, [categoryAvgLoading, options]);

  if (categoryAvgLoading) {
    return <Spinner size="12" />;
  }

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '400px',
        padding: '5px 5px 5px 10px',
      }}
    />
  );
}

export default CurvedLineChart;
