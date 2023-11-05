package com.ssafy.project.asap.asap.domain.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LocalSearch {

    private String analyze_type;
    private String query;
    private int page;
    private int size;

}
