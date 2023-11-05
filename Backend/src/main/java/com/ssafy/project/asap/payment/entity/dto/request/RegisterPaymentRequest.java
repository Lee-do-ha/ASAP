package com.ssafy.project.asap.payment.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPaymentRequest {

    private String address;
    private Long price;

}