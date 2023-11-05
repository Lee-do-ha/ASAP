package com.ssafy.project.asap.mail.service;

import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.entity.dto.request.CheckEmailRequest;
import com.ssafy.project.asap.redis.service.RedisService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender javaMailSender;
    private final RedisService redisService;

    public void authEmail(String email) throws MessagingException {

        String pwd = createCode();

        String setFrom = "victoryddh@gmail.com";
        String title = "ASAP 회원가입 인증번호 입니다.";

        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);

        String emailMsg = "";
        emailMsg += "<div style='margin:20px; display: flex; flex-direction: column; justify-content: center; align-items: center;'> \n" +
                "      <img src=\"https://findmyguide.s3.amazonaws.com/logo-nobg.png\" alt=\"ASAP Logo Img\" style=\"width:380px;\">\n" +
                "      <h1 style='font-weight: 900;'> ASAP 회원가입 인증코드입니다 </h1> \n" +
                "\n" +
                "      <br> \n" +
                "      <h4 style='font-weight: 600;'>회원가입을 위한 인증 코드를 발송하였습니다</h4> \n" +
                "      <h4 style='font-weight: 600;'>아래 인증코드를 복사하여 회원가입 페이지에 입력바랍니다 <h4> \n" +
                "      <br> \n" +
                "        <h2 style='color:blue; font-weight: 800;'>회원가입 인증 코드입니다.</h2> \n" +
                "        <div style='font-size:50px'>\n" +           pwd    +"   \n" +
                "        </div>\n" +
                "     <br>  \n" +
                "     <h4 style='font-weight: 600;'>인증 코드 오류가 생긴 경우 고객센터로 문의바랍니다</h4>";

        message.setFrom(setFrom);
        message.setText(emailMsg, "utf-8", "html");

        log.info("pwd = " + pwd);

        javaMailSender.send(message);

        redisService.setValue(email, pwd);

    }


    public String createCode(){
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for(int i = 0 ; i < 8 ; i++){

            int idx = random.nextInt(3);

            switch (idx) {
                case 0 -> key.append((char) (random.nextInt(26) + 97));
                case 1 -> key.append((char) (random.nextInt(26) + 65));
                case 2 -> key.append( (random.nextInt(9)));
            }

        }
        return key.toString();
    }

    public void checkAuthEmail(CheckEmailRequest checkEmailRequest){

        if (!redisService.getValue(checkEmailRequest.getEmail()).equals(checkEmailRequest.getCode())) {

            throw new CustomException(ErrorCode.EMAIL_CODE_NOT_AUTHORIZED);

        }

    }

}
