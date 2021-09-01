-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2021 at 12:01 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `status`) VALUES
(1, 'admin', '$2b$14$sJx7vduH8knGwmPCec9c9uxYpW.KUorVa/otuP7/g5D0QPqPBafVK', 1);

-- --------------------------------------------------------

--
-- Table structure for table `beats`
--

CREATE TABLE `beats` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `artist` varchar(100) DEFAULT NULL,
  `genre` int(11) NOT NULL DEFAULT 0,
  `thumb` varchar(100) DEFAULT NULL,
  `demo_beat` varchar(100) DEFAULT NULL,
  `original_beat1` varchar(100) DEFAULT NULL,
  `price1` int(11) NOT NULL DEFAULT 0,
  `original_beat2` varchar(100) DEFAULT NULL,
  `price2` int(11) NOT NULL DEFAULT 0,
  `original_beat3` varchar(100) DEFAULT NULL,
  `price3` int(11) NOT NULL DEFAULT 0,
  `featured` int(11) DEFAULT 0,
  `exclusive` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `beats`
--

INSERT INTO `beats` (`id`, `title`, `description`, `artist`, `genre`, `thumb`, `demo_beat`, `original_beat1`, `price1`, `original_beat2`, `price2`, `original_beat3`, `price3`, `featured`, `exclusive`, `status`, `datetime`) VALUES
(1, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(2, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09'),
(3, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(4, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09'),
(5, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(6, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09'),
(7, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(8, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09'),
(9, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(10, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09'),
(11, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(12, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09'),
(13, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(14, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09'),
(15, 'All To You', 'Demo', 'Tos', 31, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147309874.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147309897.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309946.wav', 25, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309958.mp3', 30, 1, 2, 1, '2021-08-16 20:55:09'),
(16, 'My Troubles ', 'Demo', 'Symetry', 19, 'http://217.112.95.118:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png', 'http://217.112.95.118:3001/admin/uploads/beats/demobeat1629147429298.mp3', 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429402.wav', 35, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429407.wav', 40, 1, 2, 1, '2021-08-16 20:57:09');

-- --------------------------------------------------------

--
-- Table structure for table `billingdetails`
--

CREATE TABLE `billingdetails` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL DEFAULT 0,
  `amount` float NOT NULL DEFAULT 0,
  `payerid` varchar(100) DEFAULT NULL,
  `paymentid` varchar(100) DEFAULT NULL,
  `mode` varchar(100) DEFAULT NULL,
  `paid` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `billingdetails`
--

INSERT INTO `billingdetails` (`id`, `userid`, `amount`, `payerid`, `paymentid`, `mode`, `paid`, `email`, `datetime`) VALUES
(1, 1, 51, 'sahushivam730@gmail.com', '', 'Cash App', 'false', 'sahushivam730@gmail.com', '2021-08-20 19:17:12'),
(2, 16, 30, 'sahushivam730@gmail.com', '', 'Cash App', 'false', 'sahushivam730@gmail.com', '2021-08-24 18:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `cashapp_request`
--

CREATE TABLE `cashapp_request` (
  `id` int(50) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `billingid` int(11) DEFAULT 0,
  `price` int(100) NOT NULL,
  `describtion` text DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `date_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `fav`
--

CREATE TABLE `fav` (
  `sno` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `beatid` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `description`, `img`, `status`, `datetime`) VALUES
(1, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(2, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(3, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(4, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(5, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(6, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(7, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(8, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(9, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(10, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(11, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(12, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(13, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(14, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(15, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(16, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(17, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(18, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(19, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(20, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(21, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(22, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(23, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(24, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(25, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(26, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(27, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(28, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(29, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(30, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36'),
(31, 'Hip Hop/ R&B', 'Demo', 'https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291__340.jpg', 1, '2021-08-16 20:46:36'),
(32, 'Trap', 'Demo', 'https://cdn.pixabay.com/photo/2014/05/03/00/45/vinyl-336626__340.jpg', 1, '2021-08-16 20:46:36');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `beatid` int(11) NOT NULL,
  `billingid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `beat` varchar(100) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderid`, `userid`, `beatid`, `billingid`, `title`, `artist`, `amount`, `beat`, `type`, `datetime`, `status`) VALUES
(1, 1, 10, 1, 'My Troubles ', 'Symetry', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', NULL, '2021-08-20 19:17:12', 0),
(2, 1, 9, 1, 'All To You', 'Tos', 21, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147309935.mp3', NULL, '2021-08-20 19:17:12', 0),
(3, 16, 16, 2, 'My Troubles ', 'Symetry', 30, 'http://217.112.95.118:3001/admin/uploads/beats/originalbeat1629147429385.mp3', NULL, '2021-08-24 18:10:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `status` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `pwd`, `status`, `created_at`) VALUES
(13, 'Shivam', 'sahushivam730@gmail.com', '$2b$14$yBlU4jJxcHmov3S2uEkI8eZbz9bCDkwNP0bq8eyMPLN5RT/iiWlOO', 1, '2021-08-24 12:38:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beats`
--
ALTER TABLE `beats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billingdetails`
--
ALTER TABLE `billingdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cashapp_request`
--
ALTER TABLE `cashapp_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fav`
--
ALTER TABLE `fav`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `beats`
--
ALTER TABLE `beats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `billingdetails`
--
ALTER TABLE `billingdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cashapp_request`
--
ALTER TABLE `cashapp_request`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fav`
--
ALTER TABLE `fav`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
