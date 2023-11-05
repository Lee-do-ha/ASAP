package com.ssafy.project.asap.api.repository;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.entity.domain.ApiMethod;
import com.ssafy.project.asap.category.entity.domain.Category;
import com.ssafy.project.asap.member.entity.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApiRepository extends JpaRepository<Api, Long> {

    List<Api> findAll();

    Api findByApiId(Long apiId);

    List<Api> findAllByCategory(Category category);

    List<Api> findAllByMember(Member member);

    Optional<Api> findByApiAndMethod(String api, ApiMethod apiMethod);
}
