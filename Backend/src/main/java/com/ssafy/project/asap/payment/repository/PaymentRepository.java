package com.ssafy.project.asap.payment.repository;

import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.payment.entity.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findAllByMember(Member member);

}
