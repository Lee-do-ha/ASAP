import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetApiList from 'hooks/api/api/useGetApiList';
import useGetCategoryList from 'hooks/api/api/useGetCategoryList';
import Header from 'components/common/Header';
import Card from 'components/common/Card';

const activeStyle = {
  backgroundColor: 'rgba(122, 192, 240, 0.37)',
  width: '80%',
  height: '100%',
  color: '#222222',
  // fontWeight: '700',
  borderRadius: '8px',
  // padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const nonActiveStyle = {
  width: '80%',
  height: '100%',
  color: 'grey',
  // fontWeight: '700',
  borderRadius: '8px',
  // padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function ApiList() {
  const navigate = useNavigate();
  const { apiList } = useGetApiList(); // apiList 불러오기
  const { categories, totalCount } = useGetCategoryList(); // category 종류 불러오기

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState(apiList);

  const onSelectCategoryHandler = (category: string, count: number) => {
    setSelectedCategory(category);
    setSelectedCount(count);
    setSelectedItems(apiList?.filter((item) => item.category === category));
  };
  useEffect(() => {
    setSelectedCount(totalCount);
    setSelectedItems(apiList);
  }, [totalCount, apiList]);
  return (
    <div>
      <Header title="APIs" />
      {/* 왼쪽 카테고리 선택부분 */}
      <div className="flex grid grid-cols-12 h-auto">
        <div className="flex flex-col justify-center col-span-3 items-center border-r">
          <p className="text-3xl w-3/4 mt-12 mb-10 font-bold">카테고리</p>
          {categories?.map((data) => (
            <div
              key={data.category}
              onClick={() => onSelectCategoryHandler(data.category, data.count)}
              aria-hidden="true"
              className="flex justify-center gap-44 m-1 p-3"
              style={
                selectedCategory === data.category
                  ? activeStyle
                  : nonActiveStyle
              }
            >
              <p className="text-2xl font-semibold text-gray-800">
                {data.category}
              </p>
              <p className="text-2xl text-gray-600">({data.count})</p>
            </div>
          ))}
        </div>
        {/* 오른쪽 상품 카드 부분 */}
        <div className="flex flex-col col-span-9 ml-10">
          <div className="text-4xl mt-12 mb-10 font-bold flex pl-5">
            {totalCount !== undefined && (
              <p style={{ color: '#7AC0F0' }}>{selectedCount}&nbsp;</p>
            )}{' '}
            <p>개의 상품</p>
          </div>
          <div className="grid grid-cols-9 flex justify-center items-center">
            {selectedCategory === '전체'
              ? apiList?.map((api) => (
                  <div key={api.apiId} className="col-span-3 w-full">
                    {!apiList ? (
                      <div>상품이 없습니다</div>
                    ) : (
                      <div
                        onClick={() =>
                          navigate(`/api/v1/apis/detail/${api.apiId}`)
                        }
                        aria-hidden="true"
                        className="w-full h-full flex justify-center"
                      >
                        <Card
                          title={api.title}
                          content={api.content}
                          tags={api.tags}
                        />
                      </div>
                    )}
                  </div>
                ))
              : selectedItems?.map((api) => (
                  <div key={api.apiId} className="col-span-3 w-full">
                    {selectedCount === 0 ? (
                      <div>상품이 없습니다</div>
                    ) : (
                      <div
                        onClick={() =>
                          navigate(`/api/v1/apis/detail/${api.apiId}`)
                        }
                        aria-hidden="true"
                        className="w-full h-full flex justify-center"
                      >
                        <Card
                          title={api.title}
                          content={api.content}
                          tags={api.tags}
                        />
                      </div>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiList;
