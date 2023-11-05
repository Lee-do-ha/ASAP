package com.ssafy.project.asap.transaction.controller;

import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.transaction.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/transaction")
@Tag(name = "Transaction", description = "블록체인 검증 관련")
public class TransactionController {

    private final TransactionService transactionService;
    private final MemberService memberService;

    @GetMapping("")
    @Operation(summary = "블록체인 검증 데이터 조회", description = "블록체인 트랜잭션의 데이터와 트랜잭션을 만든 데이터")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "apiTitle", description = "API 제목"),
            @Parameter(name = "startDate", description = "시작일(일요일)", example = "2023-09-17"),
            @Parameter(name = "endDate", description = "종료일(토요일)", example = "2023-09-23")
    })
    public ResponseEntity<?> guideByApiId(@RequestParam Map<String, String> param, Authentication authentication){
        return ResponseEntity.ok(transactionService.findTransaction(param, memberService.findById(authentication.getName()).getAddress()));

    }
}
