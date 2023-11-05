package com.ssafy.project.asap.admin.controller;

import com.ssafy.project.asap.admin.entity.dto.request.LoginAdminRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@Tag(name = "Admin", description = "관리자 API")
public class AdminController {

    @PostMapping("/login")
    @Operation(summary = "관리자 로그인", description = "관리자 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "관리자 로그인"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findUsage(@RequestBody LoginAdminRequest loginAdminRequest){

        return ResponseEntity.status(201).body("로그인 성공");
    }

    @DeleteMapping("/delete/{apiId}")
    @Operation(summary = "api 관리자 삭제", description = "api 관리자 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "삭제"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findUsage(@PathVariable Long apiId, @RequestBody LoginAdminRequest loginAdminRequest){

        return ResponseEntity.status(204).body("삭제완료");
    }
}
