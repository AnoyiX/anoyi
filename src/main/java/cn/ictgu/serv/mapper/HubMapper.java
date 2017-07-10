package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.Hub;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * 分类
 */
@Mapper
public interface HubMapper {


    @Insert("INSERT INTO any_hub(`user_id`, `avatar`, `name`, `description`, `md5`) VALUES (#{userId}, #{avatar}, #{name}, #{description}, #{md5})")
    int insert(Hub hub);

    @Update("UPDATE any_hub SET `amount` = `amount` + 1 WHERE `id` = #{id}")
    void addAmountById(@Param("id") Long id);

    @Update("UPDATE any_hub SET `amount` = `amount` - 1 WHERE `id` = #{id}")
    void reduceAmountById(@Param("id") Long id);

    @Update("UPDATE any_hub SET `popularity` = `popularity` + 1 WHERE `id` = #{id}")
    void addPopularityById(@Param("id") Long id);

    @Delete("DELETE FROM any_hub WHERE `id` = #{id} and `user_id` = #{userId}")
    int delete(@Param("userId") Long userId, @Param("id") Long id);

    @Select("SELECT * FROM any_hub WHERE `user_id` = #{userId} order by id desc")
    List<Hub> selectByUserId(@Param("userId") Long userId);

    @Select("SELECT * FROM any_hub WHERE `id` = #{id} and `user_id` = #{userId}")
    Hub selectByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);

    @Select("SELECT * FROM any_hub WHERE `md5` = #{md5}")
    List<Hub> selectByMd5(@Param("md5") String md5);

    @Select("SELECT * FROM any_hub order by `popularity` desc limit #{size}")
    List<Hub> selectPopularities(@Param("size") int size);

}
