package cn.ictgu.serv.service;

import cn.ictgu.serv.model.Tip;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TipService {

    List<Tip> list();

}
