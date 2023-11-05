import React from 'react';
import useDailyUsage from 'hooks/api/chart/useDailyUsage';
import LineGradient from 'components/chart/LineGradient';
import useDetailStore from 'store/chart/useDetailStore';
import ChartFrame from 'components/chart/ChartFramee';

function DailyChart() {
  const { dailyLoading } = useDailyUsage();
  const { dailyUsageStore } = useDetailStore();

  if (dailyLoading) {
    return null;
  }

  return (
    <div style={{ width: '94%', marginTop: '3%' }}>
      <ChartFrame
        width="100%"
        height="400px"
        title="최근 30일 사용량 및 사용 금액"
        fontSize="20px"
        chart={<LineGradient data={dailyUsageStore || []} />}
      />
    </div>
  );
}

export default DailyChart;
