
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `any_attention`
-- ----------------------------
DROP TABLE IF EXISTS `any_attention`;
CREATE TABLE `any_attention` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '自己ID',
  `other_id` int(11) NOT NULL COMMENT '对方ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `any_attention`
-- ----------------------------
BEGIN;
INSERT INTO `any_attention` VALUES ('12', '4', '1', '2017-07-08 13:34:20'), ('13', '1', '4', '2017-07-08 13:38:05'), ('14', '1', '3', '2017-07-08 14:08:29'), ('15', '1', '2', '2017-07-08 14:08:33'), ('16', '1', '5', '2017-07-08 21:48:08'), ('17', '3', '1', '2017-07-09 09:31:00'), ('18', '1', '6', '2017-07-09 21:25:56'), ('19', '1', '7', '2017-07-09 21:31:58'), ('20', '2', '8', '2017-07-09 22:23:43'), ('21', '1', '9', '2017-07-09 23:18:52'), ('22', '1', '11', '2017-07-10 06:00:26'), ('23', '1', '10', '2017-07-10 06:00:34'), ('24', '1', '12', '2017-07-10 08:37:20'), ('25', '1', '13', '2017-07-10 12:00:23');
COMMIT;

-- ----------------------------
--  Table structure for `any_friend_link`
-- ----------------------------
DROP TABLE IF EXISTS `any_friend_link`;
CREATE TABLE `any_friend_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '名称',
  `domain` varchar(32) DEFAULT NULL COMMENT '域名',
  `show` varchar(4) DEFAULT NULL COMMENT '是否在首页显示',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `any_friend_link`
-- ----------------------------
BEGIN;
INSERT INTO `any_friend_link` VALUES ('1', 'BySocket', 'http://bysocket.com', 'YES', '2017-07-03 09:59:43'), ('2', 'ITMuch', 'http://itmuch.com/', 'YES', '2017-07-08 12:58:33'), ('3', 'ITriangle', 'http://triangleidea.com', 'YES', '2017-07-08 12:58:51'), ('4', 'NOCMT', 'http://nocmt.com', 'YES', '2017-07-08 12:59:26'), ('5', 'Spring4All', 'http://spring4all.com', 'YES', '2017-07-08 13:04:37'), ('6', 'DIDISPACE', 'http://blog.didispace.com/', 'YES', '2017-07-10 16:32:52'), ('7', 'ICNWS', 'http://www.icnws.com/', 'YES', '2017-07-10 16:34:20');
COMMIT;

-- ----------------------------
--  Table structure for `any_hub`
-- ----------------------------
DROP TABLE IF EXISTS `any_hub`;
CREATE TABLE `any_hub` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '创建者ID',
  `origin_id` int(11) DEFAULT NULL COMMENT '原始作者ID',
  `avatar` varchar(128) DEFAULT NULL COMMENT '创建者头像',
  `name` varchar(32) DEFAULT NULL COMMENT '仓库名称',
  `description` varchar(128) DEFAULT NULL COMMENT '描述',
  `amount` int(11) DEFAULT '0' COMMENT '内容数量',
  `popularity` int(11) DEFAULT '0' COMMENT '人气值',
  `md5` varchar(32) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `any_hub`
-- ----------------------------
BEGIN;
INSERT INTO `any_hub` VALUES ('5', '1', null, '//q.qlogo.cn/qqapp/101386962/1DB493351A3CFA20BACDA98B267C227E/100', 'Spring Cloud', '专业收藏 Spring Cloud 教程三十年', '8', '60', '6644e468', '2017-07-08 13:28:12'), ('6', '1', null, '//q.qlogo.cn/qqapp/101386962/1DB493351A3CFA20BACDA98B267C227E/100', '电视剧', '无聊时候看看咯！', '1', '16', 'd45f93c0', '2017-07-08 13:28:58'), ('8', '2', null, '//q.qlogo.cn/qqapp/101386962/CF4BD92F897D56B149AFDEC80D2EC6CE/100', '装死 丶 电影屋', '求大佬们的关注，赏识！谢谢！', '4', '2', '7b975041', '2017-07-09 21:49:51'), ('9', '9', null, '//q.qlogo.cn/qqapp/101386962/E0E2DF3A642F47817D0B571E2E18FC7D/100', '电影', '电影', '0', '3', '3daf2ee3', '2017-07-09 22:50:51'), ('10', '10', null, 'https://avatars0.githubusercontent.com/u/7386611?v=3', 'tt', 'tt', '1', '2', 'b08474c0', '2017-07-09 23:20:50'), ('11', '1', null, '//q.qlogo.cn/qqapp/101386962/1DB493351A3CFA20BACDA98B267C227E/100', 'IT 你不知道的事', '搜集一些新技术动态，仅此而已！', '2', '2', 'cece242e', '2017-07-10 07:25:14'), ('12', '1', null, '//q.qlogo.cn/qqapp/101386962/1DB493351A3CFA20BACDA98B267C227E/100', '架构师之路', '不想成为架构师的程序员不是好程序员 ~', '2', '2', 'a70287fe', '2017-07-10 07:28:21'), ('13', '2', null, '//q.qlogo.cn/qqapp/101386962/CF4BD92F897D56B149AFDEC80D2EC6CE/100', '装死丶Music', '听点让人心旷神怡的音乐吧 ~', '1', '0', '1e082dce', '2017-07-10 07:34:21'), ('14', '1', null, '//q.qlogo.cn/qqapp/101386962/1DB493351A3CFA20BACDA98B267C227E/100', 'Spring Boot 全栈', '优雅的代码，优雅的应用！', '1', '0', '07266e46', '2017-07-10 19:03:17');
COMMIT;

-- ----------------------------
--  Table structure for `any_hub_item`
-- ----------------------------
DROP TABLE IF EXISTS `any_hub_item`;
CREATE TABLE `any_hub_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'I',
  `user_id` int(11) DEFAULT NULL COMMENT '用户 ID',
  `hub_id` int(11) DEFAULT NULL COMMENT '仓库ID',
  `type` varchar(10) DEFAULT NULL COMMENT '类型',
  `name` varchar(256) DEFAULT NULL COMMENT '名称',
  `image` varchar(256) DEFAULT NULL COMMENT '类型图片',
  `url` varchar(128) DEFAULT NULL COMMENT '资源地址',
  `recommend` tinyint(1) DEFAULT '0' COMMENT '推荐 1是 0否',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `any_hub_item`
