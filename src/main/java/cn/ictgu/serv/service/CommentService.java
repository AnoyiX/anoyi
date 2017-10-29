package cn.ictgu.serv.service;

import cn.ictgu.serv.model.Comment;

import java.util.List;


public interface CommentService {
    //添加评论 or 回复
    void insert(Comment comment);
    //查询某个用户所有评论
    List<Comment> getCommentByUserId(Long userId);
    //查询某个用户所有回复
    List<Comment> getReplyByUserId(Long userId);
    //根据(文章|视频)标题查询评论
    List<Comment> getComment(String title);
    //根据标题查询评论
    List<Comment> getReplay(Long parentId);
}
