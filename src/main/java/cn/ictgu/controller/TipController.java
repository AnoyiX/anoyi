package cn.ictgu.controller;

import cn.ictgu.serv.model.Tip;
import cn.ictgu.serv.service.TipService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@AllArgsConstructor
public class TipController {

    private final TipService tipService;

    /**
     * 赞赏
     */
    @GetMapping("/tip")
    public String sponsor(Model model) {
        List<Tip> tips = tipService.list();
        model.addAttribute("tips", tips);
        return "tip";
    }
}
