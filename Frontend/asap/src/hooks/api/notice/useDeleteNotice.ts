import axiosInstance from 'utils/axiosInstance';

type TNoticeId = number;

/**
 * 메시지 삭제
 * @returns {function} deleteNotice 메시지 삭제
 */

const useDeleteNotice = () => {
  const deleteNotice = async (noticeId: TNoticeId) => {
    try {
      await axiosInstance({
        method: 'DELETE',
        url: `/api/v1/notice/delete/${noticeId}`,
      });
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };
  return { deleteNotice };
};

export default useDeleteNotice;
