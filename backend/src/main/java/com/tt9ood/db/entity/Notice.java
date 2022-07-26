package com.tt9ood.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
@Entity
public class Notice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_code")
    private Long noticeCode;

    @Column(name = "notice_author")
    private String noticeAuthor;

    @Column(name = "notice_date")
    private String noticeDate;

    @Column(name = "notice_title")
    private String noticeTitle;

    @Column(name = "notice_article")
    private String noticeArticle;

    public Notice(String noticeTitle, String noticeAuthor, String noticeArticle) {
        this.noticeTitle = noticeTitle;
        this.noticeAuthor = noticeAuthor;
        this.noticeDate = currTime();
        this.noticeArticle = noticeArticle;
    }

    public void updateNotice(String noticeTitle, String noticeAuthor, String noticeArticle) {
        this.noticeTitle = noticeTitle;
        this.noticeAuthor = noticeAuthor;
        this.noticeDate = currTime();
        this.noticeArticle = noticeArticle;
    }

    private String currTime() {
        // 형식
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = LocalDateTime.now().format(formatter);

        return formattedDateTime;
    }
}
