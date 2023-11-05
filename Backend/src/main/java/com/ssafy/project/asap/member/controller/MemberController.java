package com.ssafy.project.asap.member.controller;

import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.entity.dto.request.*;
import com.ssafy.project.asap.member.entity.dto.response.FindMemberResponse;
import com.ssafy.project.asap.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
@Tag(name="Member", description = "회원 API")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "이메일, 아이디, 비밀번호, 이름을 통해 회원가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원 가입 성공", content = @Content(schema = @Schema(
                    implementation = RegisterMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody RegisterMemberRequest registerMemberRequest) {

        try {

            memberService.signUp(registerMemberRequest);

            return ResponseEntity.ok("회원가입 성공");

        } catch (CustomException e){

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

    @PostMapping("/check-id")
    @Operation(summary = "아이디 중복확인", description = "아이디 사용가능하면 true, 없다면 false")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이디 사용가능"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> checkId(@RequestBody CheckIdRequest checkIdRequest) {

        try {
            memberService.checkId(checkIdRequest.getId());

            return ResponseEntity.ok("회원가입 가능한 아이디입니다.");

        } catch (CustomException e){

            return ResponseEntity.ok(e.getErrorCode());

        }

    }


    @PostMapping("/login")
    @Operation(summary = "로그인", description = "아이디, 비밀번호를 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema = @Schema(
                    implementation = LoginMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> login(@RequestBody LoginMemberRequest loginMemberRequest) {

        try {
            String token = memberService.login(loginMemberRequest);

            return ResponseEntity.ok(token);

        } catch (CustomException e) {

            return ResponseEntity.ok(e.getErrorCode());

        }
    }

    @PostMapping("/find-id")
    @Operation(summary = "아이디 찾기", description = "이메일, 이름을 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이디 리스트 제공", content = @Content(schema = @Schema(
                    implementation = FindMemberIdRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByEmailAndName(@RequestBody FindMemberIdRequest findMemberIdRequest) {

        try {
            List<String> list = memberService.findAllByEmailAndName(findMemberIdRequest);

            return ResponseEntity.ok(list);

        } catch (CustomException e) {

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

    @PostMapping("/find-password")
    @Operation(summary = "비밀번호 변경 주소 발송", description = "새로운 비빌번호 변경을 위해 가능한 URL이 담겨있는 메일 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "메일 발송 성공", content = @Content(schema = @Schema(
                    implementation = FindMemberPasswordRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> findPassword(@RequestBody FindMemberPasswordRequest findMemberPasswordRequest) {

        return ResponseEntity.ok(true);
    }

    @PostMapping("/change-password")
    @Operation(summary = "비밀번호 변경", description = "새로운 비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "새로운 비밀 번호 변경 완료", content = @Content(schema = @Schema(
                    implementation = LoginMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> updatePassword(@RequestBody LoginMemberRequest loginMemberRequest) {

        memberService.updatePassword(loginMemberRequest);

        return ResponseEntity.ok("비밀번호 변경 완료");
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "JWT 토큰 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> logout() {

        return ResponseEntity.ok(true);
    }

    @GetMapping("/me")
    @Operation(summary = "개인정보 조회", description = "이메일, 이름, 지갑 정보, 잔고 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "개인 정보 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<FindMemberResponse> findByMemberId(Authentication authentication) {

        Member member = memberService.findById(authentication.getName());

        FindMemberResponse findMemberResponse = new FindMemberResponse(member);

        return ResponseEntity.ok(findMemberResponse);
    }

    @PutMapping("/me")
    @Operation(summary = "개인정보 수정", description = "이름, 이메일 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "개인 정보 수정", content = @Content(schema = @Schema(
                    implementation = UpdateMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> update(@RequestBody UpdateMemberRequest updateMemberRequest) {

        memberService.update(updateMemberRequest);

        return ResponseEntity.ok("회원 정보 수정 성공");
    }
    
    @PostMapping("/check-password")
    @Operation(summary = "개인정보 조회", description = "개인정보 조회 들어가기 전 비밀번호 확인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 인증 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> checkPassword(@RequestBody CheckPasswordRequest checkPasswordRequest, Authentication authentication){
        
        memberService.checkPassword(checkPasswordRequest, authentication.getName());

        return ResponseEntity.ok("비밀번호 인증 성공");
    }

    @PostMapping("/registerAddress")
    @Operation(summary = "지갑 등록", description = "블록체인에 지갑 등록하고 DB에 지갑 주소 저장")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "지갑 생성 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> registerAddress(@RequestBody RegisterAddressRequest request){

        memberService.registerAddress(request);
        
        return ResponseEntity.ok("지갑 생성 성공");
    }

    @GetMapping("/getAddress")
    @Operation(summary = "지갑 조회", description = "지갑 주소 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "지갑 주소 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> getAddress(Authentication authentication){

        try {

            String address = memberService.getAddress(authentication.getName());

            return ResponseEntity.ok(address);

        } catch (CustomException e) {

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

}


