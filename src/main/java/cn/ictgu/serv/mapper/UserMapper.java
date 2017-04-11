package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;

/**
 * User Mapper
 * Created by Silence on 2017/3/11.
 */
@Mapper
public interface UserMapper {

  @Insert("INSERT INTO user(`email`, `password`, `nickname`) VALUES(#{email}, #{password}, #{nickname})")
  @SelectKey(statement = "SELECT LAST_INSERT_ID()", keyProperty = "id", before = false, resultType = long.class)
  int insert(User user);

  @Select("SELECT * FROM user WHERE `id` = #{id}")
  User selectById(@Param("id") Long id);

  @Select("SELECT * FROM user WHERE `email` = #{email}")
  User selectByEmail(@Param("email") String email);

  @Update("UPDATE user SET `nickname` = #{nickname} WHERE `id` = #{id}")
  int updateNicknameById(@Param("id") Long id, @Param("nickname") String nickname);

}
