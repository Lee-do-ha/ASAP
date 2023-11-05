package com.ssafy.project.asap.member.entity.dto.response;

import com.ssafy.project.asap.member.entity.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindMemberResponse {

    private String id;
    private String name;
    private String email;

    public FindMemberResponse(Member member) {

        this.id = member.getId();
        this.name = member.getName();
        this.email = member.getEmail();

    }
}
