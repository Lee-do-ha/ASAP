package com.ssafy.project.asap.member.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMemberRequest {

    private String id;

    @Nullable
    private String name;

    @Nullable
    private String email;
}
