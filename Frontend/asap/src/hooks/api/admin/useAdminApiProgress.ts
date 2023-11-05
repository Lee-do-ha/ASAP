import axiosInstance from 'utils/axiosInstance';

interface postInfo {
  applyId: number;
  progress: string;
}
const useAdminApiProgress = () => {
  const adminApiProgress = async ({ applyId, progress }: postInfo) => {
    try {
      await axiosInstance({
        method: 'PUT',
        url: '/api/v1/apply/progress',
        data: { applyId, progress },
      });
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { adminApiProgress };
};

export default useAdminApiProgress;
