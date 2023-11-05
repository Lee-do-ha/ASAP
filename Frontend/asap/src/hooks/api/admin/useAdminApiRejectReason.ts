import axiosInstance from 'utils/axiosInstance';

interface rejectInfo {
  applyId: number;
  title: string;
  content: string;
}

const useAdminApiRejectReason = () => {
  const adminApiRejectReason = async ({
    applyId,
    title,
    content,
  }: rejectInfo) => {
    try {
      await axiosInstance({
        method: 'POST',
        url: '/api/v1/apply/reject',
        data: { applyId, title, content },
      });
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { adminApiRejectReason };
};

export default useAdminApiRejectReason;
