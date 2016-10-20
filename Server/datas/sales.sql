-- MySQL dump 10.13  Distrib 5.7.15, for Linux (x86_64)
--
-- Host: localhost    Database: sales
-- ------------------------------------------------------
-- Server version	5.7.15-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_authority_group`
--

DROP TABLE IF EXISTS `t_authority_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_authority_group` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `code` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_authority_group`
--

LOCK TABLES `t_authority_group` WRITE;
/*!40000 ALTER TABLE `t_authority_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_authority_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_authority_group_items`
--

DROP TABLE IF EXISTS `t_authority_group_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_authority_group_items` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_authority_group_items`
--

LOCK TABLES `t_authority_group_items` WRITE;
/*!40000 ALTER TABLE `t_authority_group_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_authority_group_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_authority_item`
--

DROP TABLE IF EXISTS `t_authority_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_authority_item` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `code` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_authority_item`
--

LOCK TABLES `t_authority_item` WRITE;
/*!40000 ALTER TABLE `t_authority_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_authority_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_day_balance`
--

DROP TABLE IF EXISTS `t_day_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_day_balance` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `balance_datet` datetime DEFAULT NULL,
  `sale_ammount` double DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_day_balance`
--

LOCK TABLES `t_day_balance` WRITE;
/*!40000 ALTER TABLE `t_day_balance` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_day_balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_department`
--

DROP TABLE IF EXISTS `t_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_department` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(128) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_department`
--

LOCK TABLES `t_department` WRITE;
/*!40000 ALTER TABLE `t_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_group`
--

DROP TABLE IF EXISTS `t_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_group` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(128) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_group`
--

LOCK TABLES `t_group` WRITE;
/*!40000 ALTER TABLE `t_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_group_authority`
--

DROP TABLE IF EXISTS `t_group_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_group_authority` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `authority_group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_group_authority`
--

LOCK TABLES `t_group_authority` WRITE;
/*!40000 ALTER TABLE `t_group_authority` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_group_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_login_state`
--

DROP TABLE IF EXISTS `t_login_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_login_state` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(128) DEFAULT NULL,
  `login_state` int(11) DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_login_state`
--

LOCK TABLES `t_login_state` WRITE;
/*!40000 ALTER TABLE `t_login_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_login_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_product_info`
--

DROP TABLE IF EXISTS `t_product_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_product_info` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `product_type_id` int(11) DEFAULT NULL,
  `unit_name` varchar(128) DEFAULT NULL,
  `code` varchar(128) DEFAULT NULL,
  `barcode` varchar(128) DEFAULT NULL,
  `supply_price` double DEFAULT NULL,
  `sale_price` double DEFAULT NULL,
  `member_discount` double DEFAULT NULL,
  `minimun_discount` double DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_product_info`
--

LOCK TABLES `t_product_info` WRITE;
/*!40000 ALTER TABLE `t_product_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_product_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_product_stock`
--

DROP TABLE IF EXISTS `t_product_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_product_stock` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `product_counts` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_product_stock`
--

LOCK TABLES `t_product_stock` WRITE;
/*!40000 ALTER TABLE `t_product_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_product_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_product_type`
--

DROP TABLE IF EXISTS `t_product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_product_type` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `code` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_product_type`
--

LOCK TABLES `t_product_type` WRITE;
/*!40000 ALTER TABLE `t_product_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_repertory`
--

DROP TABLE IF EXISTS `t_repertory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_repertory` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_repertory`
--

LOCK TABLES `t_repertory` WRITE;
/*!40000 ALTER TABLE `t_repertory` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_repertory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_sale_item`
--

DROP TABLE IF EXISTS `t_sale_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_sale_item` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `sale_discount` double DEFAULT NULL,
  `product_counts` int(11) DEFAULT NULL,
  `saler_id` int(11) DEFAULT NULL,
  `sale_date` datetime DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_sale_item`
--

LOCK TABLES `t_sale_item` WRITE;
/*!40000 ALTER TABLE `t_sale_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sale_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_supplier`
--

DROP TABLE IF EXISTS `t_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_supplier` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `code` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_supplier`
--

LOCK TABLES `t_supplier` WRITE;
/*!40000 ALTER TABLE `t_supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_supply_order`
--

DROP TABLE IF EXISTS `t_supply_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_supply_order` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `suppler_id` int(11) DEFAULT NULL,
  `supply_date` datetime DEFAULT NULL,
  `pay_type` int(11) DEFAULT NULL,
  `pay_state` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_counts` int(11) DEFAULT NULL,
  `order_id` varchar(128) DEFAULT NULL,
  `is_rejected` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_supply_order`
--

LOCK TABLES `t_supply_order` WRITE;
/*!40000 ALTER TABLE `t_supply_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_supply_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(128) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (3,'001','kkoolerter','123456'),(4,'002','ABC','123456'),(5,'003','ABCD','123456'),(7,'007','H9Oq','MRXpxyCq'),(8,'008','jnh9','BdqUqPzs'),(9,'009','5lX8','nTZSmxlM'),(10,'0010','4hd0','UJJ7QCIF'),(11,'0011','EsHX','dVe1iqfh'),(12,'0012','lezc','tg851FcA'),(13,'0013','OcI4','Lvw3TSKB'),(14,'0014','Lw57','5lqVhxp1'),(15,'0015','DKr7','M5rv0ikv'),(16,'0017','3a1k','QWxyZrcg'),(17,'0020','AVGg','6KfgZte9'),(18,'0021','pBUg','3rbGFZfy'),(19,'0022','Cje6','ZLitoSPn'),(20,'0023','6Q2b','7MsDTBCc'),(21,'0024','AC2T','jMGBdvEH'),(22,'0016','zhs0','uSJv8iIk'),(23,'0025','s15K','F6WJFkNy'),(24,'0018','aZO2','Lunrg8dy'),(25,'0019','C8Tl','SzA3ItNf'),(26,'0026','jf2w','nOTnmFPj'),(27,'0027','RnRU','e4b63Oil'),(28,'0028','zuAL','v9VsbKUt'),(29,'0029','Cyak','qKWlmZnt'),(30,'0030','PPnO','UpsNh2UU'),(31,'0031','JEoa','JrOe0S7J'),(32,'0032','le1u','SPYQQ6BF'),(33,'0033','Lou9','LvREkGgN'),(34,'0034','4je0','V5vL3hEn'),(35,'0036','Udws','qmSGTYTj'),(36,'0038','Mird','26Zesvek'),(37,'0039','Bg4Y','8mPieqnn'),(38,'0040','qNfg','guDUkhnP'),(39,'0041','Bmi4','WKofmr80'),(40,'0043','0fxX','7WelziCw'),(41,'0035','1qxV','AhOWY6zt'),(42,'0044','Hq1h','W7CfW2Gv'),(43,'0037','u6qb','iuH4D7dc'),(44,'0045','0h3o','cRUbMZF1'),(45,'0046','OTY0','0IQ0mLH7'),(46,'0042','M8hS','uTjx8h1K'),(47,'0047','eH9X','NVStSGcm'),(48,'0048','6he4','R6sLLosN'),(49,'0049','463r','LoKzQxfZ'),(50,'0051','NH76','UssPmdYH'),(51,'0052','sydz','uoMZvWhn'),(52,'0053','5vAg','yROqtAE4'),(53,'0055','Ag37','AhNXydPO'),(54,'0057','Sx3q','PmA3MtYz'),(55,'0058','sIPz','7OHUEbbp'),(56,'0050','k7h9','WXF5NXbY'),(57,'0059','7ABX','eSplpIdO'),(58,'0060','lEcI','WpSTVxFS'),(59,'0061','Fnq2','uQsqdcrK'),(60,'0062','2Zme','1t1fKGwO'),(61,'0063','2uJl','KyFmXdSX'),(62,'0056','x6QW','ZsiWfYeW'),(63,'0064','cTKN','lO8F1z0E'),(64,'0065','2NZB','ED7RgmOg'),(65,'0066','JqLA','tkcPu53f'),(66,'0054','qHFo','5hmesQ8I'),(67,'0067','tKKN','Vj4TTRz7'),(68,'0068','dQDq','5KWnAFFr'),(69,'0069','qBLX','LWO4h3dh'),(70,'0070','A5Ze','McuRLdij'),(71,'0071','UY1T','nI0Gb8C4'),(72,'0072','Fl6m','Ea0EVb1Q'),(73,'0074','QnNj','YjkE7ejA'),(74,'0077','BUBj','8TUp5SJm'),(75,'0078','JI1e','fBbWBd2z'),(76,'0076','1JEC','v3KZ3bf2'),(77,'0079','3RmT','DNA8oR1g'),(78,'0080','zjWE','HFPz0RuK'),(79,'0081','VsXK','RVYfmICK'),(80,'0073','vzxi','OImp16CO'),(81,'0082','e5rA','Oy9oVMYh'),(82,'0075','naS4','3bcEBnOH'),(83,'0083','dTkZ','gcbMA4tB'),(84,'0084','MnlG','HvmjUIHV'),(85,'0085','IpXd','wlej6vUo'),(86,'0086','tWdP','Sf8D0XpV'),(87,'0087','Po8p','U7CdmVXY'),(88,'0088','1TVb','LSWsY6ah'),(89,'0089','5c4t','j8lVL6td'),(90,'0090','wNFP','MHnn3rs6'),(91,'0092','JiUI','akdU2mPR'),(92,'0091','eQlF','qGpj4MVh'),(93,'0094','PBXN','8za13ZDH'),(94,'0095','VYQq','5zCjOeBZ'),(95,'0096','Ny6a','9w7CWxSG'),(96,'0097','JaKH','SxnOFI9S'),(97,'0098','ECDy','VJ7ws5r4'),(98,'0099','dG8i','zXmUR3Sv'),(99,'00100','ON6I','nvzDvjGT'),(100,'0093','oMDw','Ao3BZKST');
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_department`
--

DROP TABLE IF EXISTS `t_user_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_department` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_department`
--

LOCK TABLES `t_user_department` WRITE;
/*!40000 ALTER TABLE `t_user_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_user_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_group`
--

DROP TABLE IF EXISTS `t_user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_group` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_group`
--

LOCK TABLES `t_user_group` WRITE;
/*!40000 ALTER TABLE `t_user_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_user_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-06 17:27:10
