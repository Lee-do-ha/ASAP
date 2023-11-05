package com.core.apiserver.daily.entity.dto.response;

import com.core.apiserver.api.entity.dto.response.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UsageResponse {

    private ApiResponse apiResponse;
    private Long amount;
    private Long price;
}
