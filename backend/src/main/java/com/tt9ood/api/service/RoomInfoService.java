package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.api.dto.RoomInfoDto;
import com.tt9ood.db.entity.RoomInfo;

public interface RoomInfoService {
    // 등록
    RoomInfo createRoomInfo(MeetingDto meetingDto);
    // 삭제
    void deleteRoomInfo(long roomInfoCode);
    // 수정
    RoomInfo updateRoomInfo(long roomInfoCode, MeetingDto meetingDto);

    RoomInfoDto readRoomInfo(long roomCode);
}
