package com.ssafy.project.asap.api.entity.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ApproveApisResponse {

    private String title;
    private Long apiId;

}
