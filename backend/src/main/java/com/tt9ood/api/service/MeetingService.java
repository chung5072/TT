package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.db.entity.Meeting;

import java.util.List;

public interface MeetingService {
    // 등록
    Meeting createMeeting(MeetingDto meetingDto);

    // 조회
    // 전체 구인 게시글 조회
    List<MeetingDto> readAllMeeting();

    // 특정 구인 게시글 조회
    // 특정 코드 구인 게시글 조회
    MeetingDto readMeeting(long meetingCode);
    // 특정 제목(추가. 내용) 구인 게시글 조회

    // 삭제
    void deleteMeeting(long meetingCode);

    // 수정
    MeetingDto updateMeeting(long meetingCode, MeetingDto meetingDto);

    // 수정 - enroll
    MeetingDto enrollToGame(MeetingDto.Enroll enroll);
}
