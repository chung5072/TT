package com.tt9ood.api.controller;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.api.service.CommentService;
import com.tt9ood.db.entity.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/share")
@RestController
public class CommentController {
    private final CommentService commentService;

    @PostMapping("{shareCode}/comment")
    @ApiOperation(value = "정보 공유 게시글 댓글 작성", notes = "정보 공유 게시글을 댓글 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity commentSave(@PathVariable Long shareCode, @RequestBody CommentDto.Request dto , @AuthenticationPrincipal User user){
        return ResponseEntity.ok(commentService.commentSave(user, shareCode, dto));
    }
}
