package com.ssafy.project.asap.api.entity.domain;

import com.ssafy.project.asap.apply.entity.domain.ApplyMethod;

public enum ApiMethod {

    GET, POST, PUT, DELETE;

    public static ApiMethod mapApplyMethodToApiMethod(ApplyMethod applyMethod) {
        return switch (applyMethod) {
            case GET -> ApiMethod.GET;
            case POST -> ApiMethod.POST;
            case PUT -> ApiMethod.PUT;
            case DELETE -> ApiMethod.DELETE;
        };
    }
}
