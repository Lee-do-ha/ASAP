package com.core.apiserver.wallet.service;

import com.core.apiserver.global.util.Sha256Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class UsageContractService {

    private final EthereumService ethereumService;
    private final Sha256Util sha256Util;

    public String getUsage() throws IOException, ExecutionException, InterruptedException {
        // 1. 호출하고자 하는 function 세팅 [functionName, parameters]
        Function function = new Function("getUsage", Collections.emptyList(), Arrays.asList(new TypeReference<Bytes32>() {}));
        byte[] bytes = (byte[]) ethereumService.ethCall(function);
        return new String(bytes);
    }

    public String setUsage(byte[] usageHash) throws IOException, ExecutionException, InterruptedException {
        // 1. 호출하고자 하는 function 세팅 [functionName, parameters]
        Function function = new Function("setUsage",
                Arrays.asList(new Bytes32(usageHash)),
                Collections.emptyList());

        System.out.println(sha256Util.bytesToHex(usageHash));

        System.out.println("usageHash 확인 : " + Arrays.toString(new Bytes32(usageHash).getValue()));

        // 2. sendTransaction
        String txHash = ethereumService.ethSendTransaction(function);
        System.out.println(txHash);

        // 3. getReceipt
//        TransactionReceipt receipt = ethereumService.getReceipt(txHash);
//        System.out.println("receipt = " + receipt);

        return txHash;
    }

}
