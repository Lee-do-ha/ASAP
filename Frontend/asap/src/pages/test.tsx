import BarChart from 'components/chart/BarChart';
import ChartFrame from 'components/chart/ChartFramee';
import LineChart from 'components/chart/LineChart';
import PieChart from 'components/chart/PieChart';
// import CurvedLineChart from 'components/chart/CurvedLineChart';
import React from 'react';

const test = () => {
  const sampleTitle = 'Sample Chart Title';
  const sampleContent = ['금융', '보험', '차량', '보안', '지도'];
  const sampleValue = [1048, 735, 580, 484, 300];
  return (
    <div className="ml-16 mt-32 flex">
      <div>
        <ChartFrame
          width="500px"
          height="500px"
          title="신규 사용자"
          fontSize="20px"
          chart={<LineChart />}
        />
      </div>
      <div className=" ml-10">
        <ChartFrame
          width="500px"
          height="500px"
          title="산업군 비율"
          fontSize="20px"
          chart={
            <PieChart
              title={sampleTitle}
              content={sampleContent}
              value={sampleValue}
            />
          }
        />
      </div>
      <div className=" ml-10">
        <ChartFrame
          width="500px"
          height="500px"
          title="차트 테스트"
          fontSize="20px"
          chart={
            <BarChart
              title={sampleTitle}
              content={sampleContent}
              value={sampleValue}
            />
          }
        />
      </div>
      {/* <div className=" ml-10">
        <ChartFrame
          width="500px"
          height="500px"
          title="차트 테스트"
          fontSize="20px"
          chart={<CurvedLineChart />}
        />
      </div> */}
    </div>
  );
};

export default test;
