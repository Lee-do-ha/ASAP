package com.ssafy.project.asap.api.controller;

import com.ssafy.project.asap.api.service.ApiService;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/apis")
@RequiredArgsConstructor
@Tag(name="Chart", description = "Chart 관련 API")
public class ChartController {

    private final ApiService apiService;
    private final MemberService memberService;

    @GetMapping("/average/category")
    @Operation(summary = "카테고리 평균 조회", description = "동일 카테고리의 평균")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "apiId", description = "API 아이디"),
            @Parameter(name = "year", description = "년"),
            @Parameter(name = "month", description = "월")
    })
    public ResponseEntity<Object> averageCategory(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(apiService.findCategoryIdsById(params));
    }

    @GetMapping("/usage/monthly")
    @Operation(summary = "월간 사용량 조회", description = "월간 모든 api 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "year", description = "년"),
            @Parameter(name = "month", description = "월")
    })
    public ResponseEntity<Object> MonthlyUsage(@RequestParam Map<String, String> params,
                                               Authentication authentication)  {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findMonthlyUsage(params, member.getWalletId()));
    }

    @GetMapping("/usage/monthly/one")
    @Operation(summary = "월간 사용량 조회", description = "월간 모든 api 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "year", description = "년"),
            @Parameter(name = "month", description = "월")
    })
    public ResponseEntity<Object> oneMonthlyUsage(@RequestParam Map<String, String> params,
                                               Authentication authentication)  {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findOneMonthUsage(params, member.getWalletId()));
    }

    @GetMapping("/providing/monthly")
    @Operation(summary = "월간 제공량 조회", description = "월간 모든 api 제공량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "year", description = "년"),
            @Parameter(name = "month", description = "월")
    })
    public ResponseEntity<Object> MonthlyProviding(@RequestParam Map<String, String> params,
                                                   Authentication authentication) {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findMonthlyProviding(params, member.getWalletId()));
    }

    @GetMapping("/providing/monthly/one")
    @Operation(summary = "월간 제공량 조회", description = "월간 모든 api 제공량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "year", description = "년"),
            @Parameter(name = "month", description = "월")
    })
    public ResponseEntity<Object> oneMonthlyProviding(@RequestParam Map<String, String> params,
                                                   Authentication authentication) {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findOneMonthlyProviding(params, member.getWalletId()));
    }

    @GetMapping("/usage/daily")
    @Operation(summary = "일간 사용량 조회", description = "30일간 해당 api 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "apiId", description = "api sequence", example = "12"),
    })
    public ResponseEntity<Object> DailyUsage(@RequestParam Map<String, String> params,
                                             Authentication authentication)  {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findDailyUsage(params, member.getWalletId()));
    }

    @GetMapping("/providing/daily")
    @Operation(summary = "일간 제공량 조회", description = "30일간 api 전체 제공량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    @Parameters({
            @Parameter(name = "JWT token", description = "토큰"),
            @Parameter(name = "api-id", description = "API 아이디")
    })
    public ResponseEntity<Object> DailyProviding(@RequestParam Map<String, String> param, Authentication authentication)  {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findDailyProviding(param, member.getWalletId()));
    }
}
