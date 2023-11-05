package com.ssafy.project.asap.credit.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCreditRequest {

    private String cardCompany;
    private String cardNumber;
}
