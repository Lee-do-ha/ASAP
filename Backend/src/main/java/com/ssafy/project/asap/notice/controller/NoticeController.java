package com.ssafy.project.asap.notice.controller;

import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.notice.entity.domain.Notice;
import com.ssafy.project.asap.notice.entity.dto.response.FindNoticesResponse;
import com.ssafy.project.asap.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/notice")
@Tag(name="Notice", description = "알람 API")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final MemberService memberService;

    @GetMapping("/list-count")
    @Operation(summary = "메시지 확인", description = "아직 읽지 않은 메시지의 총 갯수 출력 (메인페이지)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "메시지 조회 성공", content = @Content(schema = @Schema(
                    implementation = Integer.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findAllNotRead(Authentication authentication){

        // 아직 읽지 않은 알림 메시지 갯수 출력

        return ResponseEntity.ok(noticeService.findUnRead(memberService.findById(authentication.getName())));
    }

    @GetMapping("/list")
    @Operation(summary = "알림 리스트 조회", description = "나의 모든 알림 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "알림 리스트 조회 성공", content = @Content(schema = @Schema(
                    implementation = FindNoticesResponse.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<FindNoticesResponse>> findAll(Authentication authentication){

        // 내 알림 메시지 리스트 조회
        List<FindNoticesResponse> list = noticeService.findAll(memberService.findById(authentication.getName()));

        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/delete/{notice_id}")
    @Operation(summary = "알림 삭제", description = "알림 확인 후 알림 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "메시지 삭제 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> delete(@PathVariable("notice_id") Long noticeId){

        // 알림 메시지 삭제
        noticeService.delete(noticeId);

        return ResponseEntity.status(200).body("삭제 완료");
    }

    @PutMapping("/check/{notice_id}")
    @Operation(summary = "메시지 읽음", description = "회원이 메시지 확인 후 메시지 읽음 상태 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "메시지 확인 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> updateIsRead(@PathVariable("notice_id") Long noticeId){

        // 알림 메시지 읽음 상태 변경
        noticeService.update(noticeId);

        return ResponseEntity.status(202).body(noticeId + "번 알림 메시지 읽음");
    }

}
