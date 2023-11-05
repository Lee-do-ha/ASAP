package com.core.apiserver.usage.controller;

import com.core.apiserver.usage.entity.domain.MongoUsage;
import com.core.apiserver.usage.entity.dto.request.CreateMongoUsageRequest;
import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.entity.dto.response.MongoUsageResponse;
import com.core.apiserver.usage.entity.dto.response.RedisUsageResponse;
import com.core.apiserver.usage.service.MongoUsageService;
import com.core.apiserver.usage.service.RedisUsageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/usage")
@Tag(name="Usage", description = "사용량 관련 API")
public class RedisUsageController {

    private final RedisUsageService redisUsageService;
    private final MongoUsageService mongoUsageService;

    @PostMapping ("")
    @Operation(summary = "레디스 Usage 생성", description = "레디스 테이블 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "사용량 집계"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<RedisUsageResponse> usageCreate(@RequestBody CreateRedisUsageRequest createRedisUsageRequest) {
        RedisUsageResponse redisUsageResponse = new RedisUsageResponse(redisUsageService.save(createRedisUsageRequest));

        return ResponseEntity.status(201).body(redisUsageResponse);
    }

    @DeleteMapping ("")
    @Operation(summary = "레디스 Usage 생성", description = "레디스 테이블 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "사용량 집계"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> usageDelete() {
        redisUsageService.delete();
        return ResponseEntity.status(204).body("성공적");
    }

    @PostMapping ("/mongo")
    @Operation(summary = "레디스 Usage 생성", description = "레디스 테이블 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "사용량 집계"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> mongousageCreate(@RequestBody CreateMongoUsageRequest createMongoUsageRequest) {
        mongoUsageService.save(createMongoUsageRequest);

        return ResponseEntity.status(201).body("성공적");
    }

    @GetMapping ("/mongo")
    @Operation(summary = "레디스 Usage 생성", description = "레디스 테이블 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "사용량 집계"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<MongoUsageResponse>> getMongoUsage() {
        List<MongoUsage> mongoUsages = mongoUsageService.findAll();

        List<MongoUsageResponse> mongoUsageResponses = new ArrayList<>();
        for (MongoUsage mongoUsage : mongoUsages) {
            mongoUsageResponses.add(new MongoUsageResponse(mongoUsage));
        }

        return ResponseEntity.status(200).body(mongoUsageResponses);
    }


}
