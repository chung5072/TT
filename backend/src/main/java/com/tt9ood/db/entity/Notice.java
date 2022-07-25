package com.tt9ood.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Notice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_code")
    private Long noticeCode;

    @Column(name = "notice_author")
    private String noticeAuthor;

    @Column(name = "notice_date")
    private LocalDateTime noticeDate;

    @Column(name = "notice_title")
    private String noticeTitle;

    @Column(name = "notice_article")
    private String noticeArticle;
}
