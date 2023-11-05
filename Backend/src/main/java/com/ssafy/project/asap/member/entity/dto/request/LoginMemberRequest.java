package com.ssafy.project.asap.member.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginMemberRequest {

    private String id;
    private String password;
}
