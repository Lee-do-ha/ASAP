import React, { useState, useEffect } from 'react';

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}

interface Props {
  jsonData: string | undefined;
}

function JsonName({ jsonData }: Props) {
  const [data, setData] = useState<Pair[]>([]);

  useEffect(() => {
    try {
      if (jsonData) {
        const parsedData = JSON.parse(jsonData);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
  }, [jsonData]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="h-full w-full flex flex-wrap">
      {data.map(
        (item, index) =>
          item.name && (
            <div key={item.idx} className="flex items-center">
              <p className="ps-2">
                {item.name}
                {index !== data.length - 1 && ','}
              </p>
            </div>
          ),
      )}
    </div>
  );
}

export default JsonName;
