import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetApiDetail from 'hooks/api/api/useGetApiDetail';
import useCheckApply from 'hooks/api/api/useCheckApply';
import ApiTable from 'components/api/ApiTable';
import JsonName from 'components/api/JsonName';
import CategoryImg from 'components/api/CategoryImg';
import 'styles/api/ApiDetail.scss';

function ApiDetail() {
  const authToken = sessionStorage.getItem('authToken');
  const navigate = useNavigate();
  const [apply, setApply] = useState<boolean>(true);
  const { apiId, apiDetail } = useGetApiDetail();
  const { checkApply } = useCheckApply();

  useEffect(() => {
    const fetchApply = async () => {
      if (authToken) {
        const check = await checkApply(apiId);
        if (check === 'NOT_REGISTERED_API') {
          setApply(false);
        }
      }
    };

    fetchApply();
  }, [authToken, checkApply, apiId]);

  const onListHandler = () => {
    navigate('/api_list', { state: { category: apiDetail?.category } });
  };

  const onApplyHandler = () => {
    navigate(`/api_list/${apiId}/apply`, {
      state: { apiId, apiTitle: apiDetail?.title },
    });
  };

  const onTestHandler = () => {
    navigate(`/api_list/${apiId}/test`);
  };

  const onUsageHandler = () => {
    navigate(`/api_list/${apiId}/usage`);
  };

  // 표 데이터
  const headers = ['API', 'API 출처', '제공데이터', '가격 (건당)'];
  const data = [
    {
      title: { key: 'title', content: apiDetail?.title },
      memberName: { key: 'memberName', content: apiDetail?.memberName },
      output: {
        key: 'output',
        content: <JsonName jsonData={apiDetail?.output} />,
      },
      price: {
        key: 'price',
        content: <span className="price">{apiDetail?.price}</span>,
      },
    },
  ];

  return (
    <div className="container mx-auto page-container">
      {/* 현재 페이지 위치 정보 */}
      <div className="page-info">
        <Link to="/">HOME</Link>&nbsp;{'>'}&nbsp;
        <Link to="/api_list">APIs</Link>&nbsp;{'>'}&nbsp;
        <button type="button" onClick={onListHandler}>
          {apiDetail?.category}
        </button>
        &nbsp;
        {'>'}
        &nbsp;
        <span className="font-bold">{apiDetail?.title}</span>
      </div>

      {/* API 설명 */}
      <div className="api-info">
        <div className="flex justify-center" style={{ flex: '3' }}>
          <CategoryImg category={apiDetail?.category} />
        </div>
        <div style={{ flex: '7' }} className="pr-10">
          <div className="api-title">{apiDetail?.title}</div>
          <div className="pb-10">
            {apiDetail?.tags &&
              JSON.parse(apiDetail.tags).map((tag: string) => (
                <span key={tag} className="tag">
                  #{tag}&nbsp;
                </span>
              ))}
          </div>
          <div className="text-lg">{apiDetail?.content}</div>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="buttons">
        <button type="button" className="api-button" onClick={onUsageHandler}>
          API 사용법
        </button>
        <button type="button" className="api-button" onClick={onTestHandler}>
          API 테스트
        </button>
        {authToken && apply ? null : (
          <button type="button" className="api-button" onClick={onApplyHandler}>
            API 신청하기
          </button>
        )}
      </div>

      {/* API 데이터 설명 */}
      <div className="text-3xl font-bold pb-3">API 데이터</div>
      <div />
      <ApiTable headers={headers} data={data} />
    </div>
  );
}

export default ApiDetail;
