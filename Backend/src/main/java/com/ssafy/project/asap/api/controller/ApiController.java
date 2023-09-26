package com.ssafy.project.asap.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.project.asap.api.entity.dto.request.DailyRequest;
import com.ssafy.project.asap.api.entity.dto.request.GetCategoryRequest;
import com.ssafy.project.asap.api.entity.dto.request.MonthlyRequest;
import com.ssafy.project.asap.api.entity.dto.response.FindApiResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import com.ssafy.project.asap.api.service.ApiService;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/apis")
@RequiredArgsConstructor
@Tag(name="Api", description = "API관련 API")
public class ApiController {

    private final ApiService apiService;
    private final MemberService memberService;

    @GetMapping("/all")
    @Operation(summary = "API 전체 리스트", description = "사용 가능한 전체 API 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 리스트 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<FindApisResponse>> findAll(){

        return ResponseEntity.ok(apiService.findAll());

    }

    @GetMapping("/detail/{apiId}")
    @Operation(summary = "API 조회", description = "해당 API 상세 정보 조회 ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByApiId(@PathVariable("apiId") Long apiId){

        try {
            FindApiResponse findApiResponse = apiService.findApiResponse(apiId);

            return ResponseEntity.ok(findApiResponse);

        } catch (CustomException e){

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

    @GetMapping("/guide/{apiId}")
    @Operation(summary = "API 조회", description = "해당 API 상세 정보 조회 ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<GuideApiResponse> guideByApiId(@PathVariable("apiId") Long apiId){

        return ResponseEntity.ok(apiService.findGuideApiResponse(apiId));

    }

    @GetMapping("/average/category")
    @Operation(summary = "카테고리 평균 조회", description = "동일 카테고리의 평균")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Object> averageCategory(@RequestBody GetCategoryRequest categoryRequest) {
        return ResponseEntity.ok(apiService.findCategoryIdsById(categoryRequest));
    }

    @GetMapping("/usage/monthly")
    @Operation(summary = "일간 사용량 조회", description = "일간 모든 api 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Object> MonthlyUsage(@RequestBody MonthlyRequest monthlyRequest,
                                                  Authentication authentication)  {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findMonthlyUsage(monthlyRequest, member.getWalletId()));
    }

    @GetMapping("/providing/monthly")
    @Operation(summary = "일간 사용량 조회", description = "일간 모든 api 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Object> MonthlyProviding(@RequestBody MonthlyRequest monthlyRequest,
                                               Authentication authentication) {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findMonthlyProviding(monthlyRequest, member.getWalletId()));
    }

    @GetMapping("/usage/daily")
    @Operation(summary = "일간 사용량 조회", description = "일간 모든 api 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Object> DailyUsage(@RequestBody DailyRequest dailyRequest,
                                               Authentication authentication)  {

        Member member = memberService.findById(authentication.getName());
        return ResponseEntity.ok(apiService.findDailyUsage(dailyRequest, member.getWalletId()));
    }
}
