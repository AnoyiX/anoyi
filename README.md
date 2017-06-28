# any-video
Spring Boot 结合网络爬虫开发的完整视频网站，演示地址：http://www.ictgu.cn

2.0 版正在开发中，QQ群：481678152，欢迎讨论。

![首页](http://upload-images.jianshu.io/upload_images/3424642-a987228814be7597.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![视频解析](http://upload-images.jianshu.io/upload_images/3424642-bebdcd80a5f7b68e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![文章解析](http://upload-images.jianshu.io/upload_images/3424642-570107d139619963.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![自定义分类](http://upload-images.jianshu.io/upload_images/3424642-3dd5ad72e1c9d352.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![技术动态](http://upload-images.jianshu.io/upload_images/3424642-0e28b6c0d9058c89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


更新记录
-------
- （4月11日）完美解决乐视视频VIP视频解析，自动选择最高清视频
- （4月18日）选用性能更好的Undertow替代Tomcat，更新部分视频解析的代码
- （5月01日）添加文章解析功能（目前支持微信文章），添加熊猫TV支持，删除无用代码
- （6月08日）添加“动态”页面，分享最新的技术文章，规范化代码

开发环境
-------
- JDK 1.8
- MariaDB 10.1.22（MySql通用）
- Redis 3.2.8
- Maven 3.3.9
- 开发工具 intellij idea 2016
- 版本控制 Git
- 开发测试环境 Windows 10
- 生产运行环境 CentOS 7.2

技术框架
------
- 核心：Spring Boot 1.5.1
- 数据：Mybatis
- 数据库连接池：Hikari
- 安全: Spring Serucity
- 模板：Thymeleaf 3
- 前端：Bootstrap  + Jquery
- 爬虫：Jsoup
- 容器: Undertow

详细文档
----
- [Spring Boot 全栈开发：初章](http://www.jianshu.com/p/aff05f5bd8a1)
- [Spring Boot 全栈开发：开发环境搭建](http://www.jianshu.com/p/8a9ed762caf7)
- [Spring Boot 全栈开发：应用部署使用](http://www.jianshu.com/p/cde6027c5f9a)
- [Spring Boot 全栈开发：解析器实现](http://www.jianshu.com/p/ab4f7415491b)
- [Spring Boot 全栈开发：视频解析之优酷](http://www.jianshu.com/p/23292186e972)
- [Spring Boot 全栈开发：视频解析之乐视](http://www.jianshu.com/p/e521d989068d)
- [Spring Boot 全栈开发：漂亮的邮件注册](http://www.jianshu.com/p/927e179a747a)
- [Spring Boot 全栈开发：用户安全](http://www.jianshu.com/p/c883b86c34fa)
- [Spring Boot 全栈开发：并发爬虫优化](http://www.jianshu.com/p/2c39c7e7847a)（未在github源码中实现）
- 未完待续
