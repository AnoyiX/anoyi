package cn.ictgu.dao.service;

import cn.ictgu.dao.mapper.JujiMapper;
import cn.ictgu.dao.model.Episode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Episode 服务层
 * Created by Silence on 2016/12/12.
 */
@Service
public class JujiService {

  @Autowired
  private JujiMapper mapper;

  public List<Episode> selectByVideoId(long videoId){
    List<Episode> episodes = mapper.selectByVideoId(videoId);
    if (episodes == null){
      return new ArrayList<>();
    }
    return episodes;
  }

  public Long selectVideoIdByValue(String value){
    return mapper.selectVideoIdByValue(value);
  }

}
