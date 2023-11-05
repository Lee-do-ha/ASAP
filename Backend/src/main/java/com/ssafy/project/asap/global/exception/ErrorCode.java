package com.ssafy.project.asap.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode{

    USER_ID_DUPLICATED(HttpStatus.CONFLICT, "이미 등록된 아이디입니다."),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "등록되지않은 카테고리입니다."),
    USER_ID_NOT_FOUND(HttpStatus.NOT_FOUND, "잘못된 아이디입니다."),
    NOT_REGISTERED_API(HttpStatus.NOT_FOUND, "등록되지않은 API입니다."),
    USER_NOT_HAVE_WALLET(HttpStatus.NOT_FOUND, "지갑이 등록되지 않은 회원입니다."),
    PASSWORD_NOT_AUTHORIZED(HttpStatus.NON_AUTHORITATIVE_INFORMATION, "올바르지 않은 패스워드입니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 회원이 존재하지 않습니다."),
    SIGNUP_DUPLICATED(HttpStatus.CONFLICT, "회원가입 오류입니다."),
    EMAIL_CODE_NOT_AUTHORIZED(HttpStatus.NON_AUTHORITATIVE_INFORMATION, "올바른 인증번호가 아닙니다."),
    EMAIL_NOT_SEND(HttpStatus.BAD_REQUEST, "인증코드 전송에 실패했습니다."),
    PURPOSE_DUPLICATED(HttpStatus.CONFLICT, "이미 등록된 API입니다."),
    APPLY_DUPLICATED(HttpStatus.CONFLICT, "이미 신청 완료된 API입니다."),
    INVALID_CARD_NUMBER(HttpStatus.BAD_REQUEST, "올바른 형식의 카드번호가 아닙니다."),
    MEMBER_ALREADY_REGISTER_CARD(HttpStatus.BAD_REQUEST, "이미 카드를 등록한 상태입니다."),
    CREDIT_NOT_FOUND(HttpStatus.NOT_FOUND, "등록된 카드가 존재하지않습니다."),
    DAILY_TEST_COUNT_OVER(HttpStatus.TOO_MANY_REQUESTS, "일일 테스트 사용량을 초과하였습니다."),
    REQUEST_PARAMETER(HttpStatus.BAD_REQUEST, "필수값이 존재하지 않습니다."),
    NOT_API_OWNER(HttpStatus.BAD_REQUEST, "api 제공자가 아닙니다.");

    private final HttpStatus httpStatus;
    private final String message;

}
