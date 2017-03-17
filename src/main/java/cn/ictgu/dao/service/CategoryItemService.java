package cn.ictgu.dao.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.ictgu.dao.mapper.CategoryItemMapper;
import cn.ictgu.dao.mapper.CategoryMapper;
import cn.ictgu.dao.model.CategoryItem;
import cn.ictgu.dao.model.enumclass.CategoryItemType;

/**
 * CategoryItem Service Created by Silence on 2017/3/14.
 */
@Service
public class CategoryItemService {

	@Autowired
	private CategoryItemMapper mapper;

	@Autowired
	private CategoryMapper categoryMapper;

	private Map<String, String> defaultImages;

	public CategoryItemService() {
		defaultImages = new HashMap<>();
		defaultImages.put(CategoryItemType.VIDEO.name(), "/image/item-video.png");
		defaultImages.put(CategoryItemType.ARTICLE.name(), "/image/item-article.png");
	}

	public List<CategoryItem> list(Long categoryId, Long userId) {
		List<CategoryItem> items = mapper.selectByCategoryIdAndUserId(categoryId, userId);
		if (items != null) {
			return items;
		}
		return new ArrayList<>();
	}

	@Transactional
	public boolean insert(CategoryItem item) {
		// 如果分类不属于当前用户，则无法添加记录
		if (categoryMapper.selectByIdAndUserId(item.getCategoryId(), item.getUserId()) == null) {
			return false;
		}
		String image = item.getImage();
		if (StringUtils.isEmpty(image)) {
			String type = item.getType();
			image = defaultImages.get(type);
			item.setImage(image);
		}
		if (mapper.insert(item) > 0) {
			categoryMapper.addAmountById(item.getCategoryId());
			return true;
		}
		return false;
	}

	@Transactional
	public boolean delete(Long id, Long userId) {
		Long categoryId = mapper.selectCategoryId(id, userId);
		if (mapper.delete(id, userId) > 0) {
			categoryMapper.reduceAmountById(categoryId);
			return true;
		}
		return false;
	}

}
