package com.core.apiserver.wallet.entity.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SendEtherRequest {

    private String from;
    private String pwd;
    private String to;
    private BigInteger price;
}
