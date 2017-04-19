package cn.ictgu.serv.mapper;

import cn.ictgu.serv.model.Sponsor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Sponsor Mapper
 * Created by Silence on 2017/4/19.
 */
@Mapper
public interface SponsorMapper {

  @Select("SELECT * FROM sponsor ORDER BY id DESC")
  List<Sponsor> list();

}
