package cn.ictgu.dao.service;

import cn.ictgu.dao.mapper.CategoryItemMapper;
import cn.ictgu.dao.mapper.CategoryMapper;
import cn.ictgu.dao.model.Category;
import lombok.extern.log4j.Log4j;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Category Service
 * Created by Silence on 2017/3/13.
 */
@Service
@Log4j
public class CategoryService {

  private static final String LOGO = "/image/category/%s.jpg";

  @Autowired
  private CategoryMapper mapper;

  @Autowired
  private CategoryItemMapper itemMapper;

  public List<Category> getByUserId(Long userId){
    List<Category> categories = mapper.selectByUserId(userId);
    if (categories ==  null){
      return new ArrayList<>();
    }
    return categories;
  }

  public Category getByMd5(String md5){
    List<Category> categories = mapper.selectByMd5(md5);
    if (categories.size() == 1){
      Category category = categories.get(0);
      mapper.addPopularityById(category.getId());
      return category;
    }else {
      log.error("获取分享信息失败,MD5:" + md5);
    }
    return null;
  }

  public Category getById(Long id, Long userId){
    Category category = mapper.selectByIdAndUserId(id, userId);
    if (category != null){
      return category;
    }
    return new Category();
  }

  @Transactional
  public boolean deleteByUserIdAndId(Long userId, Long id){
    if (mapper.delete(userId, id) > 0){
      // 删除分类后，删除分类下所有的内容
      itemMapper.deleteCategory(id, userId);
      return true;
    }
    return false;
}

  public boolean insert(Long userId, String name){
    Category category = new Category();
    category.setName(name);
    category.setUserId(userId);
    String md5 = generateMD5(userId, name);
    category.setMd5(md5);
    String logo = generateLogo();
    category.setLogo(logo);
    return mapper.insert(category) > 0;
  }

  private String generateMD5(Long userId, String name){
    Long time = new Date().getTime();
    byte[] bytes = (time + userId + name).getBytes();
    return DigestUtils.md5DigestAsHex(bytes);
  }

  private String generateLogo(){
    String random = String.valueOf(RandomUtils.nextInt(10));
    return String.format(LOGO, random);
  }

}
