package com.ssafy.project.asap.mail.controller;

import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.mail.dto.request.EmailRequest;
import com.ssafy.project.asap.mail.service.MailService;
import com.ssafy.project.asap.member.entity.dto.request.CheckEmailRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mail")
@RequiredArgsConstructor
@Tag(name="Mail", description = "메일 API")
public class MailController {

    private final MailService mailService;

    @PostMapping("/auth-email")
    @Operation(summary = "이메일 인증 전송", description = "이메일 인증 메일 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 인증 발송"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> authEmail(@RequestBody EmailRequest emailRequest) throws MessagingException {
        
        try {
            mailService.authEmail(emailRequest.getEmail());

            return ResponseEntity.ok("이메일 전송 완료");

        } catch (MessagingException e){

            return ResponseEntity.ok(ErrorCode.EMAIL_NOT_SEND);

        }
        
    }


    @PostMapping("/check-auth-email")
    @Operation(summary = "이메일 인증 확인", description = "이메일 인증 메일 코드 확인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 인증 성공", content = @Content(schema = @Schema(
                    implementation = CheckEmailRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> authEmail(@RequestBody CheckEmailRequest checkEmailRequest) {

        // 레디스에 있는 암호 코드랑 비교
        try {
            mailService.checkAuthEmail(checkEmailRequest);

            return ResponseEntity.ok("이메일 인증 성공");

        } catch (CustomException e) {

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

}
