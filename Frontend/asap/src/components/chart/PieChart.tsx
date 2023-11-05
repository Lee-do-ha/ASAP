import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

/**
 * 테이블 한줄
 * @param title 차트 타이틀
 * @param content 콘텐츠 배열
 * @param value value값 배열
 */

interface PieChartProps {
  title: string | null;
  content: string[];
  value: string[] | number[];
}
function PieChart({ title, content, value }: PieChartProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return undefined;

    const option = {
      title: {
        text: title,
        textStyle: {
          // 이 부분을 추가
          color: '#000000',
        },
        left: 'center', // 타이틀의 위치
        top: '5%',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        left: 'center',
      },
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: '50%',
          color: [
            '#ea8181', // 빨
            '#91cc75', // 초
            '#f8ea72', // 노
            '#5470c6', // 파
            '#b154c6', // 보
            '#6ec2e6', // 하늘
            '#ea72c8', // 분홍
          ],
          data: content.map((item, index) => {
            return { name: item, value: value[index] };
          }),
          label: {
            show: true,
            formatter: '{d}%', // 라벨 형식 설정 (이름: 백분율)
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    const myChart = echarts.init(chartRef.current);
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
        height: '400px', // 차트 높이 설정
      }}
    />
  );
}

export default React.memo(PieChart);
