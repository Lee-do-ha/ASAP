package com.core.apiserver.daily.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetDailyRequest {
    private Long userWalletId;
    private Long apiId;
    private LocalDate date;
}
