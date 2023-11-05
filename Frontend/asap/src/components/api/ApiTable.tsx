import React from 'react';
import 'styles/api/ApiTable.scss';

interface TableCell {
  key: string;
  content: React.ReactNode;
}

interface TableRow {
  [key: string]: TableCell;
}

interface TableProps {
  headers: string[];
  data: TableRow[];
}

function ApiTable({ headers, data }: TableProps) {
  return (
    <table className="api-table">
      <thead>
        <tr className="table-header">
          {headers.map((header, index) => (
            <th key={header} className={`header-item col-table-${index + 1}`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={Object.values(row)
              .map((cell) => cell.key)
              .join('-')}
          >
            {Object.values(row).map((cell, index) => (
              <td key={cell.key} className={`data-item col-table-${index + 1}`}>
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApiTable;
