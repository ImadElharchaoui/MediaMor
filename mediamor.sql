-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2024 at 07:36 PM
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
-- Database: `mediamor`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `text` varchar(512) NOT NULL,
  `timeMake` datetime NOT NULL,
  `timeRemake` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `text`, `timeMake`, `timeRemake`, `user_id`, `post_id`) VALUES
(1, 'This is the first comments so be nice <3', '2024-04-01 18:47:44', '2024-04-01 18:47:44', 1, 1),
(2, 'This is the second comment and i wanna say that i love you all <3', '2024-04-02 16:08:01', '2024-04-02 16:08:01', 1, 1),
(3, 'nice work', '2024-04-02 16:09:31', '2024-04-02 16:09:31', 1, 1),
(4, '3alami', '2024-04-02 16:15:40', '2024-04-02 16:15:40', 1, 1),
(5, 'Nadi', '2024-04-02 16:16:37', '2024-04-02 16:16:37', 1, 1),
(6, 'hrban', '2024-04-02 16:18:08', '2024-04-02 16:18:08', 1, 1),
(7, 'nadisama', '2024-04-02 16:22:25', '2024-04-02 16:22:25', 1, 1),
(8, 'let\'s go very good work i love this', '2024-04-02 16:32:22', '2024-04-02 16:32:22', 1, 1),
(9, 'Dima kayn', '2024-04-27 17:13:43', '2024-04-27 17:13:43', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `follower` int(11) NOT NULL,
  `following` int(11) NOT NULL,
  `timeMake` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`follower`, `following`, `timeMake`) VALUES
(2, 1, '2024-04-07 21:25:34'),
(3, 1, '2024-04-08 18:04:07'),
(1, 3, '2024-04-27 18:19:01'),
(1, 2, '2024-04-27 18:25:43');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(63) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `timeMake` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_member`
--

CREATE TABLE `group_member` (
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` tinyint(4) NOT NULL,
  `timeMake` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `relation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `relation_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `path`, `relation_id`, `type`) VALUES
(8, 'images\\2024-04-03T20-53-20.866Z_Cat.jpg', 1, 1),
(9, 'images\\2024-04-06T13-31-30.363Z_shadowImg.jpg', 2, 1),
(10, 'images\\2024-04-06T14-10-18.255Z_Cat.jpg', 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `text` varchar(5000) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `reciever_id` int(11) NOT NULL,
  `timeMake` datetime NOT NULL,
  `readed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `timeMake` datetime NOT NULL,
  `readed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `text` mediumtext NOT NULL,
  `timeMake` datetime NOT NULL,
  `timeRemake` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `text`, `timeMake`, `timeRemake`, `user_id`) VALUES
(1, 'this is first post in this new social media platfrom created by 21Guys not yet lauched , and this is just a test for post feature , we will do the best that we can for this projet 3/30/2024 <3', '2024-03-30 21:02:41', '2024-03-30 21:02:41', 1),
(2, 'this is another post', '2024-04-01 20:15:13', '2024-04-01 20:15:13', 1),
(3, 'had khona li ftswira rah nadi', '2024-04-06 14:09:56', '2024-04-06 14:09:56', 2),
(4, 'had khona li ftswira rah nadi', '2024-04-06 14:10:18', '2024-04-06 14:10:18', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(63) NOT NULL,
  `password` varchar(63) NOT NULL,
  `email` varchar(63) NOT NULL,
  `bio` varchar(4096) DEFAULT NULL,
  `timemake` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `bio`, `timemake`) VALUES
(1, '21nadi', '$2b$10$1rro9BBnzk4RtowdKVbf/eCBe3VffD6kHJIR4BFYDz0rMORha8faO', 'email2@gmail.com', NULL, '2024-03-17 15:33:31'),
(2, 'imadsama', '$2b$10$1rro9BBnzk4RtowdKVbf/eCBe3VffD6kHJIR4BFYDz0rMORha8faO', 'email10@gmail.com', NULL, '2024-04-06 11:53:27'),
(3, '21hrban', '$2b$10$1rro9BBnzk4RtowdKVbf/eCBe3VffD6kHJIR4BFYDz0rMORha8faO', 'email22@gmail.com', NULL, '2024-04-08 18:04:02'),
(4, '21guys', '$2b$10$1rro9BBnzk4RtowdKVbf/eCBe3VffD6kHJIR4BFYDz0rMORha8faO', 'email@gmail.com', NULL, '2024-04-26 21:39:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
