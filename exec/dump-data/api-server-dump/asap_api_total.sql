-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: j9c202.p.ssafy.io    Database: asap_api
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `total`
--

DROP TABLE IF EXISTS `total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total` (
  `total_id` bigint NOT NULL AUTO_INCREMENT,
  `use_amount` bigint DEFAULT NULL,
  `api_id` bigint DEFAULT NULL,
  `provider_wallet_id` bigint NOT NULL,
  `user_wallet_id` bigint NOT NULL,
  PRIMARY KEY (`total_id`),
  KEY `FKadwqmuue957g88vyccqyg3xwd` (`api_id`),
  KEY `FKi1r3tr6wpi9fv9m6at4fxbyot` (`provider_wallet_id`),
  KEY `FKccq1milrxaoftga0g0yvtl8ub` (`user_wallet_id`),
  CONSTRAINT `FKadwqmuue957g88vyccqyg3xwd` FOREIGN KEY (`api_id`) REFERENCES `api` (`api_id`),
  CONSTRAINT `FKccq1milrxaoftga0g0yvtl8ub` FOREIGN KEY (`user_wallet_id`) REFERENCES `wallet` (`wallet_id`),
  CONSTRAINT `FKi1r3tr6wpi9fv9m6at4fxbyot` FOREIGN KEY (`provider_wallet_id`) REFERENCES `wallet` (`wallet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total`
--

LOCK TABLES `total` WRITE;
/*!40000 ALTER TABLE `total` DISABLE KEYS */;
INSERT INTO `total` VALUES (3,97111,23,1,999999),(5,96322,28,1,999999),(6,84413,29,1,999999),(8,119923,30,1,999999),(9,260201,31,1,999999),(10,0,31,1,1000009),(11,0,30,1,1000009),(12,0,28,1,1000009),(13,0,23,1,1000009),(14,0,29,1,1000009),(16,0,33,1000011,2);
/*!40000 ALTER TABLE `total` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05 15:01:41
