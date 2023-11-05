package com.core.apiserver.daily.entity.dto.response;

import com.core.apiserver.daily.entity.domain.Daily;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DailyUsageResponse {

    private LocalDate date;
    private Long amount;
    private Long price;

    public void update(Daily daily) {
        amount += daily.getUseAmount();
        price += daily.getUseAmount() * daily.getApi().getPrice();
    }
}
