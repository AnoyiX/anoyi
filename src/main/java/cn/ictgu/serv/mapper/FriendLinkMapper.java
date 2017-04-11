package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.FriendLink;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 友情链接 Mapper
 * Created by Silence on 2017/3/9.
 */
@Mapper
public interface FriendLinkMapper {

  @Insert("INSERT INTO friend_link(`name`, `domain`, `show`) values (#{name}, #{domain}, #{show})")
  int insert(FriendLink friendLink);

  @Select("SELECT COUNT(*) FROM friend_link WHERE domain = #{domain}")
  int countByDomain(@Param("domain") String domain);

  @Select("SELECT * FROM friend_link WHERE `show` = 'YES' ORDER BY id DESC")
  List<FriendLink> selectShowEqYesDesc();

  @Select("SELECT * FROM friend_link ORDER BY id DESC LIMIT #{index}, #{size}")
  List<FriendLink> selectAllDesc(@Param("index") int index, @Param("size") int size);

}
