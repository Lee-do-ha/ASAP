package com.ssafy.project.asap.global.security;

import com.ssafy.project.asap.global.util.JwtUtil;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.service.MemberService;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    private final MemberService memberService;
    @Value("${security.jwt.sercret.key}")
    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("requestHeader = " + requestHeader);

        byte[] secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);

        Key key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());

        // 토큰이 없는 경우
        if(requestHeader == null){
            filterChain.doFilter(request, response);
            return ;
        }

        // 토큰이 잘못된 형태인 경우
        if(!requestHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return ;
        }

        // 토큰 분리
        String token = requestHeader.split(" ")[1];

        // 토큰이 만료되었을 경우
//        if(JwtUtil.isExpired(token, key)){
//            filterChain.doFilter(request, response);
//            return ;
//        }

        log.error("isExpired = " + (JwtUtil.isExpired(token, key)));

        // 아이디 추출
        String loginId = JwtUtil.getId(token, key);

        log.info("loginId = " + loginId);

        Member member = memberService.findById(loginId);

        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority(member.getRole().toString()));

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                member.getId(), null, list
        );
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);
    }

}
