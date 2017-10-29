package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.Comment;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface CommentMapper {
    @Insert("insert into any_comment(`user_id`, `parent_id`,`title`, `content`, `status`) values(#{userId}, #{parentId}, #{title}, #{content}, #{status})")
    int insert(Comment comment);

    @Select("select c.*,u.nickname as username,u.avatar as avatar from any_comment c,any_user u where title = #{title} and status = 1 and u.id=c.user_id")
    List<Comment> selectComment(@Param("title") String title);

    @Select("select *,u.nickname as username,u.avatar  as avatar from any_comment c,any_user u where parent_id = #{parentId} and u.id=c.user_id")
    List<Comment> selectReply(@Param("parentId") Long parentId);

    @Select("select * from any_comment where user_id = #{userId} and status = 1")
    List<Comment> selectCommentByUserId(@Param("userId") Long userId);

    @Select("select * from any_comment where user_id = #{userId} and status = 2")
    List<Comment> selectReplyByUserId(@Param("userId") Long userId);


}
