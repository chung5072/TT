package com.tt9ood.db.repository;

import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.db.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    @Query(value = "select new com.tt9ood.api.dto.MeetingDto(m.meetingCode, m.meetingTitle, m.meetingAuthor, " +
            "m.meetingDate, m.meetingContent, m.meetingPyNum, m.meetingPyTime) " +
            "from Meeting as m")
    List<MeetingDto> findAllBy();
}
