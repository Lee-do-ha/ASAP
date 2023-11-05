package com.ssafy.project.asap.credit.entity.domain;

import com.ssafy.project.asap.global.common.BaseTime;
import com.ssafy.project.asap.member.entity.domain.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Credit extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long creditId;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Setter
    private String cardCompany;

    @Setter
    private String cardNumber;

}
