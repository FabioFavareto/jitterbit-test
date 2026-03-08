CREATE DATABASE IF NOT EXISTS orders_db;
USE orders_db;

CREATE TABLE IF NOT EXISTS `Order` (
  `orderId`      VARCHAR(100) PRIMARY KEY,
  `value`        DECIMAL(10, 2) NOT NULL,
  `creationDate` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `Items` (
  `id`        INT AUTO_INCREMENT PRIMARY KEY,
  `orderId`   VARCHAR(100) NOT NULL,
  `productId` INT NOT NULL,
  `quantity`  INT NOT NULL,
  `price`     DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE CASCADE
);