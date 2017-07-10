package cn.ictgu.controller;

import cn.ictgu.bean.response.Video;
import cn.ictgu.parse.ParserManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@AllArgsConstructor
public class SourceController {

    private final ParserManager parseManager;

    @GetMapping("/view")
    public String play(HttpServletRequest request, Model model) {
        String url = request.getParameter("u");
        Object source = parseManager.parse(url);
        model.addAttribute("source", source);
        if (source instanceof Video) {
            return "video";
        }
        return "article";
    }

}
