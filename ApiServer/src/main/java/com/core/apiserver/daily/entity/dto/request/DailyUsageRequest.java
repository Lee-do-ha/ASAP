package com.core.apiserver.daily.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DailyUsageRequest {

    private Long userWalletId;
    private Long apiId;
    private Long amount = 0L;

    @Nullable
    private LocalDate date = LocalDate.now();
}
