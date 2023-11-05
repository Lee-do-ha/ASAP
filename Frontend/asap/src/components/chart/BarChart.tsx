import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

/**
 * 바 차트 컴포넌트
 * @param title - 차트 타이틀
 * @param content - 카테고리 배열
 * @param value - value값 배열
 */

interface BarChartProps {
  title: string | null;
  content: string[];
  value: number[];
}

function BarChart({ title, content, value }: BarChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const myChart = echarts.init(chartRef.current);

    // 마지막 데이터를 빨간색으로 표시
    const styledValue = value.map((v, index) =>
      index === value.length - 1
        ? { value: v, itemStyle: { color: '#DC2222' } }
        : v,
    );

    const option = {
      title: {
        text: title,
        textStyle: {
          // 이 부분을 추가
          color: '#000000',
        },
        left: 'center',
        top: '5%',
      },
      xAxis: {
        type: 'category',
        data: content,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: styledValue,
          type: 'bar',
          barWidth: '50px', // 여기에 추가
        },
      ],
      tooltip: {
        trigger: 'axis', // 'axis'는 x축 기준으로 툴팁이 표시됩니다. 'item'으로 설정하면 각 항목 위에 따로 표시됩니다.
        axisPointer: {
          type: 'none', // 마우스가 올라간 항목의 영역을 강조
        },
      },
    };

    myChart.setOption(option);

    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', resizeHandler);
    };
  }, [title, content, value]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '400px',
      }}
    />
  );
}

export default BarChart;
