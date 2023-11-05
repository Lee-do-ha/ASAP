package com.core.apiserver.daily.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyUsageRequest {

    private Long userWalletId;
    private Integer year;
    private Integer month;
}
