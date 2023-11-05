package com.ssafy.project.asap.purpose.entity.dto.response;

import com.ssafy.project.asap.purpose.entity.domain.PurposeIndustry;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FindPurposesIndustryResponse {

    private PurposeIndustry industry;
    private Long count;

}
