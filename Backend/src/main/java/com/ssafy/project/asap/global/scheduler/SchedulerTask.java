package com.ssafy.project.asap.global.scheduler;

import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.notice.entity.domain.Notice;
import com.ssafy.project.asap.notice.repository.NoticeRepository;
import com.ssafy.project.asap.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class SchedulerTask {

    private final MemberService memberService;
    private final NoticeRepository noticeRepository;

//    @Scheduled(fixedDelay = 60000)
    public void task1(){

        noticeRepository.save(Notice.builder()
                        .isRead(false)
                        .title("지은아 안녕 난 누구게")
                        .content("안알려줌")
                        .member(memberService.findById("jieun"))
                .build());

    }

//    @Scheduled(fixedDelay = 1000 * 60 * 2)
    public void taskTest2(){

        noticeRepository.save(Notice.builder()
                .isRead(false)
                .title("서희야 안녕 난 누구게")
                .content("안알려줌")
                .member(memberService.findById("bam"))
                .build());

    }

}
