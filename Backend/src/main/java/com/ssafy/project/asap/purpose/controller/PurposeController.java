package com.ssafy.project.asap.purpose.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.project.asap.api.entity.dto.request.RegisterApiRequest;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.purpose.entity.dto.request.RegisterPurposeRequest;
import com.ssafy.project.asap.purpose.service.PurposeService;
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

@RestController
@RequestMapping("/api/v1/purpose")
@RequiredArgsConstructor
@Tag(name = "Purpose", description = "API 사용 관련")
@Slf4j
public class PurposeController {

    private final PurposeService purposeService;

    @PostMapping("/use")
    @Operation(summary = "API 사용 신청 (사용자)", description = "사용자가 해당 API 사용 신청")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 사용 신청 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody RegisterPurposeRequest request, Authentication authentication){
        ;
        try {
            purposeService.register(request, authentication.getName());
            purposeService.createTotal(request.getApiId(), authentication.getName());
            return ResponseEntity.ok("API 사용 신청이 완료되었습니다.");
        } catch (CustomException e) {

            return ResponseEntity.ok(e.getErrorCode());

        }

    }

    @GetMapping("/check-apply/{apiId}")
    @Operation(summary = "API 사용 상태 확인 (사용자)", description = "사용자가 해당 API 사용 했는지 여부")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 사용 신청 완료", content = @Content(schema =  @Schema(
                    implementation = RegisterApiRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> checkApply(@PathVariable Long apiId, Authentication authentication){

        log.info("apiId = " + apiId);

        try {

            purposeService.checkApply(apiId, authentication.getName());

            return ResponseEntity.ok(true);

        } catch (CustomException e){

            return ResponseEntity.ok().body(e.getErrorCode());

        }

    }

    @GetMapping("/useList")
    @Operation(summary = "사용중인 API 리스트", description = "현재 로그인한 회원이 사용신청한 API title 리스트 제공")
    public ResponseEntity<?> findAllByMember(Authentication authentication){

        return ResponseEntity.ok(purposeService.findAllByMember(authentication.getName()));

    }

    @GetMapping("/new/{apiId}")
    @Operation(summary = "신규 사용자 리스트", description = "해당 apiId의 신규 사용자 리스트 조회")
    public ResponseEntity<?> findByApiIdDate(@PathVariable("apiId") Long apiId){

        log.info("Controller");

        return ResponseEntity.ok(purposeService.findAllByApiAndCreateDate(apiId));

    }

    @GetMapping("/rate/{apiId}")
    @Operation(summary = "사용자 산업군 비율", description = "해당 apiId의 사용자들의 각 산업군의 인원")
    public ResponseEntity<?> rate(@PathVariable("apiId") Long apiId){

        return ResponseEntity.ok(purposeService.findPurposesIndustryResponses(apiId));

    }

}
