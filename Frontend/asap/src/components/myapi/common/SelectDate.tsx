import React from 'react';
import useMonthlyStore from 'store/chart/useMonthlyStore';

function SelectDate() {
  const { year, month, setYear, setMonth } = useMonthlyStore();

  // 년 선택 - 현재 년도 포함 3년
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: 3 },
    (_, index) => currentYear - index,
  );

  // 월 선택
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  return (
    <div className="flex justify-end gap-3">
      {/* 년 선택 */}
      <div className="relative inline-flex">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="appearance-none border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none"
        >
          {availableYears.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
        <div className="flex items-center ms-1">년</div>
      </div>

      {/* 월 선택 */}
      <div className="relative inline-flex">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="appearance-none border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none"
        >
          {months.map((monthName) => (
            <option key={monthName} value={monthName}>
              {monthName}
            </option>
          ))}
        </select>
        <div className="flex items-center ms-1">월</div>
      </div>
    </div>
  );
}

export default SelectDate;
