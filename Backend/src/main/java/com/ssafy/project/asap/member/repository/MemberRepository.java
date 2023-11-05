package com.ssafy.project.asap.member.repository;

import com.ssafy.project.asap.member.entity.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findById(String id);

    List<Member> findAllByEmailAndName(String email, String name);

    Optional<Member> findByAddress(String address);

}
