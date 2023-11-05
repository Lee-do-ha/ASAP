package com.core.apiserver.daily.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetCategoryApiIds {
    private long[] ids;
    private Long apiId;
    private Integer year;
    private Integer month;
}
