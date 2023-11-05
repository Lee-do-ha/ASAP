package com.ssafy.project.asap.apply.entity.dto.request;

import lombok.Getter;

@Getter
public class RejectApplyRequest {

    private Long applyId;
    private String title;
    private String content;

}
