package com.ssafy.project.asap.credit.controller;

import com.ssafy.project.asap.credit.entity.dto.request.RegisterCreditRequest;
import com.ssafy.project.asap.credit.entity.dto.response.FindCreditResponse;
import com.ssafy.project.asap.credit.service.CreditService;
import com.ssafy.project.asap.global.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/credit")
@RequiredArgsConstructor
@Tag(name="Credit", description = " 결제수단 API")
public class CreditController {

    private final CreditService creditService;

    @PostMapping("/register")
    @Operation(summary = "결제 수단 등록", description = "카드사, 카드 번호를 통해 결제 수단 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "결제 수단 등록", content = @Content(schema = @Schema(
                    implementation = RegisterCreditRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody RegisterCreditRequest registerCreditRequest, Authentication authentication) {

        try {

            creditService.registerCredit(registerCreditRequest, authentication.getName());

            return ResponseEntity.ok("카드 등록 성공");

        } catch (CustomException e){

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

    @GetMapping("/get")
    @Operation(summary = "결제 수단 정보 조회", description = "결제 수단의 정보를 조회 할 수있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "결제 수단 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> find(Authentication authentication) {

        try {

            FindCreditResponse findCreditResponse = new FindCreditResponse(creditService.findByMember(authentication.getName()));

            creditService.findByMember(authentication.getName());

            return ResponseEntity.ok(findCreditResponse);

        } catch (CustomException e){

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

    @DeleteMapping("/delete")
    @Operation(summary = "결제 수단 삭제", description = "결제 정보를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "결제 수단 삭제"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> delete(Authentication authentication) {

        try {

            creditService.delete(authentication.getName());

            return ResponseEntity.ok("결제 수단 삭제 성공");

        } catch (CustomException e){

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

    @PutMapping ("/update")
    @Operation(summary = "결제 수단 수정", description = "결제 정보를 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "결제 수단 수정"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> update(@RequestBody RegisterCreditRequest registerCreditRequest, Authentication authentication) {

        try {

            creditService.update(registerCreditRequest, authentication.getName());

            return ResponseEntity.ok("결제 수단 수정 완료");

        } catch (CustomException e) {

            return ResponseEntity.ok(e.getErrorCode());

        }

    }
}
