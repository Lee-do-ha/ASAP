import React, { useState, useEffect } from 'react';

/** Json을 예쁘게 출력
 * @prop {string} jsonData Json 파일 String으로 변환한 문자열 전체
 */

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

function PrettyJson({ jsonData }: Props) {
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
    <pre
      style={{ fontFamily: 'Courier New, Nanum Gothic, sans-serif' }}
      className="whitespace-pre-wrap"
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default PrettyJson;
