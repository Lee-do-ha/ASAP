package com.core.apiserver.transaction.entity.domain;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "Transaction")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Transaction {

    @Transient
    public static final String TRANSACTION_SEQUENCE = "Transaction_sequence";

    @Id
    private Long _id;
    private String transactionHash;

    private String userWalletAddress;
    private String providerWalletAddress;
    private String apiTitle;
    private List<String> usageRecord;
    private String recordHash;
    private LocalDate startDate;
    private LocalDate endDate;


    public void updateRecord(String usageRecords) {
        this.usageRecord.add(usageRecords);
    }

    public void updateApiTitle(String apiTitle) {
        this.apiTitle = apiTitle;
    }

    public void updateRecords(List<String> usageRecord) {
        this.usageRecord.addAll(usageRecord);
    }

    public void updateTransactionHash(String txHash, String hash) {
        this.transactionHash = txHash;
        this.recordHash = hash;
    }

    @Override
    public String toString() {
        return "Transaction_seq: " + this._id + ", 시작일: " + this.startDate + ", 종료일: " + this.endDate +
                ", 사용자 지갑: " + this.userWalletAddress + ", 제공자 지갑: " + this.providerWalletAddress +
                ", API 제목: " + this.apiTitle + ", 기록 : " + this.usageRecord.toString();
    }

}
