package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.Category;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * Category Mapper
 * Created by Silence on 2017/3/12.
 */
@Mapper
public interface CategoryMapper {

  @Insert("INSERT INTO category(`user_id`, `name`, `logo`, `md5`) VALUES (#{userId}, #{name}, #{logo}, #{md5})")
  int insert(Category category);

  @Update("UPDATE category SET `amount` = `amount` + 1 WHERE `id` = #{id}")
  int addAmountById(@Param("id") Long id);

  @Update("UPDATE category SET `amount` = `amount` - 1 WHERE `id` = #{id}")
  int reduceAmountById(@Param("id") Long id);

  @Update("UPDATE category SET `popularity` = `popularity` + 1 WHERE `id` = #{id}")
  int addPopularityById(@Param("id") Long id);

  @Delete("DELETE FROM category WHERE `id` = #{id} and `user_id` = #{userId}")
  int delete(@Param("userId") Long userId, @Param("id") Long id);

  @Select("SELECT * FROM category WHERE `user_id` = #{userId}")
  List<Category> selectByUserId(@Param("userId") Long userId);

  @Select("SELECT * FROM category WHERE `id` = #{id} and `user_id` = #{userId}")
  Category selectByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);

  @Select("SELECT * FROM category WHERE `md5` = #{md5}")
  List<Category> selectByMd5(@Param("md5") String md5);

}
