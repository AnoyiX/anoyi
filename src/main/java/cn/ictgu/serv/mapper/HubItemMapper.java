package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.HubItem;
import cn.ictgu.serv.model.mix.HubItemHubUser;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 收藏内容
 */
@Mapper
public interface HubItemMapper {


    @Insert("INSERT INTO any_hub_item(`user_id`, `hub_id`, `type`, `name`, `image`, `url`) VALUES (#{userId}, #{hubId}, #{type}, #{name}, #{image}, #{url})")
    int insert(HubItem hubItem);

    @Delete("DELETE FROM any_hub_item WHERE `id` = #{id} and `user_id` = #{userId}")
    int delete(@Param("id") Long id, @Param("userId") Long userId);

    @Delete("DELETE FROM any_hub_item WHERE `hub_id` = #{hubId} and `user_id` = #{userId}")
    void deleteHub(@Param("hubId") Long hubId, @Param("userId") Long userId);

    @Select("SELECT `hub_id` FROM any_hub_item WHERE `id` = #{id} and `user_id` = #{userId}")
    Long selectHubId(@Param("id") Long id, @Param("userId") Long userId);

    @Select("SELECT * FROM any_hub_item WHERE `hub_id` = #{hubId} and `user_id` = #{userId} order by id desc ")
    List<HubItem> selectByHubIdAndUserId(@Param("hubId") Long hubId, @Param("userId") Long userId);

    @Select("select hi.id, hi.user_id, hi.hub_id, hi.type, hi.name, hi.image, hi.url, hi.recommend, hi.create_time, h.name as hubName, h.md5 as hubMd5, u.nickname" +
            " from any_hub_item hi"+
            " left join any_hub h on hi.hub_id = h.id"+
            " left join any_user u on hi.user_id = u.id"+
            " group by hi.url"+
            " order by hi.id desc"+
            " limit #{page}, ${size}")
    List<HubItemHubUser> selectNewItems(@Param("page") int page, @Param("size") int size);


    @Select("select hi.id, hi.user_id, hi.hub_id, hi.type, hi.name, hi.image, hi.url, hi.recommend, hi.create_time, h.name as hubName, h.md5 as hubMd5, u.nickname" +
            " from any_hub_item hi"+
            " left join any_hub h on hi.hub_id = h.id"+
            " left join any_user u on hi.user_id = u.id"+
            " group by hi.url"+
            " order by count(url) desc"+
            " limit #{page}, ${size}")
    List<HubItemHubUser> selectHotItems(@Param("page") int page, @Param("size") int size);

    @Select("select hi.id, hi.user_id, hi.hub_id, hi.type, hi.name, hi.image, hi.url, hi.recommend, hi.create_time, h.name as hubName, h.md5 as hubMd5, u.nickname" +
            " from any_hub_item hi"+
            " left join any_hub h on hi.hub_id = h.id"+
            " left join any_user u on hi.user_id = u.id"+
            " where hi.recommend = 1"+
            " group by hi.url"+
            " order by hi.id desc"+
            " limit #{page}, ${size}")
    List<HubItemHubUser> selectRecommendItems(@Param("page") int page, @Param("size") int size);

}
