package cn.ictgu.serv.service;

import cn.ictgu.serv.mapper.FriendLinkMapper;
import cn.ictgu.serv.model.FriendLink;
import cn.ictgu.serv.model.enumclass.YesNoEnum;
import cn.ictgu.tools.UrlUtils;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 友情链接
 */
@Service
@Log4j2
@AllArgsConstructor
public class FriendLinkServiceImpl implements FriendLinkService {

    private final FriendLinkMapper friendLinkMapper;

    public List<FriendLink> listHome() {
        return friendLinkMapper.selectShowEqYesDesc();
    }


}
