import { useState, useEffect } from 'react';

interface JsonFormatterResult {
  formattedJson: string;
  dynamicHeight: string;
}

function useFormattedJson(
  jsonString: string | undefined,
  lineHeight = 18,
  padding = 20,
): JsonFormatterResult {
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [dynamicHeight, setDynamicHeight] = useState<string>('0px');

  useEffect(() => {
    try {
      const formatted = JSON.stringify(JSON.parse(jsonString || '{}'), null, 2);

      setFormattedJson(formatted);

      const lines = formatted.split('\n').length;
      setDynamicHeight(`${lines * lineHeight + padding}px`);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setFormattedJson('{}');
      setDynamicHeight(`${lineHeight + padding}px`);
    }
  }, [jsonString, lineHeight, padding]);

  return {
    formattedJson,
    dynamicHeight,
  };
}

export default useFormattedJson;
