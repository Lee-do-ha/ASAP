package com.core.apiserver.api.entity.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoRequest {

    private String prompt = null;
    private Integer max_tokens = null;
    private Double temperature = 1D;
    private Double top_p = 1D;
    private Integer n = 1;

}
