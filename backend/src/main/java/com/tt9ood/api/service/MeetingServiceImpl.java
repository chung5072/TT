package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.db.entity.Meeting;
import com.tt9ood.db.entity.RoomInfo;
import com.tt9ood.db.repository.MeetingRepository;
import com.tt9ood.db.repository.RoomInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("meetService")
public class MeetingServiceImpl implements MeetingService {
    @Autowired
    MeetingRepository meetingRepository;
    @Autowired
    RoomInfoRepository roomInfoRepository;

    @Autowired
    RoomInfoService roomInfoService;

    /**
     * 구인 게시글 생성
     * @param meetingDto
     * @return
     */
    @Override
    public Meeting createMeeting(MeetingDto meetingDto) {
        // 구인 게시글 내용 생성 - 게시판 테이블 저장
        Meeting meeting = new Meeting(meetingDto.getMeetingTitle(),
                meetingDto.getMeetingAuthor(),
                meetingDto.getMeetingContent(),
                meetingDto.getMeetingPyNum(),
                meetingDto.getMeetingPyTime()
        );
        // 구인 게시글 내용 생성 - 방 정보 테이블 저장
        RoomInfo createdRoomInfo = roomInfoService.createRoomInfo(meetingDto);
        meeting.setRoomInfo(createdRoomInfo);

        return meetingRepository.save(meeting);
    }

    /**
     * 구인 게시글 전체 조회
     * @return
     */
    @Override
    public List<MeetingDto> readAllMeeting() {
        List<MeetingDto> meetingDtoList = new ArrayList<>();

        List<Meeting> meetingList = meetingRepository.findAll();

        for (Meeting meeting : meetingList) {
            LocalDateTime now = LocalDateTime.now();

            if (now.isAfter(stringToLocal(meeting.getMeetingPyTime()))) {
                meetingRepository.updateGameIsStart(true, meeting.getMeetingCode());
            }
            MeetingDto meetingDto = getMeetingInfo(meeting);

            meetingDtoList.add(meetingDto);
        }
        return meetingDtoList;
    }

    /**
     * 특정 구인 게시글 조회 - 특정 코드 필요
     * @param meetingCode
     * @return
     */
    @Override
    public MeetingDto readMeeting(long meetingCode) {
        Optional<Meeting> findMeeting = meetingRepository.findById(meetingCode);
        if (findMeeting != null) {
            Meeting meeting = findMeeting.get();

            LocalDateTime now = LocalDateTime.now();

            if (now.isAfter(stringToLocal(meeting.getMeetingPyTime()))) {
                meetingRepository.updateGameIsStart(true, meeting.getMeetingCode());
            }

            MeetingDto meetingDto = getMeetingInfo(meeting);

            return meetingDto;
        }
        return null;
    }
    // 특정 구인 게시글 조회 - 특정 문자열 필요
    // 제목(추가. 내용)으로 검색하는 기능

    /**
     * 구인 게시글 삭제 - 특정 코드 필요
     * @param meetingCode
     */
    @Override
    public void deleteMeeting(long meetingCode) {
        // 방 정보 코드 미리 수집
        Optional<Meeting> byId = meetingRepository.findById(meetingCode);
        Meeting findMeeting = byId.get();
        long roomInfoCode = findMeeting.getRoomInfo().getRoomCode();

        // 구인 게시글 삭제 - 게시글 정보 삭제
        meetingRepository.deleteById(meetingCode);

        // 구인 게시글 삭제 - 방 정보 삭제
        roomInfoService.deleteRoomInfo(roomInfoCode);
    }

