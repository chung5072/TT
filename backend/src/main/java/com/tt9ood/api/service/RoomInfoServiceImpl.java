package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.api.dto.RoomInfoDto;
import com.tt9ood.api.response.UserRes;
import com.tt9ood.db.entity.RoomInfo;
import com.tt9ood.db.repository.RoomInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("roomInfoService")
public class RoomInfoServiceImpl implements RoomInfoService {
    @Autowired
    RoomInfoRepository roomInfoRepository;

    // 방 정보 등록
    @Override
    public RoomInfo createRoomInfo(MeetingDto meetingDto) {
        RoomInfo roomInfo = new RoomInfo();
        // gm 코드
        roomInfo.setGmUserCode(meetingDto.getGmUserRes().getUserCode());
        // 플레이어 코드
        List<UserRes> userCodeList = meetingDto.getPyUserResList();
        // 각 사이즈별로 값이 들어감
        if (userCodeList.size() == 1) {
            roomInfo.setPy1Code(userCodeList.get(0).getUserCode());
        } else if (userCodeList.size() == 2) {
            roomInfo.setPy1Code(userCodeList.get(0).getUserCode());
            roomInfo.setPy2Code(userCodeList.get(1).getUserCode());
        } else if (userCodeList.size() == 3) {
            roomInfo.setPy1Code(userCodeList.get(0).getUserCode());
            roomInfo.setPy2Code(userCodeList.get(1).getUserCode());
            roomInfo.setPy3Code(userCodeList.get(2).getUserCode());
        } else if (userCodeList.size() == 4) {
            roomInfo.setPy1Code(userCodeList.get(0).getUserCode());
            roomInfo.setPy2Code(userCodeList.get(1).getUserCode());
            roomInfo.setPy3Code(userCodeList.get(2).getUserCode());
            roomInfo.setPy4Code(userCodeList.get(3).getUserCode());
        } else if (userCodeList.size() == 5) {
            roomInfo.setPy1Code(userCodeList.get(0).getUserCode());
            roomInfo.setPy2Code(userCodeList.get(1).getUserCode());
            roomInfo.setPy3Code(userCodeList.get(2).getUserCode());
            roomInfo.setPy4Code(userCodeList.get(3).getUserCode());
            roomInfo.setPy5Code(userCodeList.get(4).getUserCode());
        }

        return roomInfoRepository.save(roomInfo);
    }

    @Override
    public void deleteRoomInfo(long roomInfoCode) {
        roomInfoRepository.deleteById(roomInfoCode);
    }

    @Override
    public RoomInfo updateRoomInfo(long roomInfoCode, MeetingDto meetingDto) {
        Optional<RoomInfo> byId = roomInfoRepository.findById(roomInfoCode);
        RoomInfo findRoomInfo = byId.get();

        findRoomInfo.setGmUserCode(meetingDto.getGmUserRes().getUserCode());
        List<UserRes> pyUserCodeList = meetingDto.getPyUserResList();
        if (pyUserCodeList.size() == 1) {
            findRoomInfo.setPy1Code(pyUserCodeList.get(0).getUserCode());
            findRoomInfo.setPy2Code(0);
            findRoomInfo.setPy3Code(0);
            findRoomInfo.setPy4Code(0);
            findRoomInfo.setPy5Code(0);
        } else if (pyUserCodeList.size() == 2) {
            findRoomInfo.setPy1Code(pyUserCodeList.get(0).getUserCode());
            findRoomInfo.setPy2Code(pyUserCodeList.get(1).getUserCode());
            findRoomInfo.setPy3Code(0);
            findRoomInfo.setPy4Code(0);
            findRoomInfo.setPy5Code(0);
        } else if (pyUserCodeList.size() == 3) {
            findRoomInfo.setPy1Code(pyUserCodeList.get(0).getUserCode());
            findRoomInfo.setPy2Code(pyUserCodeList.get(1).getUserCode());
            findRoomInfo.setPy3Code(pyUserCodeList.get(2).getUserCode());
            findRoomInfo.setPy4Code(0);
            findRoomInfo.setPy5Code(0);
        } else if (pyUserCodeList.size() == 4) {
            findRoomInfo.setPy1Code(pyUserCodeList.get(0).getUserCode());
            findRoomInfo.setPy2Code(pyUserCodeList.get(1).getUserCode());
            findRoomInfo.setPy3Code(pyUserCodeList.get(2).getUserCode());
            findRoomInfo.setPy4Code(pyUserCodeList.get(3).getUserCode());
            findRoomInfo.setPy5Code(0);
        } else if (pyUserCodeList.size() == 5) {
            findRoomInfo.setPy1Code(pyUserCodeList.get(0).getUserCode());
            findRoomInfo.setPy2Code(pyUserCodeList.get(1).getUserCode());
            findRoomInfo.setPy3Code(pyUserCodeList.get(2).getUserCode());
            findRoomInfo.setPy4Code(pyUserCodeList.get(3).getUserCode());
            findRoomInfo.setPy5Code(pyUserCodeList.get(4).getUserCode());
        }

        return findRoomInfo;
    }

    @Override
    public RoomInfoDto readRoomInfo(long roomCode) {
        RoomInfoDto roomInfoDto=new RoomInfoDto();
        Optional<RoomInfo> byId=roomInfoRepository.findById(roomCode);
        if(byId!=null){
            RoomInfo roomInfo=byId.get();
            roomInfoDto.setGmUserCode(roomInfo.getGmUserCode());
            roomInfoDto.setPy1Code(roomInfo.getPy1Code());
            roomInfoDto.setPy2Code(roomInfo.getPy2Code());
            roomInfoDto.setPy3Code(roomInfo.getPy3Code());
            roomInfoDto.setPy4Code(roomInfo.getPy4Code());
            roomInfoDto.setPy5Code(roomInfo.getPy5Code());

            return roomInfoDto;
        }
        return null;
    }
}
