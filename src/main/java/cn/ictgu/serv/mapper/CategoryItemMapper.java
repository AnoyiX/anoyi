package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.CategoryItem;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * CategoryItem Mapper
 * Created by Silence on 2017/3/12.
 */
@Mapper
public interface CategoryItemMapper {

  @Insert("INSERT INTO category_item(`user_id`, `category_id`, `type`, `name`, `image`, `url`) VALUES (#{userId}, #{categoryId}, #{type}, #{name}, #{image}, #{url})")
  int insert(CategoryItem categoryItem);

  @Delete("DELETE FROM category_item WHERE `id` = #{id} and `user_id` = #{userId}")
  int delete(@Param("id") Long id, @Param("userId") Long userId);

  @Delete("DELETE FROM category_item WHERE `category_id` = #{categoryId} and `user_id` = #{userId}")
  int deleteCategory(@Param("categoryId") Long categoryId, @Param("userId") Long userId);

  @Select("SELECT `category_id` FROM category_item WHERE `id` = #{id} and `user_id` = #{userId}")
  Long selectCategoryId(@Param("id") Long id, @Param("userId") Long userId);

  @Select("SELECT * FROM category_item WHERE `category_id` = #{categoryId} and `user_id` = #{userId}")
  List<CategoryItem> selectByCategoryIdAndUserId(@Param("categoryId") Long categoryId, @Param("userId") Long userId);

  @Select("SELECT ci.id,ci.user_id,category_id,type,ci.name,image,url from category_item ci left join category c on ci.category_id = c.id where ci.user_id = #{userId} order by ci.id desc limit 20")
  List<CategoryItem> selectNews(@Param("userId") Long userId);
}
