package cn.ictgu.serv.service;

import cn.ictgu.serv.model.Sponsor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Sponsor Service
 * Created by Silence on 2017/4/19.
 */
@Service
public interface SponsorService {

  public List<Sponsor> list();

}
