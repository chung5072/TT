package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 구인 게시글 전달 클래스
 */
@Getter @Setter
@NoArgsConstructor
@ApiModel("MeetingDto")
public class MeetingDto {
    private Long meetingCode;
    private String meetingTitle;
    private String meetingAuthor;
    private String meetingDate;
    private String meetingContent;
    private int meetingPyNum;
    private String meetingPyTime;

    public MeetingDto(Long meetingCode, String meetingTitle, String meetingAuthor,
                      String meetingDate, String meetingContent, int meetingPyNum, String meetingPyTime) {
        this.meetingCode = meetingCode;
        this.meetingTitle = meetingTitle;
        this.meetingAuthor = meetingAuthor;
        this.meetingDate = meetingDate;
        this.meetingContent = meetingContent;
        this.meetingPyNum = meetingPyNum;
        this.meetingPyTime = meetingPyTime;
    }
}
