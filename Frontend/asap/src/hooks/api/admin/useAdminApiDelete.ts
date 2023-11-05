import axiosInstance from 'utils/axiosInstance';

const useAdminApiDelete = () => {
  const adminApiDelete = async (apiId: number) => {
    try {
      await axiosInstance({
        method: 'DELETE',
        url: `/api/v1/admin/delete/${apiId}`,
        data: { adminPassword: 'babo' },
      });
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { adminApiDelete };
};

export default useAdminApiDelete;
