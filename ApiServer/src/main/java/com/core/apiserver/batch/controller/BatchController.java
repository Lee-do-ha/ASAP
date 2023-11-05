package com.core.apiserver.batch.controller;

import com.core.apiserver.batch.dto.RegisterPaymentRequest;
import com.core.apiserver.batch.service.BatchService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/v1/batch")
@RequiredArgsConstructor
@Tag(name = "Batch", description = "배치 테스트 api")
public class BatchController {

    private final BatchService batchService;

    @PostMapping("")
    public ResponseEntity<?> dataMake() {
        batchService.dataMake();
        return ResponseEntity.status(201).body("성공적");
    }

    @PostMapping("/redis-process")
    public ResponseEntity<?> processRedis() {
        batchService.processRedisData();
        return ResponseEntity.status(201).body("성공적");
    }

    @PostMapping("/total-process")
    public ResponseEntity<?> processTotal() {
        batchService.processTotal();
        return ResponseEntity.status(202).body("성공적");
    }

    @PostMapping("/transaction-process")
    public ResponseEntity<?> processBlock() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        batchService.processTransactionBlock();
        return ResponseEntity.status(201).body("성공적");
    }

    @PostMapping("/credit-process")
    public ResponseEntity<?> processCredit() throws IOException, ExecutionException, InterruptedException {
        batchService.processCredit();
        return ResponseEntity.status(201).body("성공적");
    }

    @PostMapping("/payment-process")
    public ResponseEntity<?> processPayment() {
        batchService.serverPostConnect(new RegisterPaymentRequest("0xb2f25bea384704fc26d60f1bf7490444df21babe", 12345L));
        return ResponseEntity.status(201).body("성공적");
    }
}
