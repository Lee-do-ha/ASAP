package com.core.apiserver.daily.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DailyProvidingResponse {
    private Long amount;
    private Long price;

    public void update(Long amount, Long price) {
        this.amount += amount;
        this.price += price * amount;
    }
}