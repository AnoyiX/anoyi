package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Insert("insert into any_user(open_id, password, login_type, nickname, avatar, gender, meta, md5) values (#{openId}, #{password}, #{loginType}, #{nickname}, #{avatar}, #{gender}, #{meta}, #{md5})")
    @SelectKey(statement = "SELECT LAST_INSERT_ID()", keyProperty = "id", before = false, resultType = long.class)
    int insert(User user);


    @Update("update any_user" +
            "  set login_type=#{loginType}," +
            "  nickname=#{nickname}," +
            "  avatar=#{avatar}," +
            "  gender=#{gender}," +
            "  meta=#{meta}," +
            "  md5=#{md5}" +
            "  where open_id = #{openId}")
    void update(User user);

    @Select("select * from any_user where open_id = #{openId}")
    User selectByOpenId(@Param("openId") String openId);

    @Select("select * from any_user where id = #{userId}")
    User selectById(@Param("userId") Long userId);

    @Select("select * from any_user order by id desc limit #{size}")
    List<User> selectNew(@Param("size") int size);

    @Select("select * from any_user u left join any_hub_item hi on u.id = hi.user_id and hi.create_time between date_sub(now(), interval 7 day) and now() group by u.id order by count(u.id) desc limit #{size}")
    List<User> selectActive(@Param("size") int size);

    @Select("select * from any_user u left join any_attention a on u.id = a.other_id group by u.id order by count(u.id) desc limit #{size}")
    List<User> selectPopular(@Param("size") int size);

    @Select("select * from any_user where id in(select other_id from any_attention where user_id = #{userId}) order by id desc limit #{begin}, #{size}")
    List<User> selectIdols(@Param("userId") Long userId, @Param("begin") int begin, @Param("size") int size);

    @Select("select * from any_user where id in(select user_id from any_attention where other_id = #{userId}) order by id desc limit #{begin}, #{size}")
    List<User> selectFans(@Param("userId") Long userId, @Param("begin") int begin, @Param("size") int size);

}