package com.core.apiserver.daily.entity.dto.response;

import com.core.apiserver.api.entity.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProvidingResponse {
    private Long apiId;
    private String apiTitle;
    private Long amount;
    private Long price;

    public void update(Long amount, Long price) {
        this.amount += amount;
        this.price += price * amount;
    }

    @Override
    public boolean equals(Object object) {
        Api api  = (Api) object;
        return Objects.equals(this.apiId, api.getApiId());
    }
}