-- ----------------------------
BEGIN;
INSERT INTO `any_hub_item` VALUES ('23', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：服务注册与发现（Eureka、Consul）【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkE0c98Mgcn8uRZbmXTicEZxDjr1yGEEATknrBJsLqORgribAfrSnNhtsRuSxsABiciadR0OrtbuD5epQA/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/A9K4L69jgP9MqcjlVyQk0A', '1', '2017-07-09 09:39:55'), ('24', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：服务消费（基础）【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkE0c98Mgcn8uRZbmXTicEZxD2brrsYMJFyTfT4qGSI1YGVKm2J2JiaickqbL6q3Fm9iaYsk27AF6rgz1w/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/5za2p6PucOFEMo7zjzQM5A', '1', '2017-07-09 09:40:37'), ('25', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：服务消费（Ribbon）【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkFoharnibegmbxX7ic7j0N9EGrxcY65af0k2frwNnzIzOnm2brRtuUW0UicwByBv7ibZsOE36icQeyEb0Q/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/fth5k0YtzhG24YSI2JvwzA', '1', '2017-07-09 09:41:20'), ('26', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：服务消费（Feign）【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkHxeicicd3s5qyKCFOCibsqVpBW6yY9pRlUUREGSvboStUEcTaqZfGMDWXmJGD2ZJrfZvVMqGOsHSe0w/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/3dx_-87qqocjDxnWh5rmIQ', '1', '2017-07-09 09:41:54'), ('27', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：分布式配置中心【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkHrPgLQj17ppqrsbAf3jhmxLsc4sB0L4Zheiag4wOuNV53jsT7PhlyE6EBC3OkfuQUyeWgR628KmzQ/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/IV288rDyg2KQQDMKr3QfFQ', '1', '2017-07-09 09:42:53'), ('28', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：服务容错保护（Hystrix服务降级）【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkEYr2DUHaUZPP3Gl3tPsuKibZOaf9PxQLJYVyEpvKWticUD6l2pEIVkMSN2StHFjBq1G8qzPqD5C9BA/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/xXlzMzs4ZTyDBDYM0VTewQ', '1', '2017-07-09 09:43:30'), ('29', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：服务容错保护（Hystrix依赖隔离）【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkET1pF2yxo3ZYiafblT00a1uytNcQJUphMm4dZQRx6sBfQWbPMlK6RmWtGEc5yE68zBZSJSZlDZQlg/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/Ip6VICjgrtOZqNFjDS8vEw', '1', '2017-07-09 09:44:14'), ('30', '1', '5', 'ARTICLE', 'Spring Cloud构建微服务架构：服务容错保护（Hystrix断路器）【Dalston版】', 'http://mmbiz.qpic.cn/mmbiz_jpg/R3InYSAIZkFFEDEVSz4yWGkCjsTJSCXgzwqX8nicPJ2liax61hIiarbkzGpnMjQElbiaH1iakhZFAK95kzEjFq6WIcg/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/HjpgSb3IoKpDe5VCP2cpxA', '1', '2017-07-09 09:44:53'), ('31', '1', '6', 'VIDEO', '楚乔传40', '//i3.letvimg.com/lc05_isvrs/201707/07/00/32/2c019721-2d75-467a-ba93-4d393f4b6b06/thumb/2_360_180.jpg', 'http://www.le.com/ptv/vplay/30298515.html', '0', '2017-07-09 10:04:18'), ('32', '2', '8', 'VIDEO', '海边的曼彻斯特', '//i0.letvimg.com/lc09_yunzhuanma/201706/23/23/26/350b59017d2d35354584d0ab3d4b2262_v2_MTMwOTY0NDY0/thumb/2_360_180.jpg', 'http://www.le.com/ptv/vplay/30094429.html', '0', '2017-07-09 21:53:37'), ('33', '2', '8', 'VIDEO', '长城 国语版', '//i1.letvimg.com/lc06_isvrs/201705/27/16/00/b2378418-2aba-49b5-8242-df50570795bd/thumb/2_360_180.jpg', 'http://www.le.com/ptv/vplay/29621955.html', '0', '2017-07-09 21:53:47'), ('34', '2', '8', 'VIDEO', '一条狗的使命', '//i1.letvimg.com/lc10_yunzhuanma/201705/05/11/05/e55cc959506ee388bc5aaec1cefd8644_v2_MTI5MTc0MTg0/thumb/2_360_180.jpg', 'http://www.le.com/ptv/vplay/29225954.html', '0', '2017-07-09 21:54:09'), ('35', '2', '8', 'VIDEO', '《京城81号2》精彩特辑', '//i3.letvimg.com/lc02_isvrs/201707/04/10/56/6af4d16e-b6f3-473a-bb44-2b9e9a6729b4/thumb/2_360_180.jpg', 'http://www.le.com/ptv/vplay/30259060.html', '0', '2017-07-09 21:54:36'), ('36', '10', '10', 'VIDEO', '《奔跑吧》20170707：热巴回应被孤立传闻 陈赫参加综艺有隐情？', '//i1.letvimg.com/lc03_isvrs/201707/07/22/59/34624f1e-2e7d-41d8-967a-cb6a0dee636a/thumb/2_360_180.jpg', 'http://www.le.com/ptv/vplay/30292550.html', '0', '2017-07-09 23:21:15'), ('37', '1', '11', 'ARTICLE', '【独家】RediSearch - Redis强大的搜索引擎', 'http://mmbiz.qpic.cn/mmbiz_png/3xsFRgx4kHqwHXShAwdnKHKmeYyE6S8Hu8MsIPVkg0hHP1J05nzIWIsHxW1SicspP4HdKlJZsxpJm4tNYib6sdBw/0?wx_fmt=png', 'http://mp.weixin.qq.com/s/JmmHcCUvW0J7NZpDFjSGMg', '0', '2017-07-10 07:26:19'), ('38', '1', '12', 'ARTICLE', '工作线程数究竟要设置为多少 | 架构师之路', 'http://mmbiz.qpic.cn/mmbiz_png/YrezxckhYOwBhBriaic5FgLMGRAYrbiacibpcQGG7y1c7GQ5pEE5OAibgjrCISazRkOz3cQKT5YAPwbGEUrgAVwqibpg/0?wx_fmt=png', 'http://mp.weixin.qq.com/s/BRpngTEFHjzpGv8tkdqmPQ', '0', '2017-07-10 07:28:58'), ('39', '1', '11', 'ARTICLE', 'AI越来越火，装逼的同学赶紧把这28个AI术语收了', 'http://mmbiz.qpic.cn/mmbiz_png/7xEgl6ic8qHTxvAu0m07xwnXtWjPcCwIhQ6E84qDRQkYL0okbpaPhHqwbf03OsXAIsQFIcdBoQxyC36cDnQdJJA/0?wx_fmt=png', 'http://mp.weixin.qq.com/s/WR8n2B9eEeUvBTtpaXQVSw', '0', '2017-07-10 07:29:51'), ('40', '2', '13', 'ARTICLE', '超养眼的 SEVE 鬼步舞，女神级的颜值和身材', 'http://mmbiz.qpic.cn/mmbiz_jpg/bs2x4DBy2oWmpbsdmBAQMD2SNyvYQk8XgcQswtW5yVXzUpeK22FtHialefZYRnDwKY8BS0KEC7plggbdXuUNmsw/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/J9NUBojiYumfAk6xrkK5Gw', '0', '2017-07-10 07:36:43'), ('41', '1', '12', 'ARTICLE', '1对多业务，数据库水平切分架构一次搞定 | 架构师之路', 'http://mmbiz.qpic.cn/mmbiz_jpg/YrezxckhYOzajH6V9v1iaKUia3p9an5fiaXe2IU5CX41wKXm8r9LLiaaQ5eRJY3Qx3vhibniaW9ZxVu8erHz3dIZqLQw/0?wx_fmt=jpeg', 'http://mp.weixin.qq.com/s/kOTz5XAeAcUI2gzKl7AEHw', '0', '2017-07-10 08:41:02'), ('42', '1', '14', 'ARTICLE', 'Spring Boot Log4j2 日志性能之巅', 'http://upload-images.jianshu.io/upload_images/3424642-2c273dda71e459dc.png?imageMogr2/auto-orient/strip%7CimageView2/2', 'http://www.jianshu.com/p/f18a9cff351d', '0', '2017-07-10 19:03:42');
COMMIT;

-- ----------------------------
--  Table structure for `any_tip`
-- ----------------------------
DROP TABLE IF EXISTS `any_tip`;
CREATE TABLE `any_tip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(16) DEFAULT NULL COMMENT '姓名',
  `from` varchar(8) DEFAULT NULL COMMENT '来源',
  `money` int(11) DEFAULT NULL COMMENT '金额',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `any_tip`
-- ----------------------------
BEGIN;
INSERT INTO `any_tip` VALUES ('1', 'A90198', '简书', '5', '2017-04-19 19:34:32'), ('2', '匿名网友', '微信', '5', '2017-04-21 15:53:34'), ('3', '匿名网友', '微信', '50', '2017-06-08 17:16:10'), ('4', '张向阳', '支付宝', '5', '2017-06-12 09:55:25'), ('5', '大志', '支付宝', '5', '2017-06-21 23:01:51');
COMMIT;

-- ----------------------------
--  Table structure for `any_user`
-- ----------------------------
DROP TABLE IF EXISTS `any_user`;
CREATE TABLE `any_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(64) NOT NULL COMMENT '用户唯一身份识别 ID',
  `password` varchar(32) DEFAULT NULL,
  `login_type` varchar(4) DEFAULT NULL COMMENT '登录类型',
  `nickname` varchar(32) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(128) DEFAULT NULL COMMENT '头像',
  `gender` varchar(2) DEFAULT NULL COMMENT '性别',
  `meta` varchar(64) DEFAULT NULL COMMENT '其他信息',
  `md5` varchar(32) DEFAULT NULL COMMENT '个人信息md5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `any_user`
-- ----------------------------
BEGIN;
INSERT INTO `any_user` VALUES ('1', '1DB493351A3CFA20BACDA98B267C227E', null, 'QQ', 'Anoy', 'http://q.qlogo.cn/qqapp/101386962/1DB493351A3CFA20BACDA98B267C227E/100', '男', '1996 上海', 'cceb16794b768cabf72abd45757e9de8'), ('2', 'CF4BD92F897D56B149AFDEC80D2EC6CE', null, 'QQ', 'Mr Yang', 'http://q.qlogo.cn/qqapp/101386962/CF4BD92F897D56B149AFDEC80D2EC6CE/100', '男', '2014 ', '44243a9ba0295ad574d8d383288a15ae'), ('3', '12091906', null, 'GIT', 'ChinaSilence', 'https://avatars3.githubusercontent.com/u/12091906?v=3', '男', '上海 杨远东 Tezign Inc.', '071fbce820df2155a4418af488fd51d8'), ('4', '37FD7E3D496B56A1EBC67871BBA63E74', null, 'QQ', '小Fun', '//q.qlogo.cn/qqapp/101386962/37FD7E3D496B56A1EBC67871BBA63E74/100', '女', '1993 湖北', '9772d0eba20fc6e6f27a1b5e809b88ad'), ('5', '5243B136256B52D56496136ABA71C13F', null, 'QQ', '解忧草', '//q.qlogo.cn/qqapp/101386962/5243B136256B52D56496136ABA71C13F/100', '女', '1995 广东', '1a47f2fc535c17e9d47f0bd32fcbcfb1'), ('6', '0261D7EF59BF887B20CA8DC3B71AD051', null, 'QQ', '深度思考浅未来', '//q.qlogo.cn/qqapp/101386962/0261D7EF59BF887B20CA8DC3B71AD051/100', '男', '1990 山西', '8d08ca085df97b4321d5a59948032bc9'), ('7', '6A47841EB4A6DD8C3BAD35F593D25DBC', null, 'QQ', 'sonnet', '//q.qlogo.cn/qqapp/101386962/6A47841EB4A6DD8C3BAD35F593D25DBC/100', '男', '1995 广东', 'a3a64db2cd892056a837563181611173'), ('8', 'B69B7504CF91FEE07D716D0C0D89867F', null, 'QQ', 'Biu╃→²º¹6', '//q.qlogo.cn/qqapp/101386962/B69B7504CF91FEE07D716D0C0D89867F/100', '男', '2013 山东', '3a5c4d11aff073e8bec48cab80503de0'), ('9', 'E0E2DF3A642F47817D0B571E2E18FC7D', null, 'QQ', '月神夜', '//q.qlogo.cn/qqapp/101386962/E0E2DF3A642F47817D0B571E2E18FC7D/100', '男', '2010 ', 'd19d01e8c7894db7f0a171bca34be52e'), ('10', '7386611', null, 'GIT', 'xingdaolin', 'https://avatars0.githubusercontent.com/u/7386611?v=3', '男', 'beijing null null', '050903b152325afaafd472c87b4ae8db'), ('11', '9B7EAA93B81CF4C7F7F96540BC343195', null, 'QQ', 'Flying Fish', '//q.qlogo.cn/qqapp/101386962/9B7EAA93B81CF4C7F7F96540BC343195/100', '男', '1991 广东', '2e3e000bf33e0ce3838d93d9b0adf3d7'), ('12', 'F512A2633EF73E6FC65ACF91CBC7D285', null, 'QQ', 'M', '//q.qlogo.cn/qqapp/101386962/F512A2633EF73E6FC65ACF91CBC7D285/100', '男', '2000 ', '8c3ead9021f30051633d5ddf32a78272'), ('13', 'D22D355B212F6AE4B976AF61BD1AD901', null, 'QQ', 'か始于☞初见', '//q.qlogo.cn/qqapp/101386962/D22D355B212F6AE4B976AF61BD1AD901/100', '男', '1994 湖北', '1c6d924a4a1d412d0abc8ca00759184d');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
