package com.core.apiserver.api.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateApiRequest {
    private Long apiId;
    private Long walletId;
    private Integer price;
    private String title;
}
