package com.ssafy.project.asap.apply.entity.dto.request;

import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import lombok.Getter;

@Getter
public class UpdateApplyRequest {

    private Long applyId;
    private ApplyProgress progress;

}
