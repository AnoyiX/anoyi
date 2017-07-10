package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.FriendLink;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 友情链接
 */
@Mapper
public interface FriendLinkMapper {

    /**
     * 添加
     */
    @Insert("INSERT INTO any_friend_link(`name`, `domain`, `show`) values (#{name}, #{domain}, #{show})")
    int insert(FriendLink friendLink);

    /**
     *
     */
    @Select("SELECT COUNT(*) FROM friend_link WHERE domain = #{domain}")
    int countByDomain(@Param("domain") String domain);

    /**
     * 查询在首页展示的
     */
    @Select("SELECT * FROM any_friend_link WHERE `show` = 'YES' ORDER BY id DESC")
    List<FriendLink> selectShowEqYesDesc();

    /**
     * 分页查询
     */
    @Select("SELECT * FROM any_friend_link ORDER BY id DESC LIMIT #{index}, #{size}")
    List<FriendLink> selectAllDesc(@Param("index") int index, @Param("size") int size);

}
