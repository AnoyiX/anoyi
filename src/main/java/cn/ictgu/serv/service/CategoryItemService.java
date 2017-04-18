package cn.ictgu.serv.service;

import cn.ictgu.serv.model.CategoryItem;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * CategoryItem Service
 * Created by Silence on 2017/3/14.
 */
public interface CategoryItemService {

  /* 查询某个用户某个分类的所有子项 */
  List<CategoryItem> list(Long categoryId, Long userId);

  /* 插入一条记录 */
  boolean insert(CategoryItem item);

  /* 删除一条记录 */
  boolean delete(Long id, Long userId);

}
