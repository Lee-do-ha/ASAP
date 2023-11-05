package com.ssafy.project.asap.apply.entity.domain;

import com.ssafy.project.asap.global.common.BaseTime;
import com.ssafy.project.asap.member.entity.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Apply extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, unique = true)
    private String api;

    @Column(columnDefinition = "JSON NOT NULL", nullable = false)
    private String input;

    @Column(columnDefinition = "JSON NOT NULL", nullable = false)
    private String output;

    @Column(columnDefinition = "JSON NOT NULL", nullable = false)
    private String inputExample;

    @Column(columnDefinition = "JSON NOT NULL", nullable = false)
    private String outputExample;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDate provideDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Setter
    private ApplyProgress progress;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplyMethod method;

    @Column
    private String tags;

}