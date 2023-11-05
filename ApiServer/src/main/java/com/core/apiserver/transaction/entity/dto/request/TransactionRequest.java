package com.core.apiserver.transaction.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {

    private String userWalletAddress;
    private String providerWalletAddress;
    private String apiTitle;
    private LocalDate startDate;
    private LocalDate endDate;
}
