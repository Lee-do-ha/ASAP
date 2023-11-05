package com.ssafy.project.asap.credit.service;

import com.ssafy.project.asap.credit.entity.domain.Credit;
import com.ssafy.project.asap.credit.entity.dto.request.RegisterCreditRequest;
import com.ssafy.project.asap.credit.repository.CreditRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CreditService {

    private final MemberRepository memberRepository;
    private final CreditRepository creditRepository;

    @Transactional
    public void registerCredit(RegisterCreditRequest registerCreditRequest, String id){

        creditRepository.findByMemberId(id)
                .ifPresent((e) -> {
                    throw new CustomException(ErrorCode.MEMBER_ALREADY_REGISTER_CARD);
                });

        if(registerCreditRequest.getCardNumber().length() != 16){
            throw new CustomException(ErrorCode.INVALID_CARD_NUMBER);
        }

        Credit credit = Credit.builder()
                .cardCompany(registerCreditRequest.getCardCompany())
                .cardNumber(registerCreditRequest.getCardNumber())
                .member(memberRepository.findById(id).get())
                .build();

        creditRepository.save(credit);

    }

    public Credit findByMember(String id){

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        return member.getCredit();

    }

    @Transactional
    public void delete(String id) {

        Credit credit = creditRepository.findByMemberId(id)
                .orElseThrow(() -> new CustomException(ErrorCode.CREDIT_NOT_FOUND));

        creditRepository.delete(credit);

    }

    @Transactional
    public void update(RegisterCreditRequest registerCreditRequest, String id){

        Credit credit = creditRepository.findByMemberId(id)
                .orElseThrow(() -> new CustomException(ErrorCode.CREDIT_NOT_FOUND));

        credit.setCardCompany(registerCreditRequest.getCardCompany());
        credit.setCardNumber(registerCreditRequest.getCardNumber());

    }
}
