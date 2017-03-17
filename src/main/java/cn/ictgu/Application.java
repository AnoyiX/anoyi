package cn.ictgu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 启动程序
 * Created by Silence on 2016/11/11.
 */
@SpringBootApplication
@EnableScheduling
@EnableAsync
public class Application  {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

}
