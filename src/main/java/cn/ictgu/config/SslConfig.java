package cn.ictgu.config;

import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.undertow.UndertowEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SslConfig {

    /**
     * 增加 80 端口的监听
     */
    @Bean
    public EmbeddedServletContainerFactory servletContainer() {
        UndertowEmbeddedServletContainerFactory undertowFactory = new UndertowEmbeddedServletContainerFactory();
        undertowFactory.addBuilderCustomizers(builder -> builder.addHttpListener(80,"0.0.0.0"));
        return undertowFactory;
    }

}
