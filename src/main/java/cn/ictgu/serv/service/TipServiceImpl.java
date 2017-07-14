package cn.ictgu.serv.service;

import cn.ictgu.serv.mapper.TipMapper;
import cn.ictgu.serv.model.Tip;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TipServiceImpl implements TipService {

  private final TipMapper mapper;

  @Override
  public List<Tip> list() {
    return mapper.list();
  }

}
