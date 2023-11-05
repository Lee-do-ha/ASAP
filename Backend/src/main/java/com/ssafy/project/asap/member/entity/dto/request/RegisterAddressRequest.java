package com.ssafy.project.asap.member.entity.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class RegisterAddressRequest {

    private String id;
    private String address;
    private String privateKey;

}
