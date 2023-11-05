package com.ssafy.project.asap.apply.entity.dto.response;

import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.apply.entity.domain.ApplyMethod;
import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class FindApplyResponse {

    private String api;
    private String input;
    private String inputExample;
    private String output;
    private String outputExample;
    private Long price;
    private ApplyProgress progress;
    private String title;
    private String content;
    private LocalDate provideDate;
    private LocalDateTime createDate;
    private String id;
    private String name;
    private String tags;
    private ApplyMethod method;

    public FindApplyResponse(Apply apply) {
        this.api = apply.getApi();
        this.input = apply.getInput();
        this.inputExample = apply.getInputExample();
        this.output = apply.getOutput();
        this.outputExample = apply.getOutputExample();
        this.price = apply.getPrice();
        this.progress = apply.getProgress();
        this.title = apply.getTitle();
        this.content = apply.getContent();
        this.provideDate = apply.getProvideDate();
        this.createDate = apply.getCreateDate();
        this.id = apply.getMember().getId();
        this.name = apply.getMember().getName();
        this.tags = apply.getTags();
        this.method = apply.getMethod();
    }
}
