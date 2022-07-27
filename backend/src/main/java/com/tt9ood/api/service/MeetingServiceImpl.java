package com.tt9ood.api.service;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.api.dto.NoticeDto;
import com.tt9ood.db.entity.Meeting;
import com.tt9ood.db.entity.Notice;
import com.tt9ood.db.repository.MeetingRepository;
import com.tt9ood.db.repository.MeetingRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Service("meetService")
public class MeetingServiceImpl implements MeetingService {

    @Autowired
    MeetingRepository meetingRepository;
    @Autowired
    MeetingRepositorySupport meetingRepositorySupport;
    @PersistenceContext
    EntityManager entityManager;


    /**
     * 구인 게시글 생성
     * @param meetingDto
     * @return
     */
    @Override
    public Meeting createMeeting(MeetingDto meetingDto) {
        Meeting meeting = new Meeting(meetingDto.getMeetingTitle(),
                meetingDto.getMeetingAuthor(),
                meetingDto.getMeetingContent(),
                meetingDto.getMeetingPyNum(),
                meetingDto.getMeetingPyTime());
        return meetingRepository.save(meeting);
    }

    /**
     * 구인 게시글 전체 조회
     * @return
     */
    @Override
    public List<MeetingDto> readAllMeeting() {
        return meetingRepository.findAllBy();
    }

    /**
     * 특정 구인 게시글 조회 - 특정 코드 필요
     * @param meetingCode
     * @return
     */
    @Override
    public MeetingDto readMeeting(long meetingCode) {
        MeetingDto meetingDto = new MeetingDto();
        Optional<Meeting> meetingByMeetingCode = meetingRepositorySupport.findMeetingByMeetingCode(meetingCode);
        if (meetingByMeetingCode != null) {
            Meeting meeting = meetingByMeetingCode.get();

            meetingDto.setMeetingCode(meeting.getMeetingCode());
            meetingDto.setMeetingTitle(meeting.getMeetingTitle());
            meetingDto.setMeetingAuthor(meeting.getMeetingAuthor());
            meetingDto.setMeetingDate(meeting.getMeetingDate());
            meetingDto.setMeetingContent(meeting.getMeetingContent());
            meetingDto.setMeetingPyNum(meeting.getMeetingPyNum());
            meetingDto.setMeetingPyTime(meeting.getMeetingPyTime());

            return meetingDto;
        }
        return null;
    }

    // 특정 구인 게시글 조회 - 특정 문자열 필요
    // 제목(추가. 내용)으로 검색하는 기능

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
        Optional<Meeting> meetingByMeetingCode = meetingRepositorySupport.findMeetingByMeetingCode(meetingCode);
        // 해당 코드가 있으면
        if (meetingByMeetingCode != null) {
            Meeting meeting = meetingByMeetingCode.get();
            // 해당 내용을 작성한 내용으로 수정한다.
            meeting.updateMeeting(meetingForUpdate.getMeetingTitle(),
                    meetingForUpdate.getMeetingAuthor(),
                    meetingForUpdate.getMeetingContent(),
                    meetingForUpdate.getMeetingPyNum(),
                    meetingForUpdate.getMeetingPyTime());

            // 수정 쿼리를 디비에 날람
            meetingRepository.flush();
            entityManager.clear();

            // 수정한 내용을 출력할 수 있게 반환해준다.
            updatedMeeting.setMeetingCode(meeting.getMeetingCode());
            updatedMeeting.setMeetingTitle(meeting.getMeetingTitle());
            updatedMeeting.setMeetingDate(meeting.getMeetingDate());
            updatedMeeting.setMeetingAuthor(meeting.getMeetingAuthor());
            updatedMeeting.setMeetingContent(meeting.getMeetingContent());
            updatedMeeting.setMeetingPyNum(meeting.getMeetingPyNum());
            updatedMeeting.setMeetingPyTime(meeting.getMeetingPyTime());

            return updatedMeeting;
        }
        return null;
    }

    /**
     * 구인 게시글 삭제 - 특정 코드 필요
     * @param meetingCode
     */
    @Override
    public void deleteMeeting(long meetingCode) {
        Optional<Meeting> meetingByMeetingCode = meetingRepositorySupport.findMeetingByMeetingCode(meetingCode);

        if (meetingByMeetingCode != null) {
            meetingRepository.delete(meetingByMeetingCode.get());
        }
    }
}
