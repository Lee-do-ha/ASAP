package com.ssafy.project.asap.notice.repository;

import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.notice.entity.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Notice findByNoticeId(Long noticeId);

    List<Notice> findAllByMember(Member member);

}
