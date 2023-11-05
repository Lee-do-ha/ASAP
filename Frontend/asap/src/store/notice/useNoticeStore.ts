import { create } from 'zustand';

interface INotice {
  noticeId: number;
  title: string;
  content: string;
  read: boolean;
  createDate: string;
}

interface NoticeStore {
  notices: INotice[];
  setNotices: (notices: INotice[]) => void; // eslint-disable-line no-unused-vars
  markAsRead: (noticeId: number) => void; // eslint-disable-line no-unused-vars
  markAsDelete: (noticeId: number) => void; // eslint-disable-line no-unused-vars
}

const useNoticeStore = create<NoticeStore>((set) => ({
  notices: [],
  setNotices: (notices: INotice[]) => set({ notices }),
  markAsRead: (noticeId) =>
    set((state) => ({
      notices: state.notices.map((notice) =>
        notice.noticeId === noticeId ? { ...notice, read: true } : notice,
      ),
    })),
  markAsDelete: (noticeId) =>
    set((state) => ({
      notices: state.notices.filter((notice) => notice.noticeId !== noticeId),
    })),
}));

export default useNoticeStore;
