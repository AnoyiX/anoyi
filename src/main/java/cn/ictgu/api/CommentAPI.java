package cn.ictgu.api;

import cn.ictgu.bean.ResponseBean;
import cn.ictgu.serv.model.Comment;
import cn.ictgu.serv.model.HubItem;
import cn.ictgu.serv.model.User;
import cn.ictgu.serv.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
@RestController
public class CommentAPI {

    private  CommentService commentService;

    /**
     * 根据(文章|视频)标题加载评论
     * @param title 文章或者视频的标题
     * @return 评论列表
     */
    @RequestMapping("/view/comment/loadComments")
    List<Comment> loadComment(String title){
        List<Comment> comments = commentService.getComment(title.trim());

        return comments;
    }

    /**
     * 根据评论id加载该评论的回复
     * @param parentId 文章或者视频的标题
     * @return 回复列表
     */
    @RequestMapping("/view/comment/loadReply")
    List<Comment> loadReply(Long parentId){
        List<Comment> comments = commentService.getReplay(parentId);

        return comments;
    }


    @RequestMapping("/comment/addComment")
    List<Comment> add(Principal principal, HttpServletRequest request){
        if(principal==null){
            System.out.println("authentication failed");
            return null;
        }
        Authentication authentication = (Authentication) principal;
        User user = (User) authentication.getPrincipal();

        System.out.println("title:"+request.getParameter("title"));

        Comment item = createItem(user.getId(), request);
        commentService.insert(item);

        return loadComment(request.getParameter("title"));
    }

    Comment createItem(Long userId, HttpServletRequest request){
        Comment item = new Comment();
        item.setUserId(userId);
        String content = request.getParameter("content").trim();
        item.setContent(content);
        System.out.println(content);
        Integer status=Integer.parseInt(request.getParameter("status").trim());
        System.out.println(status);
        item.setStatus(status);
        item.setTitle(request.getParameter("title").trim());
        if(status==1)
            item.setParentId(0L);
        else
            item.setParentId(Long.parseLong(request.getParameter("parentId")));

        //System.out.println(item);

        return item;
    }

}
