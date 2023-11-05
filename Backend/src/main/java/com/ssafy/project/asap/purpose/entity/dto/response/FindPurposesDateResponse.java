package com.ssafy.project.asap.purpose.entity.dto.response;

import lombok.*;

import java.util.Date;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class FindPurposesDateResponse {

    private String date;
    private Long count;

}
