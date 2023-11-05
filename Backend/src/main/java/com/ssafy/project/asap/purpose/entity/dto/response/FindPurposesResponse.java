package com.ssafy.project.asap.purpose.entity.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FindPurposesResponse {

    private String title;
    private Long apiId;

}
