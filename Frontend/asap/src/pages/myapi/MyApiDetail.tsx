import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useAuthStore from 'store/auth/useAuthStore';
import useMonthlyDetail from 'hooks/api/chart/useMonthlyDetail';
import Spinner from 'components/common/Spinner';
import { Button } from '@material-tailwind/react';
import useMonthlyStore from 'store/chart/useMonthlyStore';

function MyApiDetail() {
  const [searchParams] = useSearchParams();
  const { loginType } = useAuthStore((state) => state);
  const { monthlyLoading, monthlyDetail } = useMonthlyDetail();
  const { setMonth, setYear } = useMonthlyStore();
  const navigate = useNavigate();

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const goStatistics = () => {
    if (month && year) {
      setMonth(month);
      setYear(year);
    }
    navigate('/myapi');
  };

  return (
    <div className="container mx-auto page-container">
      <div className="text-4xl font-bold">
        <span className="color-blue">
          {year}년 {month}월{' '}
        </span>{' '}
        API {loginType === 'supplier' ? '제공' : '사용'} 내역
      </div>
      {monthlyLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner size="12" />
        </div>
      ) : (
        <div className="mt-12">
          {monthlyDetail && monthlyDetail.length > 0 ? (
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-300 p-2">API 이름</th>
                  <th className="border border-gray-300 p-2">
                    {loginType === 'supplier' ? '제공량 (건)' : '사용량 (건)'}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {loginType === 'supplier' ? '수익 (원)' : '사용 요금 (원)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyDetail.map((detail) => (
                  <tr key={detail.apiResponse.apiId}>
                    <td className="border border-gray-300 p-2 text-center">
                      {detail.apiResponse.title}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {detail.amount.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {detail.apiResponse.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center text-2xl">
              조회 내역이 없습니다.
            </p>
          )}
          <div className="flex justify-end mt-5">
            <Button className="bg-blue" onClick={goStatistics}>
              통계 보기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApiDetail;
