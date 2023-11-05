import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface categoryInfo {
  category: string;
  count: number;
}
const useGetCategoryList = () => {
  const [categories, setCategories] = useState<categoryInfo[]>();
  const [totalCount, setTotalCount] = useState(0);
  const getCategoryList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/category/categoryList',
      });
      if (response.status === 200) {
        const total = response.data.reduce(
          (acc: number, category: categoryInfo) => acc + category.count,
          0,
        );

        // '전체' 카테고리를 생성하고 count를 합산하여 추가
        const allCategory = { category: '전체', count: total };
        const updatedCategoryData = [allCategory, ...response.data];
        setCategories(updatedCategoryData);
        setTotalCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  return { getCategoryList, categories, totalCount };
};

export default useGetCategoryList;
