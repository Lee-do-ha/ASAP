package com.ssafy.project.asap.payment.service;

import com.ssafy.project.asap.credit.entity.domain.Credit;
import com.ssafy.project.asap.credit.service.CreditService;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.repository.MemberRepository;
import com.ssafy.project.asap.payment.entity.domain.Payment;
import com.ssafy.project.asap.payment.entity.dto.request.RegisterPaymentRequest;
import com.ssafy.project.asap.payment.entity.dto.response.FindPaymentsResponse;
import com.ssafy.project.asap.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final CreditService creditService;

    public List<FindPaymentsResponse> findAllByMember(String id){

        List<FindPaymentsResponse> list = new ArrayList<>();

        for(Payment payment : paymentRepository.findAllByMember(memberRepository.findById(id).get())){
            list.add(FindPaymentsResponse
                    .builder()
                    .payDate(payment.getPayDate())
                    .cardCompany(payment.getCardCompany())
                    .cardNumber(payment.getCardNumber())
                    .price(payment.getPrice())
                    .build());
        }

        return list;

    }

    public void save(RegisterPaymentRequest findPaymentsResponse){

        Member member = memberRepository.findByAddress(findPaymentsResponse.getAddress()).get();

        Credit credit = creditService.findByMember(member.getId());

        paymentRepository.save(Payment.builder()
                .payDate(LocalDate.now())
                .cardCompany(credit.getCardCompany())
                .cardNumber(credit.getCardNumber())
                .price(findPaymentsResponse.getPrice())
                .member(member)
                .build());

    }

}