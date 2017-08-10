package cn.ictgu.controller;

import cn.ictgu.serv.service.SeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class SeeController {

    private final SeeService seeService;

    @GetMapping("/see")
    public String news(Model model){
        model.addAttribute("activeUsers", seeService.getActiveUsers());
        model.addAttribute("hubs", seeService.getRecommendHubs());
        model.addAttribute("newUsers", seeService.getNewUsers());
        return "see";
    }

}