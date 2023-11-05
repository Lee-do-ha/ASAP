package com.ssafy.project.asap.apply.entity.dto.response;

import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class FindApplysResponse {

    private Long applyId;
    private String title;
    private ApplyProgress progress;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;

    public FindApplysResponse(Apply apply){
        this.applyId = apply.getApplyId();
        this.title = apply.getTitle();
        this.progress = apply.getProgress();
        this.createDate = apply.getCreateDate();
        this.modifyDate = apply.getModifyDate();
    }

}
