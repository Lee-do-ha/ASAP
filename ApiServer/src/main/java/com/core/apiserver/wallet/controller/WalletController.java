package com.core.apiserver.wallet.controller;

import com.core.apiserver.global.util.Sha256Util;
import com.core.apiserver.wallet.entity.dto.CreateWalletRequest;

import com.core.apiserver.wallet.entity.dto.SendEtherRequest;
import com.core.apiserver.wallet.service.EthereumService;
import com.core.apiserver.wallet.service.UsageContractService;
import com.core.apiserver.wallet.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/wallet")
@Tag(name="Wallet", description = "지갑 관련 API")
public class WalletController {

    private final WalletService walletService;
    private final UsageContractService usageContractService;
    private final Sha256Util sha256Util;
    private final EthereumService ethereumService;

    @GetMapping("/test")
    @Operation(summary = "test", description = "스마트 컨트랙트 test")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스마트 컨트랙트 연동"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> test() throws IOException, ExecutionException, InterruptedException {
        return ResponseEntity.ok(usageContractService.getUsage());
    }

    @GetMapping("/test2")
    @Operation(summary = "test2", description = "스마트 컨트랙트 test")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스마트 컨트랙트 연동"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> test2() throws IOException, ExecutionException, InterruptedException, NoSuchAlgorithmException {
        String txHash = usageContractService.setUsage(sha256Util.encryptToBytes("이도하"));
        return ResponseEntity.ok(txHash);
    }

    @GetMapping("/test3")
    @Operation(summary = "test2", description = "스마트 컨트랙트 test")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스마트 컨트랙트 연동"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> test3(@RequestParam byte[] bytes) throws IOException, ExecutionException, InterruptedException, NoSuchAlgorithmException {
        return ResponseEntity.ok(sha256Util.bytesToHex(bytes));
    }

    @PostMapping("/register")
    @Operation(summary = "지갑 등록", description = "지갑 등록후 PK 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "지갑 저장 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Long> register(@RequestBody CreateWalletRequest createWalletRequest) {
        return ResponseEntity.ok(walletService.register(createWalletRequest));
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendEther(@RequestBody SendEtherRequest sendEtherRequest) throws IOException, ExecutionException, InterruptedException {
        ethereumService.sendEther(sendEtherRequest.getFrom(), sendEtherRequest.getPwd(),
                sendEtherRequest.getTo(), sendEtherRequest.getPrice());
        return ResponseEntity.status(201).body("");
    }
}
