package com.core.apiserver.daily.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private Long categoryAverage;
    private Long myApi;
}
