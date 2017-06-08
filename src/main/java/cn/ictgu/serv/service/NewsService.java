package cn.ictgu.serv.service;

import cn.ictgu.serv.model.Category;
import cn.ictgu.serv.model.CategoryItem;

import java.util.List;

public interface NewsService {

    List<CategoryItem> getNewItems(Long userId);

    List<Category> getAllCategories(Long userId);

}
