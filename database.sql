/*
Navicat MariaDB Data Transfer

Source Server         : Tencent
Source Server Version : 100119
Source Host           : 182.254.218.174:3306
Source Database       : ictgu

Target Server Type    : MariaDB
Target Server Version : 100119
File Encoding         : 65001

Date: 2017-04-19 21:55:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `logo` varchar(64) DEFAULT NULL,
  `amount` int(11) DEFAULT '0',
  `popularity` bigint(20) DEFAULT '0',
  `md5` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_index` (`user_id`) USING BTREE,
  KEY `md5_index` (`md5`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for category_item
-- ----------------------------
DROP TABLE IF EXISTS `category_item`;
CREATE TABLE `category_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `image` varchar(128) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_id` (`id`) USING BTREE,
  KEY `index_category_id` (`category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for friend_link
-- ----------------------------
DROP TABLE IF EXISTS `friend_link`;
CREATE TABLE `friend_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `domain` varchar(32) NOT NULL,
  `show` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `domain_index` (`domain`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for sponsor
-- ----------------------------
DROP TABLE IF EXISTS `sponsor`;
CREATE TABLE `sponsor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL,
  `from` varchar(16) CHARACTER SET utf8mb4 DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(64) NOT NULL,
  `password` varchar(16) NOT NULL,
  `nickname` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_index` (`id`) USING BTREE,
  KEY `user_email_index` (`email`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=1023 DEFAULT CHARSET=utf8mb4;
