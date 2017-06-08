package cn.ictgu.serv.service;

import cn.ictgu.serv.mapper.FriendLinkMapper;
import cn.ictgu.serv.model.FriendLink;
import cn.ictgu.serv.model.enumclass.YesNoEnum;
import cn.ictgu.tools.UrlUtils;
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
 * Created by Silence on 2017/4/11.
 */
@Service
@Log4j2
public class FriendLinkServiceImpl implements FriendLinkService {

    @Value("${app.name}")
    private String appName;

    @Value("${app.domain}")
    private String appDomain;

    private static final String FRIEND_LINK_HTML_REG = "<a.*?href=.*?%s.*?>[\\s\\S]*?%s[\\s\\S]*?</a>";

    private final FriendLinkMapper friendLinkMapper;

    public FriendLinkServiceImpl(FriendLinkMapper friendLinkMapper) {
        this.friendLinkMapper = friendLinkMapper;
    }

    private boolean exist(String domain) {
        return friendLinkMapper.countByDomain(domain) > 0;
    }

    public List<FriendLink> listHome() {
        return friendLinkMapper.selectShowEqYesDesc();
    }

    public List<FriendLink> listAll(int index, int size) {
        return friendLinkMapper.selectAllDesc(index, size);
    }

    public boolean insert(String name, String domain) {
        if (exist(domain)) {
            return false;
        }
        String url = UrlUtils.adjustUrl(domain);
        if (related(url)) {
            FriendLink friendLink = new FriendLink(name, url, YesNoEnum.NO.name());
            return friendLinkMapper.insert(friendLink) > 0;
        }
        return false;
    }

    /* 对方是否已在首页添加您为友链 */
    private boolean related(String url) {
        try {
            Document document = Jsoup.connect(url).get();
            String reg = String.format(FRIEND_LINK_HTML_REG, appDomain, appName);
            String html = document.html();
            Matcher matcher = Pattern.compile(reg).matcher(html);
            return matcher.find();
        } catch (IOException e) {
            log.info("Add Friend Link Error, url:" + url);
            e.printStackTrace();
        }
        return false;
    }

    public String getAppName() {
        return appName;
    }

    public String getAppDomain() {
        return appDomain;
    }
}
