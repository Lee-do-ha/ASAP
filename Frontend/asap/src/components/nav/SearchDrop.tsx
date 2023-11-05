import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from 'components/common/SearchBar';

const SearchDrop = forwardRef(() => {
  const navigate = useNavigate();
  const categoryList = ['지도', '검색', '도서', '차량'];

  const onCategoryHandler = (page: string) => {
    navigate('/api_list', { state: { category: page } });
  };

  return (
    <div className="w-full bg-gray-200 p-5 py-12 flex flex-col gap-4 font-container">
      <p className="font-extrabold text-3xl text-black text-center mb-5">
        API 검색하기
      </p>
      <div className="w-full flex justify-center">
        <SearchBar />
      </div>
      <div className="flex justify-center mt-2">
        {categoryList.map((category) => (
          <button
            type="button"
            key={category}
            className="tag-button font-bold text-gray-900"
            onClick={() => onCategoryHandler(category)}
          >
            #&nbsp;{category}
          </button>
        ))}
      </div>
    </div>
  );
});

export default SearchDrop;
