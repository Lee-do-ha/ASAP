import React from 'react';
import SupplierMonthly from 'components/myapi/supplier/SupplierMonthly';
import SupplierDetail from 'components/myapi/supplier/SupplierDetail';

function SupplierApi() {
  return (
    <div>
      {/* 제공자 월별 통계 */}
      <SupplierMonthly />
      {/* 제공자 상세 통계 */}
      <SupplierDetail />
    </div>
  );
}

export default SupplierApi;
