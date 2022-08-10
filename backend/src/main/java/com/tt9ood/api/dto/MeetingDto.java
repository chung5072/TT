package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 구인 게시글 전달 클래스
 */
@Getter @Setter
@NoArgsConstructor
@ApiModel("MeetingDto")
public class MeetingDto {
    // 구인 게시글 코드
    private Long meetingCode;
    // 구인 게시글 제목
    private String meetingTitle;
    // 구인 게시글 작성자
    private String meetingAuthor;
    // 구인 게시글 날짜
    private String meetingDate;
    // 구인 게시글 내용
    private String meetingContent;
    // 구인 게시글 - 플레이어 수
    private int meetingPyNum;
    // 구인 게시글 - 게임 시작 시간
    @Schema(description = "게임 시작 시간", type = "String", example = "2022-01-01 12:00")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private String meetingPyTime;
    // 구인 게시글 - 게임을 시작하는 것인지 아닌지
    private Boolean meetingGameIsStart;
    // 게임 방 번호
    private long roomInfoCode;
    // GM 유저의 코드
    private long gmUserCode;
    // 플레이어들의 유저 코드 리스트
    private List<Long> pyUserCodeList = new ArrayList<Long>();

    public MeetingDto(Long meetingCode, String meetingTitle, String meetingAuthor,
                      String meetingDate, String meetingContent, int meetingPyNum, String meetingPyTime,
                      long roomInfoCode, long gmUserCode, List<Long> pyUserCodeList) {
        this.meetingCode = meetingCode;
        this.meetingTitle = meetingTitle;
        this.meetingAuthor = meetingAuthor;
        this.meetingDate = meetingDate;
        this.meetingContent = meetingContent;
        this.meetingPyNum = meetingPyNum;
        this.meetingPyTime = meetingPyTime;
        this.roomInfoCode = roomInfoCode;
        this.gmUserCode = gmUserCode;
        this.pyUserCodeList = pyUserCodeList;
    }

    @Getter @Setter
    @NoArgsConstructor
    public static class Enroll{
        private Long meetingCode;
        private Long usercode;
        private Boolean isGm = false;
    }
}
