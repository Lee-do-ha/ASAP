package com.core.apiserver.transaction.entity.dto.response;

import com.core.apiserver.transaction.entity.domain.Transaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponse {
    private Long transactionId;
    private String transactionHash;
    private String userWalletAddress;
    private String providerWalletAddress;
    private String apiTitle;
    private List<String> usageRecord;
    private String recordHash;
    private LocalDate startDate;
    private LocalDate endDate;
    private String hashToString;

    public TransactionResponse(Transaction transaction, String hashToString) {
        this.transactionId = transaction.get_id();
        this.transactionHash = transaction.getTransactionHash();
        this.userWalletAddress = transaction.getUserWalletAddress();
        this.providerWalletAddress = transaction.getProviderWalletAddress();
        this.apiTitle = transaction.getApiTitle();
        this.usageRecord = transaction.getUsageRecord();
        this.recordHash = transaction.getRecordHash();
        this.startDate = transaction.getStartDate();
        this.endDate = transaction.getEndDate();
        this.hashToString = hashToString;
    }
}
