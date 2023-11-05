package com.core.apiserver.daily.controller;

import com.core.apiserver.daily.entity.dto.request.*;
import com.core.apiserver.daily.entity.dto.response.ProvidingResponse;
import com.core.apiserver.daily.entity.dto.response.UsageResponse;
import com.core.apiserver.daily.service.DailyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.LongStream;
import java.util.stream.Stream;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/usage")
@Tag(name = "daily", description = "일간, 월간 조회")
public class DailyController {

    private final DailyService dailyService;


    @PostMapping("/daily/register")
    @Operation(summary = "일간 생성", description = "일간 사용량 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "일간 사용량 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody DailyUsageRequest dailyUsageRequest) {
        dailyService.register(dailyUsageRequest);
        return ResponseEntity.status(200).body("");
    }

    @PutMapping ("/daily/update")
    @Operation(summary = "월간 사용량 추가", description = "월간 사용량 추가")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "API 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> update(@RequestBody DailyUsageRequest dailyUsageRequest) {
        dailyService.update(dailyUsageRequest);
        return ResponseEntity.status(202).body("");
    }

    @GetMapping("/monthly/use")
    @Operation(summary = "월간 조회", description = "월간 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "3개월간 제공량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Map<YearMonth, List<UsageResponse>>> monthlyUsage(@RequestParam Map<String, String> params) {
        MonthlyUsageRequest monthlyUsageRequest = new MonthlyUsageRequest(Long.parseLong(params.get("userWalletId")),
                Integer.parseInt(params.get("year")), Integer.parseInt(params.get("month")));

        System.out.println(monthlyUsageRequest.getUserWalletId() + ", " + monthlyUsageRequest.getYear() + ", "  + monthlyUsageRequest.getMonth());

        return ResponseEntity.status(200).body(dailyService.monthlyUsage(monthlyUsageRequest));
    }

    @GetMapping("/monthly/use/one")
    @Operation(summary = "월간 조회", description = "월간 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "1개월간 제공량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Map<YearMonth, List<UsageResponse>>> oneMonthlyUsage(@RequestParam Map<String, String> params) {
        MonthlyUsageRequest monthlyUsageRequest = new MonthlyUsageRequest(Long.parseLong(params.get("userWalletId")),
                Integer.parseInt(params.get("year")), Integer.parseInt(params.get("month")));

        System.out.println(monthlyUsageRequest.getUserWalletId() + ", " + monthlyUsageRequest.getYear() + ", "  + monthlyUsageRequest.getMonth());

        return ResponseEntity.status(200).body(dailyService.oneMonthlyUsage(monthlyUsageRequest));
    }

    @GetMapping("/monthly/provide")
    @Operation(summary = "월간 조회", description = "월간 제공량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "3개월간 제공량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> monthlyProviding(@RequestParam Map<String, String> params) {

        MonthlyUsageRequest monthlyUsageRequest = new MonthlyUsageRequest(Long.parseLong(params.get("userWalletId")),
                Integer.parseInt(params.get("year")), Integer.parseInt(params.get("month")));

        return ResponseEntity.status(200).body(dailyService.monthlyProviding(monthlyUsageRequest));
    }

    @GetMapping("/monthly/provide/one")
    @Operation(summary = "월간 조회", description = "월간 제공량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "3개월간 제공량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> oneMonthlyProviding(@RequestParam Map<String, String> params) {

        MonthlyUsageRequest monthlyUsageRequest = new MonthlyUsageRequest(Long.parseLong(params.get("userWalletId")),
                Integer.parseInt(params.get("year")), Integer.parseInt(params.get("month")));

        return ResponseEntity.status(200).body(dailyService.oneMonthlyProviding(monthlyUsageRequest));
    }

    @GetMapping ("/daily/use")
    @Operation(summary = "일간 사용량 조회", description = "일간 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일간 사용량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> daily(@RequestParam Map<String, String> params) {
        GetDailyRequest getDailyRequest = new GetDailyRequest(Long.parseLong(params.get("userWalletId")),
                Long.parseLong(params.get("apiId")), LocalDate.now());
        return ResponseEntity.status(200).body(dailyService.dailyUsage(getDailyRequest));
    }

    @GetMapping ("/category/average")
    @Operation(summary = "카테고리 평균", description = "3개월간 카테고리 평균 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일간 사용량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> category(@RequestParam Map<String, String> params) {

        long[] ids = Stream.of(params.get("ids").split(",")).mapToLong(Long::parseLong).toArray();

        System.out.println("ids : " + Arrays.toString(ids));

        GetCategoryApiIds getCategoryApiIds = new GetCategoryApiIds(ids, Long.parseLong(params.get("apiId")), Integer.parseInt(params.get("year")),
                Integer.parseInt(params.get("month")));
        return ResponseEntity.status(200).body(dailyService.categoryAverage(getCategoryApiIds));
    }

    @GetMapping ("/daily/provide")
    @Operation(summary = "일간 제공량 조회", description = "일간 api마다 제공량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일간 사용량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> dailyProviding(@RequestParam Map<String, String> params) {
        return ResponseEntity.status(200).body(dailyService.dailyProviding(params));
    }
}
