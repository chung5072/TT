package com.tt9ood.db.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Share extends TimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "share_code")
    private Long shareCode;

    @Column(name = "share_title", length = 500, nullable = false)
    private String shareTitle;

    @Column(name = "share_author", length = 100, nullable = false)
    private String shareAuthor;

    @Column(name = "share_content", columnDefinition = "TEXT", nullable = false)
    private String shareContent;

    @Column(name = "share_like", columnDefinition = "integer default 0")
    private int shareLike;

    @Column(name = "share_view", columnDefinition = "integer default 0")
    private int shareView;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void update(String shareTitle, String shareContent){
        this.shareTitle = shareTitle;
        this.shareContent = shareContent;
    }
}