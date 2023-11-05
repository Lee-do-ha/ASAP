import useSupplyApply from 'hooks/api/supply/useSupplyApply';
import React from 'react';

function ApiSupplyList() {
  const { getSupplyApplyList } = useSupplyApply();

  return (
    <div>
      <div>제공자가 신청한 API 신청 리스트</div>
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={getSupplyApplyList}
      >
        제공 api 리스트 받기 테스트
      </button>
    </div>
  );
}

export default ApiSupplyList;
