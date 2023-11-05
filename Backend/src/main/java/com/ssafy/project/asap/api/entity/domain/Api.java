package com.ssafy.project.asap.api.entity.domain;

import com.ssafy.project.asap.category.entity.domain.Category;
import com.ssafy.project.asap.global.common.BaseTime;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Api extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apiId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String api;

    @Column(columnDefinition = "JSON NOT NULL", nullable = false)
    private String input;

    @Column(columnDefinition = "JSON NOT NULL", nullable = false)
    private String inputExample;

    @Column(columnDefinition = "JSON NOT NULL", nullable = false)
    private String output;

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
    private ApiMethod method;

    @Column
    private String tags;

    @OneToMany(mappedBy = "api", cascade = CascadeType.ALL)
    private final List<Purpose> purposeList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
