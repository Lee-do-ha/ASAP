import React, { useRef, useEffect, useMemo } from 'react';
import useAuthStore from 'store/auth/useAuthStore';
import * as echarts from 'echarts';

interface IDailyUsage {
  date: string;
  amount: number;
  price: number;
}

interface Props {
  data?: IDailyUsage[];
}

function LineGradient({ data }: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { loginType } = useAuthStore((state) => state);

  const seriesName = useMemo(() => {
    return loginType === 'supplier'
      ? ['제공량 (건)', '수익 (원)']
      : ['요청량 (건)', '사용 요금 (원)'];
  }, [loginType]);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const dateList = Array.isArray(data) ? data.map((item) => item.date) : [];
    const amountList = Array.isArray(data)
      ? data.map((item) => item.amount)
      : [];
    const priceList = Array.isArray(data) ? data.map((item) => item.price) : [];

    const maxAmount = Math.max(...amountList);
    const maxPrice = Math.max(...priceList);

    const options = {
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: dateList.length - 1,
        },
        {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          min: 0,
          max: dateList.length - 1,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [
        {
          data: dateList,
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: seriesName[0],
          max: maxAmount,
          min: 0,
          interval: Math.round(maxAmount / 7),
        },
        {
          type: 'value',
          name: seriesName[1],
          max: maxPrice,
          min: 0,
          interval: Math.round(maxPrice / 7),
        },
      ],
      series: [
        {
          name: seriesName[0],
          type: 'line',
          showSymbol: false,
          data: amountList,
          yAxisIndex: 0,
          lineStyle: {
            color: '#1E3A8A',
          },
        },
        {
          name: seriesName[1],
          type: 'line',
          showSymbol: false,
          data: priceList,
          yAxisIndex: 1,
          lineStyle: {
            color: '#1E3A8A',
          },
        },
      ],
    };

    const chart = echarts.init(chartRef.current);
    chart.setOption(options);

    return () => chart.dispose();
  }, [data, seriesName]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}

LineGradient.defaultProps = {
  data: [],
};

export default LineGradient;
