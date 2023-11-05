package com.ssafy.project.asap.category.repository;


import com.ssafy.project.asap.category.entity.domain.Category;
import com.ssafy.project.asap.category.entity.dto.response.CategoryListResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByCategory(String category);

    List<Category> findAll();


}
