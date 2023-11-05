import React, { forwardRef, useEffect, useState } from 'react';
import useNoticeList from 'hooks/api/notice/useNoticeList';
import useNoticeStore from 'store/notice/useNoticeStore';
import Spinner from 'components/common/Spinner';
import { ReactComponent as RightArrow } from 'assets/icons/RightArrow.svg';
import { ReactComponent as LeftArrow } from 'assets/icons/LeftArrow.svg';
import { ReactComponent as RightArrowDisabled } from 'assets/icons/RightArrowDisabled.svg';
import { ReactComponent as LeftArrowDisabled } from 'assets/icons/LeftArrowDisabled.svg';
import NoticeCard from './NoticeCard';

const NoticeList = forwardRef(() => {
  const { loading } = useNoticeList();
  const { notices } = useNoticeStore((state) => state);
  const noticesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNotices, setPageNotices] = useState(notices || []);

  // 페이지별 알림 세팅
  useEffect(() => {
    const startIndex = (currentPage - 1) * noticesPerPage;
    const endIndex = startIndex + noticesPerPage;
    const visibleNotices = notices.slice(startIndex, endIndex);
    setPageNotices(visibleNotices);
  }, [notices, currentPage]);

  // 전체 페이지
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  // 이전페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner size="12" />
        </div>
      ) : (
        <div>
          {pageNotices?.map((notice) => (
            <NoticeCard key={notice.noticeId} notice={notice} />
          ))}
        </div>
      )}

      {/* 페이지 전환 */}
      <div className="flex justify-between mt-3">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          {currentPage === 1 ? <LeftArrowDisabled /> : <LeftArrow />}
        </button>
        <p className="font-bold">{`${currentPage} / ${totalPages}`}</p>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          {currentPage === totalPages ? <RightArrowDisabled /> : <RightArrow />}
        </button>
      </div>
    </div>
  );
});

export default NoticeList;
