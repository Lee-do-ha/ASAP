package com.core.apiserver.wallet.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class UsageContractService {

    private final EthereumService ethereumService;

    public String getUsage() throws IOException, ExecutionException, InterruptedException {
        // 1. 호출하고자 하는 function 세팅 [functionName, parameters]
        Function function = new Function("getUsage", Collections.emptyList(), Arrays.asList(new TypeReference<Bytes32>() {}));
        byte[] bytes = (byte[]) ethereumService.ethCall(function);
        return new String(bytes);
    }

    public void setUsage(byte[] usageHash) throws IOException, ExecutionException, InterruptedException {
        // 1. 호출하고자 하는 function 세팅 [functionName, parameters]
        Function function = new Function("setUsage",
                Arrays.asList(new Bytes32(usageHash)),
                Collections.emptyList());

        // 2. sendTransaction
        String txHash = ethereumService.ethSendTransaction(function);

        // 3. getReceipt
        TransactionReceipt receipt = ethereumService.getReceipt(txHash);
        System.out.println("receipt = " + receipt);
    }

}
