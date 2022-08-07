package com.tt9ood.api.dto;

import com.tt9ood.db.entity.Comment;
import com.tt9ood.db.entity.Share;
import com.tt9ood.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

public class CommentDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request{
        private Long commentCode;
        @ApiModelProperty(name="댓글 내용", example="댓글 내용")
        private String commentContent;
        private String createdDate, modifiedDate;
        private User user;
        private Share share;

        public Comment toEntity(){
            Comment comment = Comment.builder()
                    .commentCode(commentCode)
                    .commentContent(commentContent)
                    .createdDate(createdDate)
                    .modifiedDate(modifiedDate)
                    .user(user)
                    .share(share)
                    .build();
            return comment;
        }

        public void save(User user, Share share) {
            this.share = share;
            this.user = user;
        }

    }

    @Getter
    public static class Response{
        private Long commentCode;
        private String commentContent;
        private String createdDate, modifiedDate;
        private String userNickname;
        private Long shareCode;

        public Response(Comment comment){
            this.commentCode = comment.getCommentCode();
            this.commentContent = comment.getCommentContent();
            this.createdDate = comment.getCreatedDate();
            this.modifiedDate = comment.getModifiedDate();
            this.userNickname = comment.getUser().getUserNickname();
            this.shareCode = comment.getShare().getShareCode();
        }
    }
}
