package com.ssafy.project.asap.admin.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginAdminRequest {
    private String adminId;
    private String adminPassword;
}
