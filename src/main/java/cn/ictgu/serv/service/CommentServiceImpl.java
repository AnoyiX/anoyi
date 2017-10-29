package cn.ictgu.serv.service;

import cn.ictgu.serv.mapper.CommentMapper;
import cn.ictgu.serv.model.Comment;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Log4j2
@AllArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentMapper mapper;

    @Transactional
    public void insert(Comment comment) {
        mapper.insert(comment);
    }

    @Override
    public List<Comment> getCommentByUserId(Long userId) {
        return mapper.selectCommentByUserId(userId);
    }

    @Override
    public List<Comment> getReplyByUserId(Long userId) {
        return mapper.selectReplyByUserId(userId);
    }

    @Override
    public List<Comment> getComment(String title) {
        List<Comment> res =mapper.selectComment(title);
        for(Comment com : res){
            com.setReply(getReplay(com.getId()));
        }

        return res;
    }
    @Override
    public List<Comment> getReplay(Long parentId) {
        return mapper.selectReply(parentId);
    }
}
