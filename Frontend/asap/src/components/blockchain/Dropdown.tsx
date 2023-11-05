import React from 'react';

interface ApiInfo {
  title: string;
  apiId: number;
}

interface DropdownProps {
  options: ApiInfo[] | null;
  apiTitle: string | null;
  setApiTitle: React.Dispatch<React.SetStateAction<string | null>>;
  onSelect(): void;
}

function Dropdown({ options, apiTitle, setApiTitle, onSelect }: DropdownProps) {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setApiTitle(e.target.value);
    onSelect();
  };

  return (
    <select
      value={apiTitle || ''}
      onChange={handleSelect}
      className="custom-select appearance-none border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none"
    >
      <option value="" disabled>
        API를 선택하세요
      </option>
      {options?.map((option) => (
        <option key={option.apiId} value={option.title}>
          {option.title}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
