package com.ssafy.project.asap.credit.entity.dto.response;

import com.ssafy.project.asap.credit.entity.domain.Credit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindCreditResponse {
    private String cardCompany;
    private String cardNumber;

    public FindCreditResponse(Credit credit) {

        this.cardCompany = credit.getCardCompany();
        this.cardNumber = credit.getCardNumber();

    }
}
