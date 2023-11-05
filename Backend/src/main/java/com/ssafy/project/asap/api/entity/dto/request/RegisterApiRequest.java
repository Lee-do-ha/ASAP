package com.ssafy.project.asap.api.entity.dto.request;

import com.ssafy.project.asap.api.entity.domain.ApiCategory;
import lombok.Builder;

@Builder
public class RegisterApiRequest {

    private Long memberId;
    private Long apiId;
    private String purpose;
    private ApiCategory category;

}
