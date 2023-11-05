package com.ssafy.project.asap.purpose.entity.dto.request;

import com.ssafy.project.asap.purpose.entity.domain.PurposeIndustry;
import lombok.Getter;

@Getter
public class RegisterPurposeRequest {

    private Long apiId;
    private String purpose;
    private PurposeIndustry industry;

}