    /**
     * 구인 게시글 수정 - 특정 코드 필요
     * @param meetingCode
     * @param meetingForUpdate
     * @return
     */
    @Override
    public MeetingDto updateMeeting(long meetingCode, MeetingDto meetingForUpdate) {
        MeetingDto updatedMeeting = new MeetingDto();

        // 해당 코드가 있는지 찾는다
        Optional<Meeting> findMeeting = meetingRepository.findById(meetingCode);
        // 해당 코드가 있으면
        if (findMeeting != null) {
            Meeting meeting = findMeeting.get();
            // 해당 내용을 작성한 내용으로 수정한다.
            meeting.updateMeeting(meetingForUpdate.getMeetingTitle(),
                    meetingForUpdate.getMeetingAuthor(),
                    meetingForUpdate.getMeetingContent(),
                    meetingForUpdate.getMeetingPyNum(),
                    meetingForUpdate.getMeetingPyTime(),
                    meetingForUpdate.getMeetingGameIsStart());

            long roomCode = meeting.getRoomInfo().getRoomCode();

            RoomInfo roomInfo = roomInfoService.updateRoomInfo(roomCode, meetingForUpdate);

            meeting.setRoomInfo(roomInfo);

            meetingRepository.flush();

            // 수정한 내용을 출력할 수 있게 반환해준다.
            updatedMeeting.setMeetingCode(meeting.getMeetingCode());
            updatedMeeting.setMeetingTitle(meeting.getMeetingTitle());
            updatedMeeting.setMeetingDate(meeting.getMeetingDate());
            updatedMeeting.setMeetingAuthor(meeting.getMeetingAuthor());
            updatedMeeting.setMeetingContent(meeting.getMeetingContent());
            updatedMeeting.setMeetingPyNum(meeting.getMeetingPyNum());
            updatedMeeting.setMeetingPyTime(meeting.getMeetingPyTime());

            // 구인 게시글 마스터 코드
            updatedMeeting.setGmUserCode(meeting.getRoomInfo().getGmUserCode());
            // 구인 게시글 플레이어 코드 리스트
            // 플레이어 코드 리스트
            List<Long> pyCodeList = new ArrayList<>();
            // 플레이어 코드
            if (meeting.getRoomInfo().getPy1Code() != 0) {
                pyCodeList.add(meeting.getRoomInfo().getPy1Code());
            }
            if (meeting.getRoomInfo().getPy2Code() != 0) {
                pyCodeList.add(meeting.getRoomInfo().getPy2Code());
            }
            if (meeting.getRoomInfo().getPy3Code() != 0) {
                pyCodeList.add(meeting.getRoomInfo().getPy3Code());
            }
            if (meeting.getRoomInfo().getPy4Code() != 0) {
                pyCodeList.add(meeting.getRoomInfo().getPy4Code());
            }
            if (meeting.getRoomInfo().getPy5Code() != 0) {
                pyCodeList.add(meeting.getRoomInfo().getPy5Code());
            }
            updatedMeeting.setPyUserCodeList(pyCodeList);

            return updatedMeeting;
        }
        return null;
    }

    /**
     * 데이터베이스로부터 구인 게시글 정보를 얻어서 구인 게시글 정보 반환
     * @param meeting 구인 게시글 정보 - 데이터베이스
     * @return 구인 게시글 정보 - 프론트로 반환
     */
    private MeetingDto getMeetingInfo(Meeting meeting) {
        MeetingDto meetingDto = new MeetingDto();
        // 구인 게시글 코드 - pk
        meetingDto.setMeetingCode(meeting.getMeetingCode());
        // 구인 게시글 제목
        meetingDto.setMeetingTitle(meeting.getMeetingTitle());
        // 구인 게시글 날짜
        meetingDto.setMeetingDate(meeting.getMeetingDate());
        // 구인 게시글 작성자
        meetingDto.setMeetingAuthor(meeting.getMeetingAuthor());
        // 구인 게시글 내용
        meetingDto.setMeetingContent(meeting.getMeetingContent());
        // 구인 게시글 게임 시작 시간
        meetingDto.setMeetingPyTime(meeting.getMeetingPyTime());
        // 구인 게시글 게임 인원수
        meetingDto.setMeetingPyNum(meeting.getMeetingPyNum());
        // 만약 지금 시간이 디비에 저장한 시간이면 true로 변환해서 불러옴
        meetingDto.setMeetingGameIsStart(meeting.getMeetingGameIsStart());
        // 구인 게시글 마스터 코드
        meetingDto.setGmUserCode(meeting.getRoomInfo().getGmUserCode());
        // 구인 게시글 플레이어 코드 리스트
        // 플레이어 코드 리스트
        List<Long> pyCodeList = new ArrayList<>();
        // 플레이어 코드
        if (meeting.getRoomInfo().getPy1Code() != 0) {
            pyCodeList.add(meeting.getRoomInfo().getPy1Code());
        }
        if (meeting.getRoomInfo().getPy2Code() != 0) {
            pyCodeList.add(meeting.getRoomInfo().getPy2Code());
        }
        if (meeting.getRoomInfo().getPy3Code() != 0) {
            pyCodeList.add(meeting.getRoomInfo().getPy3Code());
        }
        if (meeting.getRoomInfo().getPy4Code() != 0) {
            pyCodeList.add(meeting.getRoomInfo().getPy4Code());
        }
        if (meeting.getRoomInfo().getPy5Code() != 0) {
            pyCodeList.add(meeting.getRoomInfo().getPy5Code());
        }
        meetingDto.setPyUserCodeList(pyCodeList);

        return meetingDto;
    }

    private LocalDateTime stringToLocal(String inputTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(inputTime, formatter);
        return dateTime;
    }
}
