package cn.ictgu.serv.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * Created by edqi on 17-10-14.
 */
@Data
@NoArgsConstructor
public class Comment {

    private Long id;

    //父评论id
    private Long parentId;

    // 用户 ID
    private Long userId;

    //文章或者视频的标题
    private String title;

    //评论内容
    private String content;

    //创建时间
    private Date createTime;

    //状态值 1表示此为评论 2表示为回复
    private Integer status;

    //回复
    private List<Comment> reply;
    //用户名
    private String userName;
    //用户头像地址
    private String avatar;

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", parentId=" + parentId +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", createTime=" + createTime +
                ", status=" + status +
                ", reply=" + reply +
                ", userName='" + userName + '\'' +
                ", avatar='" + avatar + '\'' +
                '}';
    }
}
