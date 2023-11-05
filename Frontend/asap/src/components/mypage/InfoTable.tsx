import React from 'react';
import './InfoTable.scss';

/**
 * 테이블 한줄
 * @param left 왼쪽항목
 * @param right 오른쪽항목
 */

interface TableProps {
  left: string;
  right: number | string | React.ReactElement | undefined;
  height: string;
  leftGrid: string;
  rightGrid: string;
}
function Table({
  left,
  right,
  height = '55px',
  leftGrid = '3',
  rightGrid = '9',
}: TableProps) {
  return (
    <div className="table-container grid grid-cols-12 justify-start items-center">
      {/* 왼쪽부분 */}
      <div
        className={`col-span-${leftGrid} left-bgc flex items-center text-gray-600`}
        style={{ height }}
      >
        <span className="ml-7 text-.base table-text font-bold">{left}</span>
      </div>
      {/* 오른쪽부분 */}
      <div
        className={`col-span-${rightGrid} right-bgc flex items-center`}
        style={{ height }}
      >
        <span className="ml-7 text-base table-text font-bold">{right}</span>
      </div>
    </div>
  );
}

export default Table;
