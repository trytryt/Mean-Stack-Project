-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2024 at 06:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wintervacations`
--
CREATE DATABASE IF NOT EXISTS `wintervacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `wintervacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL,
  `followerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`, `followerId`) VALUES
(71, 49, 76),
(71, 37, 84),
(72, 49, 85),
(72, 37, 87),
(73, 37, 105),
(75, 50, 106),
(75, 60, 112),
(75, 61, 113),
(75, 62, 114),
(75, 33, 115),
(75, 51, 116),
(75, 58, 117),
(75, 65, 118),
(76, 49, 119),
(76, 53, 120),
(76, 52, 121),
(76, 55, 122),
(76, 56, 123),
(76, 54, 124),
(76, 62, 125),
(76, 61, 126),
(76, 60, 127),
(76, 66, 128),
(76, 67, 129),
(76, 59, 130),
(76, 63, 131),
(76, 51, 132),
(76, 33, 133),
(76, 58, 134),
(77, 33, 135),
(83, 64, 137),
(83, 51, 138),
(83, 63, 139),
(83, 65, 140),
(83, 60, 141),
(83, 59, 142),
(83, 67, 143),
(83, 66, 144),
(83, 61, 145),
(83, 62, 146),
(83, 52, 147),
(83, 53, 148),
(83, 54, 150),
(83, 55, 151),
(83, 56, 152),
(83, 49, 153),
(83, 37, 155),
(83, 58, 156),
(83, 33, 158),
(83, 50, 159),
(83, 57, 160);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` enum('Admin','User') DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `email`, `password`, `role`) VALUES
(1, 'Sara', 'Winter', 'Swinter', 'swinter@gmail.com', '7502', 'Admin'),
(50, 'erere', 'rerere', 'rererer', 'rerere@gnail.com', '423c1341f5a0057de5bb860e590c45', 'User'),
(51, 'yopyop', 'yopyop', 'yopyop', 'yopopy@gmail.com', '08d6a7af04eb0287dd3f07cd4858b2', 'User'),
(52, 'register', 'register', 'register', 'register@gmail.com', 'cc80d6952a0d0d1aeba75e5d1e6835', 'User'),
(53, 'folfolfoflfo', 'folfolfoflf', 'folfolfoflfo', 'folfolfoflfo@gmai.com', '489691f74773af00b83e7524b76632', 'User'),
(54, 'dededed', 'dededdd', 'dedede', 'dede@gmail.com', '06b6f7b58bc2b9c8429949c582817f', 'User'),
(55, 'batsheva', 'winter', 'Bwinter', '84554@gmail.com', 'a32fec20ecf1344310743f67ca3347', 'User'),
(56, 'jnfdms', 'dfghnhgfd', 'fgfded', 'jhbjnj@gmail.com', '6861ac94f8965fb4069dbe80960494', 'User'),
(57, 'yaudit', 'yaudit', 'yaudit', 'yaudit@gmail.com', 'a373c63c0f5bcdec2db01e5707f9f3', 'User'),
(58, 'saritt', 'saritt', 'saritt', 'saritt@gmail.com', '1234', 'User'),
(59, 'reter', 'reter', 'reter', 'reter@gmail.com', '47c86ef4f2f955ffa66dc1671c82d6', 'User'),
(60, 'njjjj', 'njjj', 'njjjj', 'njjjj@gmail.com', '661f4ace0e69e7043a3910cd9957cf', 'User'),
(61, 'meniii', 'meniii', 'meniii', 'meniii@gmail.com', '55f3fd128a12b355f02dd5c2fdbf3c', 'User'),
(62, 'gtgt', 'gtgt', 'gtgt', 'gtgfftg@gmail.com', '5db72cd27d75e54f17ff39d8bc7a77', 'User'),
(63, 'olpolpj', 'oiuhgbnmk', 'iuygv', 'oiuyfc@gmail.com', '7ee4bb6808c72f6815359cafd32f8e', 'User'),
(64, 'tututu', 'tutut', 'tututu', 'tututu@gmail.com', 'ea52398a387f524c3acf917a598f4f', 'User'),
(65, 'jojojol', 'jojojol', 'jojojol', 'jojojol@gmail.com', 'b7cc67ce66ea94c682a957ee479dd2', 'User'),
(66, 'gtgtgtg', 'kikujhyjk', 'tjbvd', 'tgvvrcr@gmail.com', '7c278ea868aaaaea4f0ca125c3455e', 'User'),
(68, 'soni', 'soni', 'sonii', 'soni@gmail.com', 'b2c8cb2cb93529a7fae7fae8c19d26', 'User'),
(69, 'naama', 'naama', 'naama', 'naama@gmail.com', '8c14ebfa064ec5da951b746dfac02d', 'User'),
(70, 'imush', 'imush', 'imush', 'imush@gmail.com', 'dfebecbead69fb6e4b500cd459334f', 'User'),
(71, 'tomi', 'tomi', 'tomi', 'tomi@gmail.com', 'tomi', 'User'),
(72, 'yomi', 'yomi', 'yomi', 'yomi@gmail.com', 'yomi', 'User'),
(73, 'pomi', 'pomi', 'pomi', 'pomi@gmail.com', 'pomi', 'User'),
(74, 'noaa', 'noaa', 'noaa', 'noaa@gmail.com', 'noaa', 'User'),
(75, 'fdsa', 'fdsa', 'fdsa', 'fdsa@gmail.com', 'fdsa', 'User'),
(76, 'qwer', 'qwer', 'qwer', 'qwer@gmail.com', 'qazx', 'User'),
(77, 'sara', 'sara', 'sara', 'sara@gmail.com', 'sara', 'User'),
(78, 'danit', 'danit', 'danit', 'danit@gmail.com', '$2b$10$dJl8I5Q.IB6rSRNz/oNu0eZ', 'User'),
(79, 'kola', 'kola', 'kola', 'kola@gmail.com', '$2b$10$PS23AuUb9Yf220zeoKyLz.v', 'User'),
(80, 'kola', 'kola', 'kola', 'kola@gmail.com', '$2b$10$zPynWmZl60t.CwPqWNDkIO9', 'User'),
(81, 'joli', 'joli', 'joli', 'joli@gmail.com', '$2b$10$24otXzjFd0eIvaEu9VmR6eN', 'User'),
(82, 'sert', 'sert', 'sert', 'sert@gmail.com', 'sert', 'User'),
(83, 'serty', 'serty', 'serty', 'serty@gmail.com', 'serty', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(30) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `imageName` varchar(700) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `startDate`, `endDate`, `price`) VALUES
(33, 'Experience the romantic ambian', 'Eyran', '64f4636d-98a2-4c15-8b3d-251588f5a81a.jpg', '2024-06-27', '2024-06-29', 2250),
(37, 'Relax on the sandy beaches and', 'Goa, India', '221be3f5-feff-452c-8376-148cd13ba1ed.jpg', '2025-07-24', '2038-08-24', 1200),
(49, 'ororor', 'ororor', 'efdd6d03-918e-4f5b-9bae-c24e3c26a6c7.jpg', '2024-06-19', '2024-06-28', 1500),
(50, 'Relax on the sandy beaches and', 'Rafiach', '9aad6f14-578d-4f65-b121-199f7eb0f3e5.jpg', '2025-07-24', '2030-08-24', 3200),
(51, 'Relax on the sandy beaches and', 'Arizona', 'f0329200-e9a9-4045-8616-5818ed619516.jpg', '2005-07-24', '2026-08-24', 1200),
(52, 'Relax on the sandy beaches and', 'Dubai', 'c3413972-4f39-45e3-a0db-2f79a8869b64.jpg', '2023-06-24', '2026-08-20', 1200),
(53, 'Relax on the sandy beaches and', 'Arizona', 'a1c030d2-bab1-4d3d-a0be-21d3a40137c3.jpg', '2023-06-24', '2027-08-24', 1200),
(54, 'Relax on the sandy beaches and', 'Arizona', '6093a81d-d453-421d-8baa-caef78764d1d.jpg', '2023-06-24', '2024-06-27', 1200),
(55, 'Relax on the sandy beaches and', 'Arizona', 'c6915a96-d434-431d-9691-36e13cc651db.webp', '2023-06-24', '2024-08-24', 1200),
(56, 'Relax on the sandy beaches and', 'Arizona', '9a922420-4011-4bc7-9f0e-05628933afc3.jpg', '2023-06-25', '2025-08-25', 1200),
(57, 'Relax on the sandy beaches and', 'Gaza', '69877cad-d9c5-4019-b22a-daf6c1e0f710.jpg', '2028-06-25', '2029-08-25', 1200),
(58, 'Relax on the sandy beaches and', 'Miami', 'c1c71216-980b-446d-87d7-66b1481c0f76.webp', '2024-11-11', '2025-09-25', 1200),
(59, 'Relax on the sandy beaches and', 'Arizona', 'cf20b0ee-0e69-4a86-b00c-825660bc1d19.jpg', '2019-07-25', '2022-07-25', 1200),
(60, 'Relax on the sandy beaches and', 'Arizona', '7cd04bd3-ad0d-4200-a240-8be86189e878.jpeg', '2019-07-25', '2022-07-25', 1200),
(61, 'Relax on the sandy beaches and', 'Bucharest', '30f38a94-b9e4-4711-8f84-173cab1c2f8d.jpg', '2041-08-25', '2044-07-25', 2222),
(62, 'Relax on the sandy beaches and', 'Eylat', '9b102908-f9bf-4c0f-bc97-a890e840e118.jpeg', '2019-07-25', '2022-07-25', 1200),
(63, 'Relax on the sandy beaches and', 'Arizona', '0a3bc20a-fcf7-4d78-a3b8-e72d4cce3d6a.jpg', '2019-06-25', '2022-07-25', 1200),
(64, 'Relax on the sandy beaches and', 'Arizona', '667b9506-9883-45e7-94d1-2a8d8fd918ec.jpg', '2024-09-25', '2025-08-25', 1200),
(65, 'Relax on the sandy beaches and', 'africa', '22d2a64b-edc7-4980-916b-9c58601210c3.jpg', '2019-06-25', '2020-07-25', 1200),
(66, 'Relax on the sandy beaches and', 'Arizona', 'ee45cd69-011d-4695-8bb5-f38a26329c3a.jpg', '2019-06-25', '2020-07-25', 1200),
(67, 'Relax on the sandy beaches and', 'Arizona', '11a5028e-a37e-4813-b082-62ca48088efd.jpg', '2019-06-25', '2020-07-25', 1200);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followerId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `fk_vacation_id` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
