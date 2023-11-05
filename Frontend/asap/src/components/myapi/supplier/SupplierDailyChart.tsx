import React from 'react';
import useDailyProvide from 'hooks/api/chart/useDailyProvide';
import LineGradient from 'components/chart/LineGradient';
import useDetailStore from 'store/chart/useDetailStore';
import ChartFrame from 'components/chart/ChartFramee';

function SupplierDailyChart() {
  const { dailyLoading } = useDailyProvide();
  const { dailyUsageStore } = useDetailStore();

  if (dailyLoading) {
    return null;
  }

  return (
    <div className="mt-16" style={{ width: '94%' }}>
      <ChartFrame
        width="100%"
        height="400px"
        title="최근 30일 제공량 및 수익"
        fontSize="20px"
        chart={<LineGradient data={dailyUsageStore || []} />}
      />
    </div>
  );
}

export default SupplierDailyChart;
