package com.ssafy.project.asap.api.entity.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class RegisterBlockApiRequest {

    private Long apiId;
    private Long walletId;
    private Long price;
    private String title;

}
