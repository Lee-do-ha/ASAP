package com.core.apiserver.transaction.controller;

import com.core.apiserver.daily.repository.DailyRepository;
import com.core.apiserver.transaction.entity.dto.request.RecordsRequest;
import com.core.apiserver.transaction.entity.dto.request.TransactionRequest;
import com.core.apiserver.transaction.repository.TransactionRepository;
import com.core.apiserver.transaction.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final DailyRepository dailyRepository;
    private final TransactionRepository transactionRepository;

//    @GetMapping("")
//    public ResponseEntity<String > test() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
//        return ResponseEntity.ok(transactionService.test());
//    }

//    @PostMapping ("")
//    public ResponseEntity<String> register(@RequestBody TransactionRequest transactionRequest)  {
//        transactionService.register(transactionRequest);
//        return ResponseEntity.status(201).body("저장 완료");
//    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(transactionRepository.findAll());
    }

    @GetMapping("/{ids}")
    public ResponseEntity<?> getIds(@PathVariable("ids") Long ids) {
        return ResponseEntity.ok(transactionRepository.findById(ids).orElseThrow());
    }

    @GetMapping("")
    @Operation(summary = "트랜잭션 조회", description = "시작일과 종료일을 통해 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "API 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> get(@RequestParam Map<String, String> params) throws UnsupportedEncodingException {
        return ResponseEntity.ok(transactionService.findTransaction(params));
    }

    @PutMapping ("/{ids}")
    public ResponseEntity<?> updateRecord(@PathVariable("ids") Long ids, @RequestBody RecordsRequest request)  {
        transactionService.update(ids, request.getRecord());
        return ResponseEntity.status(202).body("저장 완료");
    }

    @PutMapping ("/api-title/{ids}")
    public ResponseEntity<?> updateApiTitle(@PathVariable("ids") Long ids, @RequestBody RecordsRequest request)  {
        transactionService.updateApiTitle(ids, request.getRecord());
        return ResponseEntity.status(202).body("저장 완료");
    }

    @DeleteMapping ("/{ids}")
    public ResponseEntity<?> deleteAll(@PathVariable("ids") Long ids)  {
        transactionService.delete(ids);
        return ResponseEntity.status(204).body("삭제 완료");
    }

    @PostMapping ("/block")
    public ResponseEntity<String> toBlock() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        transactionService.toBlock(transactionRepository.findById(6L).orElseThrow());
        return ResponseEntity.status(201).body(transactionRepository.findById(6L).get().toString());
    }

    @PostMapping("/test/{ids}")
    public ResponseEntity<?> makeTransaction(@PathVariable("ids") Long ids) throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        transactionService.saveData();
        return ResponseEntity.status(201).body(transactionRepository.findById(ids));
    }
}
