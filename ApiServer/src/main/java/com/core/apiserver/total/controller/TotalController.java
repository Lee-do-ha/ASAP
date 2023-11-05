package com.core.apiserver.total.controller;

import com.core.apiserver.total.entity.dto.request.FindTotalRequest;
import com.core.apiserver.total.entity.dto.request.TotalRequest;
import com.core.apiserver.total.service.TotalService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/total")
@Tag(name = "Total", description = "총 누계 사용량")
public class TotalController {

    private final TotalService totalService;

    @PostMapping("")
    public ResponseEntity<Boolean> register(@RequestBody TotalRequest totalRequest) {

        return ResponseEntity.status(201).body(totalService.register(totalRequest));
    }

    @DeleteMapping("")
    public ResponseEntity<Boolean> delete(@RequestBody FindTotalRequest findTotalRequest) {
        return ResponseEntity.status(204).body(totalService.delete(findTotalRequest));
    }
}
