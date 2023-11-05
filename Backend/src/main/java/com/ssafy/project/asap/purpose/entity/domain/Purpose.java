package com.ssafy.project.asap.purpose.entity.domain;

import com.ssafy.project.asap.global.common.BaseTime;
import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.member.entity.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Purpose extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purposeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    @Column(nullable = false)
    private String purpose;

    @Enumerated(EnumType.STRING)
    private PurposeIndustry industry;

}
