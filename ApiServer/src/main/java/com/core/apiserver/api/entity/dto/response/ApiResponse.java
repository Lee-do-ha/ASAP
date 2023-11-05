package com.core.apiserver.api.entity.dto.response;

import com.core.apiserver.api.entity.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {


    private Long apiId;
    private Long walletId;
    private Integer price;
    private String title;

    public ApiResponse(Api api) {
        this.apiId = api.getApiId();
        this.walletId = api.getWallet().getWalletId();
        this.price = api.getPrice();
        this.title = api.getTitle();
    }
}
