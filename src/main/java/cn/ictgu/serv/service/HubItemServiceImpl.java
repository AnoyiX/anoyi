package cn.ictgu.serv.service;

import cn.ictgu.constant.ExceptionEnum;
import cn.ictgu.exception.AnyException;
import cn.ictgu.serv.mapper.HubItemMapper;
import cn.ictgu.serv.mapper.HubMapper;
import cn.ictgu.serv.model.HubItem;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@AllArgsConstructor
public class HubItemServiceImpl implements HubItemService {

    private final HubItemMapper hubItemMapper;

    private final HubMapper hubMapper;

    @Override
    public List<HubItem> list(Long hubId, Long userId) {
        List<HubItem> items = hubItemMapper.selectByHubIdAndUserId(hubId, userId);
        if (items != null) {
            return items;
        }
        return new ArrayList<>();
    }

    @Transactional
    public void insert(HubItem item) {
        // 如果分类不属于当前用户，则无法添加记录
        if (hubMapper.selectByIdAndUserId(item.getHubId(), item.getUserId()) == null) {
            throw new AnyException(ExceptionEnum.NOT_AUTHTICATION);
        }
        hubItemMapper.insert(item);
        hubMapper.addAmountById(item.getHubId());
    }

    @Transactional
    public void delete(Long id, Long userId) {
        Long categoryId = hubItemMapper.selectHubId(id, userId);
        if (hubItemMapper.delete(id, userId) > 0) {
            hubMapper.reduceAmountById(categoryId);
        }else {
            throw new AnyException(ExceptionEnum.NOT_AUTHTICATION);
        }
    }
}
