package com.core.apiserver.global.config;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@Component
public class GlobalFilter extends OncePerRequestFilter {

    @Value("${server.allow-header}")
    private String requireHeader;

    @Value("${server.test-header}")
    private String testHeader;

    @Override
    public void doFilterInternal(HttpServletRequest  request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        ContentCachingRequestWrapper httpServletRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);


        String header = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);
        log.info(((HttpServletRequest) request).getRequestURI());

        if (request.getRequestURI().contains("/swagger") || request.getRequestURI().contains("/v3/api-docs")) {
            chain.doFilter(request, response);
        }

        if (header == null) {
//            chain.doFilter(request, response);
            log.info("헤더가 없음");
//            throw new IllegalAccessError();
            return;
        }

        if (!Objects.equals(requireHeader, header) && !Objects.equals(testHeader, header)) {
//            chain.doFilter(request, response);
            log.info("헤더가 서로 다름");
            return;
        }
        log.info("headers" + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        chain.doFilter(request, response);
    }

}
