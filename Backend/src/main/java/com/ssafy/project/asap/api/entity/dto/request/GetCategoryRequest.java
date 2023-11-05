package com.ssafy.project.asap.api.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetCategoryRequest {
    private Long apiId;
    private Integer year;
    private Integer month;
}
