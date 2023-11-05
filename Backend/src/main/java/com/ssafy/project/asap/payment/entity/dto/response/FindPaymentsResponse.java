package com.ssafy.project.asap.payment.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class FindPaymentsResponse {

    private Long price;
    private String cardNumber;
    private String cardCompany;
    private LocalDate payDate;

}
