package cn.ictgu.serv.service;

import cn.ictgu.bean.response.SimpleSource;
import cn.ictgu.bean.response.Tag;
import cn.ictgu.serv.mapper.HubItemMapper;
import cn.ictgu.serv.mapper.HubMapper;
import cn.ictgu.serv.mapper.UserMapper;
import cn.ictgu.serv.model.Hub;
import cn.ictgu.serv.model.User;
import cn.ictgu.serv.model.mix.HubItemHubUser;
import cn.ictgu.tools.TimeUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SeeServiceImpl implements SeeService {
    private final static int DEFAULT_ITEM_SIZE = 15;
    private final static int DEFAULT_USER_SIZE = 20;
    private final static int DEFAULT_HUB_SIZE = 4;

    private final static String DESC_FORMAT = "来源于 <a href='/info/%s'>%s</a> 的收藏";

    private final HubItemMapper hubItemMapper;

    private final HubMapper hubMapper;

    private final UserMapper userMapper;


    @Override
    public List<SimpleSource> getNewItems(int page) {
        int begin = (page - 1) * DEFAULT_ITEM_SIZE;
        List<HubItemHubUser> hubItemHubUsers = hubItemMapper.selectNewItems(begin, DEFAULT_ITEM_SIZE);
        if (hubItemHubUsers == null) {
            return null;
        }
        return itemsToSources(hubItemHubUsers);
    }

    @Override
    public List<SimpleSource> getHotItems(int page) {
        int begin = (page - 1) * DEFAULT_ITEM_SIZE;
        List<HubItemHubUser> hubItemHubUsers = hubItemMapper.selectHotItems(begin, DEFAULT_ITEM_SIZE);
        if (hubItemHubUsers == null) {
            return null;
        }
        return itemsToSources(hubItemHubUsers);
    }

    @Override
    public List<SimpleSource> getRecommendItems(int page) {
        int begin = (page - 1) * DEFAULT_ITEM_SIZE;
        List<HubItemHubUser> hubItemHubUsers = hubItemMapper.selectRecommendItems(begin, DEFAULT_ITEM_SIZE);
        if (hubItemHubUsers == null) {
            return null;
        }
        return itemsToSources(hubItemHubUsers);
    }

    @Override
    public List<Hub> getRecommendHubs() {
        return hubMapper.selectPopularities(DEFAULT_HUB_SIZE);
    }

    @Override
    public List<User> getActiveUsers() {
        return userMapper.selectActive(DEFAULT_USER_SIZE);
    }

    @Override
    public List<User> getNewUsers() {
        return userMapper.selectNew(DEFAULT_USER_SIZE);
    }

    private List<SimpleSource> itemsToSources(List<HubItemHubUser> items) {
        List<SimpleSource> simpleSources = new ArrayList<>();

        for (HubItemHubUser item : items) {
            SimpleSource simpleSource = itemToSource(item);
            simpleSources.add(simpleSource);
        }

        return simpleSources;
    }

    private SimpleSource itemToSource(HubItemHubUser item) {
        SimpleSource simpleSource = new SimpleSource();
        simpleSource.setName(item.getName());
        simpleSource.setImage(item.getImage());
        simpleSource.setUrl(item.getUrl());
        simpleSource.setRecommend(item.getRecommend());
        String description = createDescription(item);
        simpleSource.setDescription(description);
        List<Tag> tags = new ArrayList<>();
        tags.add(new Tag("globe icon", item.getType()));
        tags.add(new Tag("cube icon", item.getHubName()));
        simpleSource.setTags(tags);
        simpleSource.setHubId(item.getHubId());
        simpleSource.setMd5(item.getHubMd5());
        return simpleSource;
    }

    private String createDescription(HubItemHubUser item) {
        // 例如：1小时前，来源于 <a href='/info/1'>Anoy</a> 的收藏
        String time = TimeUtils.natureTime(item.getCreateTime());
        return time + String.format(DESC_FORMAT, item.getUserId(), item.getNickname());
    }
}
