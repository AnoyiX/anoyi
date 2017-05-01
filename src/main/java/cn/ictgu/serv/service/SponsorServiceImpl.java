package cn.ictgu.serv.service;

import cn.ictgu.serv.mapper.SponsorMapper;
import cn.ictgu.serv.model.Sponsor;
import cn.ictgu.serv.service.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Sponsor Service
 * Created by Silence on 2017/4/19.
 */
@Service
public class SponsorServiceImpl implements SponsorService{

  @Autowired
  private SponsorMapper mapper;

  @Override
  public List<Sponsor> list() {
    return mapper.list();
  }

}
