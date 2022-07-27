package com.tt9ood.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.tt9ood.api.dto.MeetingDto;
import com.tt9ood.db.entity.Meeting;
import com.tt9ood.db.entity.QMeeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Repository
public class MeetingRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QMeeting qMeeting = QMeeting.meeting;
    @PersistenceContext
    EntityManager entityManager;

    /**
     * 해당 구인 게시글 있으면 공지글 정보 반환
     * @param meetingCode
     * @return
     */
    public Optional<Meeting> findMeetingByMeetingCode(Long meetingCode) {
        Meeting meeting = jpaQueryFactory.select(qMeeting).from(qMeeting)
                .where(qMeeting.meetingCode.eq(meetingCode)).fetchOne();
        if(meeting == null) return Optional.empty();
        return Optional.ofNullable(meeting);
    }
}
