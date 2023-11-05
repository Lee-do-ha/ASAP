package com.ssafy.project.asap.category.entity.domain;

import com.ssafy.project.asap.api.entity.domain.Api;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    @Column(unique = true)
    private String category;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private final List<Api> apiList = new ArrayList<>();

}
