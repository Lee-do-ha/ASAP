import React, { useState } from 'react';
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  format,
  parseISO,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReactComponent as Read } from 'assets/icons/Read.svg';
import { ReactComponent as Unread } from 'assets/icons/Unread.svg';
import { ReactComponent as Trash } from 'assets/icons/Trash.svg';
import useCheckNotice from 'hooks/api/notice/useCheckNotice';
import useDeleteNotice from 'hooks/api/notice/useDeleteNotice';
import useNoticeStore from 'store/notice/useNoticeStore';

interface INotice {
  noticeId: number;
  title: string;
  content: string;
  read: boolean;
  createDate: string;
}

interface Props {
  notice: INotice;
}

function NoticeCard({ notice }: Props) {
  const { checkNotice } = useCheckNotice();
  const { deleteNotice } = useDeleteNotice();
  const { markAsRead, markAsDelete } = useNoticeStore((state) => state);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 알림을 클릭하면 읽음 처리
  const toggleDetail = () => {
    setIsDetailOpen(!isDetailOpen);
    if (!notice.read) {
      checkNotice(notice.noticeId);
      markAsRead(notice.noticeId);
    }
  };

  // 알림 삭제
  const onDeleteNotice = () => {
    deleteNotice(notice.noticeId);
    markAsDelete(notice.noticeId);
  };

  // 알림 도착 시간
  const timeAgo = () => {
    const currentTime = new Date();
    const parsedCreateDate = parseISO(notice.createDate);
    const minutesAgo = differenceInMinutes(currentTime, parsedCreateDate);
    const hoursAgo = differenceInHours(currentTime, parsedCreateDate);
    const daysAgo = differenceInDays(currentTime, parsedCreateDate);
    if (daysAgo > 0) {
      return (
        <p>{`${format(parsedCreateDate, 'yyyy년 M월 d일', {
          locale: ko,
        })}`}</p>
      );
    }
    if (hoursAgo > 0) {
      return <p>{`${hoursAgo}시간 전`}</p>;
    }
    return <p>{`${minutesAgo}분 전`}</p>;
  };

  return (
    <div
      className={`border p-2 mt-1 w-80 rounded-lg ${
        notice.read ? 'border-gray-300' : 'border-blue-800'
      }`}
    >
      {/* 알림 헤더 */}
      <div onClick={toggleDetail} aria-hidden="true" className="cursor-pointer">
        <div className="flex justify-between">
          <div className="flex text-black items-center justify-between mb-2">
            {notice.read ? (
              <Read className="w-6 h-auto" />
            ) : (
              <Unread className="w-6 h-auto" />
            )}
          </div>
          <div className="flex justify-end">{timeAgo()}</div>
        </div>
        <div className="text-black mb-1 ms-1">{notice.title}</div>
      </div>

      {/* 알림 내용 */}
      {isDetailOpen && (
        <div className="mt-2">
          <hr />
          <div className="ms-1 mt-3">{notice.content}</div>
          {/* 알림 삭제 버튼 */}
          <div className="flex justify-end">
            <div
              onClick={onDeleteNotice}
              aria-hidden="true"
              className="cursor-pointer"
            >
              <Trash />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoticeCard;
