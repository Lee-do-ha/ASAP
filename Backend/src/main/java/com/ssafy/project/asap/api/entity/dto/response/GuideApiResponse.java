package com.ssafy.project.asap.api.entity.dto.response;

import com.ssafy.project.asap.api.entity.domain.ApiMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GuideApiResponse {

    private String title;
    private String api;
    private ApiMethod method;
    private String input;
    private String inputExample;
    private String output;
    private String outputExample;

}
