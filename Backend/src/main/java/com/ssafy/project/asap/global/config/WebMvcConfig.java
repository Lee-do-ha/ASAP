package com.ssafy.project.asap.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOrigins("https://j9c202.p.ssafy.io", "http://j9c202.p.ssafy.io:3000",
                        "http://localhost:3000")
                .allowedHeaders("*")
                .allowedMethods("OPTIONS", "HEAD", "GET", "PATCH", "POST", "PUT", "DELETE");
    }


}