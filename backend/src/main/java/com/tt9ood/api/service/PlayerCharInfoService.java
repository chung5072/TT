package com.tt9ood.api.service;

import com.tt9ood.api.dto.NoticeDto;
import com.tt9ood.api.dto.PlayerCharInfoDto;
import com.tt9ood.db.entity.Notice;
import com.tt9ood.db.entity.PlayerCharInfo;

import java.util.List;

public interface PlayerCharInfoService {
    // 등록
    PlayerCharInfo createPlayerInfo(PlayerCharInfoDto playerInfoDto);
    // 조회
    // 플레이어캐릭터 정보 조회 (유저코드 기준으로 검색)
    PlayerCharInfoDto readPlayerInfo(long playerCode);

    // 수정
    PlayerCharInfoDto updatePlayerInfo(long playerCode, PlayerCharInfoDto playerInfoForUpdate);

    // 삭제
    void deletePlayerInfo(long playerCode);

}
