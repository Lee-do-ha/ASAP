package com.core.apiserver.api.controller;

import com.core.apiserver.api.entity.dto.request.KakaoRequest;
import com.core.apiserver.api.service.ApiService;
import com.core.apiserver.api.service.KakaoService;
import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.service.RedisUsageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/asap")
@Slf4j
@Tag(name = "OPEN API", description = "실제 서비스 될 API")
public class KoGptController {

    private final ApiService apiService;
    private final RedisUsageService redisUsageService;
    private final KakaoService kakaoService;

    @Value("${server.allow-header}")
    private String allowHeader;

    @PostMapping ("/kogpt/generation/{wallet-id}/{api-id}")
    @Operation(summary = "로컬 지도", description = "query를 통해 로컬지도정보 입력받음")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "검색 결과"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> koGpt(HttpServletRequest httpServletRequest,
                                   @RequestBody KakaoRequest kakaoRequest,
                                   @PathVariable(value = "wallet-id") Long walletId,
                                   @PathVariable(value = "api-id") Long apiId) {

        log.info(kakaoRequest.getPrompt());
        log.info(String.valueOf(kakaoRequest.getMax_tokens()));
        log.info(String.valueOf(kakaoRequest.getTemperature()));
        log.info(String.valueOf(kakaoRequest.getTop_p()));
        log.info(String.valueOf(kakaoRequest.getN()));

        if (httpServletRequest.getHeader("Authorization").equals(allowHeader)) {
            CreateRedisUsageRequest createRedisUsageRequest = new CreateRedisUsageRequest(walletId,
                    apiService.findProviderIdById(apiId), apiId);

            redisUsageService.save(createRedisUsageRequest);
        }

        return ResponseEntity.status(201).body(kakaoService.koGpt(kakaoRequest));
    }
}
