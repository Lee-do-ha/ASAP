package com.core.apiserver.total.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TotalRequest {
    private Long userWalletId;
    private Long apiId;

}
