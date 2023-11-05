package com.ssafy.project.asap.api.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindApiResponse {

    private Long apiId;
    private String memberName;
    private String input;
    private String inputExample;
    private String output;
    private String outputExample;
    private String title;
    private String content;
    private String tags;
    private String category;
    private Long price;

}
