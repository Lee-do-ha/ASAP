package com.ssafy.project.asap.apply.entity.dto.request;

import com.ssafy.project.asap.apply.entity.domain.ApplyMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterApplyRequest {

    private String title;
    private String content;
    private String input;
    private String inputExample;
    private String output;
    private String outputExample;
    private ApplyMethod method;
    private Long price;
    private String api;
    private String tags;
    private LocalDate provideDate;

}
