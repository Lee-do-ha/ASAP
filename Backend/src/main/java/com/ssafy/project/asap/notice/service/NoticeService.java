package com.ssafy.project.asap.notice.service;

import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.apply.entity.dto.request.RejectApplyRequest;
import com.ssafy.project.asap.apply.repository.ApplyRepository;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.notice.entity.domain.Notice;
import com.ssafy.project.asap.notice.entity.dto.response.FindNoticesResponse;
import com.ssafy.project.asap.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final ApplyRepository applyRepository;

    @Transactional
    public void saveRejectApply(RejectApplyRequest request){

        Notice notice = Notice.builder()
                .title("'" + request.getTitle() + "'"  + " 건에 대한 신청이 거절되었습니다.")
                .isRead(false)
                .content("'" + request.getContent() + "'" + " 로 인하여 거절되었습니다.")
                .member(applyRepository.findByApplyId(request.getApplyId()).getMember())
                .build();
        
        log.info("거절 승인 메시지 완료");

        noticeRepository.save(notice);
    }

    @Transactional
    public void saveApproveApply(Long applyId){

        Apply apply = applyRepository.findByApplyId(applyId);

        noticeRepository.save(Notice.builder()
                        .member(apply.getMember())
                        .isRead(false)
                        .content("API 신청이 성공적으로 승인되었습니다!")
                        .title("'" + apply.getTitle() + "'" + " 건에 대한 신청이 승인되었습니다.")
                .build());

    }

    @Transactional
    public void update(Long noticeId){

        noticeRepository.findByNoticeId(noticeId).setRead(true);

    }

    @Transactional
    public List<FindNoticesResponse> findAll(Member member){

        List<FindNoticesResponse> list = new ArrayList<>();

        for(Notice notice : noticeRepository.findAllByMember(member)){
            list.add(new FindNoticesResponse(notice));
        }

        return list;
    }

    public Long findUnRead(Member member) {

        List<Notice> list = noticeRepository.findAllByMember(member);

        Long unReadMessage = 0L;

        for(Notice notice : list){
            if(notice.isRead() == false){
                unReadMessage++;
            }
        }

        return unReadMessage;

    }

    @Transactional
    public void delete(Long noticeId) {

        Notice notice = noticeRepository.findByNoticeId(noticeId);

        noticeRepository.delete(notice);

    }
}
