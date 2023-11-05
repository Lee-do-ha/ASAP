package com.ssafy.project.asap.asap.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KoGptRequest {

    private String prompt = null;
    private Integer max_tokens = null;
    private Double temperature = 1D;
    private Double top_p = 1D;
    private Integer n = 1;
    private String test = "ASAP";
}
