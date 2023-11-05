import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import useGetApiList from 'hooks/api/api/useGetApiList';
import useGetCategoryList from 'hooks/api/api/useGetCategoryList';
import Header from 'components/common/Header';
import ApiListCard from 'components/common/ApiListCard';
import SearchBar from 'components/common/SearchBar';

const activeStyle = {
  backgroundColor: 'rgba(122, 192, 240, 0.37)',
  width: '80%',
  color: '#222222',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const nonActiveStyle = {
  width: '80%',
  color: 'grey',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function ApiList() {
  const navigate = useNavigate();
  const location = useLocation();
  const cate = location.state?.category;

  // 검색어 query
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get('search');

  const { apiList } = useGetApiList(); // apiList 불러오기
  const { categories, totalCount } = useGetCategoryList(); // category 종류 불러오기
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({}); // 카테고리별 상품 개수

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState(apiList);

  const handleResetSearch = () => {
    navigate('/api_list'); // search 쿼리 파라미터를 제거하고 navigate
  };

  const onSelectCategoryHandler = (category: string, count: number) => {
    setSelectedCategory(category);
    setSelectedCount(count);
    setSelectedItems(apiList?.filter((item) => item.category === category));
  };

  useEffect(() => {
    let filteredItems = apiList || [];

    // 정렬 기준 카테고리 설정
    let effectiveCategory = '';

    if (cate && !selectedCategory) {
      effectiveCategory = cate;
    } else if (!selectedCategory) {
      effectiveCategory = '전체';
    } else {
      effectiveCategory = selectedCategory;
    }

    // 카테고리에 따른 필터링
    if (effectiveCategory && effectiveCategory !== '전체') {
      setSelectedCategory(effectiveCategory);
      filteredItems = filteredItems.filter(
        (item) => item.category === effectiveCategory,
      );
    } else if (effectiveCategory === '전체') {
      setSelectedCategory('전체');
    }

    // 검색어에 따른 필터링
    if (searchKeyword) {
      filteredItems = filteredItems.filter((item) =>
        item.title.includes(searchKeyword),
      );
    }

    setSelectedItems(filteredItems);
    setSelectedCount(filteredItems.length);

    // 카테고리별 상품 개수 업데이트
    const newCategoryCounts: { [key: string]: number } = {};
    let totalItemCount = 0;

    categories?.forEach((data) => {
      const itemCount =
        apiList?.filter((item) => {
          if (searchKeyword) {
            return (
              item.category === data.category &&
              item.title.includes(searchKeyword)
            );
          }
          return item.category === data.category;
        }).length || 0;

      newCategoryCounts[data.category] = itemCount;
      totalItemCount += itemCount;
    });

    // 전체 항목의 개수 업데이트
    newCategoryCounts['전체'] = totalItemCount;

    setCategoryCounts(newCategoryCounts);
  }, [cate, searchKeyword, apiList, selectedCategory, categories]);

  return (
    <div>
      <Header title="APIs">
        {' '}
        <SearchBar />
      </Header>

      {/* 왼쪽 카테고리 선택부분 */}
      <div className="flex grid grid-cols-12">
        <div className="flex flex-col col-span-2 items-center border-r">
          <div className="text-2xl w-3/4 mt-12 mb-10 font-bold flex justify-center items-center">
            <p>카테고리</p>
          </div>
          {categories?.map((data) => (
            <div
              key={data.category}
              onClick={() => onSelectCategoryHandler(data.category, data.count)}
              aria-hidden="true"
              className="flex gap-20 m-1 p-2"
              style={
                selectedCategory === data.category
                  ? activeStyle
                  : nonActiveStyle
              }
            >
              <p className="text-lg font-semibold text-gray-800">
                {data.category}
              </p>
              <p className="text-lg text-gray-600">
                ({categoryCounts[data.category] || 0})
              </p>
            </div>
          ))}
        </div>
        {/* 오른쪽 상품 카드 부분 */}
        <div className="flex flex-col col-span-10 ">
          <div className="text-2xl mt-12 mb-10 mx-12 font-bold flex items-center justify-between">
            <div className="flex">
              {totalCount !== undefined && (
                <p style={{ color: '#7AC0F0' }}>{selectedCount}&nbsp;</p>
              )}{' '}
              <p>개의 상품</p>
            </div>
            <Button onClick={handleResetSearch} className="filter-button">
              검색 필터 초기화
            </Button>
          </div>
          <div className="grid grid-cols-9 flex justify-center items-center">
            {selectedCount === 0 ? (
              <div className="col-span-9">
                <div className="flex justify-center text-2xl">
                  상품이 없습니다.
                </div>
              </div>
            ) : (
              selectedItems?.map((api) => (
                <div key={api.apiId} className="col-span-3 w-full mb-5">
                  <div
                    onClick={() => navigate(`/api_list/${api.apiId}`)}
                    aria-hidden="true"
                    className="w-full h-full flex justify-center"
                  >
                    <ApiListCard
                      category={api.category}
                      title={api.title}
                      tags={api.tags}
                      content={api.content}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiList;
