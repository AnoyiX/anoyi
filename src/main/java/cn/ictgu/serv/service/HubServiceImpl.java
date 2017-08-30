package cn.ictgu.serv.service;

import cn.ictgu.constant.ExceptionEnum;
import cn.ictgu.exception.AnyException;
import cn.ictgu.serv.mapper.HubItemMapper;
import cn.ictgu.serv.mapper.HubMapper;
import cn.ictgu.serv.model.Hub;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.util.Date;
import java.util.List;

/**
 * 仓库管理
 */
@Service
@Log4j2
@AllArgsConstructor
public class HubServiceImpl implements HubService {

    private final HubMapper mapper;

    private final HubItemMapper itemMapper;

    public List<Hub> getByUserId(Long userId) {
        return mapper.selectByUserId(userId);
    }

    public Hub getByMd5(String md5) {
        List<Hub> categories = mapper.selectByMd5(md5);
        if (categories.size() == 1) {
            Hub category = categories.get(0);
            mapper.addPopularityById(category.getId());
            return category;
        } else {
            log.error("获取分享信息失败,MD5:" + md5);
            throw new AnyException(ExceptionEnum.HUB_ERROR);
        }
    }

    public Hub getById(Long id, Long userId) {
        return mapper.selectByIdAndUserId(id, userId);
    }

    @Transactional
    public void deleteByUserIdAndId(Long userId, Long id) {
        if (mapper.delete(userId, id) > 0) {
            // 删除分类后，删除分类下所有的内容
            itemMapper.deleteHub(id, userId);
        }
    }

    @Override
    public void insert(Hub hub) {
        String md5 = generateMD5(hub.getUserId(), hub.getName());
        hub.setMd5(md5);
        mapper.insert(hub);
    }

    private String generateMD5(Long userId, String name) {
        Long time = new Date().getTime();
        byte[] bytes = (time + userId + name).getBytes();
        return DigestUtils.md5DigestAsHex(bytes).substring(0, 8);
    }
}
