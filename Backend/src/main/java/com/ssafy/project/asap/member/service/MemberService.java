package com.ssafy.project.asap.member.service;

import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.global.util.JwtUtil;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.entity.domain.Role;
import com.ssafy.project.asap.member.entity.dto.request.*;
import com.ssafy.project.asap.member.repository.MemberRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberService implements UserDetailsService {

    @Value("${security.jwt.sercret.key}")
    private String secretKey;
    @Value("${server.allow-header}")
    private String allowHeader;
    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();



    public Member findById(String id){

        return memberRepository.findById(id).orElseThrow();

    }

    @Transactional
    public String login(LoginMemberRequest loginMemberRequest){
        
        Member optionalMember = memberRepository.findById(loginMemberRequest.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_ID_NOT_FOUND));


        if(bCryptPasswordEncoder.matches(loginMemberRequest.getPassword(), optionalMember.getPassword())){

            byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(secretKey);

            Key key = new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());

            Long accessExpiration = 1000 * 60 * 60 * 24L;
            return JwtUtil.createToken(loginMemberRequest.getId(), key, accessExpiration);
        }else{
            throw new CustomException(ErrorCode.PASSWORD_NOT_AUTHORIZED);
        }
        
    }

    @Transactional
    public void signUp(RegisterMemberRequest registerMemberRequest){

        Member member = Member.builder()
                .email(registerMemberRequest.getEmail())
                .id(registerMemberRequest.getId())
                .password(bCryptPasswordEncoder.encode(registerMemberRequest.getPassword()))
                .name(registerMemberRequest.getName())
                .role(Role.ROLE_USER)
                .build();

        try {
            memberRepository.save(member);
        } catch (Exception e) {

            log.error("SINGUP ERROR = " + e.getMessage());

            throw new CustomException(ErrorCode.SIGNUP_DUPLICATED);

        }

    }

    public void checkId(String id){

        memberRepository.findById(id)
                .ifPresent((member) -> {
                    throw new CustomException(ErrorCode.USER_ID_DUPLICATED);
                });

    }

    public List<String> findAllByEmailAndName(FindMemberIdRequest findMemberIdRequest){

        List<Member> memberList = memberRepository.findAllByEmailAndName(findMemberIdRequest.getEmail(), findMemberIdRequest.getName());

        if(memberList.isEmpty()){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }

        List<String> list = new ArrayList<>();

        for(Member member : memberList){
            list.add(member.getId());
        }

        return list;

    }

    public void updatePassword(LoginMemberRequest loginMemberRequest){

        Member member = memberRepository.findById(loginMemberRequest.getId()).get();

        member.setPassword(bCryptPasswordEncoder.encode(loginMemberRequest.getPassword()));

    }

    public void checkPassword(CheckPasswordRequest checkPasswordRequest, String id){

        Member member =  memberRepository.findById(id).get();

        if(!bCryptPasswordEncoder.matches(checkPasswordRequest.getPassword(), member.getPassword())){
            throw new CustomException(ErrorCode.PASSWORD_NOT_AUTHORIZED);
        }
    }

    @Transactional
    public void update(UpdateMemberRequest updateMemberRequest){

        Optional<Member> optionalMember = memberRepository.findById(updateMemberRequest.getId());

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();

            if (updateMemberRequest.getName() != null) {
                member.setName(updateMemberRequest.getName());
            }

            if (updateMemberRequest.getEmail() != null) {
                member.setEmail(updateMemberRequest.getEmail());
            }
        }

    }

    @Transactional
    public void registerAddress(RegisterAddressRequest request){

        Member member = memberRepository.findById(request.getId()).get();

        Long walletId = getWalletId(request);

        log.info(request.getAddress() + " " + walletId);

        member.setAddress(request.getAddress());
        member.setWalletId(walletId);

    }

    public Long getWalletId(RegisterAddressRequest request) {

        log.info(request.toString());

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io")
                .path("/block/api/v1/wallet/register")
                .encode()
                .build()
                .toUri();

        log.info(uri.toString());

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, allowHeader);

        // 요청 본문에 request 객체를 JSON으로 변환하여 추가
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HttpEntity에 헤더와 요청 본문을 함께 설정
        HttpEntity<RegisterAddressRequest> httpEntity = new HttpEntity<>(request, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Long> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Long.class);

        return responseEntity.getBody();
    }

    public String getAddress(String id) {

        String address = memberRepository.findById(id).get().getAddress();

        if (address == null){
            throw new CustomException(ErrorCode.USER_NOT_HAVE_WALLET);
        } else {
           return address;
        }

    }

    public Long checkWallet(String authorization) {

        Member member = memberRepository.findByAddress(authorization)
                .orElseThrow(() -> new RuntimeException("올바르지 않은 개인키입니다."));


        return member.getWalletId();
    }

    public Member findMemberByWallet(String authorization) {
        return memberRepository.findByAddress(authorization)
                .orElseThrow(() -> new RuntimeException("올바르지 않은 개인키입니다."));
    }

    @Override
    public Member loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("loadUserByUsername " + username);

        return memberRepository.findById(username)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_ID_NOT_FOUND));
    }
}
