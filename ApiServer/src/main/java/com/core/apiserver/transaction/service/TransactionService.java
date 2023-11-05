package com.core.apiserver.transaction.service;

import com.core.apiserver.global.increase.service.AutoIncreaseService;
import com.core.apiserver.global.util.Sha256Util;
import com.core.apiserver.transaction.entity.domain.Transaction;
import com.core.apiserver.transaction.entity.dto.request.TransactionRequest;
import com.core.apiserver.transaction.entity.dto.response.TransactionResponse;
import com.core.apiserver.transaction.repository.TransactionRepository;
import com.core.apiserver.usage.entity.domain.RedisUsage;
import com.core.apiserver.wallet.service.UsageContractService;
import com.core.apiserver.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UsageContractService usageContractService;
    private final Sha256Util sha256Util;
    private final AutoIncreaseService autoIncreaseService;

    @Transactional
    public void register(TransactionRequest transactionRequest, LocalDateTime time) {

        List<String> list = new ArrayList<>();
        list.add(String.valueOf(time));
        log.info(transactionRequest.getUserWalletAddress());
        log.info(transactionRequest.getProviderWalletAddress());
        log.info(transactionRequest.getApiTitle());
        log.info(transactionRequest.getStartDate().toString());
        log.info(transactionRequest.getEndDate().toString());

        Transaction transaction = Transaction.builder()
                ._id(autoIncreaseService.generateSequence(Transaction.TRANSACTION_SEQUENCE))
                .userWalletAddress(transactionRequest.getUserWalletAddress())
                .providerWalletAddress(transactionRequest.getProviderWalletAddress())
                .apiTitle(transactionRequest.getApiTitle())
                .startDate(transactionRequest.getStartDate())
                .usageRecord(list)
                .endDate(transactionRequest.getEndDate())
                .build();
        Transaction saveTransaction = transactionRepository.save(transaction);
        log.info(transaction.toString());
        log.info(saveTransaction.toString());
    }



    @Transactional
    public void update(Long ids, String usageRecords) {
        Transaction transaction = transactionRepository.findById(ids).orElseThrow();

        transaction.updateRecord(usageRecords);
        transactionRepository.save(transaction);
    }

    @Transactional
    public void updateApiTitle(Long ids, String updateTitle) {
        Transaction transaction = transactionRepository.findById(ids).orElseThrow();
        transaction.updateApiTitle(updateTitle);
        transactionRepository.save(transaction);
    }

    @Transactional
    public void delete(Long ids) {
        transactionRepository.delete(transactionRepository.findById(ids).orElseThrow());
    }

    public TransactionResponse findTransaction(Map<String, String> params) {

        Transaction transaction = transactionRepository.findByUserWalletAddressAndApiTitleAndStartDateAndEndDate(
                params.get("userWalletAddress"), params.get("apiTitle"), LocalDate.parse(params.get("startDate")),
                LocalDate.parse(params.get("endDate")));

        return new TransactionResponse(transaction, transaction.toString());
    }

    @Transactional
    public void toBlock(Transaction transaction) throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {

        String txHash = usageContractService.setUsage(sha256Util.encryptToBytes(transaction.toString()));
        transaction.updateTransactionHash(txHash, sha256Util.encrypt(transaction.toString()));
        transactionRepository.save(transaction);
    }

    @Transactional
    public void saveData() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {

        String[] strings = {"17", "18", "19", "20", "21", "22", "23"};
        long[] longs = {186, 966, 38, 890, 896, 303, 801};
        List<String> list = new ArrayList<>();

        for (int i = 0; i < 7; i++) {
            long startStamp = Timestamp.valueOf(LocalDateTime.parse("2023-09-" + strings[i] + "T00:00:00")).getTime();
            long endStamp = Timestamp.valueOf(LocalDateTime.parse("2023-09-" + strings[i] + "T23:59:59.999999")).getTime();

            long diff = endStamp - startStamp;
            long remain = diff / longs[i];
            for (int j = 0; j < longs[i]; j++) {
                list.add(String.valueOf(LocalDateTime.ofInstant(Instant.ofEpochMilli(startStamp + remain*j), TimeZone.getDefault().toZoneId())));
            }
        }

        toBlock(transactionRepository.save(Transaction.builder()
                        ._id(2L)
                        .userWalletAddress("0xb2f25bea384704fc26d60f1bf7490444df21babe")
                        .providerWalletAddress("0x0D80Eac820347F66B5E9F0dEBacd4DAc7A736A6C")
                        .apiTitle("키워드로 장소 검색하기")
                        .startDate(LocalDate.parse("2023-09-17"))
                        .endDate(LocalDate.parse("2023-09-23"))
                        .usageRecord(list)
                .build()));
    }
}
