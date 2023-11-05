//package com.ssafy.project.asap.member;
//
//
//import com.ssafy.project.asap.global.exception.CustomException;
//import com.ssafy.project.asap.member.entity.domain.Member;
//import com.ssafy.project.asap.member.entity.dto.request.CheckPasswordRequest;
//import com.ssafy.project.asap.member.entity.dto.request.FindMemberIdRequest;
//import com.ssafy.project.asap.member.entity.dto.request.LoginMemberRequest;
//import com.ssafy.project.asap.member.entity.dto.request.RegisterMemberRequest;
//import com.ssafy.project.asap.member.service.MemberService;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.List;
//
//@SpringBootTest
//@Transactional
//public class MemberTest {
//
//    @Autowired
//    private MemberService memberService;
//
//    @Test
//    @DisplayName("회원가입 성공")
//    public void 회원가입_성공(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId2")
//                .password("testPassword")
//                .email("asap2@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//    }
//
//    @Test
//    @DisplayName("회원가입 실패 (아이디 중복)")
//    public void 회원가입_성공_아이디_중복(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        RegisterMemberRequest registerMemberRequest1 = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap2@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        Assertions.assertThrows(CustomException.class, () ->{
//            memberService.signUp(registerMemberRequest1);
//        });
//
//    }
//
//    @Test
//    @DisplayName("로그인 성공")
//    public void 로그인_성공(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap2@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        LoginMemberRequest loginMemberRequest = new LoginMemberRequest("testId", "testPassword");
//
//        memberService.login(loginMemberRequest);
//
//    }
//
//    @Test
//    @DisplayName("로그인 실패 (아이디 오류)")
//    public void 로그인_실패_비밀번호_오류(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap2@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        LoginMemberRequest loginMemberRequest = new LoginMemberRequest("testId", "invalidPassword");
//
//        Assertions.assertThrows(CustomException.class, () -> {
//            memberService.login(loginMemberRequest);
//        });
//
//    }
//
//    @Test
//    @DisplayName("로그인 실패 (비밀번호 오류)")
//    public void 로그인_실패_아이디_오류(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap2@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        LoginMemberRequest loginMemberRequest = new LoginMemberRequest("testId2", "testPassword");
//
//        Assertions.assertThrows(CustomException.class, () -> {
//            memberService.login(loginMemberRequest);
//        });
//
//    }
//
//    @Test
//    @DisplayName("아이디 찾기 성공")
//    public void 아이디_찾기_성공(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap2@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        FindMemberIdRequest findMemberIdRequest = new FindMemberIdRequest(registerMemberRequest.getEmail(), registerMemberRequest.getName());
//
//        List<String> list =  memberService.findAllByEmailAndName(findMemberIdRequest);
//
//    }
//
//    @Test
//    @DisplayName("아이디 찾기 실패")
//    public void 아이디_찾기_실패(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap2@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        FindMemberIdRequest findMemberIdRequest = new FindMemberIdRequest("invalidId", "invalidName");
//
//        Assertions.assertThrows(CustomException.class, () -> {
//            memberService.findAllByEmailAndName(findMemberIdRequest);
//        });
//
//    }
//
//    @Test
//    @DisplayName("개인정보 조회 성공")
//    public void 개인정보_조회_성공(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        CheckPasswordRequest checkPasswordRequest = new CheckPasswordRequest(registerMemberRequest.getPassword());
//
//        memberService.checkPassword(checkPasswordRequest, registerMemberRequest.getId());
//
//    }
//
//    @Test
//    @DisplayName("개인정보 조회 실패 (비밀번호 오류)")
//    public void 개인정보_조회_실패_비밀번호_오류(){
//
//        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
//                .id("testId")
//                .password("testPassword")
//                .email("asap@ssafy.com")
//                .name("ASAP")
//                .build();
//
//        memberService.signUp(registerMemberRequest);
//
//        CheckPasswordRequest checkPasswordRequest = new CheckPasswordRequest("invalidPassword");
//
//        Assertions.assertThrows(CustomException.class, () -> {
//            memberService.checkPassword(checkPasswordRequest, registerMemberRequest.getId());
//        });
//
//    }
//
//}
