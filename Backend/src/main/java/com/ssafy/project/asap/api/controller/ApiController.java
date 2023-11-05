package com.ssafy.project.asap.api.controller;


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
import java.util.Map;

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

    @GetMapping("/offerList")
    @Operation(summary = "제공중인 API 리스트", description = "현재 나의 제공중인 API title 리스트 제공")
    public ResponseEntity<?> findAllByMember(Authentication authentication){

        return ResponseEntity.ok(apiService.findAllByMember(authentication.getName()));

    }

}
