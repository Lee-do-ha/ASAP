import React from 'react';
import UserDetail from 'components/myapi/user/UserDetail';
import UserMonthly from 'components/myapi/user/UserMonthly';

function UserApi() {
  return (
    <div>
      {/* 월별 사용량 통계 */}
      <UserMonthly />
      {/* api별 상세 통계 */}
      <UserDetail />
    </div>
  );
}

export default UserApi;
