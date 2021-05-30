-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2021. Máj 30. 18:38
-- Kiszolgáló verziója: 5.7.31
-- PHP verzió: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `flatmanager`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `apartment`
--

DROP TABLE IF EXISTS `apartment`;
CREATE TABLE IF NOT EXISTS `apartment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(255) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '2/1',
  `floorArea` int(11) NOT NULL DEFAULT '100',
  `airSpace` int(11) NOT NULL DEFAULT '200',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `apartment`
--

INSERT INTO `apartment` (`id`, `number`, `floorArea`, `airSpace`) VALUES
(1, '1/A', 100, 200),
(2, '1/B', 150, 300),
(3, '2/A', 100, 200),
(4, '2/B', 150, 300),
(5, '3/A', 100, 200),
(6, '3/B', 150, 300),
(7, '4/A', 100, 200),
(8, '4/B', 150, 300);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fee`
--

DROP TABLE IF EXISTS `fee`;
CREATE TABLE IF NOT EXISTS `fee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `amount` int(11) NOT NULL DEFAULT '100',
  `description` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `tenantId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `fee`
--

INSERT INTO `fee` (`id`, `date`, `amount`, `description`, `tenantId`) VALUES
(8, '2021-05-30', 100000, 'Valami', 1),
(9, '2021-05-30', 150000, 'Valami', 2),
(10, '2021-05-30', 100000, 'Valami', 3),
(11, '2021-05-30', 150000, 'Valami', 4),
(12, '2021-05-30', 100000, 'Valami', 5),
(13, '2021-05-30', 100000, 'Valami', 7),
(14, '2021-05-30', 14, 'Valami2', 1),
(15, '2021-05-30', 21, 'Valami2', 2),
(16, '2021-05-30', 14, 'Valami2', 3),
(17, '2021-05-30', 21, 'Valami2', 4),
(18, '2021-05-30', 14, 'Valami2', 5),
(19, '2021-05-30', 14, 'Valami2', 7),
(20, '2021-05-30', 10000, 'Valami223', 1),
(21, '2021-05-30', 15000, 'Valami223', 2),
(22, '2021-05-30', 10000, 'Valami223', 3),
(23, '2021-05-30', 15000, 'Valami223', 4),
(24, '2021-05-30', 10000, 'Valami223', 5),
(25, '2021-05-30', 10000, 'Valami223', 7),
(26, '2021-05-30', 14, 'Kiadás1', 1),
(27, '2021-05-30', 21, 'Kiadás1', 2),
(28, '2021-05-30', 14, 'Kiadás1', 3),
(29, '2021-05-30', 21, 'Kiadás1', 4),
(30, '2021-05-30', 14, 'Kiadás1', 5),
(31, '2021-05-30', 14, 'Kiadás1', 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `amount` int(11) NOT NULL DEFAULT '1000',
  `activeBalance` int(11) NOT NULL DEFAULT '0',
  `tenantId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `payment`
--

INSERT INTO `payment` (`id`, `date`, `amount`, `activeBalance`, `tenantId`) VALUES
(8, '2021-05-30', 1000, 5000, 1),
(9, '2021-05-30', 500, 5000, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tenant`
--

DROP TABLE IF EXISTS `tenant`;
CREATE TABLE IF NOT EXISTS `tenant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL DEFAULT 'John',
  `balance` varchar(255) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  `apartmentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_0d7997b252d6ec3b3b50173ba0` (`apartmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tenant`
--

INSERT INTO `tenant` (`id`, `name`, `balance`, `apartmentId`) VALUES
(1, 'Tony Stank', '1000', 1),
(2, 'Steve Roberts', '1000', 2),
(3, 'Pank Hym', '1050', 3),
(4, 'Natasha Widow', '1500', 4),
(5, 'Brews Banner', '1100', 5),
(6, 'Steven NotSoStrange', '0', NULL),
(7, 'Park Peter', '550', 7),
(8, 'Wade Wilson', '0', NULL),
(9, 'Chris Odinson', '650', NULL);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `tenant`
--
ALTER TABLE `tenant`
  ADD CONSTRAINT `FK_0d7997b252d6ec3b3b50173ba07` FOREIGN KEY (`apartmentId`) REFERENCES `apartment` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
