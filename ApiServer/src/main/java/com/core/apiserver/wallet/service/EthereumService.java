package com.core.apiserver.wallet.service;

import com.core.apiserver.global.util.Sha256Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.PersonalUnlockAccount;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.*;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Slf4j
@Component
public class EthereumService {
    @Autowired
    private Sha256Util sha256Util;
    private String from = "0xb2f25bea384704fc26d60f1bf7490444df21babe";

    private String contract = "0xcae84b9002db5864266ee39ecd895526c2246dac";

    private String pwd = "pass";

    // hardcording because of testing

    private Admin web3j = null;

    public EthereumService() {
        web3j = Admin.build(new HttpService("https://j9c202.p.ssafy.io/lego/"));
    }

    public Object ethCall(Function function) throws IOException {
        // 1. Account Lock 해제
        PersonalUnlockAccount personalUnlockAccount = web3j.personalUnlockAccount(from, pwd).send();

        if (personalUnlockAccount.accountUnlocked()) {
            // 2. transaction 제작
            Transaction transaction = Transaction.createEthCallTransaction(from, contract, FunctionEncoder.encode(function));

            // 3. ethereum 호출후 결과 가져오기
            EthCall ethCall = web3j.ethCall(transaction, DefaultBlockParameterName.LATEST).send();
            log.info("ethCall: " + ethCall);
            // 4. 결과값 decode
            List<Type> decode = FunctionReturnDecoder.decode(ethCall.getResult(), function.getOutputParameters());
            if (decode.isEmpty()) {
                log.info("decode.is none");
                throw new RuntimeException();
            }
            byte[] s = (byte[]) decode.get(0).getValue();

            String s1 = sha256Util.bytesToHex(s);

            System.out.println("ethCall.getResult() = " + ethCall.getResult());
            System.out.println("getValue = " + s1);
            System.out.println("getType = " + decode.get(0).getTypeAsString());

            return decode.get(0).getValue();
        } else {
            throw new PersonalLockException("check ethereum personal Lock");
        }
    }

    public String ethSendTransaction(Function function) throws IOException, InterruptedException, ExecutionException {

        // 1. Account Lock 해제
        PersonalUnlockAccount personalUnlockAccount = web3j.personalUnlockAccount(from, pwd).send();

        if (personalUnlockAccount.accountUnlocked()) {

            // 2. account에 대한 nonce값 가져오기
            EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(
                    from, DefaultBlockParameterName.LATEST).sendAsync().get();

            BigInteger nonce = ethGetTransactionCount.getTransactionCount();


            // 3. Transaction 값 제작
            Transaction transaction = Transaction.createFunctionCallTransaction(from, nonce, Transaction.DEFAULT_GAS, null,
                    contract, FunctionEncoder.encode(function));

            // 4. ethereum Call &
            EthSendTransaction ethSendTransaction = web3j.ethSendTransaction(transaction).send();


            // transaction에 대한 transaction Hash값 얻기.
            String transactionHash = ethSendTransaction.getTransactionHash();

            // ledger 에 쓰여지기까지 기다리기
            // Thread.sleep(5000);

            return transactionHash;
        } else {
            throw new PersonalLockException("check ethereum personal Lock");
        }
    }

    public TransactionReceipt getReceipt(String transactionHash) throws IOException {
        EthGetTransactionReceipt transactionReceipt = web3j.ethGetTransactionReceipt(transactionHash).send();

        if(transactionReceipt.getTransactionReceipt().isPresent())
        {
            System.out.println("transactionReceipt.getResult().getContractAddress() = " +
                    transactionReceipt.getResult());

            EthTransaction transaction = web3j.ethGetTransactionByHash(transactionHash).send();
            System.out.println(transaction.getTransaction().get().getInput());
            byte[] s = transaction.getTransaction().get().getInput().getBytes();
            String s1 = sha256Util.bytesToHex(s);
            System.out.println(s1);
        }
        else
        {
            System.out.println("transaction complete not yet");
        }
        EthTransaction transaction = web3j.ethGetTransactionByHash(transactionHash).send();
        System.out.println(transaction.getTransaction().get().getInput());
        String s1 = transaction.getTransaction().get().getInput();
        System.out.println("transaction안에 들어있는 값" + s1.substring(10));


        return transactionReceipt.getResult();
    }


    public void sendEther(String from, String pwd, String to, BigInteger price) throws IOException, ExecutionException, InterruptedException {
        PersonalUnlockAccount personalUnlockAccount = web3j.personalUnlockAccount(from, pwd).send();

        if (personalUnlockAccount.accountUnlocked()) {

            // 2. account에 대한 nonce값 가져오기
            EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(
                    from, DefaultBlockParameterName.LATEST).sendAsync().get();

            BigInteger nonce = ethGetTransactionCount.getTransactionCount();
            BigInteger legoWei = new BigInteger("1000000000000");

            Transaction transaction =  Transaction.createEtherTransaction(from, nonce, Transaction.DEFAULT_GAS, null, to,
                    price.multiply(legoWei));


            // 4. ethereum Call &
            EthSendTransaction ethSendTransaction = web3j.ethSendTransaction(transaction).send();


            // transaction에 대한 transaction Hash값 얻기.
            String transactionHash = ethSendTransaction.getTransactionHash();
            log.info(transactionHash);

        } else {
            throw new PersonalLockException("check ethereum personal Lock");
        }
    }


    private static class PersonalLockException extends RuntimeException
    {
        public PersonalLockException(String msg)
        {
            super(msg);
        }
    }
}
