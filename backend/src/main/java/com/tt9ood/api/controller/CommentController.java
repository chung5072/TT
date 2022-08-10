package com.tt9ood.api.controller;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.api.service.CommentService;
import com.tt9ood.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/share")
@RestController
public class CommentController {

    @Autowired
    CommentService commentService;

    // 생성
    @PostMapping("{shareCode}/comment/register")
    @ApiOperation(value = "정보 공유 게시글 댓글 작성", notes = "정보 공유 게시글을 댓글 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity commentRegister(@PathVariable Long shareCode, @RequestBody CommentDto commentDto){
        commentService.createComment(shareCode, commentDto);
        return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
    }

    // 조회
    // 특정 공유글의 전체 댓글 조회
    @GetMapping("{shareCode}/comment")
    @ApiOperation(value = "정보 공유 게시글 댓글 조회", notes = "특정 공유 게시글의 전체 댓글을 조회.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "댓글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity commentReadAllList(@PathVariable Long shareCode){

        return ResponseEntity.ok(commentService.readAllComment(shareCode));
    }

    // 삭제

    // 수정
}
