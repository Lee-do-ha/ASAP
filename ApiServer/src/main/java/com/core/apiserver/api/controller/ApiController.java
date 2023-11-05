package com.core.apiserver.api.controller;

import com.core.apiserver.api.entity.dto.request.CreateApiRequest;
import com.core.apiserver.api.service.ApiService;
import com.core.apiserver.usage.service.RedisUsageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/asap")
@Tag(name = "API", description = "API 관련 API")
public class ApiController {

    private final ApiService apiService;
    private final RedisUsageService redisUsageService;
    @Value("${server.test-header)")
    private String testHeader;

    @PostMapping("/register")
    @Operation(summary = "API 생성", description = "관리자를 통해 API 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "API 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<com.core.apiserver.api.entity.dto.response.ApiResponse> register(@RequestBody CreateApiRequest createApiRequest) {
        return ResponseEntity.status(201).body(new com.core.apiserver.api.entity.dto.response.ApiResponse(apiService.register(createApiRequest)));
    }

}