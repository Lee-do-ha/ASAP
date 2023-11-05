package com.ssafy.project.asap.category.controller;

import com.ssafy.project.asap.category.entity.dto.response.CategoryListResponse;
import com.ssafy.project.asap.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/list")
    public ResponseEntity<List<String>> findAll(){

        return ResponseEntity.ok(categoryService.findAll());

    }

    @GetMapping("/categoryList")
    public ResponseEntity<List<CategoryListResponse>> categoryList(){

        return ResponseEntity.ok(categoryService.categoryList());

    }

}
