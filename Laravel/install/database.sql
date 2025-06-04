-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 20, 2025 at 03:14 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `username`, `email_verified_at`, `image`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Super Admins', 'admin@site.com', 'admin', NULL, '66b84efa2c3741723354874.png', '$2y$12$vc.c.pNxefhOjFzLFNMEW.16i/h1vQCigtZeTLDY12QlIlS0KTWbm', NULL, NULL, '2024-08-10 23:41:14');

-- --------------------------------------------------------

--
-- Table structure for table `admin_notifications`
--

CREATE TABLE `admin_notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `click_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_password_resets`
--

CREATE TABLE `admin_password_resets` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applied_coupons`
--

CREATE TABLE `applied_coupons` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL DEFAULT '0',
  `coupon_id` int UNSIGNED NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `course_purchased_id` int UNSIGNED NOT NULL DEFAULT '0',
  `amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `is_trending` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint UNSIGNED NOT NULL,
  `coupon_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coupon_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=fixed, 2=percent',
  `coupon_amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `minimum_spend` decimal(28,8) DEFAULT NULL,
  `maximum_spend` decimal(28,8) DEFAULT NULL,
  `usage_limit_per_coupon` int DEFAULT NULL,
  `usage_limit_per_user` int DEFAULT NULL,
  `exclude_sale_items` tinyint NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `expired_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint UNSIGNED NOT NULL,
  `instructor_id` int NOT NULL DEFAULT '0',
  `category_id` int DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_category_id` int NOT NULL DEFAULT '0',
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `level` tinyint(1) NOT NULL DEFAULT '0',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(28,8) DEFAULT '0.00000000',
  `discount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `duration` timestamp NULL DEFAULT NULL,
  `discount_type` tinyint(1) NOT NULL DEFAULT '0',
  `welcome_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `congrats_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_populer` tinyint(1) NOT NULL DEFAULT '0',
  `course_duration` int NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `reject_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_completes`
--

CREATE TABLE `course_completes` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_contents`
--

CREATE TABLE `course_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL DEFAULT '0',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_lectures`
--

CREATE TABLE `course_lectures` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL DEFAULT '0',
  `course_section_id` int NOT NULL DEFAULT '0',
  `curriculum_id` int NOT NULL DEFAULT '0',
  `serial_number` int NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `article` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1="video", 2="Artical"',
  `is_preview` tinyint(1) NOT NULL DEFAULT '0',
  `video_duration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_purchaseds`
--

CREATE TABLE `course_purchaseds` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `coupon_id` int NOT NULL DEFAULT '0',
  `amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `discount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `coupon_discount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `payment_status` tinyint(1) NOT NULL DEFAULT '0',
  `trx` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_requirements`
--

CREATE TABLE `course_requirements` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL DEFAULT '0',
  `requirement` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_resources`
--

CREATE TABLE `course_resources` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL DEFAULT '0',
  `course_section_id` int NOT NULL DEFAULT '0',
  `course_lecture_id` int NOT NULL DEFAULT '0',
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_sections`
--

CREATE TABLE `course_sections` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `learning_object` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cron_jobs`
--

CREATE TABLE `cron_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alias` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cron_schedule_id` int NOT NULL DEFAULT '0',
  `next_run` datetime DEFAULT NULL,
  `last_run` datetime DEFAULT NULL,
  `is_running` tinyint(1) NOT NULL DEFAULT '1',
  `is_default` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cron_job_logs`
--

CREATE TABLE `cron_job_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `cron_job_id` int UNSIGNED NOT NULL DEFAULT '0',
  `start_at` datetime DEFAULT NULL,
  `end_at` datetime DEFAULT NULL,
  `duration` int UNSIGNED NOT NULL DEFAULT '0',
  `error` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cron_schedules`
--

CREATE TABLE `cron_schedules` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interval` int UNSIGNED NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `curricula`
--

CREATE TABLE `curricula` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL DEFAULT '0',
  `course_section_id` int NOT NULL DEFAULT '0',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1="lecture", 2="quiz",3="assignment"',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deposits`
--

CREATE TABLE `deposits` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `course_purchased_id` int NOT NULL DEFAULT '0',
  `method_code` int NOT NULL DEFAULT '0',
  `amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `method_currency` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `charge` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `rate` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `final_amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `btc_amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `btc_wallet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trx` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_try` int NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=>success, 2=>pending, 3=>cancel',
  `from_api` tinyint(1) NOT NULL DEFAULT '0',
  `is_web` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'This will be 1 if the request is from NextJs application',
  `admin_feedback` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `success_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `failed_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_cron` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `extensions`
--

CREATE TABLE `extensions` (
  `id` bigint UNSIGNED NOT NULL,
  `act` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `script` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `shortcode` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'object',
  `support` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'help section',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>enable, 2=>disable',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `extensions`
--

INSERT INTO `extensions` (`id`, `act`, `name`, `description`, `image`, `script`, `shortcode`, `support`, `status`, `created_at`, `updated_at`) VALUES
(1, 'tawk-chat', 'Tawk.to', 'Key location is shown bellow', 'tawky_big.png', '<script>\r\n                        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();\r\n                        (function(){\r\n                        var s1=document.createElement(\"script\"),s0=document.getElementsByTagName(\"script\")[0];\r\n                        s1.async=true;\r\n                        s1.src=\"https://embed.tawk.to/{{app_key}}\";\r\n                        s1.charset=\"UTF-8\";\r\n                        s1.setAttribute(\"crossorigin\",\"*\");\r\n                        s0.parentNode.insertBefore(s1,s0);\r\n                        })();\r\n                    </script>', '{\"app_key\":{\"title\":\"App Key\",\"value\":\"------\"}}', 'twak.png', 0, '2019-10-18 11:16:05', '2025-03-19 22:48:24'),
(2, 'google-recaptcha2', 'Google Recaptcha 2', 'Key location is shown bellow', 'recaptcha3.png', '\n<script src=\"https://www.google.com/recaptcha/api.js\"></script>\n<div class=\"g-recaptcha\" data-sitekey=\"{{site_key}}\" data-callback=\"verifyCaptcha\"></div>\n<div id=\"g-recaptcha-error\"></div>', '{\"site_key\":{\"title\":\"Site Key\",\"value\":\"6LdPC88fAAAAADQlUf_DV6Hrvgm-pZuLJFSLDOWV\"},\"secret_key\":{\"title\":\"Secret Key\",\"value\":\"6LdPC88fAAAAAG5SVaRYDnV2NpCrptLg2XLYKRKB\"}}', 'recaptcha.png', 0, '2019-10-18 11:16:05', '2025-03-20 01:15:48'),
(3, 'custom-captcha', 'Custom Captcha', 'Just put any random string', 'customcaptcha.png', NULL, '{\"random_key\":{\"title\":\"Random String\",\"value\":\"SecureString\"}}', 'na', 0, '2019-10-18 11:16:05', '2025-03-19 22:48:22'),
(4, 'google-analytics', 'Google Analytics', 'Key location is shown bellow', 'google_analytics.png', '<script async src=\"https://www.googletagmanager.com/gtag/js?id={{measurement_id}}\"></script>\n                <script>\n                  window.dataLayer = window.dataLayer || [];\n                  function gtag(){dataLayer.push(arguments);}\n                  gtag(\"js\", new Date());\n                \n                  gtag(\"config\", \"{{measurement_id}}\");\n                </script>', '{\"measurement_id\":{\"title\":\"Measurement ID\",\"value\":\"------\"}}', 'ganalytics.png', 0, NULL, '2025-03-19 22:47:29'),
(5, 'fb-comment', 'Facebook Comment ', 'Key location is shown bellow', 'Facebook.png', '<div id=\"fb-root\"></div><script async defer crossorigin=\"anonymous\" src=\"https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v4.0&appId={{app_key}}&autoLogAppEvents=1\"></script>', '{\"app_key\":{\"title\":\"App Key\",\"value\":\"----\"}}', 'fb_com.png', 0, NULL, '2022-03-21 17:18:36');

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` bigint UNSIGNED NOT NULL,
  `act` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `form_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `act`, `form_data`, `created_at`, `updated_at`) VALUES
(7, 'kyc', '{\"full_name\":{\"name\":\"Full Name\",\"label\":\"full_name\",\"is_required\":\"required\",\"instruction\":null,\"extensions\":null,\"options\":[],\"type\":\"text\",\"width\":\"6\"},\"email\":{\"name\":\"Email\",\"label\":\"email\",\"is_required\":\"required\",\"instruction\":null,\"extensions\":null,\"options\":[],\"type\":\"email\",\"width\":\"6\"},\"gender\":{\"name\":\"Gender\",\"label\":\"gender\",\"is_required\":\"required\",\"instruction\":null,\"extensions\":null,\"options\":[\"Male\",\"Female\",\"Others\"],\"type\":\"select\",\"width\":\"6\"},\"nid_number\":{\"name\":\"NID Number\",\"label\":\"nid_number\",\"is_required\":\"required\",\"instruction\":null,\"extensions\":null,\"options\":[],\"type\":\"number\",\"width\":\"6\"},\"nid_front_side\":{\"name\":\"NID Front Side\",\"label\":\"nid_front_side\",\"is_required\":\"required\",\"instruction\":\"Upload the image of front side of your NID\",\"extensions\":\"jpg,jpeg,png\",\"options\":[],\"type\":\"file\",\"width\":\"6\"},\"nid_back_side\":{\"name\":\"NID Back Side\",\"label\":\"nid_back_side\",\"is_required\":\"required\",\"instruction\":\"Upload the image of back side of your NID\",\"extensions\":\"jpg,jpeg,png\",\"options\":[],\"type\":\"file\",\"width\":\"6\"}}', '2022-03-17 02:56:14', '2024-10-12 00:13:14'),
(22, 'instructor_kyc', '{\"bank_name\":{\"name\":\"Bank Name\",\"label\":\"bank_name\",\"is_required\":\"required\",\"instruction\":null,\"extensions\":\"\",\"options\":[],\"type\":\"text\",\"width\":\"12\"}}', '2025-02-25 05:57:15', '2025-02-25 05:57:15');

-- --------------------------------------------------------

--
-- Table structure for table `frontends`
--

CREATE TABLE `frontends` (
  `id` bigint UNSIGNED NOT NULL,
  `data_keys` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `seo_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `tempname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `frontends`
--

INSERT INTO `frontends` (`id`, `data_keys`, `data_values`, `seo_content`, `tempname`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'seo.data', '{\"seo_image\":\"1\",\"keywords\":[\"LMS\",\"Learning management system\",\"vdemy\"],\"description\":\"Vdemy - On-demand Course Selling Platform\",\"social_title\":\"Vdemy - On-demand Course Selling Platform\",\"social_description\":\"Enhance your skills with our advanced Learning Management System (LMS). Access interactive courses, track progress, and achieve your educational goals with ease. Join now for a seamless and engaging learning experience!\",\"image\":\"67dbec3e984cd1742466110.png\"}', NULL, NULL, '', '2020-07-04 23:42:52', '2025-03-20 04:23:09'),
(24, 'about.content', '{\"has_image\":\"1\",\"video_link\":\"https:\\/\\/www.youtube.com\\/embed\\/WOb4cj7izpE\",\"heading\":\"About Videsracademy - Your Premier Online Learning Platform\",\"description\":\"Come help us build the education the world deserves. We\'re on a mission to transform online learning by creating engaging, interactive, and accessible educational experiences. Join us in revolutionizing education and empowering learners worldwide to achieve their full potential through quality online courses and cutting-edge learning technology.\",\"image\":\"67b5c7888c9de1739966344.png\"}', NULL, 'basic', '', '2020-10-28 00:51:20', '2025-02-19 05:59:04'),
(25, 'blog.content', '{\"heading\":\"Our Lates Article & Blog\"}', NULL, 'basic', '', '2020-10-28 00:51:34', '2025-03-19 01:57:10'),
(27, 'contact_us.content', '{\"has_image\":\"1\",\"heading\":\"Get in Touch with Us, Let\'s Connect.\",\"short_description\":\"We\'d love to hear from you! Whether you have questions, feedback, or just want to learn more, don\\u2019t hesitate to reach out. Connect with us today, and let\'s start a conversation!\",\"title\":\"Our locations\",\"subtitle\":\"Where We Operate: Our Global Locations\",\"shape_one\":\"6788b81204ca31737013266.png\",\"shape_two\":\"6788b81356ce41737013267.png\"}', NULL, 'basic', '', '2020-10-28 00:59:19', '2025-03-17 01:07:15'),
(31, 'social_icon.element', '{\"title\":\"Facebook\",\"social_icon\":\"<i class=\\\"las la-expand\\\"><\\/i>\",\"url\":\"https:\\/\\/www.google.com\\/\"}', NULL, 'basic', NULL, '2020-11-12 04:07:30', '2021-05-12 05:56:59'),
(33, 'feature.content', '{\"heading\":\"asdf\",\"sub_heading\":\"asdf\"}', NULL, 'basic', NULL, '2021-01-03 23:40:54', '2021-01-03 23:40:55'),
(34, 'feature.element', '{\"title\":\"asdf\",\"description\":\"asdf\",\"feature_icon\":\"asdf\"}', NULL, 'basic', NULL, '2021-01-03 23:41:02', '2021-01-03 23:41:02'),
(35, 'service.element', '{\"trx_type\":\"withdraw\",\"service_icon\":\"<i class=\\\"las la-highlighter\\\"><\\/i>\",\"title\":\"asdfasdf\",\"description\":\"asdfasdfasdfasdf\"}', NULL, 'basic', NULL, '2021-03-06 01:12:10', '2021-03-06 01:12:10'),
(36, 'service.content', '{\"trx_type\":\"deposit\",\"heading\":\"asdf fffff\",\"subheading\":\"555\"}', NULL, 'basic', NULL, '2021-03-06 01:27:34', '2022-03-30 08:07:06'),
(41, 'cookie.data', '{\"short_desc\":\"We may use cookies or any other tracking technologies when you visit our website, including any other media form, mobile website, or mobile application related or connected to help customize the Site and improve your experience.\",\"description\":\"<h4>Cookie Policy<\\/h4>\\r\\n\\r\\n<p>This Cookie Policy explains how to use cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.<\\/p>\\r\\n<br>\\r\\n<h4>What are cookies?<\\/h4>\\r\\n\\r\\n<p>Cookies are small pieces of data stored on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.<\\/p>\\r\\n<br>\\r\\n<h4>Why do we use cookies?<\\/h4>\\r\\n\\r\\n<p>We use cookies for several reasons. Some cookies are required for technical reasons for our Website to operate, and we refer to these as \\\"essential\\\" or \\\"strictly necessary\\\" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.<\\/p>\\r\\n<br>\\r\\n<h4>What types of cookies do we use?<\\/h4>\\r\\n\\r\\n<div>\\r\\n    <ul style=\\\"list-style: unset; margin-left: 18px;\\\">\\r\\n        <li>\\r\\n            <strong>Essential Website Cookies:<\\/strong> \\r\\n            These cookies are strictly necessary to provide you with services available through our Website and to use some of its features.\\r\\n        <\\/li>\\r\\n        <li>\\r\\n            <strong>Analytics and Performance Cookies:<\\/strong> \\r\\n            These cookies allow us to count visits and traffic sources to measure and improve our Website\'s performance.\\r\\n        <\\/li>\\r\\n        <li>\\r\\n            <strong>Advertising Cookies:<\\/strong> \\r\\n            These cookies make advertising messages more relevant to you and your interests. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.\\r\\n        <\\/li>\\r\\n    <\\/ul>\\r\\n<\\/div>\\r\\n<br>\\r\\n<h4>Data Collected by Cookies<\\/h4>\\r\\n<p>Cookies may collect various types of data, including but not limited to:<\\/p>\\r\\n<ul style=\\\"list-style: unset; margin-left: 18px;\\\">\\r\\n    <li>IP addresses<\\/li>\\r\\n    <li>Browser and device information<\\/li>\\r\\n    <li>Referring website addresses<\\/li>\\r\\n    <li>Pages visited on our website<\\/li>\\r\\n    <li>Interactions with our website, such as clicks and mouse movements<\\/li>\\r\\n    <li>Time spent on our website<\\/li>\\r\\n<\\/ul>\\r\\n<br>\\r\\n<h4>How We Use Collected Data<\\/h4>\\r\\n\\r\\n<p>We may use data collected by cookies for the following purposes:<\\/p>\\r\\n<ul style=\\\"list-style: unset; margin-left: 18px;\\\">\\r\\n    <li>To personalize your experience on our website<\\/li>\\r\\n    <li>To improve our website\'s functionality and performance<\\/li>\\r\\n    <li>To analyze trends and gather demographic information about our user base<\\/li>\\r\\n    <li>To deliver targeted advertising based on your interests<\\/li>\\r\\n    <li>To prevent fraudulent activity and enhance website security<\\/li>\\r\\n<\\/ul>\\r\\n<br>\\r\\n<h4>Third-party cookies<\\/h4>\\r\\n\\r\\n<p>In addition to our cookies, we may also use various third-party cookies to report usage statistics of our Website, deliver advertisements on and through our Website, and so on.<\\/p>\\r\\n<br>\\r\\n<h4>How can we control cookies?<\\/h4>\\r\\n\\r\\n<p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the \\\"Cookie Settings\\\" link in the footer of our website. You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted.<\\/p>\\r\\n<br>\\r\\n<h4>Changes to our Cookie Policy<\\/h4>\\r\\n\\r\\n<p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.<\\/p>\",\"status\":1}', NULL, NULL, NULL, '2020-07-04 23:42:52', '2025-03-20 02:55:45'),
(42, 'policy_pages.element', '{\"title\":\"Privacy Policy\",\"details\":\"<p>By accessing or using Vdemy, you agree to be bound by the following terms and conditions (\\\"Terms\\\"). These Terms apply to all users of our Learning Management System (\\\"LMS\\\"). If you do not agree with these Terms, do not use our LMS.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Acceptance of Terms<\\/h4>\\r\\n\\r\\n<p>By accessing or using Vdemy, you agree to comply with and be bound by these Terms of Service. We reserve the right to modify or update these Terms at any time, and any changes will be effective when posted on this page. It is your responsibility to check this page periodically for updates.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Use of Our Vdemy<\\/h4>\\r\\n\\r\\n<p>You are granted a limited, non-exclusive, non-transferable license to access and use Vdemy for your personal, educational, and non-commercial use, subject to these Terms. You may not:<\\/p>\\r\\n<ul>\\r\\n<li>Copy, modify, or distribute any content without permission.<\\/li>\\r\\n<li>Attempt to reverse-engineer or hack the LMS.<\\/li>\\r\\n<li>Use the platform for any illegal activities or purposes that violate applicable laws.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">User Account<\\/h4>\\r\\n\\r\\n<p>To use certain features of Vdemy, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update it as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect unauthorized access to your account, you must notify us immediately.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">User Responsibilities<\\/h4>\\r\\n\\r\\n<p>As a user of Vdemy, you agree to:<\\/p>\\r\\n<ul>\\r\\n<li>Abide by all applicable laws and regulations.<\\/li>\\r\\n<li>Refrain from posting or transmitting any content that is unlawful, offensive, harmful, or infringes on the rights of others.<\\/li>\\r\\n<li>Not disrupt or interfere with the functionality of the LMS or other users\' experience.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">Payment and Subscriptions<\\/h4>\\r\\n\\r\\n<p>Some services offered by Vdemy may require payment. If you choose to subscribe to any paid services, you agree to pay all applicable fees associated with those services. Payments will be processed through a third-party payment processor, and you agree to provide accurate payment information. Subscription fees may be subject to change, and you will be notified of any such changes.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Content Ownership<\\/h4>\\r\\n\\r\\n<p>All content available on Vdemy, including but not limited to courses, videos, text, images, and software, is owned by or licensed to Vdemy and is protected by intellectual property laws. You may not copy, reproduce, or distribute any content without our explicit permission.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Termination<\\/h4>\\r\\n\\r\\n<p>We reserve the right to suspend or terminate your access to Vdemy if we believe you have violated these Terms. Upon termination, you must immediately stop using the LMS and any content associated with it. If you have a paid subscription, you may not be entitled to a refund upon termination.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Privacy Policy<\\/h4>\\r\\n\\r\\n<p>By using Vdemy, you agree to our Privacy Policy, which explains how we collect, use, and protect your personal data. Please review our Privacy Policy to understand our practices.<\\/p><h4 class=\\\"mt-3\\\">Indemnification<\\/h4>\\r\\n\\r\\n<p>You agree to indemnify and hold harmless Vdemy, its affiliates, employees, and partners from any claims, losses, damages, or expenses arising from your use of the LMS or violation of these Terms.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Changes to Terms<\\/h4>\\r\\n\\r\\n<p>We may update or modify these Terms at any time. Any changes will be posted on this page, and the updated version will be effective immediately upon posting. Your continued use of Vdemy after any such changes indicates your acceptance of the updated Terms.<\\/p>\"}', '{\"image\":null,\"description\":null,\"social_title\":null,\"social_description\":null,\"keywords\":null}', 'basic', 'privacy-policy', '2021-06-09 08:50:42', '2025-03-20 02:53:47'),
(43, 'policy_pages.element', '{\"title\":\"Terms of Service\",\"details\":\"<p>By accessing or using Vdemy, you agree to be bound by the following terms and conditions (\\\"Terms\\\"). These Terms apply to all users of our Learning Management System (\\\"LMS\\\"). If you do not agree with these Terms, do not use our LMS.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Acceptance of Terms<\\/h4>\\r\\n\\r\\n<p>By accessing or using Vdemy, you agree to comply with and be bound by these Terms of Service. We reserve the right to modify or update these Terms at any time, and any changes will be effective when posted on this page. It is your responsibility to check this page periodically for updates.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Use of Our Vdemy<\\/h4>\\r\\n\\r\\n<p>You are granted a limited, non-exclusive, non-transferable license to access and use Vdemy for your personal, educational, and non-commercial use, subject to these Terms. You may not:<\\/p>\\r\\n<ul>\\r\\n<li>Copy, modify, or distribute any content without permission.<\\/li>\\r\\n<li>Attempt to reverse-engineer or hack the LMS.<\\/li>\\r\\n<li>Use the platform for any illegal activities or purposes that violate applicable laws.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">User Account<\\/h4>\\r\\n\\r\\n<p>To use certain features of Vdemy, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update it as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect unauthorized access to your account, you must notify us immediately.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">User Responsibilities<\\/h4>\\r\\n\\r\\n<p>As a user of Vdemy, you agree to:<\\/p>\\r\\n<ul>\\r\\n<li>Abide by all applicable laws and regulations.<\\/li>\\r\\n<li>Refrain from posting or transmitting any content that is unlawful, offensive, harmful, or infringes on the rights of others.<\\/li>\\r\\n<li>Not disrupt or interfere with the functionality of the LMS or other users\' experience.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">Payment and Subscriptions<\\/h4>\\r\\n\\r\\n<p>Some services offered by Vdemy may require payment. If you choose to subscribe to any paid services, you agree to pay all applicable fees associated with those services. Payments will be processed through a third-party payment processor, and you agree to provide accurate payment information. Subscription fees may be subject to change, and you will be notified of any such changes.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Content Ownership<\\/h4>\\r\\n\\r\\n<p>All content available on Vdemy, including but not limited to courses, videos, text, images, and software, is owned by or licensed to Vdemy and is protected by intellectual property laws. You may not copy, reproduce, or distribute any content without our explicit permission.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Termination<\\/h4>\\r\\n\\r\\n<p>We reserve the right to suspend or terminate your access to Vdemy if we believe you have violated these Terms. Upon termination, you must immediately stop using the LMS and any content associated with it. If you have a paid subscription, you may not be entitled to a refund upon termination.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Privacy Policy<\\/h4>\\r\\n\\r\\n<p>By using Vdemy, you agree to our Privacy Policy, which explains how we collect, use, and protect your personal data. Please review our Privacy Policy to understand our practices.<\\/p><h4 class=\\\"mt-3\\\">Indemnification<\\/h4>\\r\\n\\r\\n<p>You agree to indemnify and hold harmless Vdemy, its affiliates, employees, and partners from any claims, losses, damages, or expenses arising from your use of the LMS or violation of these Terms.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Changes to Terms<\\/h4>\\r\\n\\r\\n<p>We may update or modify these Terms at any time. Any changes will be posted on this page, and the updated version will be effective immediately upon posting. Your continued use of Vdemy after any such changes indicates your acceptance of the updated Terms.<\\/p>\"}', '{\"image\":\"6635d5d9618e71714804185.png\",\"description\":null,\"social_title\":null,\"social_description\":null,\"keywords\":null}', 'basic', 'terms-of-service', '2021-06-09 08:51:18', '2025-03-20 02:53:27'),
(44, 'maintenance.data', '{\"description\":\"<div class=\\\"mb-5\\\" style=\\\"font-family: Nunito, sans-serif; margin-bottom: 3rem !important;\\\"><h3 class=\\\"mb-3\\\" style=\\\"text-align: center; font-weight: 600; line-height: 1.3; font-size: 24px; font-family: Exo, sans-serif;\\\"><font color=\\\"#ff0000\\\">THE SITE IS UNDER MAINTENANCE<\\/font><\\/h3><p class=\\\"font-18\\\" style=\\\"color: rgb(111, 111, 111); text-align: center; margin-right: 0px; margin-left: 0px; font-size: 18px !important;\\\">We\'re just tuning up a few things.We apologize for the inconvenience but Front is currently undergoing planned maintenance. Thanks for your patience.<\\/p><\\/div>\",\"image\":\"6603c203472ad1711522307.png\"}', NULL, NULL, NULL, '2020-07-04 23:42:52', '2024-03-27 06:51:47'),
(52, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Optimizing Your LMS for Mobile Learning: The Future of Flexible Education\",\"preview_text\":\"As mobile technology continues to evolve, more learners are accessing their educational content on smartphones and tablets. Optimizing your Learning Management System (LMS) for mobile devices is no longer optional\",\"description\":\"As mobile technology continues to evolve, more learners are accessing their educational content on smartphones and tablets. Optimizing your Learning Management System (LMS) for mobile devices is no longer optional\\u2014it\'s essential for delivering a flexible, convenient, and accessible learning experience. In this post, we\\u2019ll discuss how to design your LMS for mobile learning, the benefits of mobile accessibility, and how mobile-friendly design principles can help enhance learner engagement and performance. We\\u2019ll also explore how to implement mobile-optimized features that encourage continuous learning, even while on the go.\\r\\n\\r\\n<h5>The Importance of Mobile Learning<\\/h5> <div>Mobile learning allows students to access educational content anywhere and anytime, whether they\\u2019re at home, commuting, or on a break at work. By optimizing your LMS for mobile devices, you give your learners the flexibility to continue their education without being tied to a desktop computer. This increased accessibility can lead to higher engagement, more consistent learning, and improved completion rates. In this section, we\\u2019ll discuss why mobile learning is the future of education and how it can help expand your LMS\\u2019s reach to a broader audience.<\\/div><br \\/> <h5>Mobile-Friendly Design Principles<\\/h5> <div>Designing your LMS for mobile access involves more than just making the content accessible on smaller screens. To provide a seamless user experience, it\\u2019s important to incorporate mobile-friendly design principles. These include responsive design, which ensures that the content adjusts to fit different screen sizes, and simplified navigation, which makes it easier for learners to find what they need. Mobile users also expect fast load times and intuitive interfaces. We\\u2019ll provide actionable tips for designing a mobile-friendly LMS that works across a range of devices, from smartphones to tablets.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"Mobile learning enhances flexibility, providing students with the ability to learn anytime and anywhere, making education more accessible.\\\" <\\/blockquote> <h5>Optimizing Course Content for Mobile Devices<\\/h5> <div>Not all types of content are optimized for mobile viewing, and content that isn\\u2019t designed for mobile can create frustration for learners. To ensure your courses are mobile-friendly, you need to consider the type of content being delivered. Videos should be easily viewable on mobile devices, and text should be legible without excessive zooming. Interactive content, such as quizzes and assessments, should be designed to work well on small screens. In this section, we\\u2019ll go over specific steps to take to ensure that your courses are fully optimized for mobile learning.<\\/div><br \\/> <h5>Benefits of Mobile Learning<\\/h5> <div>Mobile learning offers a variety of benefits, including increased flexibility, accessibility, and engagement. Students can learn on the go, which is especially helpful for those with busy schedules. For organizations, offering mobile learning means reaching a larger, more diverse audience. Learners can pick up where they left off, whether on a train or in a coffee shop. The ability to take breaks and resume learning later improves knowledge retention and completion rates. We\\u2019ll dive deeper into how mobile learning increases accessibility, supports different learning styles, and helps foster lifelong learning habits.<\\/div><br \\/> <h5>Developing a Mobile App for Your LMS<\\/h5> <div>If you want to provide the best possible mobile experience, developing a dedicated mobile app for your LMS may be a good option. A mobile app can give users faster access to content, offline access to learning materials, and push notifications to keep them engaged. While it\\u2019s not always necessary for every organization, a dedicated mobile app offers a streamlined experience that may improve the learner\\u2019s overall satisfaction with your LMS. In this section, we\\u2019ll cover the pros and cons of developing a mobile app for your LMS and how it can further enhance your mobile learning offerings.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>By optimizing your LMS for mobile learning, you\\u2019re not just increasing the accessibility of your content\\u2014you\\u2019re providing learners with the flexibility they need to stay engaged and continue learning on their terms. A mobile-optimized LMS is crucial for keeping up with the demands of modern learners and ensuring that your courses are available whenever and wherever learners need them. With a mobile-friendly approach, you\\u2019ll increase engagement, retention, and overall satisfaction, helping your LMS succeed in the fast-paced world of online learning.<\\/div><br \\/>\",\"image\":\"67d7c538d223a1742193976.png\"}', '{\"image\":\"65ffcda2669481711263138.jpg\",\"description\":null,\"social_title\":\"test\",\"social_description\":null,\"keywords\":null}', 'basic', 'optimizing-your-lms-for-mobile-learning-the-future-of-flexible-education', '2024-02-01 06:52:04', '2025-03-17 00:46:17'),
(60, 'kyc.content', '{\"required\":\"Complete KYC to unlock the full potential of our platform! KYC helps us verify your identity and keep things secure. It is quick and easy just follow the on-screen instructions. Get started with KYC verification now!\",\"pending\":\"Your KYC verification is being reviewed. We might need some additional information. You will get an email update soon. In the meantime, explore our platform with limited features.\"}', NULL, 'basic', '', '2024-04-25 06:35:35', '2024-04-25 06:35:35'),
(61, 'kyc.content', '{\"required\":\"Complete KYC to unlock the full potential of our platform! KYC helps us verify your identity and keep things secure. It is quick and easy just follow the on-screen instructions. Get started with KYC verification now!\",\"pending\":\"Your KYC verification is being reviewed. We might need some additional information. You will get an email update soon. In the meantime, explore our platform with limited features.\",\"reject\":\"We regret to inform you that the Know Your Customer (KYC) information provided has been reviewed and unfortunately, it has not met our verification standards.\"}', NULL, 'basic', '', '2024-04-25 06:40:29', '2024-04-25 06:40:29'),
(64, 'banner.content', '{\"has_image\":\"1\",\"heading\":\"Build A Tech-Forward Career With Training That Sticks\",\"subheading\":\"Level up and level set your team\\u2019s technical skills with the most interactive training for programming and data skills.\",\"button_text\":\"Join Now\",\"button_link\":\"\\/register\",\"image\":\"6783996002a781736677728.png\"}', NULL, 'basic', '', '2024-05-01 00:06:45', '2025-03-19 02:23:11'),
(65, 'faq.element', '{\"question\":\"Commodo cupiditate i\",\"answer\":\"Aut vel quo unde est\",\"icon\":\"<i class=\\\"fab fa-accusoft\\\"><\\/i>\"}', NULL, 'basic', '', '2024-05-04 00:21:20', '2024-05-04 00:21:20'),
(66, 'register_disable.content', '{\"has_image\":\"1\",\"heading\":\"Registration Currently Disabled\",\"subheading\":\"Page you are looking for doesn\'t exit or an other error occurred or temporarily unavailable.\",\"button_name\":\"Go to Home\",\"button_url\":\"#\",\"image\":\"663a0f20ecd0b1715080992.png\"}', NULL, 'basic', '', '2024-05-07 05:23:12', '2024-05-07 05:28:09'),
(67, 'banner.element', '{\"title_message\":\"Learn Anytime\"}', NULL, 'basic', '', '2025-01-12 03:32:19', '2025-01-12 03:32:19'),
(68, 'banner.element', '{\"title_message\":\"Learn Anywhere\"}', NULL, 'basic', '', '2025-01-12 03:32:30', '2025-01-12 03:32:30'),
(69, 'banner.element', '{\"title_message\":\"Lean at your place\"}', NULL, 'basic', '', '2025-01-12 03:32:44', '2025-01-12 03:32:44'),
(70, 'banner.element', '{\"title_message\":\"Learn with Expert\"}', NULL, 'basic', '', '2025-01-12 03:32:58', '2025-01-12 03:32:58'),
(71, 'earning.content', '{\"title\":\"MULTIPLE LEARNING PRODUCTS\",\"heading\":\"Share Your Knowledge and Earn as an Instructor\",\"subheading\":\"Browse through our top categories to discover the best options, offering a wide range of topics to suit your interests and expertise.\"}', NULL, 'basic', '', '2025-01-12 04:38:29', '2025-03-19 01:20:40'),
(72, 'earning.element', '{\"has_image\":\"1\",\"title\":\"Create and Sell Courses\",\"description\":\"Design your courses, set pricing, and start selling to learners globally.\",\"image\":\"67dbbd35582491742454069.png\"}', NULL, 'basic', '', '2025-01-12 04:39:51', '2025-03-20 01:01:09'),
(73, 'earning.element', '{\"has_image\":\"1\",\"title\":\"Engage with Your Community\",\"description\":\"Interact with students, answer questions, and build a loyal following.\",\"image\":\"67dbbd28745fd1742454056.png\"}', NULL, 'basic', '', '2025-01-12 04:40:05', '2025-03-20 01:00:56'),
(74, 'earning.element', '{\"has_image\":\"1\",\"title\":\"Withdraw Earnings Effortlessly\",\"description\":\"Easily manage your income and withdraw your earnings whenever you choose.\",\"image\":\"67dbbd13be3b71742454035.png\"}', NULL, 'basic', '', '2025-01-12 04:40:19', '2025-03-20 01:00:37'),
(75, 'instructor.content', '{\"has_image\":\"1\",\"heading\":\"Become an Instructor\",\"subheading\":\"Instructors from around the world teach millions of learners on Udemy. We provide the tools and skills to teach what you love.\",\"button_text\":\"Start Teaching Today\",\"button_link\":\"instructor\\/login\",\"image\":\"67daa3c9359a91742382025.png\"}', NULL, 'basic', '', '2025-01-12 05:25:04', '2025-03-19 05:00:26'),
(76, 'instructor.element', '{\"heading\":\"Flexible Pricing\",\"subheading\":\"Set your own course prices and maximize earnings\",\"icon\":\"<i class=\\\"las la-percent\\\"><\\/i>\"}', NULL, 'basic', '', '2025-01-12 05:26:23', '2025-01-12 05:26:23'),
(77, 'instructor.element', '{\"heading\":\"Active Community\",\"subheading\":\"Join a vibrant community of engaged learners\",\"icon\":\"<i class=\\\"fas fa-users\\\"><\\/i>\"}', NULL, 'basic', '', '2025-01-12 05:26:45', '2025-01-12 05:26:45'),
(78, 'instructor.element', '{\"heading\":\"Interactive Learning\",\"subheading\":\"Create engaging content with interactive features\",\"icon\":\"<i class=\\\"las la-list-alt\\\"><\\/i>\"}', NULL, 'basic', '', '2025-01-12 05:27:19', '2025-01-12 05:27:19'),
(79, 'instructor.element', '{\"heading\":\"Custom Scheduling\",\"subheading\":\"Teach on your own time and preferred schedule\",\"icon\":\"<i class=\\\"far fa-clock\\\"><\\/i>\"}', NULL, 'basic', '', '2025-01-12 05:27:41', '2025-01-12 05:27:41'),
(80, 'testimonial.content', '{\"has_image\":\"1\",\"heading\":\"Testimonial\",\"shape\":\"67d7dcef0e6f51742200047.png\"}', NULL, 'basic', '', '2025-01-13 06:56:29', '2025-03-19 04:53:19'),
(85, 'counter.content', '{\"has_image\":\"1\",\"heading\":\"Join Something Extraordinary\",\"shape\":\"6785f719915501736832793.png\"}', NULL, 'basic', '', '2025-01-13 23:18:22', '2025-03-19 01:25:50'),
(86, 'counter.element', '{\"title\":\"Learners\",\"digit\":\"50\",\"symbol\":\"M\"}', NULL, 'basic', '', '2025-01-13 23:18:41', '2025-01-13 23:18:41'),
(87, 'counter.element', '{\"title\":\"Countries\",\"digit\":\"190\",\"symbol\":\"+\"}', NULL, 'basic', '', '2025-01-13 23:18:58', '2025-01-13 23:18:58'),
(88, 'counter.element', '{\"title\":\"Code submitted\",\"digit\":\"3.5\",\"symbol\":\"B\"}', NULL, 'basic', '', '2025-01-13 23:19:13', '2025-01-13 23:19:13'),
(89, 'cta.content', '{\"has_image\":\"1\",\"heading\":\"Start for Free\",\"subheading\":\"Get started today with no cost. Unlock all the features and begin your journey with zero commitment!\",\"button_text\":\"Sign Up Now\",\"button_link\":\"\\/register\",\"image_one\":\"6785ffc5e36b71736835013.png\",\"image_two\":\"6785fb3fd5e401736833855.png\"}', NULL, 'basic', '', '2025-01-13 23:50:55', '2025-03-19 01:34:29'),
(90, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Maximizing Engagement in Your Learning Management System\",\"preview_text\":\"Engagement is key to effective learning, but how do you ensure that students are fully engaged in your LMS? In this post, we explore various strategies for increasing engagement in an online learning environment.\",\"description\":\"Engagement is one of the key factors that drive the success of any Learning Management System (LMS). Whether you\'re managing corporate training, school courses, or any other form of online education, keeping learners engaged throughout their learning journey is crucial. Without engagement, students may lose interest, and your training efforts will fail to yield the desired outcomes. In this blog post, we discuss strategies to increase learner engagement within your LMS, from interactive elements to gamification, and how to create an environment that promotes long-term learning and participation.\\r\\n\\r\\n<h5>Interactive Elements to Boost Engagement<\\/h5> <div>Adding interactive elements such as quizzes, discussion boards, and surveys can significantly enhance learner engagement. Quizzes not only help reinforce the material but also give instant feedback, which motivates learners to continue progressing. Discussion boards provide a space for students to share ideas and insights, encouraging collaboration and a sense of community. Learners are more likely to stay engaged when they feel they are part of an interactive environment rather than just passive receivers of information. In this section, we\\u2019ll show you how to integrate these interactive features into your LMS effectively.<\\/div><br \\/> <h5>Gamification to Enhance Learning<\\/h5> <div>Gamification is a powerful tool for increasing motivation in online learning. By incorporating elements such as badges, leaderboards, points, and challenges, you can transform the learning experience into an engaging and competitive one. Gamification not only makes learning fun but also provides students with a tangible way to track their progress. In this section, we\\u2019ll discuss the key components of gamification, such as achievement systems and time-limited challenges, and how to integrate them into your LMS. We\\u2019ll also cover best practices for implementing gamified features in a way that motivates without overwhelming your students.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"Engaged learners are more likely to retain information and apply it in real-world scenarios. Gamification and interaction foster a deeper connection with the content.\\\"<\\/blockquote> <h5>Personalizing Learning Paths<\\/h5> <div>Personalized learning paths are another excellent way to keep students engaged. By tailoring the learning experience to each individual\\u2019s pace and preferences, learners feel more in control of their education. Features such as adaptive learning and course recommendations can be built into your LMS to provide learners with a more customized experience. Personalization helps in addressing the varying learning speeds and needs of students, ensuring that each learner can thrive. In this section, we will explore how to implement personalized learning paths and how they can increase learner satisfaction and engagement.<\\/div><br \\/> <h5>Effective Use of Multimedia Content<\\/h5> <div>Another effective way to keep learners engaged is through the use of diverse multimedia content. Videos, podcasts, infographics, and animations can break the monotony of text-heavy courses, making learning more enjoyable. They can also aid in the retention of complex concepts, as visual and auditory content often appeals to different learning styles. We\'ll explain how to integrate multimedia content seamlessly into your LMS and how it can enhance both engagement and comprehension.<\\/div><br \\/> <h5>Providing Regular Feedback and Recognition<\\/h5> <div>Regular feedback and recognition are essential for maintaining student motivation. Feedback lets learners know where they stand, and positive reinforcement can motivate them to keep progressing. In your LMS, consider setting up automated feedback systems that provide immediate insights on assignments or quizzes. Acknowledging progress and achievement through certificates, badges, or personalized messages also helps maintain enthusiasm and builds confidence in the learners.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Incorporating these engagement strategies into your LMS will significantly enhance the learning experience for your students. Engagement leads to better retention, higher completion rates, and a more fulfilling educational journey. Whether you\\u2019re looking to improve corporate training, academic courses, or any other form of online learning, these tips will help you create an LMS that keeps learners coming back for more.<\\/div><br \\/>\",\"image\":\"67d7c4098c37b1742193673.png\"}', NULL, 'basic', 'maximizing-engagement-in-your-learning-management-system', '2025-02-04 00:36:04', '2025-03-17 00:45:04'),
(91, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"How to Build a Sustainable Retirement Plan: Steps for Lasting Financial Security\",\"preview_text\":\"A sustainable retirement plan is essential to ensure that your savings last throughout your retirement years. In this post, we dive into how to develop a withdrawal strategy,\",\"description\":\"A sustainable retirement plan is essential to ensure that your savings last throughout your retirement years. In this post, we dive into how to develop a withdrawal strategy, considering factors such as inflation, expected lifespan, and market returns. Planning ahead allows you to strike the right balance between enjoying retirement and protecting your financial future.<br \\/><br \\/>\\r\\n\\r\\n<h5>Creating a Sustainable Withdrawal Strategy<\\/h5> <div>Developing a withdrawal strategy is crucial once you retire. The key is to ensure that you don\\u2019t outlive your savings. We explore strategies like the 4% rule and how to adjust withdrawals based on market performance and personal circumstances.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"A good retirement strategy is one that adapts to changing circumstances and continues to support you as you age.\\\"<\\/blockquote> <h5>Planning for Inflation and Healthcare Costs<\\/h5> <div>One of the most important factors in building a sustainable plan is accounting for inflation and rising healthcare costs. These are two of the biggest expenses in retirement, and they can significantly reduce your purchasing power. Learn how to plan for these costs so that you don\'t run out of money as your expenses increase.<\\/div><br \\/> <h5>Adjusting Your Plan Over Time<\\/h5> <div>Your retirement plan should evolve as you age. We discuss the importance of reviewing your withdrawal strategy annually and making necessary adjustments, whether it\\u2019s to account for unforeseen medical expenses or changes in your investment returns.<\\/div><br \\/>\",\"image\":\"67d7c3aa516191742193578.png\"}', NULL, 'basic', 'how-to-build-a-sustainable-retirement-plan-steps-for-lasting-financial-security', '2025-02-12 00:37:26', '2025-03-17 00:39:38'),
(92, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"The Essential Guide to Retirement Savings: Preparing for Your Golden Years\",\"preview_text\":\"Planning your retirement savings is key to ensuring financial independence later in life. This post covers everything you need to know about building your retirement fund,\",\"description\":\"Planning your retirement savings is key to ensuring financial independence later in life. This post covers everything you need to know about building your retirement fund, including the importance of diversifying your investments and utilizing retirement accounts like 401(k)s and IRAs. Learn how to calculate your retirement needs, maximize contributions, and ensure you\\u2019re on track to achieve your financial goals for the future.<br \\/><br \\/>\\r\\n\\r\\n<h5>Building Your Retirement Fund<\\/h5> <div>Start saving for retirement as early as possible. The power of compound interest will work to your benefit over time. This section will show you how to estimate your retirement needs based on factors like lifestyle, healthcare, and life expectancy, so you can begin saving accordingly.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"The best time to start contributing to your retirement savings was yesterday. The second best time is now.\\\"<\\/blockquote> <h5>Maximizing Your Savings and Investments<\\/h5> <div>Maximizing your contributions to retirement accounts is crucial for building long-term wealth. Learn how to take full advantage of employer-sponsored 401(k)s, IRA contributions, and Roth IRAs. Additionally, understanding the importance of asset allocation and diversifying your investments will help protect and grow your retirement savings.<\\/div><br \\/> <h5>Catch-Up Contributions for Late Savers<\\/h5> <div>If you\'re over the age of 50, catch-up contributions allow you to contribute more to your retirement accounts to make up for lost time. This section explains how catch-up contributions work and why they are especially beneficial for those starting late in their retirement planning journey.<\\/div><br \\/>\",\"image\":\"67d7c34da05331742193485.png\"}', NULL, 'basic', 'the-essential-guide-to-retirement-savings-preparing-for-your-golden-years', '2025-02-17 00:38:27', '2025-03-17 00:38:06'),
(93, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Mastering Retirement Planning: A Roadmap for Financial Success\",\"preview_text\":\"Planning for retirement is one of the most important financial decisions you can make in your life. Retirement planning ensures that you have enough savings to support your desired lifestyle and secure your future after you stop working.\",\"description\":\"Retirement planning is essential for ensuring financial security and peace of mind in your golden years. In this blog post, we discuss key retirement planning strategies, including setting retirement goals, estimating retirement expenses, maximizing retirement savings accounts, and creating a sustainable withdrawal plan. Whether you\'re decades away from retirement or nearing your retirement age, this guide will help you take proactive steps towards a financially secure future.<br \\/><br \\/>\\r\\n\\r\\n<h5>Setting Clear Retirement Goals<\\/h5> <div>Start by determining your retirement aspirations, such as the lifestyle you want and when you wish to retire. This will give you a concrete figure for how much you\\u2019ll need to save. Defining your goals makes it easier to estimate expenses and stay on track.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"The earlier you start planning, the better positioned you\\u2019ll be to achieve your retirement dreams.\\\"<\\/blockquote> <h5>Maximizing Retirement Savings Accounts<\\/h5> <div>Retirement savings accounts, such as 401(k)s and IRAs, are essential tools for growing your wealth. Contributing regularly to these accounts, especially if your employer offers a match, is one of the most effective ways to secure a comfortable future. We\\u2019ll show you how to take full advantage of these tax-advantaged accounts.<\\/div><br \\/> <h5>Creating a Sustainable Withdrawal Plan<\\/h5> <div>Planning your withdrawals in retirement is just as important as saving. A sustainable withdrawal strategy ensures that your funds will last. We\\u2019ll guide you through the process of calculating how much you can safely withdraw each year to avoid depleting your savings too soon.<\\/div><br \\/>\",\"image\":\"67d7c31c659251742193436.png\"}', NULL, 'basic', 'mastering-retirement-planning-a-roadmap-for-financial-success', '2025-02-18 00:39:41', '2025-03-17 00:37:16'),
(94, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Building a Next-Level Learning Experience with a Custom LMS\",\"preview_text\":\"Retirement planning is crucial for ensuring financial security and peace of mind in your later years. In this blog post, we dive into essential strategies for retirement planning, including setting clear goals,\",\"description\":\"Retirement planning is crucial for ensuring financial security and peace of mind in your later years. In this blog post, we dive into essential strategies for retirement planning, including setting clear goals, estimating future expenses, maximizing retirement savings accounts, and crafting a sustainable withdrawal plan. Whether you\'re decades away from retirement or already approaching it, this guide will provide actionable steps towards securing a financially stable future.<br \\/><br \\/>\\r\\n\\r\\n<h5>From setting retirement goals to calculating future expenses and income needs<\\/h5> <div>we\'ll walk you through creating a personalized retirement plan tailored to your individual situation. This guide is designed to help you make informed decisions, ensuring you\'re prepared regardless of how far away you are from retirement.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"Planning your retirement is about more than saving money; it\\u2019s about ensuring you can enjoy life in your later years without financial stress.\\\"<\\/blockquote> <h5>Retirement planning involves more than just accumulating savings<\\/h5> <div>It\\u2019s also about developing a sustainable withdrawal strategy to preserve your wealth throughout your retirement. We\'ll explore key considerations such as inflation, investment returns, and your expected lifespan to help you create a balanced withdrawal plan for a fulfilling and secure retirement lifestyle.<\\/div><br \\/> <h5>Starting your retirement plan at any stage<\\/h5> <div>Whether you\'re early in your career, mid-career, or nearing retirement, it\'s never too early\\u2014or too late\\u2014to start planning. Empower yourself with the knowledge and tools you need to take control of your financial future and start building a plan that will help you retire with confidence.<\\/div> <h5>From setting clear retirement goals to estimating your future expenses and income needs<\\/h5> <div>we\'ll guide you through the process of creating a solid retirement plan tailored to your unique circumstances, ensuring you\'re prepared for a financially secure and comfortable retirement.<\\/div>\",\"image\":\"67d7c1cbce43e1742193099.png\"}', NULL, 'basic', 'building-a-next-level-learning-experience-with-a-custom-lms', '2025-02-20 00:40:13', '2025-03-17 00:32:15'),
(95, 'contact_us.element', '{\"city\":\"Sydney\",\"address\":\"123 Sample St, Sydney NSW 2000 AU\",\"google_map_link\":\"https:\\/\\/maps.app.goo.gl\\/od3DNrXoUZx2hNV68\"}', NULL, 'basic', '', '2025-01-16 01:43:12', '2025-01-16 01:43:12'),
(96, 'contact_us.element', '{\"city\":\"New York\",\"address\":\"123 Sample St, New York NY 10000 USA\",\"google_map_link\":\"https:\\/\\/maps.app.goo.gl\\/od3DNrXoUZx2hNV68\"}', NULL, 'basic', '', '2025-01-16 01:43:27', '2025-01-16 01:43:27'),
(97, 'course_page.content', '{\"heading\":\"How about a working title and category?\",\"subheading\":\"It\'s time to give your course a title and category that will help students find it. Don\'t worry, you can always change these later.\"}', NULL, 'basic', '', '2025-01-21 05:05:12', '2025-01-21 05:05:12'),
(98, 'course.content', '{\"heading\":\"How about a working title and category?\",\"subheading\":\"It\'s time to give your course a title and category that will help students find it. Don\'t worry, you can always change these later.\"}', NULL, 'basic', '', '2025-01-21 05:06:09', '2025-01-21 05:06:09'),
(99, 'categories.content', '{\"heading\":\"Our Trending Categories\",\"subheading\":\"Browse through our trending categories to discover the best options, offering a wide range of topics to suit your interests and expertise.\"}', NULL, 'basic', '', '2025-02-08 00:48:33', '2025-03-19 03:11:26'),
(100, 'populer_courses.content', '{\"has_image\":\"1\",\"title\":\"Start your learning\",\"heading\":\"Our Popular courses\",\"shape\":\"67a71aac0194e1739004588.png\"}', NULL, 'basic', '', '2025-02-08 02:42:47', '2025-02-08 02:49:49'),
(101, 'course_detail.content', '{\"has_image\":\"1\",\"shape\":\"67a75247733501739018823.png\",\"shape_two\":\"67a75247b12371739018823.png\"}', NULL, 'basic', '', '2025-02-08 06:47:03', '2025-02-08 06:47:03'),
(102, 'quiz_view.content', '{\"has_image\":\"1\",\"image\":\"67b1ea0ae68fd1739713034.png\"}', NULL, 'basic', '', '2025-02-16 07:37:14', '2025-02-16 07:37:16'),
(103, 'user_dashboard.content', '{\"has_image\":\"1\",\"heading\":\"Welcome to your dashboard\",\"description\":\"Track your courses, monitor progress, \\u2014all in one place. Access learning materials, engage with instructors, and keep moving toward your goals.\",\"shape\":\"67b33d17501a01739799831.png\",\"image\":\"67b33d1761fb91739799831.png\",\"image_one\":\"67b33b82dcccc1739799426.png\",\"image_two\":\"67b33b84a12451739799428.png\",\"image_three\":\"67b33b84a20661739799428.png\"}', NULL, 'basic', '', '2025-02-17 07:37:06', '2025-03-20 01:35:44'),
(104, 'learners.element', '{\"has_image\":[\"1\",\"1\"],\"name\":\"Darrell Steward\",\"designation\":\"Junior programmer, Dilhut IT\",\"country\":\"USA\",\"image\":\"67b42c12018f61739861010.png\",\"logo\":\"67b580992afe61739948185.png\"}', NULL, 'basic', '', '2025-02-18 00:43:30', '2025-02-19 00:56:25'),
(105, 'learners.element', '{\"has_image\":[\"1\",\"1\"],\"name\":\"Jane Cooper\",\"designation\":\"Junior programmer, Dilhut IT\",\"country\":\"USA\",\"image\":\"67b42c69e31341739861097.png\",\"logo\":\"67b580a487ca61739948196.png\"}', NULL, 'basic', '', '2025-02-18 00:44:57', '2025-02-19 00:56:36'),
(106, 'learners.element', '{\"has_image\":[\"1\",\"1\"],\"name\":\"Kristin Watson\",\"designation\":\"Junior programmer, Dilhut IT\",\"country\":\"USA\",\"image\":\"67b42c8cc793d1739861132.png\",\"logo\":\"67b580acd2fc31739948204.png\"}', NULL, 'basic', '', '2025-02-18 00:45:32', '2025-02-19 00:56:44'),
(107, 'learners.element', '{\"has_image\":[\"1\",\"1\"],\"name\":\"Devon Lane\",\"designation\":\"Junior programmer, Dilhut IT\",\"country\":\"USA\",\"image\":\"67b42cad09ab11739861165.png\",\"logo\":\"67b580b3e270d1739948211.png\"}', NULL, 'basic', '', '2025-02-18 00:46:05', '2025-02-19 00:56:51'),
(108, 'learners.content', '{\"has_image\":\"1\",\"title\":\"Our Learners Work At\",\"shape\":\"67b42cbb476a01739861179.png\"}', NULL, 'basic', '', '2025-02-18 00:46:19', '2025-03-20 01:11:57'),
(109, 'courses.content', '{\"has_image\":\"1\",\"shape_one\":\"67b43096bd24c1739862166.png\",\"shape_two\":\"67b43096c8ff41739862166.png\",\"shape_three\":\"67b43096cd9ba1739862166.png\"}', NULL, 'basic', '', '2025-02-18 01:02:46', '2025-02-18 01:02:46'),
(110, 'top_courses.content', '{\"heading\":\"Top Selling Courses\",\"subheading\":\"Choose from over 21,000 online video courses with new additions published every month\"}', NULL, 'basic', '', '2025-02-19 05:00:30', '2025-03-19 00:56:44'),
(111, 'short_courses.content', '{\"has_image\":\"1\",\"heading\":\"Learn New Skills\",\"subheading\":\"Expand your knowledge and enhance your career by mastering new skills that open doors to new opportunities and growth\",\"shape\":\"67b5c0793a8c21739964537.png\"}', NULL, 'basic', '', '2025-02-19 05:28:57', '2025-03-19 01:14:01'),
(112, 'career.content', '{\"heading\":\"How to Start Your New Career Faster?\"}', NULL, 'basic', '', '2025-02-19 05:40:42', '2025-03-20 01:12:25'),
(113, 'career.element', '{\"title\":\"Learn the skills\",\"subtitle\":\"This expertly curated career path gives you all the knowledge and experience you need to start this career.\"}', NULL, 'basic', '', '2025-02-19 05:41:05', '2025-02-19 05:41:05'),
(114, 'career.element', '{\"title\":\"Prep for interviews\",\"subtitle\":\"Assess if you\'re ready to apply for jobs, then build your confidence with code challenges and practice questions.\"}', NULL, 'basic', '', '2025-02-19 05:41:21', '2025-02-19 05:41:21');
INSERT INTO `frontends` (`id`, `data_keys`, `data_values`, `seo_content`, `tempname`, `slug`, `created_at`, `updated_at`) VALUES
(115, 'career.element', '{\"title\":\"Get hired\",\"subtitle\":\"This expertly curated career path gives you all the knowledge and experience you need to start this career.\"}', NULL, 'basic', '', '2025-02-19 05:41:35', '2025-02-19 05:41:35'),
(116, 'about_banner.content', '{\"has_image\":\"1\",\"video_link\":\"https:\\/\\/www.youtube.com\\/embed\\/WOb4cj7izpE\",\"heading\":\"About Vdemy - On-Demand Course Selling Platform | LMS\",\"description\":\"Come help us build the education the world deserves. We\'re on a mission to transform online learning by creating engaging, interactive, and accessible educational experiences. Join us in revolutionizing education and empowering learners worldwide to achieve their full potential through quality online courses and cutting-edge learning technology.\",\"image\":\"67b5c9604510d1739966816.png\"}', NULL, 'basic', '', '2025-02-19 06:06:56', '2025-03-19 01:27:10'),
(119, 'achivment.content', '{\"has_image\":\"1\",\"heading\":\"Celebrating Our Achievements\",\"description\":\"From milestones to success stories, our journey is defined by growth, impact, and excellence. Join us in celebrating the progress we\'ve made together!\",\"image\":\"67b5dde88fa1f1739972072.png\"}', NULL, 'basic', '', '2025-02-19 07:30:46', '2025-03-19 01:50:44'),
(120, 'achivment.element', '{\"value\":\"65\",\"symbol\":\"M\",\"operator\":\"+\",\"title\":\"Learners\"}', NULL, 'basic', '', '2025-02-19 07:34:47', '2025-02-19 07:34:47'),
(121, 'achivment.element', '{\"value\":\"80\",\"symbol\":\"K\",\"operator\":\"+\",\"title\":\"Instructor\"}', NULL, 'basic', '', '2025-02-19 07:35:04', '2025-02-19 07:35:04'),
(122, 'achivment.element', '{\"value\":\"80\",\"symbol\":\"K\",\"operator\":\"+\",\"title\":\"Languages\"}', NULL, 'basic', '', '2025-02-19 07:35:18', '2025-02-19 07:35:18'),
(123, 'achivment.element', '{\"value\":\"42\",\"symbol\":\"K\",\"operator\":\"+\",\"title\":\"Courses\"}', NULL, 'basic', '', '2025-02-19 07:35:29', '2025-02-19 07:35:29'),
(124, 'about_content.element', '{\"icon\":\"<i class=\\\"fas fa-history\\\"><\\/i>\",\"heading\":\"Our History\",\"description\":\"When we started Vdemy, our goal was to give anyone in the world the ability to learn the skills they\'d need to succeed in the 21st century. We set out to create a new, interactive way of learning \\u2014 making it engaging, flexible, and accessible for as many people as possible. Since then, we have helped millions of people worldwide unlock modern technical skills and reach their full potential through code\"}', NULL, 'basic', '', '2025-02-19 07:46:50', '2025-03-19 01:46:43'),
(125, 'about_content.element', '{\"icon\":\"<i class=\\\"far fa-eye\\\"><\\/i>\",\"heading\":\"Our Vision\",\"description\":\"At Vdemy, our vission is to empower learners worldwide through accessible, high-quality online education. We believe that education should be engaging, interactive, and adaptable to each learner\'s needs. Our platform combines cutting-edge technology with expert instruction to create an immersive learning experience that helps students master new skills and achieve their career goals. We\'re committed to breaking down barriers to education and fostering a global community of lifelong learners.\"}', NULL, 'basic', '', '2025-02-19 07:47:29', '2025-03-19 01:46:14'),
(126, 'about_content.content', '{\"heading\":\"Secure and Fast Transactions\",\"description\":\"Curabitur turpis. Vestibulum suscipit nulla quis orci. Donec mollis hendrerit risus. Fusce commodo aliquam arcu. Donec id justo.\\r\\n\\r\\nNullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. In auctor lobortis lacus. Vivamus elementum semper nisi. Phasellus gravida semper nisi. Suspendisse eu ligula.\\r\\n\\r\\nPraesent congue erat at massa. Curabitur nisi. Etiam ut purus mattis mauris sodales aliquam. Nulla porta dolor. Donec id justo.\\r\\n\\r\\nAliquam lobortis. Quisque malesuada placerat nisl. Vestibulum eu odio. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Donec id justo.\\r\\n\\r\\nInteger tincidunt. Cras id dui. Phasellus a est. Ut varius tincidunt libero. Nullam dictum felis eu pede mollis pretium.\"}', NULL, 'basic', '', '2025-02-19 07:49:31', '2025-02-19 07:49:31'),
(127, 'location.content', '{\"heading\":\"Our Locations\",\"subheading\":\"Where We Operate: Our Global Locations\",\"map_link\":\"https:\\/\\/www.google.com\\/maps\\/embed?pb=!1m14!1m8!1m3!1d38788.84964190694!2d-1.978538!3d52.582213!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham%2C%20UK!5e0!3m2!1sen!2sbd!4v1739973866323!5m2!1sen!2sbd\"}', NULL, 'basic', '', '2025-02-19 07:56:39', '2025-03-19 01:36:28'),
(128, 'location.element', '{\"city\":\"Sydney\",\"address\":\"123 Sample St, Sydney NSW 2000 AU\",\"map_link\":\"https:\\/\\/maps.app.goo.gl\\/XGZQUotf7WcdSSkh7\"}', NULL, 'basic', '', '2025-02-19 07:56:54', '2025-02-19 07:56:54'),
(129, 'location.element', '{\"city\":\"New York\",\"address\":\"123 Sample St, New York NY 10000 USA\",\"map_link\":\"https:\\/\\/maps.app.goo.gl\\/XGZQUotf7WcdSSkh7\"}', NULL, 'basic', '', '2025-02-19 07:57:09', '2025-02-19 08:05:34'),
(130, 'location.element', '{\"city\":\"London\",\"address\":\"123 Sample St, London W1C 1DE, United Kingdom\",\"map_link\":\"https:\\/\\/maps.app.goo.gl\\/XGZQUotf7WcdSSkh7\"}', NULL, 'basic', '', '2025-02-19 07:57:18', '2025-02-19 08:05:42'),
(131, 'teach_banner.content', '{\"has_image\":\"1\",\"heading\":\"Become an Instructor Today\",\"subheading\":\"Become an instructor and change lives \\u2014 including your own. Share your expertise, inspire learners worldwide, and earn income while doing what you love. Our platform provides you with the tools and support to create engaging courses and build a thriving teaching career.\",\"button_text\":\"Get Start Teaching\",\"button_link\":\"\\/instructor\\/register\",\"image\":\"67b6c9101c5821740032272.png\"}', NULL, 'basic', '', '2025-02-20 00:17:52', '2025-03-19 22:20:53'),
(133, 'teach_banner.element', '{\"title\":\"Join Expert Community\"}', NULL, 'basic', '', '2025-02-20 00:18:50', '2025-02-20 00:18:50'),
(134, 'teach_banner.element', '{\"title\":\"Flexible Schedule\"}', NULL, 'basic', '', '2025-02-20 00:18:56', '2025-02-20 00:18:56'),
(135, 'teach_banner.element', '{\"title\":\"Share Your Knowledge\"}', NULL, 'basic', '', '2025-02-20 00:19:01', '2025-02-20 00:19:01'),
(136, 'teach_banner.element', '{\"title\":\"Become an Instructor Today\"}', NULL, 'basic', '', '2025-02-20 00:19:10', '2025-02-20 00:19:10'),
(137, 'teach_benifit.content', '{\"heading\":\"So many reasons to start\"}', NULL, 'basic', '', '2025-02-20 00:30:04', '2025-02-20 00:30:04'),
(138, 'teach_benifit.element', '{\"has_image\":\"1\",\"title\":\"Teach your way\",\"description\":\"This expertly curated career path gives you all the knowledge and experience you need to start this career.\",\"image\":\"67b6cc1353e6a1740033043.png\"}', NULL, 'basic', '', '2025-02-20 00:30:43', '2025-02-20 00:30:43'),
(139, 'teach_benifit.element', '{\"has_image\":\"1\",\"title\":\"Inspire learners\",\"description\":\"Teach what you know and help learners explore their interests, gain new skills, and advance their careers.\",\"image\":\"67b6cc2fdfd121740033071.png\"}', NULL, 'basic', '', '2025-02-20 00:31:11', '2025-02-20 00:31:11'),
(140, 'teach_benifit.element', '{\"has_image\":\"1\",\"title\":\"Get rewarded\",\"description\":\"Expand your professional network, build your expertise, and earn money on each paid enrollment.\",\"image\":\"67b6cc3e1e9701740033086.png\"}', NULL, 'basic', '', '2025-02-20 00:31:26', '2025-02-20 00:31:26'),
(141, 'teach_counter.element', '{\"title\":\"Learners\",\"value\":\"50\",\"symbol\":\"M\"}', NULL, 'basic', '', '2025-02-20 00:41:41', '2025-02-20 00:41:41'),
(142, 'teach_counter.element', '{\"title\":\"Languages\",\"value\":\"75\",\"symbol\":\"+\"}', NULL, 'basic', '', '2025-02-20 00:41:55', '2025-02-20 00:41:55'),
(143, 'teach_counter.element', '{\"title\":\"75\",\"value\":\"M\",\"symbol\":\"Enrollments\"}', NULL, 'basic', '', '2025-02-20 00:42:05', '2025-02-20 00:42:05'),
(144, 'teach_counter.element', '{\"title\":\"Countries\",\"value\":\"180\",\"symbol\":\"+\"}', NULL, 'basic', '', '2025-02-20 00:42:17', '2025-02-20 00:42:17'),
(145, 'teach_counter.element', '{\"title\":\"15000\",\"value\":\"+\",\"symbol\":\"Enterprise customers\"}', NULL, 'basic', '', '2025-02-20 00:42:32', '2025-02-20 00:42:32'),
(146, 'teach_counter.content', '{\"heading\":\"sdds\"}', NULL, 'basic', '', '2025-02-20 00:54:36', '2025-02-20 00:54:36'),
(147, 'instructor_section.element', '{\"has_image\":\"1\",\"name\":\"Laura Mitchell\",\"designation\":\"Learning & Development Manager\",\"quatation\":\"This LMS platform has transformed how we manage our training programs. It\\u2019s intuitive, easy to use, and has helped our employees stay engaged and improve their skills efficiently.\",\"image\":\"67d7ce973476d1742196375.png\"}', NULL, 'basic', '', '2025-02-20 01:32:11', '2025-03-17 01:26:15'),
(148, 'instructor_section.element', '{\"has_image\":\"1\",\"name\":\"Nola Dickson\",\"designation\":\"Developer (Web Speciality)\",\"quatation\":\"Praesent venenatis metus at tortor pulvinar varius. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Nullam dictum felis eu pede mollis pretium. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. In turpis.\",\"image\":\"67b6daaba580f1740036779.png\"}', NULL, 'basic', '', '2025-02-20 01:32:59', '2025-02-20 01:33:09'),
(149, 'teach_community.content', '{\"has_image\":\"1\",\"heading\":\"You won\\u2019t have to do it alone\",\"description\":\"Our Instructor Support Team is here to answer your\\r\\n                    questions and review\\r\\n                    your test video, while our <strong>Teaching Center<\\/strong> gives you plenty of resources to help\\r\\n                    you through\\r\\n                    the\\r\\n                    process. Plus, get the support of experienced instructors in our <strong>online community<\\/strong> .\\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0\",\"image\":\"67b6e81871bfd1740040216.png\",\"image_two\":\"67b6e819da94a1740040217.png\"}', NULL, 'basic', '', '2025-02-20 02:30:16', '2025-02-20 02:30:17'),
(150, 'become_instructor.content', '{\"heading\":\"Become an instructor today\",\"subheading\":\"Join one of the world\\u2019s largest online learning marketplaces.\",\"button_text\":\"Get Start Teaching\",\"button_link\":\"\\/instructor\\/register\"}', NULL, 'basic', '', '2025-02-20 02:46:15', '2025-03-19 22:21:04'),
(151, 'teach_step.content', '{\"heading\":\"How To Begin\"}', NULL, 'basic', '', '2025-02-20 03:02:35', '2025-02-20 03:02:35'),
(153, 'teach_step.element', '{\"has_image\":[\"1\"],\"title\":\"Record Your video\",\"description\":\"<p class=\\\"teach-step__desc\\\">You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.<\\/p><p class=\\\"teach-step__desc\\\">The way that you teach \\u2014 what you bring to it \\u2014 is up to you.<\\/p><p class=\\\"teach-step__title\\\"><span style=\\\"font-weight:bolder;\\\"><font size=\\\"4\\\">How we help you<\\/font><\\/span><\\/p><p class=\\\"teach-step__desc\\\">We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.\\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0<\\/p>\",\"image\":\"67b6f024d15001740042276.png\"}', NULL, 'basic', '', '2025-02-20 03:04:36', '2025-02-20 03:16:20'),
(155, 'teach_step.element', '{\"has_image\":[\"1\"],\"title\":\"Launch Your Course\",\"description\":\"<div>You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.<\\/div><div>The way that you teach \\u2014 what you bring to it \\u2014 is up to you.<\\/div><div><b><font size=\\\"4\\\">How we help you<\\/font><\\/b><\\/div><div>We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.\\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0<\\/div>\",\"image\":\"67b6f32c77dcf1740043052.png\"}', NULL, 'basic', '', '2025-02-20 03:17:32', '2025-02-20 03:19:08'),
(156, 'teach_step.element', '{\"has_image\":[\"1\"],\"title\":\"Plan Your Curriculum\",\"description\":\"<p class=\\\"teach-step__desc\\\">You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.<\\/p><p class=\\\"teach-step__desc\\\">The way that you teach \\u2014 what you bring to it \\u2014 is up to you.<\\/p><p class=\\\"teach-step__title\\\"><span style=\\\"font-weight:bolder;\\\"><font size=\\\"4\\\">How we help you<\\/font><\\/span><\\/p><p class=\\\"teach-step__desc\\\">We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.\\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0 \\u00a0<\\/p>\",\"image\":\"67b6f384a79941740043140.png\"}', NULL, 'basic', '', '2025-02-20 03:19:00', '2025-02-20 03:19:00'),
(157, 'footer.content', '{\"news_letter_heading\":\"Join our newsletter\",\"news_letter_subheading\":\"Stay Updated with the Latest News, Tips, and Exclusive Offers!\",\"footer_description\":\"We are a team of passionate individuals dedicated to providing the best services and products to our customers. Our mission is to make your life easier and more enjoyable.\"}', NULL, 'basic', '', '2025-03-04 04:21:17', '2025-03-04 04:21:17'),
(158, 'footer.element', '{\"social_icon\":\"<i class=\\\"fab fa-facebook-f\\\"><\\/i>\",\"url\":\"https:\\/\\/www.facebook.com\"}', NULL, 'basic', '', '2025-03-04 04:21:42', '2025-03-04 04:26:55'),
(159, 'footer.element', '{\"social_icon\":\"<i class=\\\"fas fa-times\\\"><\\/i>\",\"url\":\"https:\\/\\/x.com\"}', NULL, 'basic', '', '2025-03-04 04:21:56', '2025-03-19 07:57:54'),
(160, 'footer.element', '{\"social_icon\":\"<i class=\\\"fab fa-linkedin-in\\\"><\\/i>\",\"url\":\"https:\\/\\/www.linkedin.com\"}', NULL, 'basic', '', '2025-03-04 04:22:23', '2025-03-04 04:27:53'),
(161, 'footer.element', '{\"social_icon\":\"<i class=\\\"fab fa-instagram\\\"><\\/i>\",\"url\":\"https:\\/\\/www.instagram.com\\/accounts\\/login\\/\"}', NULL, 'basic', '', '2025-03-04 04:22:38', '2025-03-04 04:26:32'),
(162, 'footer_list.element', '{\"title\":\"About\",\"link\":\"\\/about\"}', NULL, 'basic', '', '2025-03-04 04:42:10', '2025-03-04 04:42:10'),
(163, 'footer_list.element', '{\"title\":\"Careers\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:42:32', '2025-03-04 04:42:32'),
(164, 'footer_list.element', '{\"title\":\"Affiliates\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:42:41', '2025-03-04 04:42:41'),
(165, 'footer_list.element', '{\"title\":\"Partnerships\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:42:47', '2025-03-04 04:42:47'),
(166, 'footer_list_two.element', '{\"title\":\"Articles\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:43:06', '2025-03-04 04:43:06'),
(167, 'footer_list_two.element', '{\"title\":\"Docs\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:43:16', '2025-03-04 04:43:16'),
(168, 'footer_list_two.element', '{\"title\":\"Projects\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:43:22', '2025-03-04 04:43:22'),
(169, 'footer_list_two.element', '{\"title\":\"workspaces\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:43:27', '2025-03-04 04:43:27'),
(170, 'footer_list_two.element', '{\"title\":\"workspaces\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:43:39', '2025-03-04 04:43:39'),
(171, 'footer_list_three.element', '{\"title\":\"Business Analytics\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:44:04', '2025-03-04 04:44:04'),
(172, 'footer_list_three.element', '{\"title\":\"AWS Cloud Architect\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:44:13', '2025-03-04 04:44:13'),
(173, 'footer_list_three.element', '{\"title\":\"Data Analyst\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:44:19', '2025-03-04 04:44:19'),
(174, 'footer_list_three.element', '{\"title\":\"Machine learning\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:44:30', '2025-03-04 04:44:30'),
(175, 'footer_list_three.element', '{\"title\":\"SQL\",\"link\":\"#\"}', NULL, 'basic', '', '2025-03-04 04:44:37', '2025-03-04 04:44:37'),
(176, 'footer_list.content', '{\"title\":\"Company\"}', NULL, 'basic', '', '2025-03-04 04:48:21', '2025-03-04 04:48:21'),
(177, 'footer_list_two.content', '{\"title\":\"Resources\"}', NULL, 'basic', '', '2025-03-04 04:48:31', '2025-03-04 04:48:31'),
(178, 'footer_list_three.content', '{\"title\":\"Featured Programs\"}', NULL, 'basic', '', '2025-03-04 04:48:42', '2025-03-04 04:48:42'),
(179, 'popular_courses.content', '{\"has_image\":\"1\",\"title\":\"Start your learning\",\"heading\":\"Our Popular Courses\",\"shape\":\"67d69528073211742116136.png\"}', NULL, 'basic', '', '2025-03-16 03:06:37', '2025-03-19 00:19:17'),
(180, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"How to Choose the Right LMS for Your Organization\",\"preview_text\":\"Choosing the right Learning Management System (LMS) is crucial to the success of your organization\'s educational or training initiatives. With a variety of options available, selecting the best LMS can be a complex process.\",\"description\":\"Choosing the right Learning Management System (LMS) is crucial to the success of your organization\'s educational or training initiatives. With a variety of options available, selecting the best LMS can be a complex process. Whether you\\u2019re implementing an LMS for employee training, educational institutions, or a corporate onboarding program, finding the right system is essential to meeting your specific needs and objectives. In this blog post, we will guide you through the process of evaluating LMS options, from defining your needs to considering features like scalability, integration capabilities, and ease of use. We\'ll also cover best practices for making an informed decision and selecting an LMS that provides long-term value for your organization.\\r\\n\\r\\n<h5>Defining Your LMS Needs<\\/h5> <div>Before selecting an LMS, it\\u2019s essential to define the specific needs of your organization. Are you providing training to employees, students, or external clients? Do you need to deliver courses on a global scale, or are you focusing on a smaller group? Understanding your objectives and target audience is the first step in choosing the right LMS. In this section, we\\u2019ll help you assess your organization\\u2019s needs, including the types of content you\\u2019ll be delivering, the number of users, and the desired features (e.g., eLearning, certifications, reporting, etc.). This foundational step will ensure that you are focused on the right LMS features that align with your goals.<\\/div><br \\/> <h5>Evaluating LMS Features<\\/h5> <div>The features and functionalities of an LMS are critical in ensuring it meets the needs of your organization. Key features to consider include course creation tools, content management, assessment tools, learner tracking, and reporting capabilities. If you require integration with other platforms, such as HR or CRM systems, make sure the LMS you choose supports these integrations. You should also think about user experience\\u2014how easy it is for both administrators and learners to navigate the system. In this section, we\\u2019ll dive into some of the most important LMS features you should prioritize when evaluating different options.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"The right LMS should be scalable, flexible, and user-friendly, with features that support the learning needs of both learners and administrators.\\\"<\\/blockquote> <h5>Scalability and Flexibility<\\/h5> <div>As your organization grows, so will your LMS needs. Scalability is an important factor to consider when choosing an LMS, especially if you plan on expanding your programs over time. Can the LMS handle a growing number of users? Will it accommodate more courses or advanced learning techniques, such as blended or mobile learning? Make sure to choose an LMS that can adapt to the changing needs of your organization without requiring a complete overhaul. Flexibility in customizing the LMS to meet specific requirements is also essential for maintaining long-term usability. We\'ll walk you through evaluating the scalability and flexibility of different LMS platforms.<\\/div><br \\/> <h5>Integration with Other Systems<\\/h5> <div>In today\\u2019s tech-driven world, it\\u2019s essential that your LMS integrates seamlessly with other tools and platforms your organization uses. Whether it\\u2019s CRM, HR management, or other enterprise systems, choosing an LMS that supports integration can help streamline your processes and improve efficiency. The right integrations can enhance the learner experience, make administrative tasks easier, and allow for more in-depth analytics. This section will explain how to evaluate potential LMS platforms for their ability to integrate with other systems and what you should look for when assessing integration capabilities.<\\/div><br \\/> <h5>Ease of Use for Administrators and Learners<\\/h5> <div>Ease of use is a crucial factor when selecting an LMS. If the system is difficult for administrators to manage or for learners to navigate, it can lead to frustration and decreased usage. Choose an LMS with an intuitive interface and simple navigation, both for course creators and learners. Training administrators to use the system should also be straightforward. We\\u2019ll discuss the importance of a user-friendly interface and best practices for assessing the ease of use of various LMS platforms.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Choosing the right LMS for your organization is a significant decision that can impact the success of your learning and development programs. By carefully evaluating your organization\\u2019s needs, prioritizing key features, ensuring scalability, and considering integration with other systems, you\\u2019ll be able to choose an LMS that supports your learning objectives effectively. Remember that an LMS is not just a tool\\u2014it\\u2019s an investment in the future growth and development of your organization. In this post, we\\u2019ve outlined the steps you should take to make an informed decision and choose the best LMS that will meet your long-term goals.<\\/div><br \\/>\",\"image\":\"67d7c55e1e7ee1742194014.png\"}', NULL, 'basic', 'how-to-choose-the-right-lms-for-your-organization', '2025-04-21 00:46:54', '2025-03-17 00:46:54'),
(181, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"How to Implement and Launch Your LMS Successfully\",\"preview_text\":\"Implementing and launching a Learning Management System (LMS) is a significant step for any organization aiming to improve learning and development efforts.\",\"description\":\"Implementing and launching a Learning Management System (LMS) is a significant step for any organization aiming to improve learning and development efforts. However, the success of the LMS depends not only on choosing the right platform but also on a well-thought-out implementation and launch process. A poorly executed LMS launch can lead to confusion, poor user adoption, and failure to meet learning goals. In this blog post, we will guide you through the key steps involved in implementing and launching your LMS successfully, from planning the rollout to training users and monitoring progress. By following these steps, you\\u2019ll set your LMS up for success and ensure a smooth transition for all stakeholders.\\r\\n\\r\\n<h5>Planning the LMS Implementation<\\/h5> <div>Before you even begin using your LMS, it\'s important to have a solid implementation plan in place. This phase involves defining your objectives, understanding the needs of your learners, and determining the resources required for a smooth implementation. The first step is to create an implementation team with stakeholders from various departments (IT, HR, training, etc.) who will be involved in the process. You\'ll also want to create a timeline for the implementation, ensuring that each phase is well-defined and achievable. In this section, we\\u2019ll show you how to create a comprehensive implementation plan that includes objectives, timelines, and milestones.<\\/div><br \\/> <h5>Configuring Your LMS<\\/h5> <div>Once your LMS is selected and you have a plan in place, the next step is configuration. Configuring your LMS involves setting up the system to meet your organization\\u2019s specific needs. This could include customizing the user interface, adding users, creating courses, uploading content, and setting permissions. It\\u2019s essential that you configure the system in a way that supports both administrators and learners. The configuration process also includes integrating the LMS with other systems (e.g., HR software, CRM), ensuring a seamless experience for both users and administrators. We\\u2019ll walk you through key steps in the configuration process and how to ensure your LMS is set up for optimal use.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"A well-planned and well-executed LMS launch can make all the difference in how quickly your organization adapts to the new learning platform.\\\"<\\/blockquote> <h5>Training Administrators and Users<\\/h5> <div>Training is one of the most important aspects of a successful LMS launch. If users don\\u2019t know how to effectively navigate the system or utilize its features, they won\\u2019t get the most out of it. Start by providing comprehensive training for administrators, ensuring they understand how to manage users, create courses, track progress, and generate reports. Additionally, provide user training for all learners, focusing on how to access courses, complete assignments, and use the LMS\\u2019s key features. Providing step-by-step guides, video tutorials, and FAQs can also be helpful for users. In this section, we\\u2019ll cover best practices for training administrators and end-users to ensure smooth onboarding and adoption.<\\/div><br \\/> <h5>Communicating the LMS Launch<\\/h5> <div>Effective communication is key to the success of any LMS launch. It\\u2019s important to keep all stakeholders informed throughout the implementation process. Ensure that employees, students, or learners are aware of the upcoming LMS launch, understand the benefits of using the system, and know how to get started. Use a variety of communication channels (emails, webinars, internal meetings) to provide updates and answer any questions. It\\u2019s also helpful to create a detailed FAQ or resource center that users can refer to as they begin using the system. We\\u2019ll discuss how to communicate the LMS launch effectively and keep everyone engaged and informed.<\\/div><br \\/> <h5>Monitoring and Providing Support<\\/h5> <div>Once your LMS is up and running, the work doesn\\u2019t stop there. It\\u2019s crucial to monitor user activity and engagement to ensure that learners are effectively using the platform. Track metrics such as course completion rates, user activity, and feedback to identify any potential issues. Offering continuous support through help desks, chatbots, or dedicated support teams will ensure users have the resources they need. Regularly collecting feedback from both administrators and learners allows you to improve the system over time, making adjustments as needed. In this section, we\\u2019ll cover how to monitor your LMS and provide ongoing support to ensure its continued success.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Launching and implementing an LMS is an exciting and transformative step for any organization, but it requires careful planning, communication, and ongoing support. By following the steps outlined in this post, you can ensure a smooth implementation process and a successful LMS launch that meets the needs of your learners and administrators. Whether you\\u2019re launching your LMS for the first time or transitioning to a new system, a well-executed launch will set the foundation for long-term success and help drive learning outcomes for your organization.<\\/div><br \\/>\",\"image\":\"67d7c59cc6dfc1742194076.png\"}', NULL, 'basic', 'how-to-implement-and-launch-your-lms-successfully', '2025-03-06 00:47:56', '2025-03-17 00:47:57'),
(182, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Creating a Collaborative Learning Environment with Your LMS\",\"preview_text\":\"One of the primary benefits of a Learning Management System (LMS) is its ability to foster collaboration among learners, instructors, and organizations.\",\"description\":\"One of the primary benefits of a Learning Management System (LMS) is its ability to foster collaboration among learners, instructors, and organizations. Collaborative learning creates an environment where learners can interact, share ideas, and learn from each other, enhancing engagement and improving overall educational outcomes. In this blog post, we will explore strategies to use your LMS for creating a collaborative learning environment that encourages communication, cooperation, and peer learning. From discussion forums to group projects, we will cover a range of tools and best practices for promoting collaboration through your LMS.\\r\\n\\r\\n<h5>Why Collaborative Learning Matters<\\/h5> <div>Collaborative learning promotes active engagement, improves critical thinking, and enhances the retention of knowledge. When students work together, they can share diverse perspectives and challenge each other\'s ideas, which can lead to a deeper understanding of the subject matter. By implementing collaborative features in your LMS, you create a learning ecosystem that mirrors real-world teamwork and problem-solving skills. In this section, we\\u2019ll discuss the benefits of collaborative learning and how it contributes to the overall success of your LMS implementation.<\\/div><br \\/> <h5>Discussion Forums and Social Learning Tools<\\/h5> <div>Discussion forums are one of the most effective ways to promote collaboration in an LMS. By allowing learners to ask questions, share ideas, and discuss course materials with their peers and instructors, you create an interactive and social learning environment. Discussion boards can be organized by topic or module, encouraging learners to engage with specific areas of the course. To enhance the collaborative experience, consider using social learning tools within your LMS, such as groups or message boards, where learners can participate in ongoing conversations and share resources. In this section, we\\u2019ll explore how to integrate discussion forums and social learning tools into your LMS and best practices for fostering meaningful conversations.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"Collaborative learning empowers students to take ownership of their education while developing skills that will benefit them in both academic and professional settings.\\\"<\\/blockquote> <h5>Group Projects and Collaborative Assignments<\\/h5> <div>Group projects and collaborative assignments can significantly enhance teamwork and communication skills. Within your LMS, you can create group workspaces where students can collaborate on assignments, upload resources, and communicate with one another in real time. These spaces allow learners to engage more deeply with the content and each other, promoting the development of problem-solving and critical thinking skills. Additionally, instructors can use collaborative assignments to assess teamwork and the ability to apply learned concepts in a group setting. In this section, we\\u2019ll guide you through setting up group projects in your LMS, including managing group dynamics and tracking progress.<\\/div><br \\/> <h5>Real-Time Collaboration Tools<\\/h5> <div>Integrating real-time collaboration tools into your LMS can further enhance the learning experience. Tools such as video conferencing, shared document editing, and live chat enable learners to work together seamlessly, regardless of their physical location. Real-time collaboration mimics the environment of an in-person classroom, allowing students to interact more naturally and feel more connected to their peers. In this section, we\\u2019ll discuss how to incorporate real-time collaboration tools like Zoom, Google Docs, or Slack into your LMS to foster more dynamic group learning opportunities.<\\/div><br \\/> <h5>Peer Feedback and Review Systems<\\/h5> <div>Another effective way to promote collaboration is through peer feedback and review systems. By allowing learners to evaluate each other\\u2019s work, you encourage critical thinking, constructive criticism, and deeper reflection on the learning material. Peer feedback not only supports learning but also helps students develop communication skills and learn from their peers\' strengths and weaknesses. In this section, we\\u2019ll explain how to implement a peer review system within your LMS, including how to structure feedback and how to manage the process effectively.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Creating a collaborative learning environment within your LMS requires intentional planning and the integration of interactive tools that encourage engagement and communication. By incorporating features such as discussion forums, group projects, real-time collaboration tools, and peer feedback systems, you can create an LMS that fosters a collaborative and interactive learning experience. Collaborative learning is not only beneficial for academic performance but also helps learners build essential skills they can apply in the workplace. Implementing these collaborative strategies will enhance the overall success of your LMS and provide a richer, more fulfilling learning experience for all participants.<\\/div><br \\/>\",\"image\":\"67d7c5d4bd48b1742194132.png\"}', NULL, 'basic', 'creating-a-collaborative-learning-environment-with-your-lms', '2025-03-17 00:48:52', '2025-03-17 00:48:53'),
(183, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Maximizing User Engagement with Your LMS\",\"preview_text\":\"Maximizing user engagement is crucial to the success of any Learning Management System (LMS). Whether you are training employees, educating students,\",\"description\":\"Maximizing user engagement is crucial to the success of any Learning Management System (LMS). Whether you are training employees, educating students, or delivering certifications, keeping users engaged ensures that they are motivated to complete their courses and gain the skills or knowledge they need. An engaged learner is more likely to stay committed, complete tasks, and apply what they\\u2019ve learned. In this blog post, we\\u2019ll explore proven strategies and features you can implement within your LMS to boost user engagement, enhance motivation, and create an interactive learning environment that keeps users coming back for more.\\r\\n\\r\\n<h5>The Importance of User Engagement<\\/h5> <div>User engagement plays a central role in the success of an LMS. When learners are engaged, they are more likely to be motivated to complete courses, interact with course content, and apply what they have learned. Engagement also leads to better retention of information and an overall more enjoyable learning experience. On the other hand, disengaged learners can lead to course abandonment and lower completion rates. In this section, we\\u2019ll explore why user engagement is critical and how it impacts both short-term outcomes (like course completion) and long-term results (such as knowledge retention and practical application).<\\/div><br \\/> <h5>Gamification: Making Learning Fun<\\/h5> <div>Gamification is one of the most effective ways to increase learner engagement. By adding game-like elements such as points, badges, leaderboards, and challenges, you can create a sense of achievement and competition that encourages learners to stay motivated. These features tap into the natural human desire for rewards and recognition, driving users to progress through the course and perform well. In this section, we\\u2019ll show you how to integrate gamification into your LMS, including the best practices for designing points systems, rewards, and incorporating leaderboards that encourage healthy competition.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"Gamification transforms the learning experience by turning mundane tasks into challenges and rewarding learners for their accomplishments.\\\"<\\/blockquote> <h5>Personalized Learning Paths<\\/h5> <div>Personalization is another key strategy for boosting engagement. When learners can follow a learning path tailored to their individual needs, they feel more in control of their learning journey. Personalized learning paths allow you to adjust content based on the learner\\u2019s current skill level, preferences, or career goals. It helps eliminate irrelevant content and creates a more engaging and effective learning experience. In this section, we\\u2019ll discuss how you can create personalized learning paths in your LMS and how this customization leads to higher engagement and motivation.<\\/div><br \\/> <h5>Interactive Content: Keeping Learners Active<\\/h5> <div>Interactive content, such as quizzes, videos, simulations, and interactive assessments, plays a critical role in keeping learners engaged. Rather than just passively consuming information, learners are encouraged to interact with content, which promotes active learning and greater retention. Interactive elements break the monotony of traditional eLearning and offer real-time feedback to learners, allowing them to gauge their understanding immediately. We\\u2019ll dive into how to incorporate interactive content within your LMS, including best practices for designing engaging activities that encourage learners to think critically and stay active throughout the course.<\\/div><br \\/> <h5>Social Learning and Community Features<\\/h5> <div>Social learning is a powerful way to foster engagement within your LMS. By incorporating community features like discussion forums, peer reviews, and group workspaces, learners can interact, share ideas, and collaborate. Social interaction makes learning feel less isolating and more dynamic, allowing learners to feel supported by peers and instructors. Group projects, live chats, and peer feedback systems also increase accountability, encouraging learners to participate actively. In this section, we\\u2019ll show you how to integrate social learning features into your LMS and how to create a community-driven environment that enhances learner engagement.<\\/div><br \\/> <h5>Tracking and Providing Real-Time Feedback<\\/h5> <div>Real-time feedback is a powerful motivator for learners. When learners know they are being monitored and receive timely feedback, they are more likely to stay engaged. Providing feedback helps learners understand their progress and areas for improvement, while also keeping them on track to complete the course. LMS platforms often have built-in tracking tools that allow you to monitor learner progress and provide instant feedback. In this section, we\\u2019ll explore how to use your LMS\\u2019s tracking and feedback features to keep learners motivated and engaged throughout the course.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Maximizing user engagement in your LMS is essential for driving learning success. By incorporating strategies such as gamification, personalized learning paths, interactive content, social learning features, and real-time feedback, you can create a more engaging and interactive experience for your learners. Engaged learners are more likely to complete courses, retain information, and apply their newfound knowledge. Implementing these strategies into your LMS will not only enhance the learning experience but also boost motivation and overall course success. In the long run, fostering engagement within your LMS will lead to better outcomes and a more effective learning program.<\\/div><br \\/>\",\"image\":\"67d7c6054720d1742194181.png\"}', NULL, 'basic', 'maximizing-user-engagement-with-your-lms', '2025-03-12 00:49:41', '2025-03-17 00:49:41'),
(184, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Measuring and Analyzing the Effectiveness of Your LMS\",\"preview_text\":\"The success of your Learning Management System (LMS) goes beyond just implementation. Measuring and analyzing its effectiveness is critical to ensuring that it is meeting your educational\",\"description\":\"The success of your Learning Management System (LMS) goes beyond just implementation. Measuring and analyzing its effectiveness is critical to ensuring that it is meeting your educational objectives and providing value to both learners and instructors. By evaluating key metrics, tracking learner performance, and gathering feedback, you can make data-driven decisions to enhance the system and improve learning outcomes. In this blog post, we will explore the importance of measuring LMS effectiveness, the tools and methods you can use, and how to make continuous improvements based on your findings.\\r\\n\\r\\n<h5>Why Measure the Effectiveness of Your LMS?<\\/h5> <div>Measuring the effectiveness of your LMS allows you to identify what\\u2019s working well and what areas need improvement. By regularly evaluating learner performance, engagement, and satisfaction, you gain valuable insights into how your LMS is supporting your educational goals. This information is vital for understanding if your learners are acquiring the necessary skills and knowledge and whether the platform is facilitating an efficient learning process. Moreover, measuring effectiveness helps you optimize your LMS to better meet the needs of your users. In this section, we\\u2019ll dive into why it\\u2019s essential to track your LMS\\u2019s performance and the impact this data can have on your learning strategy.<\\/div><br \\/> <h5>Key Metrics to Track for LMS Effectiveness<\\/h5> <div>There are several important metrics you should track to assess the effectiveness of your LMS. Some of the most common ones include course completion rates, learner engagement, time spent on courses, assessment scores, and user satisfaction. Course completion rates indicate whether learners are following through with the material, while learner engagement can be measured by activities like participation in discussions, quizzes, or group projects. Tracking time spent on courses and assessment scores helps determine how long learners are engaging with content and whether they are mastering the material. User satisfaction surveys are also invaluable for obtaining qualitative feedback. In this section, we\\u2019ll cover these metrics in detail and show you how to use them to evaluate LMS effectiveness.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"Data is a powerful tool that allows you to continuously improve your LMS and tailor it to the needs of your learners, ensuring better outcomes and a more effective learning experience.\\\"<\\/blockquote> <h5>Using Learning Analytics to Measure Performance<\\/h5> <div>Learning analytics is a powerful tool for evaluating the effectiveness of your LMS. By analyzing learner data, you can gain insights into how users are interacting with your courses, which content is most engaging, and where learners are struggling. Many modern LMS platforms offer built-in analytics tools that allow you to track learner performance, such as quiz scores, course progression, and participation rates. These tools can help you identify patterns, such as which learners are at risk of falling behind or which course components need improvement. In this section, we\\u2019ll explain how to leverage learning analytics to measure LMS performance and use the data to make informed decisions about course design and content delivery.<\\/div><br \\/> <h5>Gathering Feedback from Learners and Instructors<\\/h5> <div>Feedback from both learners and instructors is crucial for assessing the effectiveness of your LMS. Learner feedback can help you understand their experience, identify any obstacles they encountered, and uncover any features they feel could improve the system. Similarly, instructors can provide valuable insights into how well the LMS supports their teaching objectives and whether the platform enables them to deliver content efficiently. Regular surveys and feedback forms are an excellent way to gather this information. In this section, we\\u2019ll discuss how to collect actionable feedback from your LMS users and how to turn that feedback into actionable improvements.<\\/div><br \\/> <h5>Improving Your LMS Based on Data<\\/h5> <div>Once you\\u2019ve gathered the necessary data and feedback, the next step is to analyze the findings and make improvements to your LMS. This may involve tweaking course content, improving navigation, adding new features, or providing additional support resources for learners. By continuously improving your LMS based on data-driven insights, you can ensure that it remains relevant, effective, and aligned with your learning goals. In this section, we\\u2019ll walk you through the process of turning LMS data and feedback into actionable steps for improvement and offer tips for maintaining an ongoing cycle of evaluation and enhancement.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Measuring and analyzing the effectiveness of your LMS is an ongoing process that ensures your system is meeting the needs of both learners and instructors. By tracking key metrics, using learning analytics, and gathering feedback, you can gain valuable insights into how your LMS is performing and where improvements are needed. With this data, you can make informed decisions to continuously improve your LMS, providing a more engaging, effective, and user-friendly experience. In the long run, the ability to measure and refine your LMS will lead to better learning outcomes and a stronger educational program overall.<\\/div><br \\/>\",\"image\":\"67d7c73852baa1742194488.png\"}', NULL, 'basic', 'measuring-and-analyzing-the-effectiveness-of-your-lms', '2025-03-04 00:50:27', '2025-03-17 00:54:48');
INSERT INTO `frontends` (`id`, `data_keys`, `data_values`, `seo_content`, `tempname`, `slug`, `created_at`, `updated_at`) VALUES
(185, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Optimizing Course Content for Maximum Impact in Your LMS\",\"preview_text\":\"The content you deliver through your Learning Management System (LMS) plays a crucial role in the success of your educational programs. Well-designed, engaging, and accessible course\",\"description\":\"The content you deliver through your Learning Management System (LMS) plays a crucial role in the success of your educational programs. Well-designed, engaging, and accessible course content helps to keep learners motivated, enhances retention, and ensures a deeper understanding of the subject matter. But creating effective course content is not just about presenting information; it\'s about crafting experiences that cater to diverse learning styles, encourage interaction, and provide real-world applications. In this blog post, we will explore strategies to optimize course content for maximum impact in your LMS, ensuring your learners stay engaged and reach their educational goals.\\r\\n\\r\\n<h5>Understanding the Basics of Effective Course Content<\\/h5> <div>Effective course content starts with a clear understanding of your learners\\u2019 needs, course objectives, and the delivery method. Content should be structured logically, with clear goals for each module or lesson, to help learners progress in a way that makes sense. The tone, style, and depth of the content should be adjusted to match the level of the audience and the complexity of the topic. In this section, we\\u2019ll dive into the basics of designing impactful course content and how to align your material with both your learners\\u2019 needs and the overall learning goals of the course.<\\/div><br \\/> <h5>Incorporating Multimedia for Enhanced Learning<\\/h5> <div>Incorporating multimedia into your LMS courses is a powerful way to engage learners. Visual content like images, infographics, charts, and videos can break up text-heavy lessons and help learners better understand complex concepts. Videos, in particular, can add a dynamic and engaging layer to learning, providing real-world examples, demonstrations, and explanations. Interactive elements like quizzes, simulations, and activities further encourage participation and application of knowledge. In this section, we\\u2019ll show you how to effectively integrate multimedia and interactive elements into your LMS courses to make content more engaging and enjoyable for learners.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"A mix of multimedia formats in your course content can appeal to diverse learning styles and keep your learners actively engaged with the material.\\\"<\\/blockquote> <h5>Creating Bite-Sized Content for Better Retention<\\/h5> <div>One of the best practices for optimizing course content is breaking down information into bite-sized chunks. This approach, known as microlearning, allows learners to focus on one small concept at a time, which improves retention and reduces cognitive overload. Each module or lesson should cover a specific concept that can be easily digested, without overwhelming the learner with too much information. In this section, we\\u2019ll discuss the benefits of microlearning and provide strategies for designing short, focused lessons that make content easier to absorb and remember.<\\/div><br \\/> <h5>Ensuring Content Accessibility for All Learners<\\/h5> <div>One of the most important aspects of course content is ensuring that it is accessible to all learners, including those with disabilities. Accessibility should be at the forefront of your course design, and that means providing alternative formats for content, such as transcripts for videos, screen reader-friendly materials, and subtitles. Additionally, using high-contrast colors, large fonts, and other visual aids can make your course more accessible for learners with visual impairments. In this section, we\\u2019ll explore accessibility best practices and how to ensure that your LMS content is inclusive and usable by all learners, regardless of their abilities.<\\/div><br \\/> <h5>Encouraging Learner Interaction and Collaboration<\\/h5> <div>Course content isn\\u2019t just about what is taught\\u2014it\\u2019s also about how learners engage with it. Encouraging learner interaction, both with the content and with each other, leads to deeper learning and greater retention. Discussion forums, group projects, peer reviews, and interactive assignments help learners apply the knowledge they gain in practical, collaborative ways. Social learning within the LMS fosters communication and critical thinking skills, which are essential in real-world scenarios. In this section, we\\u2019ll look at ways to encourage learner interaction and create opportunities for collaboration within your LMS courses.<\\/div><br \\/> <h5>Using Assessments to Reinforce Learning<\\/h5> <div>Assessments are essential to both measuring learner progress and reinforcing the content. Whether it\'s through quizzes, tests, or practical assignments, assessments allow learners to check their understanding and apply the material they\\u2019ve learned. Regular, formative assessments throughout the course encourage learners to stay engaged and self-motivated. In this section, we\\u2019ll show you how to use assessments strategically to both test learners\\u2019 knowledge and reinforce key concepts, ensuring a higher level of learning retention.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Optimizing course content for maximum impact requires careful planning, creativity, and an understanding of your learners\\u2019 needs. By incorporating multimedia, breaking content into smaller chunks, ensuring accessibility, and encouraging interaction and collaboration, you can create engaging and effective learning experiences. When learners can actively participate, relate the material to real-world situations, and retain what they\\u2019ve learned, your LMS becomes a powerful tool for educational success. With these strategies, you can create courses that not only impart knowledge but also inspire learners to engage with the content fully and continuously improve their skills.<\\/div><br \\/>\",\"image\":\"67d7c771f2c851742194545.png\"}', NULL, 'basic', 'optimizing-course-content-for-maximum-impact-in-your-lms', '2025-03-08 00:55:45', '2025-03-17 00:55:46'),
(186, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"Creating a Scalable and Sustainable LMS for Future Growth\",\"preview_text\":\"As organizations grow, their learning needs evolve. Whether you\'re running a corporate training program, an educational institution, or a certification body, the scalability and sustainability of your\",\"description\":\"As organizations grow, their learning needs evolve. Whether you\'re running a corporate training program, an educational institution, or a certification body, the scalability and sustainability of your Learning Management System (LMS) are critical to support growth over time. A scalable LMS can handle an increasing number of users, diverse learning needs, and new content without compromising performance. A sustainable LMS is one that adapts to emerging trends in learning technology and pedagogy, ensuring it remains relevant and effective in the long term. In this blog post, we will explore how to design, implement, and maintain an LMS that is both scalable and sustainable, ensuring that it continues to meet the needs of your growing learner base.\\r\\n\\r\\n<h5>Understanding Scalability in Your LMS<\\/h5> <div>Scalability refers to the ability of an LMS to grow and accommodate increasing numbers of users, courses, and content without degrading performance or functionality. As your learner base expands, your LMS should be able to handle more traffic, support a larger number of concurrent users, and integrate new features seamlessly. Scalability also extends to managing a growing library of course materials, assessments, and resources. In this section, we\\u2019ll explore the factors that contribute to scalability, such as cloud hosting, database management, and performance optimization, and how to plan for future growth when setting up your LMS.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"A well-chosen technology stack ensures that your LMS can evolve with the changing needs of your organization, providing a stable foundation for future growth.\\\"<\\/blockquote> <h5>Implementing Cloud-Based Solutions for Flexibility and Efficiency<\\/h5> <div>Cloud-based LMS solutions offer several advantages in terms of scalability and sustainability. By hosting your LMS in the cloud, you can ensure that it has the infrastructure necessary to scale as needed, without the challenges of on-premise hosting. Cloud-based solutions provide automatic updates, enhanced security, and reduced IT maintenance costs, all while offering the flexibility to scale resources up or down based on user demand. Additionally, the cloud enables seamless integration with other cloud-based systems and technologies. In this section, we\\u2019ll discuss the benefits of using a cloud-based LMS and how to migrate to the cloud if you\'re using an on-premise system.<\\/div><br \\/> <h5>Building a Sustainable Content Strategy<\\/h5> <div>Sustainability in an LMS goes beyond its technical infrastructure; it also involves creating a sustainable content strategy. As your LMS grows, the amount of content (videos, quizzes, reading materials, etc.) will also increase. It\'s essential to establish processes for creating, updating, and curating content to ensure it remains relevant and up-to-date. A content strategy that focuses on modular content design and reuse ensures that you don\\u2019t have to create entirely new materials for every course. Additionally, implementing a content review cycle will help you keep your materials fresh and aligned with your organization\\u2019s evolving learning needs. In this section, we\\u2019ll provide strategies for building a scalable and sustainable content strategy that ensures long-term relevance and quality in your LMS.<\\/div><br \\/> <h5>Fostering a Collaborative Learning Community<\\/h5> <div>A scalable and sustainable LMS should also support collaborative learning. By integrating community-driven features like forums, peer assessments, and group projects, you can create a dynamic learning environment that encourages interaction and knowledge sharing. Social learning features can help foster deeper engagement, improve learner retention, and build a sense of community among users. In this section, we\\u2019ll discuss how to create and nurture a collaborative learning community within your LMS, which can scale as your organization grows.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Creating a scalable and sustainable LMS is a long-term investment that ensures your learning programs can grow with your organization and remain relevant as educational trends evolve. By selecting the right technology stack, leveraging cloud-based solutions, building a sustainable content strategy, and incorporating automation and analytics, you can create an LMS that is both efficient and adaptable. A scalable LMS not only supports the current learning needs of your organization but also evolves with your future growth, ensuring that you can continue delivering high-quality, impactful learning experiences to an expanding learner base. By fostering a collaborative learning environment, you\\u2019ll keep your users engaged and motivated, helping to maximize the success of your learning programs over time.<\\/div><br \\/>\",\"image\":\"67d7c97c6c9de1742195068.png\"}', NULL, 'basic', 'creating-a-scalable-and-sustainable-lms-for-future-growth', '2025-03-17 01:04:16', '2025-03-17 01:04:28'),
(187, 'blog.element', '{\"has_image\":[\"1\"],\"title\":\"How to Integrate Social Learning Features into Your LMS\",\"preview_text\":\"In today\\u2019s learning environment, the traditional approach of learning in isolation is being replaced by more collaborative, social learning experiences. Social learning encourages learners to interact, share\",\"description\":\"In today\\u2019s learning environment, the traditional approach of learning in isolation is being replaced by more collaborative, social learning experiences. Social learning encourages learners to interact, share knowledge, and engage with peers, which leads to better understanding and retention. Integrating social learning features into your Learning Management System (LMS) can foster collaboration, boost learner engagement, and create a more dynamic learning community. In this blog post, we\\u2019ll explore various social learning features you can integrate into your LMS, the benefits of social learning, and how to encourage interaction among learners to enhance their educational experience.\\r\\n\\r\\n<h5>What Is Social Learning and Why Is It Important?<\\/h5> <div>Social learning is the process of learning through interaction with others. It involves sharing knowledge, asking questions, collaborating on tasks, and discussing ideas within a community. Social learning not only encourages collaboration among peers but also promotes a sense of belonging and engagement within the learning environment. It has been shown to enhance critical thinking, increase knowledge retention, and improve learner satisfaction. In this section, we\\u2019ll explore the concept of social learning and its importance in modern educational settings, particularly within an LMS.<\\/div><br \\/> <blockquote style=\\\"font-style:italic;text-align:center;padding:20px;background:#d5d5d5;font-weight:500;font-size:18px;border-left:4px solid #3705FD;\\\">\\\"Social learning turns the LMS from a one-way delivery system into a collaborative, interactive platform that allows learners to learn from each other and share knowledge.\\\" <\\/blockquote> <h5>Encouraging Learner Interaction and Collaboration<\\/h5> <div>Encouraging learners to actively participate and engage with one another is key to maximizing the benefits of social learning. In an LMS, you can create collaborative spaces where learners can work together on projects, exchange ideas, and help each other solve problems. To further promote collaboration, you can set up group tasks, offer team-based assessments, or host live webinars where learners can engage with instructors and peers. Additionally, incentivizing participation through badges, rewards, or leaderboards can encourage learners to engage in social learning activities. In this section, we\\u2019ll discuss strategies for encouraging learners to interact with their peers and actively participate in social learning opportunities.<\\/div><h5><br \\/><\\/h5><br \\/> <h5>Building a Social Learning Culture<\\/h5> <div>Integrating social learning features into your LMS is just the beginning. To truly reap the benefits of social learning, it\\u2019s important to build a culture that encourages and supports collaborative learning. This involves fostering an environment where learners feel comfortable sharing ideas, asking questions, and engaging with their peers. You can promote social learning by setting clear expectations for participation, offering incentives for active involvement, and encouraging learners to take on leadership roles in group discussions or projects. In this section, we\\u2019ll offer tips for cultivating a social learning culture within your LMS and ensuring that learners are motivated to engage with one another.<\\/div><br \\/> <h5>Conclusion<\\/h5> <div>Integrating social learning features into your LMS can significantly enhance the learning experience by fostering collaboration, engagement, and knowledge sharing. By offering tools like discussion forums, peer assessments, and social media-like features, you can create a dynamic and interactive learning environment that encourages learners to interact with one another and actively participate in their educational journey. Social learning benefits both learners and instructors, helping to improve knowledge retention, increase engagement, and create a sense of community. With the right strategies and features, your LMS can transform into a platform that not only delivers content but also nurtures collaboration and lifelong learning.<\\/div><br \\/>\",\"image\":\"67d7c9a8d48a21742195112.png\"}', NULL, 'basic', 'how-to-integrate-social-learning-features-into-your-lms', '2025-03-17 01:05:12', '2025-03-17 01:05:13'),
(188, 'instructor_section.element', '{\"has_image\":\"1\",\"name\":\"James Thompson\",\"designation\":\"HR Director\",\"quatation\":\"The LMS has provided a streamlined experience for both instructors and learners. The integration of assessments and tracking tools has significantly improved our training processes.\",\"image\":\"67d7cea93f0e01742196393.png\"}', NULL, 'basic', '', '2025-03-17 01:26:33', '2025-03-17 01:26:33'),
(189, 'instructor_section.element', '{\"has_image\":\"1\",\"name\":\"Alice Cooper\",\"designation\":\"Educational Coordinator\",\"quatation\":\"Since implementing this LMS, we\'ve seen a remarkable increase in learner engagement and course completion rates. It has truly empowered our team to take control of their development.\",\"image\":\"67d7cf023ca541742196482.png\"}', NULL, 'basic', '', '2025-03-17 01:26:57', '2025-03-17 01:28:02'),
(190, 'instructor_section.element', '{\"has_image\":\"1\",\"name\":\"Daniel Reynolds\",\"designation\":\"Chief Learning Officer\",\"quatation\":\"The transition to this LMS was seamless, and the platform\'s adaptability has been a huge benefit. It has provided our team with the tools they need to grow and succeed in their careers.\",\"image\":\"67d7ced39984f1742196435.png\"}', NULL, 'basic', '', '2025-03-17 01:27:15', '2025-03-17 01:27:15'),
(191, 'instructor_section.element', '{\"has_image\":\"1\",\"name\":\"Sophia Carter\",\"designation\":\"Training & Development Specialist\",\"quatation\":\"We\\u2019ve been able to centralize all of our training content and track learner progress in real time, thanks to this powerful LMS. It\\u2019s made a huge impact on our organization\'s learning culture.\",\"image\":\"67d7cef97ea0f1742196473.png\"}', NULL, 'basic', '', '2025-03-17 01:27:53', '2025-03-17 01:27:53'),
(192, 'testimonial.element', '{\"has_image\":\"1\",\"author\":\"Kristin Watson\",\"designation\":\"Principle Programmer\",\"rating\":\"4\",\"comment\":\"I started with the basics, completed a Nanodegree program, and gained so much experience. I\'m now in a new Android job!\",\"image\":\"67dbee49bffb71742466633.png\"}', NULL, 'basic', '', '2025-03-17 02:27:46', '2025-03-20 04:30:33'),
(193, 'testimonial.element', '{\"has_image\":\"1\",\"author\":\"Darsy Steward\",\"designation\":\"Chief Engineer\",\"rating\":\"5\",\"comment\":\"I was a Product Owner for 10 years, and that\\u2019s how I discovered how cool coding was. A Product Owner is the business side of an Agile team.\",\"image\":\"67dbee34595841742466612.png\"}', NULL, 'basic', '', '2025-03-17 02:29:02', '2025-03-20 04:30:12'),
(194, 'testimonial.element', '{\"has_image\":\"1\",\"author\":\"Devon Lane\",\"designation\":\"Software Architect\",\"rating\":\"5\",\"comment\":\"Udacity helped me gain on-the-job confidence, build a portfolio, and earn a microcredential to share with prospective employers\",\"image\":\"67dbee1ba79c51742466587.png\"}', NULL, 'basic', '', '2025-03-17 02:29:52', '2025-03-20 04:29:47'),
(195, 'testimonial.element', '{\"has_image\":\"1\",\"author\":\"Jane Cooper\",\"designation\":\"Senior Developer\",\"rating\":\"4\",\"comment\":\"I started with the basics, completed a Nanodegree program, and gained so much experience. I\'m now in a new Android job!\",\"image\":\"67dbedfcee0051742466556.png\"}', NULL, 'basic', '', '2025-03-17 02:30:10', '2025-03-20 04:29:52'),
(196, 'instructor_section.content', '{\"heading\":\"Secure and Fast Transactions\"}', NULL, 'basic', '', '2025-03-17 02:36:42', '2025-03-17 02:36:42'),
(197, 'policy_pages.element', '{\"title\":\"Support Policy\",\"details\":\"<p>By accessing or using Vdemy, you agree to be bound by the following terms and conditions (\\\"Terms\\\"). These Terms apply to all users of our Learning Management System (\\\"LMS\\\"). If you do not agree with these Terms, do not use our LMS.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Acceptance of Terms<\\/h4>\\r\\n\\r\\n<p>By accessing or using Vdemy, you agree to comply with and be bound by these Terms of Service. We reserve the right to modify or update these Terms at any time, and any changes will be effective when posted on this page. It is your responsibility to check this page periodically for updates.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Use of Our Vdemy<\\/h4>\\r\\n\\r\\n<p>You are granted a limited, non-exclusive, non-transferable license to access and use Vdemy for your personal, educational, and non-commercial use, subject to these Terms. You may not:<\\/p>\\r\\n<ul>\\r\\n<li>Copy, modify, or distribute any content without permission.<\\/li>\\r\\n<li>Attempt to reverse-engineer or hack the LMS.<\\/li>\\r\\n<li>Use the platform for any illegal activities or purposes that violate applicable laws.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">User Account<\\/h4>\\r\\n\\r\\n<p>To use certain features of Vdemy, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update it as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect unauthorized access to your account, you must notify us immediately.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">User Responsibilities<\\/h4>\\r\\n\\r\\n<p>As a user of Vdemy, you agree to:<\\/p>\\r\\n<ul>\\r\\n<li>Abide by all applicable laws and regulations.<\\/li>\\r\\n<li>Refrain from posting or transmitting any content that is unlawful, offensive, harmful, or infringes on the rights of others.<\\/li>\\r\\n<li>Not disrupt or interfere with the functionality of the LMS or other users\' experience.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">Payment and Subscriptions<\\/h4>\\r\\n\\r\\n<p>Some services offered by Vdemy may require payment. If you choose to subscribe to any paid services, you agree to pay all applicable fees associated with those services. Payments will be processed through a third-party payment processor, and you agree to provide accurate payment information. Subscription fees may be subject to change, and you will be notified of any such changes.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Content Ownership<\\/h4>\\r\\n\\r\\n<p>All content available on Vdemy, including but not limited to courses, videos, text, images, and software, is owned by or licensed to Vdemy and is protected by intellectual property laws. You may not copy, reproduce, or distribute any content without our explicit permission.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Termination<\\/h4>\\r\\n\\r\\n<p>We reserve the right to suspend or terminate your access to Vdemy if we believe you have violated these Terms. Upon termination, you must immediately stop using the LMS and any content associated with it. If you have a paid subscription, you may not be entitled to a refund upon termination.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Privacy Policy<\\/h4>\\r\\n\\r\\n<p>By using Vdemy, you agree to our Privacy Policy, which explains how we collect, use, and protect your personal data. Please review our Privacy Policy to understand our practices.<\\/p><h4 class=\\\"mt-3\\\">Indemnification<\\/h4>\\r\\n\\r\\n<p>You agree to indemnify and hold harmless Vdemy, its affiliates, employees, and partners from any claims, losses, damages, or expenses arising from your use of the LMS or violation of these Terms.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Changes to Terms<\\/h4>\\r\\n\\r\\n<p>We may update or modify these Terms at any time. Any changes will be posted on this page, and the updated version will be effective immediately upon posting. Your continued use of Vdemy after any such changes indicates your acceptance of the updated Terms.<\\/p>\"}', NULL, 'basic', 'support-policy', '2025-03-20 02:58:17', '2025-03-20 02:58:17'),
(198, 'policy_pages.element', '{\"title\":\"Data Protection Policy\",\"details\":\"<p>By accessing or using Vdemy, you agree to be bound by the following terms and conditions (\\\"Terms\\\"). These Terms apply to all users of our Learning Management System (\\\"LMS\\\"). If you do not agree with these Terms, do not use our LMS.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Acceptance of Terms<\\/h4>\\r\\n\\r\\n<p>By accessing or using Vdemy, you agree to comply with and be bound by these Terms of Service. We reserve the right to modify or update these Terms at any time, and any changes will be effective when posted on this page. It is your responsibility to check this page periodically for updates.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Use of Our Vdemy<\\/h4>\\r\\n\\r\\n<p>You are granted a limited, non-exclusive, non-transferable license to access and use Vdemy for your personal, educational, and non-commercial use, subject to these Terms. You may not:<\\/p>\\r\\n<ul>\\r\\n<li>Copy, modify, or distribute any content without permission.<\\/li>\\r\\n<li>Attempt to reverse-engineer or hack the LMS.<\\/li>\\r\\n<li>Use the platform for any illegal activities or purposes that violate applicable laws.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">User Account<\\/h4>\\r\\n\\r\\n<p>To use certain features of Vdemy, you must create an account. You agree to provide accurate, current, and complete information during the registration process and to update it as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect unauthorized access to your account, you must notify us immediately.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">User Responsibilities<\\/h4>\\r\\n\\r\\n<p>As a user of Vdemy, you agree to:<\\/p>\\r\\n<ul>\\r\\n<li>Abide by all applicable laws and regulations.<\\/li>\\r\\n<li>Refrain from posting or transmitting any content that is unlawful, offensive, harmful, or infringes on the rights of others.<\\/li>\\r\\n<li>Not disrupt or interfere with the functionality of the LMS or other users\' experience.<\\/li>\\r\\n<\\/ul>\\r\\n<h4 class=\\\"mt-3\\\">Payment and Subscriptions<\\/h4>\\r\\n\\r\\n<p>Some services offered by Vdemy may require payment. If you choose to subscribe to any paid services, you agree to pay all applicable fees associated with those services. Payments will be processed through a third-party payment processor, and you agree to provide accurate payment information. Subscription fees may be subject to change, and you will be notified of any such changes.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Content Ownership<\\/h4>\\r\\n\\r\\n<p>All content available on Vdemy, including but not limited to courses, videos, text, images, and software, is owned by or licensed to Vdemy and is protected by intellectual property laws. You may not copy, reproduce, or distribute any content without our explicit permission.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Termination<\\/h4>\\r\\n\\r\\n<p>We reserve the right to suspend or terminate your access to Vdemy if we believe you have violated these Terms. Upon termination, you must immediately stop using the LMS and any content associated with it. If you have a paid subscription, you may not be entitled to a refund upon termination.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Privacy Policy<\\/h4>\\r\\n\\r\\n<p>By using Vdemy, you agree to our Privacy Policy, which explains how we collect, use, and protect your personal data. Please review our Privacy Policy to understand our practices.<\\/p><h4 class=\\\"mt-3\\\">Indemnification<\\/h4>\\r\\n\\r\\n<p>You agree to indemnify and hold harmless Vdemy, its affiliates, employees, and partners from any claims, losses, damages, or expenses arising from your use of the LMS or violation of these Terms.<\\/p>\\r\\n<h4 class=\\\"mt-3\\\">Changes to Terms<\\/h4>\\r\\n\\r\\n<p>We may update or modify these Terms at any time. Any changes will be posted on this page, and the updated version will be effective immediately upon posting. Your continued use of Vdemy after any such changes indicates your acceptance of the updated Terms.<\\/p>\"}', NULL, 'basic', 'data-protection-policy', '2025-03-20 03:00:59', '2025-03-20 03:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `gateways`
--

CREATE TABLE `gateways` (
  `id` bigint UNSIGNED NOT NULL,
  `form_id` int UNSIGNED NOT NULL DEFAULT '0',
  `code` int DEFAULT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alias` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NULL',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>enable, 2=>disable',
  `gateway_parameters` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `supported_currencies` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `crypto` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: fiat currency, 1: crypto currency',
  `extra` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gateways`
--

INSERT INTO `gateways` (`id`, `form_id`, `code`, `name`, `alias`, `image`, `status`, `gateway_parameters`, `supported_currencies`, `crypto`, `extra`, `description`, `created_at`, `updated_at`) VALUES
(1, 0, 101, 'Paypal', 'Paypal', '663a38d7b455d1715091671.png', 1, '{\"paypal_email\":{\"title\":\"PayPal Email\",\"global\":true,\"value\":\"sb-owud61543012@business.example.com\"}}', '{\"AUD\":\"AUD\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CZK\":\"CZK\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"HKD\":\"HKD\",\"HUF\":\"HUF\",\"INR\":\"INR\",\"ILS\":\"ILS\",\"JPY\":\"JPY\",\"MYR\":\"MYR\",\"MXN\":\"MXN\",\"TWD\":\"TWD\",\"NZD\":\"NZD\",\"NOK\":\"NOK\",\"PHP\":\"PHP\",\"PLN\":\"PLN\",\"GBP\":\"GBP\",\"RUB\":\"RUB\",\"SGD\":\"SGD\",\"SEK\":\"SEK\",\"CHF\":\"CHF\",\"THB\":\"THB\",\"USD\":\"$\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:21:11'),
(2, 0, 102, 'Perfect Money', 'PerfectMoney', '663a3920e30a31715091744.png', 1, '{\"passphrase\":{\"title\":\"ALTERNATE PASSPHRASE\",\"global\":true,\"value\":\"hR26aw02Q1eEeUPSIfuwNypXX\"},\"wallet_id\":{\"title\":\"PM Wallet\",\"global\":false,\"value\":\"\"}}', '{\"USD\":\"$\",\"EUR\":\"\\u20ac\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:22:24'),
(3, 0, 103, 'Stripe Hosted', 'Stripe', '663a39861cb9d1715091846.png', 1, '{\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"sk_test_51I6GGiCGv1sRiQlEi5v1or9eR0HVbuzdMd2rW4n3DxC8UKfz66R4X6n4yYkzvI2LeAIuRU9H99ZpY7XCNFC9xMs500vBjZGkKG\"},\"publishable_key\":{\"title\":\"PUBLISHABLE KEY\",\"global\":true,\"value\":\"pk_test_51I6GGiCGv1sRiQlEOisPKrjBqQqqcFsw8mXNaZ2H2baN6R01NulFS7dKFji1NRRxuchoUTEDdB7ujKcyKYSVc0z500eth7otOM\"}}', '{\"USD\":\"USD\",\"AUD\":\"AUD\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"INR\":\"INR\",\"JPY\":\"JPY\",\"MXN\":\"MXN\",\"MYR\":\"MYR\",\"NOK\":\"NOK\",\"NZD\":\"NZD\",\"PLN\":\"PLN\",\"SEK\":\"SEK\",\"SGD\":\"SGD\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:24:06'),
(4, 0, 104, 'Skrill', 'Skrill', '663a39494c4a91715091785.png', 1, '{\"pay_to_email\":{\"title\":\"Skrill Email\",\"global\":true,\"value\":\"merchant@skrill.com\"},\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"---\"}}', '{\"AED\":\"AED\",\"AUD\":\"AUD\",\"BGN\":\"BGN\",\"BHD\":\"BHD\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"CZK\":\"CZK\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"HRK\":\"HRK\",\"HUF\":\"HUF\",\"ILS\":\"ILS\",\"INR\":\"INR\",\"ISK\":\"ISK\",\"JOD\":\"JOD\",\"JPY\":\"JPY\",\"KRW\":\"KRW\",\"KWD\":\"KWD\",\"MAD\":\"MAD\",\"MYR\":\"MYR\",\"NOK\":\"NOK\",\"NZD\":\"NZD\",\"OMR\":\"OMR\",\"PLN\":\"PLN\",\"QAR\":\"QAR\",\"RON\":\"RON\",\"RSD\":\"RSD\",\"SAR\":\"SAR\",\"SEK\":\"SEK\",\"SGD\":\"SGD\",\"THB\":\"THB\",\"TND\":\"TND\",\"TRY\":\"TRY\",\"TWD\":\"TWD\",\"USD\":\"USD\",\"ZAR\":\"ZAR\",\"COP\":\"COP\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:23:05'),
(5, 0, 105, 'PayTM', 'Paytm', '663a390f601191715091727.png', 1, '{\"MID\":{\"title\":\"Merchant ID\",\"global\":true,\"value\":\"DIY12386817555501617\"},\"merchant_key\":{\"title\":\"Merchant Key\",\"global\":true,\"value\":\"bKMfNxPPf_QdZppa\"},\"WEBSITE\":{\"title\":\"Paytm Website\",\"global\":true,\"value\":\"DIYtestingweb\"},\"INDUSTRY_TYPE_ID\":{\"title\":\"Industry Type\",\"global\":true,\"value\":\"Retail\"},\"CHANNEL_ID\":{\"title\":\"CHANNEL ID\",\"global\":true,\"value\":\"WEB\"},\"transaction_url\":{\"title\":\"Transaction URL\",\"global\":true,\"value\":\"https:\\/\\/pguat.paytm.com\\/oltp-web\\/processTransaction\"},\"transaction_status_url\":{\"title\":\"Transaction STATUS URL\",\"global\":true,\"value\":\"https:\\/\\/pguat.paytm.com\\/paytmchecksum\\/paytmCallback.jsp\"}}', '{\"AUD\":\"AUD\",\"ARS\":\"ARS\",\"BDT\":\"BDT\",\"BRL\":\"BRL\",\"BGN\":\"BGN\",\"CAD\":\"CAD\",\"CLP\":\"CLP\",\"CNY\":\"CNY\",\"COP\":\"COP\",\"HRK\":\"HRK\",\"CZK\":\"CZK\",\"DKK\":\"DKK\",\"EGP\":\"EGP\",\"EUR\":\"EUR\",\"GEL\":\"GEL\",\"GHS\":\"GHS\",\"HKD\":\"HKD\",\"HUF\":\"HUF\",\"INR\":\"INR\",\"IDR\":\"IDR\",\"ILS\":\"ILS\",\"JPY\":\"JPY\",\"KES\":\"KES\",\"MYR\":\"MYR\",\"MXN\":\"MXN\",\"MAD\":\"MAD\",\"NPR\":\"NPR\",\"NZD\":\"NZD\",\"NGN\":\"NGN\",\"NOK\":\"NOK\",\"PKR\":\"PKR\",\"PEN\":\"PEN\",\"PHP\":\"PHP\",\"PLN\":\"PLN\",\"RON\":\"RON\",\"RUB\":\"RUB\",\"SGD\":\"SGD\",\"ZAR\":\"ZAR\",\"KRW\":\"KRW\",\"LKR\":\"LKR\",\"SEK\":\"SEK\",\"CHF\":\"CHF\",\"THB\":\"THB\",\"TRY\":\"TRY\",\"UGX\":\"UGX\",\"UAH\":\"UAH\",\"AED\":\"AED\",\"GBP\":\"GBP\",\"USD\":\"USD\",\"VND\":\"VND\",\"XOF\":\"XOF\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:22:07'),
(6, 0, 106, 'Payeer', 'Payeer', '663a38c9e2e931715091657.png', 1, '{\"merchant_id\":{\"title\":\"Merchant ID\",\"global\":true,\"value\":\"866989763\"},\"secret_key\":{\"title\":\"Secret key\",\"global\":true,\"value\":\"7575\"}}', '{\"USD\":\"USD\",\"EUR\":\"EUR\",\"RUB\":\"RUB\"}', 0, '{\"status\":{\"title\": \"Status URL\",\"value\":\"ipn.Payeer\"}}', NULL, '2019-09-14 13:14:22', '2024-05-07 08:20:57'),
(7, 0, 107, 'PayStack', 'Paystack', '663a38fc814e91715091708.png', 1, '{\"public_key\":{\"title\":\"Public key\",\"global\":true,\"value\":\"pk_test_cd330608eb47970889bca397ced55c1dd5ad3783\"},\"secret_key\":{\"title\":\"Secret key\",\"global\":true,\"value\":\"sk_test_8a0b1f199362d7acc9c390bff72c4e81f74e2ac3\"}}', '{\"USD\":\"USD\",\"NGN\":\"NGN\"}', 0, '{\"callback\":{\"title\": \"Callback URL\",\"value\":\"ipn.Paystack\"},\"webhook\":{\"title\": \"Webhook URL\",\"value\":\"ipn.Paystack\"}}\r\n', NULL, '2019-09-14 13:14:22', '2024-05-07 08:21:48'),
(9, 0, 109, 'Flutterwave', 'Flutterwave', '663a36c2c34d61715091138.png', 1, '{\"public_key\":{\"title\":\"Public Key\",\"global\":true,\"value\":\"----------------\"},\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"-----------------------\"},\"encryption_key\":{\"title\":\"Encryption Key\",\"global\":true,\"value\":\"------------------\"}}', '{\"BIF\":\"BIF\",\"CAD\":\"CAD\",\"CDF\":\"CDF\",\"CVE\":\"CVE\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"GHS\":\"GHS\",\"GMD\":\"GMD\",\"GNF\":\"GNF\",\"KES\":\"KES\",\"LRD\":\"LRD\",\"MWK\":\"MWK\",\"MZN\":\"MZN\",\"NGN\":\"NGN\",\"RWF\":\"RWF\",\"SLL\":\"SLL\",\"STD\":\"STD\",\"TZS\":\"TZS\",\"UGX\":\"UGX\",\"USD\":\"USD\",\"XAF\":\"XAF\",\"XOF\":\"XOF\",\"ZMK\":\"ZMK\",\"ZMW\":\"ZMW\",\"ZWD\":\"ZWD\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:12:18'),
(10, 0, 110, 'RazorPay', 'Razorpay', '663a393a527831715091770.png', 1, '{\"key_id\":{\"title\":\"Key Id\",\"global\":true,\"value\":\"rzp_test_kiOtejPbRZU90E\"},\"key_secret\":{\"title\":\"Key Secret \",\"global\":true,\"value\":\"osRDebzEqbsE1kbyQJ4y0re7\"}}', '{\"INR\":\"INR\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:22:50'),
(11, 0, 111, 'Stripe Storefront', 'StripeJs', '663a3995417171715091861.png', 1, '{\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"sk_test_51I6GGiCGv1sRiQlEi5v1or9eR0HVbuzdMd2rW4n3DxC8UKfz66R4X6n4yYkzvI2LeAIuRU9H99ZpY7XCNFC9xMs500vBjZGkKG\"},\"publishable_key\":{\"title\":\"PUBLISHABLE KEY\",\"global\":true,\"value\":\"pk_test_51I6GGiCGv1sRiQlEOisPKrjBqQqqcFsw8mXNaZ2H2baN6R01NulFS7dKFji1NRRxuchoUTEDdB7ujKcyKYSVc0z500eth7otOM\"}}', '{\"USD\":\"USD\",\"AUD\":\"AUD\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"INR\":\"INR\",\"JPY\":\"JPY\",\"MXN\":\"MXN\",\"MYR\":\"MYR\",\"NOK\":\"NOK\",\"NZD\":\"NZD\",\"PLN\":\"PLN\",\"SEK\":\"SEK\",\"SGD\":\"SGD\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:24:21'),
(12, 0, 112, 'Instamojo', 'Instamojo', '663a384d54a111715091533.png', 1, '{\"api_key\":{\"title\":\"API KEY\",\"global\":true,\"value\":\"test_2241633c3bc44a3de84a3b33969\"},\"auth_token\":{\"title\":\"Auth Token\",\"global\":true,\"value\":\"test_279f083f7bebefd35217feef22d\"},\"salt\":{\"title\":\"Salt\",\"global\":true,\"value\":\"19d38908eeff4f58b2ddda2c6d86ca25\"}}', '{\"INR\":\"INR\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:18:53'),
(13, 0, 501, 'Blockchain', 'Blockchain', '663a35efd0c311715090927.png', 1, '{\"api_key\":{\"title\":\"API Key\",\"global\":true,\"value\":\"55529946-05ca-48ff-8710-f279d86b1cc5\"},\"xpub_code\":{\"title\":\"XPUB CODE\",\"global\":true,\"value\":\"xpub6CKQ3xxWyBoFAF83izZCSFUorptEU9AF8TezhtWeMU5oefjX3sFSBw62Lr9iHXPkXmDQJJiHZeTRtD9Vzt8grAYRhvbz4nEvBu3QKELVzFK\"}}', '{\"BTC\":\"BTC\"}', 1, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:08:47'),
(15, 0, 503, 'CoinPayments', 'Coinpayments', '663a36a8d8e1d1715091112.png', 1, '{\"public_key\":{\"title\":\"Public Key\",\"global\":true,\"value\":\"---------------------\"},\"private_key\":{\"title\":\"Private Key\",\"global\":true,\"value\":\"---------------------\"},\"merchant_id\":{\"title\":\"Merchant ID\",\"global\":true,\"value\":\"---------------------\"}}', '{\"BTC\":\"Bitcoin\",\"BTC.LN\":\"Bitcoin (Lightning Network)\",\"LTC\":\"Litecoin\",\"CPS\":\"CPS Coin\",\"VLX\":\"Velas\",\"APL\":\"Apollo\",\"AYA\":\"Aryacoin\",\"BAD\":\"Badcoin\",\"BCD\":\"Bitcoin Diamond\",\"BCH\":\"Bitcoin Cash\",\"BCN\":\"Bytecoin\",\"BEAM\":\"BEAM\",\"BITB\":\"Bean Cash\",\"BLK\":\"BlackCoin\",\"BSV\":\"Bitcoin SV\",\"BTAD\":\"Bitcoin Adult\",\"BTG\":\"Bitcoin Gold\",\"BTT\":\"BitTorrent\",\"CLOAK\":\"CloakCoin\",\"CLUB\":\"ClubCoin\",\"CRW\":\"Crown\",\"CRYP\":\"CrypticCoin\",\"CRYT\":\"CryTrExCoin\",\"CURE\":\"CureCoin\",\"DASH\":\"DASH\",\"DCR\":\"Decred\",\"DEV\":\"DeviantCoin\",\"DGB\":\"DigiByte\",\"DOGE\":\"Dogecoin\",\"EBST\":\"eBoost\",\"EOS\":\"EOS\",\"ETC\":\"Ether Classic\",\"ETH\":\"Ethereum\",\"ETN\":\"Electroneum\",\"EUNO\":\"EUNO\",\"EXP\":\"EXP\",\"Expanse\":\"Expanse\",\"FLASH\":\"FLASH\",\"GAME\":\"GameCredits\",\"GLC\":\"Goldcoin\",\"GRS\":\"Groestlcoin\",\"KMD\":\"Komodo\",\"LOKI\":\"LOKI\",\"LSK\":\"LSK\",\"MAID\":\"MaidSafeCoin\",\"MUE\":\"MonetaryUnit\",\"NAV\":\"NAV Coin\",\"NEO\":\"NEO\",\"NMC\":\"Namecoin\",\"NVST\":\"NVO Token\",\"NXT\":\"NXT\",\"OMNI\":\"OMNI\",\"PINK\":\"PinkCoin\",\"PIVX\":\"PIVX\",\"POT\":\"PotCoin\",\"PPC\":\"Peercoin\",\"PROC\":\"ProCurrency\",\"PURA\":\"PURA\",\"QTUM\":\"QTUM\",\"RES\":\"Resistance\",\"RVN\":\"Ravencoin\",\"RVR\":\"RevolutionVR\",\"SBD\":\"Steem Dollars\",\"SMART\":\"SmartCash\",\"SOXAX\":\"SOXAX\",\"STEEM\":\"STEEM\",\"STRAT\":\"STRAT\",\"SYS\":\"Syscoin\",\"TPAY\":\"TokenPay\",\"TRIGGERS\":\"Triggers\",\"TRX\":\" TRON\",\"UBQ\":\"Ubiq\",\"UNIT\":\"UniversalCurrency\",\"USDT\":\"Tether USD (Omni Layer)\",\"USDT.BEP20\":\"Tether USD (BSC Chain)\",\"USDT.ERC20\":\"Tether USD (ERC20)\",\"USDT.TRC20\":\"Tether USD (Tron/TRC20)\",\"VTC\":\"Vertcoin\",\"WAVES\":\"Waves\",\"XCP\":\"Counterparty\",\"XEM\":\"NEM\",\"XMR\":\"Monero\",\"XSN\":\"Stakenet\",\"XSR\":\"SucreCoin\",\"XVG\":\"VERGE\",\"XZC\":\"ZCoin\",\"ZEC\":\"ZCash\",\"ZEN\":\"Horizen\"}', 1, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:11:52'),
(16, 0, 504, 'CoinPayments Fiat', 'CoinpaymentsFiat', '663a36b7b841a1715091127.png', 1, '{\"merchant_id\":{\"title\":\"Merchant ID\",\"global\":true,\"value\":\"6515561\"}}', '{\"USD\":\"USD\",\"AUD\":\"AUD\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"CLP\":\"CLP\",\"CNY\":\"CNY\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"INR\":\"INR\",\"ISK\":\"ISK\",\"JPY\":\"JPY\",\"KRW\":\"KRW\",\"NZD\":\"NZD\",\"PLN\":\"PLN\",\"RUB\":\"RUB\",\"SEK\":\"SEK\",\"SGD\":\"SGD\",\"THB\":\"THB\",\"TWD\":\"TWD\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:12:07'),
(17, 0, 505, 'Coingate', 'Coingate', '663a368e753381715091086.png', 1, '{\"api_key\":{\"title\":\"API Key\",\"global\":true,\"value\":\"6354mwVCEw5kHzRJ6thbGo-N\"}}', '{\"USD\":\"USD\",\"EUR\":\"EUR\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:11:26'),
(18, 0, 506, 'Coinbase Commerce', 'CoinbaseCommerce', '663a367e46ae51715091070.png', 1, '{\"api_key\":{\"title\":\"API Key\",\"global\":true,\"value\":\"c47cd7df-d8e8-424b-a20a\"},\"secret\":{\"title\":\"Webhook Shared Secret\",\"global\":true,\"value\":\"55871878-2c32-4f64-ab66\"}}', '{\"USD\":\"USD\",\"EUR\":\"EUR\",\"JPY\":\"JPY\",\"GBP\":\"GBP\",\"AUD\":\"AUD\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"CNY\":\"CNY\",\"SEK\":\"SEK\",\"NZD\":\"NZD\",\"MXN\":\"MXN\",\"SGD\":\"SGD\",\"HKD\":\"HKD\",\"NOK\":\"NOK\",\"KRW\":\"KRW\",\"TRY\":\"TRY\",\"RUB\":\"RUB\",\"INR\":\"INR\",\"BRL\":\"BRL\",\"ZAR\":\"ZAR\",\"AED\":\"AED\",\"AFN\":\"AFN\",\"ALL\":\"ALL\",\"AMD\":\"AMD\",\"ANG\":\"ANG\",\"AOA\":\"AOA\",\"ARS\":\"ARS\",\"AWG\":\"AWG\",\"AZN\":\"AZN\",\"BAM\":\"BAM\",\"BBD\":\"BBD\",\"BDT\":\"BDT\",\"BGN\":\"BGN\",\"BHD\":\"BHD\",\"BIF\":\"BIF\",\"BMD\":\"BMD\",\"BND\":\"BND\",\"BOB\":\"BOB\",\"BSD\":\"BSD\",\"BTN\":\"BTN\",\"BWP\":\"BWP\",\"BYN\":\"BYN\",\"BZD\":\"BZD\",\"CDF\":\"CDF\",\"CLF\":\"CLF\",\"CLP\":\"CLP\",\"COP\":\"COP\",\"CRC\":\"CRC\",\"CUC\":\"CUC\",\"CUP\":\"CUP\",\"CVE\":\"CVE\",\"CZK\":\"CZK\",\"DJF\":\"DJF\",\"DKK\":\"DKK\",\"DOP\":\"DOP\",\"DZD\":\"DZD\",\"EGP\":\"EGP\",\"ERN\":\"ERN\",\"ETB\":\"ETB\",\"FJD\":\"FJD\",\"FKP\":\"FKP\",\"GEL\":\"GEL\",\"GGP\":\"GGP\",\"GHS\":\"GHS\",\"GIP\":\"GIP\",\"GMD\":\"GMD\",\"GNF\":\"GNF\",\"GTQ\":\"GTQ\",\"GYD\":\"GYD\",\"HNL\":\"HNL\",\"HRK\":\"HRK\",\"HTG\":\"HTG\",\"HUF\":\"HUF\",\"IDR\":\"IDR\",\"ILS\":\"ILS\",\"IMP\":\"IMP\",\"IQD\":\"IQD\",\"IRR\":\"IRR\",\"ISK\":\"ISK\",\"JEP\":\"JEP\",\"JMD\":\"JMD\",\"JOD\":\"JOD\",\"KES\":\"KES\",\"KGS\":\"KGS\",\"KHR\":\"KHR\",\"KMF\":\"KMF\",\"KPW\":\"KPW\",\"KWD\":\"KWD\",\"KYD\":\"KYD\",\"KZT\":\"KZT\",\"LAK\":\"LAK\",\"LBP\":\"LBP\",\"LKR\":\"LKR\",\"LRD\":\"LRD\",\"LSL\":\"LSL\",\"LYD\":\"LYD\",\"MAD\":\"MAD\",\"MDL\":\"MDL\",\"MGA\":\"MGA\",\"MKD\":\"MKD\",\"MMK\":\"MMK\",\"MNT\":\"MNT\",\"MOP\":\"MOP\",\"MRO\":\"MRO\",\"MUR\":\"MUR\",\"MVR\":\"MVR\",\"MWK\":\"MWK\",\"MYR\":\"MYR\",\"MZN\":\"MZN\",\"NAD\":\"NAD\",\"NGN\":\"NGN\",\"NIO\":\"NIO\",\"NPR\":\"NPR\",\"OMR\":\"OMR\",\"PAB\":\"PAB\",\"PEN\":\"PEN\",\"PGK\":\"PGK\",\"PHP\":\"PHP\",\"PKR\":\"PKR\",\"PLN\":\"PLN\",\"PYG\":\"PYG\",\"QAR\":\"QAR\",\"RON\":\"RON\",\"RSD\":\"RSD\",\"RWF\":\"RWF\",\"SAR\":\"SAR\",\"SBD\":\"SBD\",\"SCR\":\"SCR\",\"SDG\":\"SDG\",\"SHP\":\"SHP\",\"SLL\":\"SLL\",\"SOS\":\"SOS\",\"SRD\":\"SRD\",\"SSP\":\"SSP\",\"STD\":\"STD\",\"SVC\":\"SVC\",\"SYP\":\"SYP\",\"SZL\":\"SZL\",\"THB\":\"THB\",\"TJS\":\"TJS\",\"TMT\":\"TMT\",\"TND\":\"TND\",\"TOP\":\"TOP\",\"TTD\":\"TTD\",\"TWD\":\"TWD\",\"TZS\":\"TZS\",\"UAH\":\"UAH\",\"UGX\":\"UGX\",\"UYU\":\"UYU\",\"UZS\":\"UZS\",\"VEF\":\"VEF\",\"VND\":\"VND\",\"VUV\":\"VUV\",\"WST\":\"WST\",\"XAF\":\"XAF\",\"XAG\":\"XAG\",\"XAU\":\"XAU\",\"XCD\":\"XCD\",\"XDR\":\"XDR\",\"XOF\":\"XOF\",\"XPD\":\"XPD\",\"XPF\":\"XPF\",\"XPT\":\"XPT\",\"YER\":\"YER\",\"ZMW\":\"ZMW\",\"ZWL\":\"ZWL\"}\r\n\r\n', 0, '{\"endpoint\":{\"title\": \"Webhook Endpoint\",\"value\":\"ipn.CoinbaseCommerce\"}}', NULL, '2019-09-14 13:14:22', '2024-05-07 08:11:10'),
(24, 0, 113, 'Paypal Express', 'PaypalSdk', '663a38ed101a61715091693.png', 1, '{\"clientId\":{\"title\":\"Paypal Client ID\",\"global\":true,\"value\":\"Ae0-tixtSV7DvLwIh3Bmu7JvHrjh5EfGdXr_cEklKAVjjezRZ747BxKILiBdzlKKyp-W8W_T7CKH1Ken\"},\"clientSecret\":{\"title\":\"Client Secret\",\"global\":true,\"value\":\"EOhbvHZgFNO21soQJT1L9Q00M3rK6PIEsdiTgXRBt2gtGtxwRer5JvKnVUGNU5oE63fFnjnYY7hq3HBA\"}}', '{\"AUD\":\"AUD\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CZK\":\"CZK\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"HKD\":\"HKD\",\"HUF\":\"HUF\",\"INR\":\"INR\",\"ILS\":\"ILS\",\"JPY\":\"JPY\",\"MYR\":\"MYR\",\"MXN\":\"MXN\",\"TWD\":\"TWD\",\"NZD\":\"NZD\",\"NOK\":\"NOK\",\"PHP\":\"PHP\",\"PLN\":\"PLN\",\"GBP\":\"GBP\",\"RUB\":\"RUB\",\"SGD\":\"SGD\",\"SEK\":\"SEK\",\"CHF\":\"CHF\",\"THB\":\"THB\",\"USD\":\"$\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:21:33'),
(25, 0, 114, 'Stripe Checkout', 'StripeV3', '663a39afb519f1715091887.png', 1, '{\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"sk_test_51I6GGiCGv1sRiQlEi5v1or9eR0HVbuzdMd2rW4n3DxC8UKfz66R4X6n4yYkzvI2LeAIuRU9H99ZpY7XCNFC9xMs500vBjZGkKG\"},\"publishable_key\":{\"title\":\"PUBLISHABLE KEY\",\"global\":true,\"value\":\"pk_test_51I6GGiCGv1sRiQlEOisPKrjBqQqqcFsw8mXNaZ2H2baN6R01NulFS7dKFji1NRRxuchoUTEDdB7ujKcyKYSVc0z500eth7otOM\"},\"end_point\":{\"title\":\"End Point Secret\",\"global\":true,\"value\":\"whsec_lUmit1gtxwKTveLnSe88xCSDdnPOt8g5\"}}', '{\"USD\":\"USD\",\"AUD\":\"AUD\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"INR\":\"INR\",\"JPY\":\"JPY\",\"MXN\":\"MXN\",\"MYR\":\"MYR\",\"NOK\":\"NOK\",\"NZD\":\"NZD\",\"PLN\":\"PLN\",\"SEK\":\"SEK\",\"SGD\":\"SGD\"}', 0, '{\"webhook\":{\"title\": \"Webhook Endpoint\",\"value\":\"ipn.StripeV3\"}}', NULL, '2019-09-14 13:14:22', '2024-05-07 08:24:47'),
(27, 0, 115, 'Mollie', 'Mollie', '663a387ec69371715091582.png', 1, '{\"mollie_email\":{\"title\":\"Mollie Email \",\"global\":true,\"value\":\"vi@gmail.com\"},\"api_key\":{\"title\":\"API KEY\",\"global\":true,\"value\":\"test_cucfwKTWfft9s337qsVfn5CC4vNkrn\"}}', '{\"AED\":\"AED\",\"AUD\":\"AUD\",\"BGN\":\"BGN\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"CZK\":\"CZK\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"HRK\":\"HRK\",\"HUF\":\"HUF\",\"ILS\":\"ILS\",\"ISK\":\"ISK\",\"JPY\":\"JPY\",\"MXN\":\"MXN\",\"MYR\":\"MYR\",\"NOK\":\"NOK\",\"NZD\":\"NZD\",\"PHP\":\"PHP\",\"PLN\":\"PLN\",\"RON\":\"RON\",\"RUB\":\"RUB\",\"SEK\":\"SEK\",\"SGD\":\"SGD\",\"THB\":\"THB\",\"TWD\":\"TWD\",\"USD\":\"USD\",\"ZAR\":\"ZAR\"}', 0, NULL, NULL, '2019-09-14 13:14:22', '2024-05-07 08:19:42'),
(30, 0, 116, 'Cashmaal', 'Cashmaal', '663a361b16bd11715090971.png', 1, '{\"web_id\":{\"title\":\"Web Id\",\"global\":true,\"value\":\"3748\"},\"ipn_key\":{\"title\":\"IPN Key\",\"global\":true,\"value\":\"546254628759524554647987\"}}', '{\"PKR\":\"PKR\",\"USD\":\"USD\"}', 0, '{\"webhook\":{\"title\": \"IPN URL\",\"value\":\"ipn.Cashmaal\"}}', NULL, NULL, '2024-05-07 08:09:31'),
(36, 0, 119, 'Mercado Pago', 'MercadoPago', '663a386c714a91715091564.png', 1, '{\"access_token\":{\"title\":\"Access Token\",\"global\":true,\"value\":\"APP_USR-7924565816849832-082312-21941521997fab717db925cf1ea2c190-1071840315\"}}', '{\"USD\":\"USD\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"NOK\":\"NOK\",\"PLN\":\"PLN\",\"SEK\":\"SEK\",\"AUD\":\"AUD\",\"NZD\":\"NZD\"}', 0, NULL, NULL, NULL, '2024-05-07 08:19:24'),
(37, 0, 120, 'Authorize.net', 'Authorize', '663a35b9ca5991715090873.png', 1, '{\"login_id\":{\"title\":\"Login ID\",\"global\":true,\"value\":\"59e4P9DBcZv\"},\"transaction_key\":{\"title\":\"Transaction Key\",\"global\":true,\"value\":\"47x47TJyLw2E7DbR\"}}', '{\"USD\":\"USD\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"NOK\":\"NOK\",\"PLN\":\"PLN\",\"SEK\":\"SEK\",\"AUD\":\"AUD\",\"NZD\":\"NZD\"}', 0, NULL, NULL, NULL, '2024-05-07 08:07:53'),
(46, 0, 121, 'NMI', 'NMI', '663a3897754cf1715091607.png', 1, '{\"api_key\":{\"title\":\"API Key\",\"global\":true,\"value\":\"2F822Rw39fx762MaV7Yy86jXGTC7sCDy\"}}', '{\"AED\":\"AED\",\"ARS\":\"ARS\",\"AUD\":\"AUD\",\"BOB\":\"BOB\",\"BRL\":\"BRL\",\"CAD\":\"CAD\",\"CHF\":\"CHF\",\"CLP\":\"CLP\",\"CNY\":\"CNY\",\"COP\":\"COP\",\"DKK\":\"DKK\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"IDR\":\"IDR\",\"ILS\":\"ILS\",\"INR\":\"INR\",\"JPY\":\"JPY\",\"KRW\":\"KRW\",\"MXN\":\"MXN\",\"MYR\":\"MYR\",\"NOK\":\"NOK\",\"NZD\":\"NZD\",\"PEN\":\"PEN\",\"PHP\":\"PHP\",\"PLN\":\"PLN\",\"PYG\":\"PYG\",\"RUB\":\"RUB\",\"SEC\":\"SEC\",\"SGD\":\"SGD\",\"THB\":\"THB\",\"TRY\":\"TRY\",\"TWD\":\"TWD\",\"USD\":\"USD\",\"ZAR\":\"ZAR\"}', 0, NULL, NULL, NULL, '2024-05-07 08:20:07'),
(50, 0, 507, 'BTCPay', 'BTCPay', '663a35cd25a8d1715090893.png', 1, '{\"store_id\":{\"title\":\"Store Id\",\"global\":true,\"value\":\"HsqFVTXSeUFJu7caoYZc3CTnP8g5LErVdHhEXPVTheHf\"},\"api_key\":{\"title\":\"Api Key\",\"global\":true,\"value\":\"4436bd706f99efae69305e7c4eff4780de1335ce\"},\"server_name\":{\"title\":\"Server Name\",\"global\":true,\"value\":\"https:\\/\\/testnet.demo.btcpayserver.org\"},\"secret_code\":{\"title\":\"Secret Code\",\"global\":true,\"value\":\"SUCdqPn9CDkY7RmJHfpQVHP2Lf2\"}}', '{\"BTC\":\"Bitcoin\",\"LTC\":\"Litecoin\"}', 1, '{\"webhook\":{\"title\": \"IPN URL\",\"value\":\"ipn.BTCPay\"}}', NULL, NULL, '2024-05-07 08:08:13'),
(51, 0, 508, 'Now payments hosted', 'NowPaymentsHosted', '663a38b8d57a81715091640.png', 1, '{\"api_key\":{\"title\":\"API Key\",\"global\":true,\"value\":\"--------\"},\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"------------\"}}', '{\"BTG\":\"BTG\",\"ETH\":\"ETH\",\"XMR\":\"XMR\",\"ZEC\":\"ZEC\",\"XVG\":\"XVG\",\"ADA\":\"ADA\",\"LTC\":\"LTC\",\"BCH\":\"BCH\",\"QTUM\":\"QTUM\",\"DASH\":\"DASH\",\"XLM\":\"XLM\",\"XRP\":\"XRP\",\"XEM\":\"XEM\",\"DGB\":\"DGB\",\"LSK\":\"LSK\",\"DOGE\":\"DOGE\",\"TRX\":\"TRX\",\"KMD\":\"KMD\",\"REP\":\"REP\",\"BAT\":\"BAT\",\"ARK\":\"ARK\",\"WAVES\":\"WAVES\",\"BNB\":\"BNB\",\"XZC\":\"XZC\",\"NANO\":\"NANO\",\"TUSD\":\"TUSD\",\"VET\":\"VET\",\"ZEN\":\"ZEN\",\"GRS\":\"GRS\",\"FUN\":\"FUN\",\"NEO\":\"NEO\",\"GAS\":\"GAS\",\"PAX\":\"PAX\",\"USDC\":\"USDC\",\"ONT\":\"ONT\",\"XTZ\":\"XTZ\",\"LINK\":\"LINK\",\"RVN\":\"RVN\",\"BNBMAINNET\":\"BNBMAINNET\",\"ZIL\":\"ZIL\",\"BCD\":\"BCD\",\"USDT\":\"USDT\",\"USDTERC20\":\"USDTERC20\",\"CRO\":\"CRO\",\"DAI\":\"DAI\",\"HT\":\"HT\",\"WABI\":\"WABI\",\"BUSD\":\"BUSD\",\"ALGO\":\"ALGO\",\"USDTTRC20\":\"USDTTRC20\",\"GT\":\"GT\",\"STPT\":\"STPT\",\"AVA\":\"AVA\",\"SXP\":\"SXP\",\"UNI\":\"UNI\",\"OKB\":\"OKB\",\"BTC\":\"BTC\"}', 1, '', NULL, NULL, '2024-05-07 08:20:40'),
(52, 0, 509, 'Now payments checkout', 'NowPaymentsCheckout', '663a38a59d2541715091621.png', 1, '{\"api_key\":{\"title\":\"API Key\",\"global\":true,\"value\":\"---------------\"},\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"-----------\"}}', '{\"USD\":\"USD\",\"EUR\":\"EUR\"}', 1, '', NULL, NULL, '2024-05-07 08:20:21'),
(53, 0, 122, '2Checkout', 'TwoCheckout', '663a39b8e64b91715091896.png', 1, '{\"merchant_code\":{\"title\":\"Merchant Code\",\"global\":true,\"value\":\"253248016872\"},\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"eQM)ID@&vG84u!O*g[p+\"}}', '{\"AFN\": \"AFN\",\"ALL\": \"ALL\",\"DZD\": \"DZD\",\"ARS\": \"ARS\",\"AUD\": \"AUD\",\"AZN\": \"AZN\",\"BSD\": \"BSD\",\"BDT\": \"BDT\",\"BBD\": \"BBD\",\"BZD\": \"BZD\",\"BMD\": \"BMD\",\"BOB\": \"BOB\",\"BWP\": \"BWP\",\"BRL\": \"BRL\",\"GBP\": \"GBP\",\"BND\": \"BND\",\"BGN\": \"BGN\",\"CAD\": \"CAD\",\"CLP\": \"CLP\",\"CNY\": \"CNY\",\"COP\": \"COP\",\"CRC\": \"CRC\",\"HRK\": \"HRK\",\"CZK\": \"CZK\",\"DKK\": \"DKK\",\"DOP\": \"DOP\",\"XCD\": \"XCD\",\"EGP\": \"EGP\",\"EUR\": \"EUR\",\"FJD\": \"FJD\",\"GTQ\": \"GTQ\",\"HKD\": \"HKD\",\"HNL\": \"HNL\",\"HUF\": \"HUF\",\"INR\": \"INR\",\"IDR\": \"IDR\",\"ILS\": \"ILS\",\"JMD\": \"JMD\",\"JPY\": \"JPY\",\"KZT\": \"KZT\",\"KES\": \"KES\",\"LAK\": \"LAK\",\"MMK\": \"MMK\",\"LBP\": \"LBP\",\"LRD\": \"LRD\",\"MOP\": \"MOP\",\"MYR\": \"MYR\",\"MVR\": \"MVR\",\"MRO\": \"MRO\",\"MUR\": \"MUR\",\"MXN\": \"MXN\",\"MAD\": \"MAD\",\"NPR\": \"NPR\",\"TWD\": \"TWD\",\"NZD\": \"NZD\",\"NIO\": \"NIO\",\"NOK\": \"NOK\",\"PKR\": \"PKR\",\"PGK\": \"PGK\",\"PEN\": \"PEN\",\"PHP\": \"PHP\",\"PLN\": \"PLN\",\"QAR\": \"QAR\",\"RON\": \"RON\",\"RUB\": \"RUB\",\"WST\": \"WST\",\"SAR\": \"SAR\",\"SCR\": \"SCR\",\"SGD\": \"SGD\",\"SBD\": \"SBD\",\"ZAR\": \"ZAR\",\"KRW\": \"KRW\",\"LKR\": \"LKR\",\"SEK\": \"SEK\",\"CHF\": \"CHF\",\"SYP\": \"SYP\",\"THB\": \"THB\",\"TOP\": \"TOP\",\"TTD\": \"TTD\",\"TRY\": \"TRY\",\"UAH\": \"UAH\",\"AED\": \"AED\",\"USD\": \"USD\",\"VUV\": \"VUV\",\"VND\": \"VND\",\"XOF\": \"XOF\",\"YER\": \"YER\"}', 0, '{\"approved_url\":{\"title\": \"Approved URL\",\"value\":\"ipn.TwoCheckout\"}}', NULL, NULL, '2024-05-07 08:24:56'),
(54, 0, 123, 'Checkout', 'Checkout', '663a3628733351715090984.png', 1, '{\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"------\"},\"public_key\":{\"title\":\"PUBLIC KEY\",\"global\":true,\"value\":\"------\"},\"processing_channel_id\":{\"title\":\"PROCESSING CHANNEL\",\"global\":true,\"value\":\"------\"}}', '{\"USD\":\"USD\",\"EUR\":\"EUR\",\"GBP\":\"GBP\",\"HKD\":\"HKD\",\"AUD\":\"AUD\",\"CAN\":\"CAN\",\"CHF\":\"CHF\",\"SGD\":\"SGD\",\"JPY\":\"JPY\",\"NZD\":\"NZD\"}', 0, NULL, NULL, NULL, '2024-05-07 08:09:44'),
(56, 0, 510, 'Binance', 'Binance', '663a35db4fd621715090907.png', 1, '{\"api_key\":{\"title\":\"API Key\",\"global\":true,\"value\":\"tsu3tjiq0oqfbtmlbevoeraxhfbp3brejnm9txhjxcp4to29ujvakvfl1ibsn3ja\"},\"secret_key\":{\"title\":\"Secret Key\",\"global\":true,\"value\":\"jzngq4t04ltw8d4iqpi7admfl8tvnpehxnmi34id1zvfaenbwwvsvw7llw3zdko8\"},\"merchant_id\":{\"title\":\"Merchant ID\",\"global\":true,\"value\":\"231129033\"}}', '{\"BTC\":\"Bitcoin\",\"USD\":\"USD\",\"BNB\":\"BNB\"}', 1, '{\"cron\":{\"title\": \"Cron Job URL\",\"value\":\"ipn.Binance\"}}', NULL, NULL, '2024-05-07 08:08:27'),
(57, 0, 124, 'SslCommerz', 'SslCommerz', '663a397a70c571715091834.png', 1, '{\"store_id\":{\"title\":\"Store ID\",\"global\":true,\"value\":\"---------\"},\"store_password\":{\"title\":\"Store Password\",\"global\":true,\"value\":\"----------\"}}', '{\"BDT\":\"BDT\",\"USD\":\"USD\",\"EUR\":\"EUR\",\"SGD\":\"SGD\",\"INR\":\"INR\",\"MYR\":\"MYR\"}', 0, NULL, NULL, NULL, '2024-05-07 08:23:54'),
(58, 0, 125, 'Aamarpay', 'Aamarpay', '663a34d5d1dfc1715090645.png', 1, '{\"store_id\":{\"title\":\"Store ID\",\"global\":true,\"value\":\"---------\"},\"signature_key\":{\"title\":\"Signature Key\",\"global\":true,\"value\":\"----------\"}}', '{\"BDT\":\"BDT\"}', 0, NULL, NULL, NULL, '2024-05-07 08:04:05'),
(61, 0, -1000, 'Main Balance', 'MainBalance', NULL, 1, '[]', '[]', 0, NULL, '<br>', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gateway_currencies`
--

CREATE TABLE `gateway_currencies` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `method_code` int DEFAULT NULL,
  `gateway_alias` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `min_amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `max_amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `percent_charge` decimal(5,2) NOT NULL DEFAULT '0.00',
  `fixed_charge` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `rate` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `gateway_parameter` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `general_settings`
--

CREATE TABLE `general_settings` (
  `id` bigint UNSIGNED NOT NULL,
  `site_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cur_text` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'currency text',
  `cur_sym` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'currency symbol',
  `email_from` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_from_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_template` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sms_template` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sms_from` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `base_color` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_color` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'email configuration',
  `sms_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `global_shortcodes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `kv` tinyint(1) NOT NULL DEFAULT '0',
  `instructor_kv` tinyint(1) NOT NULL DEFAULT '0',
  `ev` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'email verification, 0 - dont check, 1 - check',
  `en` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'email notification, 0 - dont send, 1 - send',
  `sv` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'mobile verication, 0 - dont check, 1 - check',
  `sn` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'sms notification, 0 - dont send, 1 - send',
  `force_ssl` tinyint(1) NOT NULL DEFAULT '0',
  `in_app_payment` tinyint(1) NOT NULL DEFAULT '1',
  `maintenance_mode` tinyint(1) NOT NULL DEFAULT '0',
  `secure_password` tinyint(1) NOT NULL DEFAULT '0',
  `agree` tinyint(1) NOT NULL DEFAULT '0',
  `multi_language` tinyint(1) NOT NULL DEFAULT '1',
  `registration` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: Off	, 1: On',
  `instructor_registration` tinyint(1) DEFAULT '1',
  `active_template` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `socialite_credentials` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_cron` datetime DEFAULT NULL,
  `available_version` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `system_customized` tinyint(1) NOT NULL DEFAULT '0',
  `paginate_number` int NOT NULL DEFAULT '0',
  `currency_format` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=>Both\r\n2=>Text Only\r\n3=>Symbol Only',
  `certificate_template` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `verify_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `general_settings`
--

INSERT INTO `general_settings` (`id`, `site_name`, `cur_text`, `cur_sym`, `email_from`, `email_from_name`, `email_template`, `sms_template`, `sms_from`, `base_color`, `secondary_color`, `mail_config`, `sms_config`, `global_shortcodes`, `kv`, `instructor_kv`, `ev`, `en`, `sv`, `sn`, `force_ssl`, `in_app_payment`, `maintenance_mode`, `secure_password`, `agree`, `multi_language`, `registration`, `instructor_registration`, `active_template`, `socialite_credentials`, `last_cron`, `available_version`, `system_customized`, `paginate_number`, `currency_format`, `certificate_template`, `verify_url`, `created_at`, `updated_at`) VALUES
(1, 'Vdemy', 'USD', '$', 'no-reply@viserlab.com', '{{site_name}}', '<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n  <!--[if !mso]><!-->\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <!--<![endif]-->\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title></title>\r\n  <style type=\"text/css\">\r\n.ReadMsgBody { width: 100%; background-color: #ffffff; }\r\n.ExternalClass { width: 100%; background-color: #ffffff; }\r\n.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }\r\nhtml { width: 100%; }\r\nbody { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; margin: 0; padding: 0; }\r\ntable { border-spacing: 0; table-layout: fixed; margin: 0 auto;border-collapse: collapse; }\r\ntable table table { table-layout: auto; }\r\n.yshortcuts a { border-bottom: none !important; }\r\nimg:hover { opacity: 0.9 !important; }\r\na { color: #0087ff; text-decoration: none; }\r\n.textbutton a { font-family: \'open sans\', arial, sans-serif !important;}\r\n.btn-link a { color:#FFFFFF !important;}\r\n\r\n@media only screen and (max-width: 480px) {\r\nbody { width: auto !important; }\r\n*[class=\"table-inner\"] { width: 90% !important; text-align: center !important; }\r\n*[class=\"table-full\"] { width: 100% !important; text-align: center !important; }\r\n/* image */\r\nimg[class=\"img1\"] { width: 100% !important; height: auto !important; }\r\n}\r\n</style>\r\n\r\n\r\n\r\n  <table bgcolor=\"#414a51\" width=\"100%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n    <tbody><tr>\r\n      <td height=\"50\"></td>\r\n    </tr>\r\n    <tr>\r\n      <td align=\"center\" style=\"text-align:center;vertical-align:top;font-size:0;\">\r\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n          <tbody><tr>\r\n            <td align=\"center\" width=\"600\">\r\n              <!--header-->\r\n              <table class=\"table-inner\" width=\"95%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n                <tbody><tr>\r\n                  <td bgcolor=\"#0087ff\" style=\"border-top-left-radius:6px; border-top-right-radius:6px;text-align:center;vertical-align:top;font-size:0;\" align=\"center\">\r\n                    <table width=\"90%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n                      <tbody><tr>\r\n                        <td height=\"20\"></td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td align=\"center\" style=\"font-family: \'Open sans\', Arial, sans-serif; color:#FFFFFF; font-size:16px; font-weight: bold;\">This is a System Generated Email</td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td height=\"20\"></td>\r\n                      </tr>\r\n                    </tbody></table>\r\n                  </td>\r\n                </tr>\r\n              </tbody></table>\r\n              <!--end header-->\r\n              <table class=\"table-inner\" width=\"95%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n                <tbody><tr>\r\n                  <td bgcolor=\"#FFFFFF\" align=\"center\" style=\"text-align:center;vertical-align:top;font-size:0;\">\r\n                    <table align=\"center\" width=\"90%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n                      <tbody><tr>\r\n                        <td height=\"35\"></td>\r\n                      </tr>\r\n                      <!--logo-->\r\n                      <tr>\r\n                        <td align=\"center\" style=\"vertical-align:top;font-size:0;\">\r\n                          <a href=\"#\">\r\n                            <img style=\"display:block; line-height:0px; font-size:0px; border:0px;\" src=\"https://script.viserlab.com/apps/cdn/demo-logo.png\" width=\"220\" alt=\"img\">\r\n                          </a>\r\n                        </td>\r\n                      </tr>\r\n                      <!--end logo-->\r\n                      <tr>\r\n                        <td height=\"40\"></td>\r\n                      </tr>\r\n                      <!--headline-->\r\n                      <tr>\r\n                        <td align=\"center\" style=\"font-family: \'Open Sans\', Arial, sans-serif; font-size: 22px;color:#414a51;font-weight: bold;\">Hello {{fullname}} ({{username}})</td>\r\n                      </tr>\r\n                      <!--end headline-->\r\n                      <tr>\r\n                        <td align=\"center\" style=\"text-align:center;vertical-align:top;font-size:0;\">\r\n                          <table width=\"40\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\r\n                            <tbody><tr>\r\n                              <td height=\"20\" style=\" border-bottom:3px solid #0087ff;\"></td>\r\n                            </tr>\r\n                          </tbody></table>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td height=\"20\"></td>\r\n                      </tr>\r\n                      <!--content-->\r\n                      <tr>\r\n                        <td align=\"left\" style=\"font-family: \'Open sans\', Arial, sans-serif; color:#7f8c8d; font-size:16px; line-height: 28px;\">{{message}}</td>\r\n                      </tr>\r\n                      <!--end content-->\r\n                      <tr>\r\n                        <td height=\"40\"></td>\r\n                      </tr>\r\n              \r\n                    </tbody></table>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                  <td height=\"45\" align=\"center\" bgcolor=\"#f4f4f4\" style=\"border-bottom-left-radius:6px;border-bottom-right-radius:6px;\">\r\n                    <table align=\"center\" width=\"90%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n                      <tbody><tr>\r\n                        <td height=\"10\"></td>\r\n                      </tr>\r\n                      <!--preference-->\r\n                      <tr>\r\n                        <td class=\"preference-link\" align=\"center\" style=\"font-family: \'Open sans\', Arial, sans-serif; color:#95a5a6; font-size:14px;\">\r\n                          © 2024 <a href=\"#\">{{site_name}}</a>&nbsp;. All Rights Reserved. \r\n                        </td>\r\n                      </tr>\r\n                      <!--end preference-->\r\n                      <tr>\r\n                        <td height=\"10\"></td>\r\n                      </tr>\r\n                    </tbody></table>\r\n                  </td>\r\n                </tr>\r\n              </tbody></table>\r\n            </td>\r\n          </tr>\r\n        </tbody></table>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td height=\"60\"></td>\r\n    </tr>\r\n  </tbody></table>', 'hi {{fullname}} ({{username}}), {{message}}', '{{site_name}}', '3705FF', '10162D', '{\"name\":\"php\"}', '{\"name\":\"clickatell\",\"clickatell\":{\"api_key\":\"----------------\"},\"infobip\":{\"username\":\"------------8888888\",\"password\":\"-----------------\"},\"message_bird\":{\"api_key\":\"-------------------\"},\"nexmo\":{\"api_key\":\"----------------------\",\"api_secret\":\"----------------------\"},\"sms_broadcast\":{\"username\":\"----------------------\",\"password\":\"-----------------------------\"},\"twilio\":{\"account_sid\":\"-----------------------\",\"auth_token\":\"---------------------------\",\"from\":\"----------------------\"},\"text_magic\":{\"username\":\"-----------------------\",\"apiv2_key\":\"-------------------------------\"},\"custom\":{\"method\":\"get\",\"url\":\"https:\\/\\/hostname.com\\/demo-api-v1\",\"headers\":{\"name\":[\"api_key\"],\"value\":[\"test_api 555\"]},\"body\":{\"name\":[\"from_number\"],\"value\":[\"5657545757\"]}}}', '{\n    \"site_name\":\"Name of your site\",\n    \"site_currency\":\"Currency of your site\",\n    \"currency_symbol\":\"Symbol of currency\"\n}', 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 'basic', '{\"google\":{\"client_id\":\"94164142721-84nva94mmg9lu7qb5ivounis4or4stbc.apps.googleusercontent.com\",\"client_secret\":\"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\",\"status\":1},\"facebook\":{\"client_id\":\"------\",\"client_secret\":\"------\",\"status\":0},\"linkedin\":{\"client_id\":\"-----\",\"client_secret\":\"-----\",\"status\":1}}', '2024-12-04 06:18:04', '0', 0, 20, 1, '<style>\r\n        @page {\r\n            size: 49.625rem  auto;\r\n        }\r\n        .qr-code img {\r\n            width: 80px;\r\n            height: auto;\r\n        }\r\n        .logo img {\r\n            width: 160px;\r\n        }\r\n    </style>\r\n    <div style=\"position:relative;padding: 24px;border: 4px solid #edf2f4;\">\r\n        <div style=\"width:100%;height:100%;background-size:cover;position: absolute;top: 0;left: 0;\">\r\n            <p\r\n                style=\"font-size: 64px;font-weight:700;opacity: 0.075;top: 50%;left: 50%;position: absolute;transform: translate(-50%, -50%) rotate(-45deg);text-align: center; margin: 0; color: #0c4c6b;\">\r\n                CERTIFICATE\r\n            </p>\r\n        </div>\r\n        <div class=\"invoice\">\r\n            <table style=\"width:100%;border-collapse:collapse;margin-bottom:50px;\">\r\n                <tbody>\r\n                    <tr>\r\n                        <td style=\"width: 50%;\">\r\n                            <div class=\"logo\">\r\n                               {{site_logo}}\r\n                            </div>\r\n                        </td>\r\n                        <td style=\"text-align:right; width: 50%;\">\r\n                            <div class=\"qr-code\">\r\n                                {{qr_code}}\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n            <div style=\"text-align:center;\">\r\n                <h2\r\n                    style=\"font-size:1.25rem;text-transform:uppercase;font-weight:500;letter-spacing:8px; margin-bottom: 6px; color: #012537;\">\r\n                    Certificate of</h2>\r\n                <h1\r\n                    style=\"font-size:2rem;text-transform:uppercase;font-weight:600;letter-spacing:12px;margin-bottom: 32px;margin-top: 0px; color: #0c4c6b;\">\r\n                    Achievement</h1>\r\n                <h4 style=\"font-size:1.125rem;font-weight:500;color:rgba(0,0,0,0.65);margin-bottom: 16px;\">\r\n                    {{course_title}}</h4>\r\n                <p\r\n                    style=\"font-size:1.05rem;font-weight:400;max-width:760px;margin:0 auto;line-height:1.6;color:rgba(0,0,0,0.75);\">\r\n                    {{course_based_message}}\r\n                </p>\r\n                <p style=\"font-size:1.125rem;margin-top: 40px;\">This is proudly presented to</p>\r\n                <h1 style=\"font-size:1.5rem;margin-top:16px; color: #0c4c6b;\">\r\n                    {{student_name}}\r\n                </h1>\r\n            </div>\r\n            <table style=\"width:100%;border-collapse:collapse;margin-top: 24px;\">\r\n                <tbody>\r\n                    <tr>\r\n                        <td style=\"width:50%;padding-right:16px;\">\r\n                            <div style=\"margin-left:auto;text-align:right;\">\r\n                                <p style=\"font-size:1.125rem;font-weight:500;margin-bottom:6px;\">Date\r\n                                    of\r\n                                    Completion</p>\r\n                                <p style=\"font-size:1.125rem;color:#0c4c6b;\">\r\n                                    {{course_completion_date}}\r\n                                </p>\r\n                            </div>\r\n                        </td>\r\n                        <td style=\"width:50%;padding-left:16px;text-align:left;\">\r\n                            <div>\r\n                                <p style=\"font-size:1.125rem;font-weight:500;margin-bottom:6px;\">\r\n                                    Instructor</p>\r\n                                <p style=\"font-size:1.125rem;color:#0c4c6b;\">\r\n                                    {{instructor_name}}\r\n                                </p>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>', 'http://yoursite.com/verify-certificate', NULL, '2025-03-20 07:32:31');

-- --------------------------------------------------------

--
-- Table structure for table `get_certificate_users`
--

CREATE TABLE `get_certificate_users` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `secret` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` bigint UNSIGNED NOT NULL,
  `firstname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dial_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `balance` decimal(28,8) UNSIGNED NOT NULL DEFAULT '0.00000000',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'contains full address',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0: banned, 1: active',
  `ev` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: email unverified, 1: email verified',
  `sv` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: sms unverified, 1: sms verified',
  `ver_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'stores verification code',
  `ver_code_send_at` datetime DEFAULT NULL COMMENT 'verification send time',
  `ts` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: 2fa off, 1: 2fa on',
  `tv` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0: 2fa unverified, 1: 2fa verified',
  `tsc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kv` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: KYC Unverified, 2: KYC pending, 1: KYC verified	',
  `kyc_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `kyc_rejection_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_complete` tinyint(1) NOT NULL DEFAULT '0',
  `ban_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `biography` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: not default language, 1: default language',
  `image` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `code`, `is_default`, `image`, `created_at`, `updated_at`) VALUES
(1, 'English', 'en', 1, '660b94fa876ac1712035066.png', '2020-07-06 03:47:55', '2024-04-01 23:17:46'),
(12, 'Bangla', 'bn', 0, '6784df67e17ae1736761191.png', '2024-09-08 03:26:48', '2025-01-13 03:39:52');

-- --------------------------------------------------------

--
-- Table structure for table `learning_objects`
--

CREATE TABLE `learning_objects` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL,
  `object` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_logs`
--

CREATE TABLE `notification_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `sender` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sent_from` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sent_to` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `notification_type` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_read` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_templates`
--

CREATE TABLE `notification_templates` (
  `id` bigint UNSIGNED NOT NULL,
  `act` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `push_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sms_body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `shortcodes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `email_status` tinyint(1) NOT NULL DEFAULT '1',
  `email_sent_from_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_sent_from_address` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sms_status` tinyint(1) NOT NULL DEFAULT '1',
  `sms_sent_from` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_templates`
--

INSERT INTO `notification_templates` (`id`, `act`, `name`, `subject`, `push_title`, `email_body`, `sms_body`, `shortcodes`, `email_status`, `email_sent_from_name`, `email_sent_from_address`, `sms_status`, `sms_sent_from`, `created_at`, `updated_at`) VALUES
(1, 'BAL_ADD', 'Balance - Added', 'Your Account has been Credited', '{{site_name}} - Balance Added', '<div>We\'re writing to inform you that an amount of {{amount}} {{site_currency}} has been successfully added to your account.</div><div><br></div><div>Here are the details of the transaction:</div><div><br></div><div><b>Transaction Number: </b>{{trx}}</div><div><b>Current Balance:</b> {{post_balance}} {{site_currency}}</div><div><b>Admin Note:</b> {{remark}}</div><div><br></div><div>If you have any questions or require further assistance, please don\'t hesitate to contact us. We\'re here to assist you.</div>', 'We\'re writing to inform you that an amount of {{amount}} {{site_currency}} has been successfully added to your account.', '{\"trx\":\"Transaction number for the action\",\"amount\":\"Amount inserted by the admin\",\"remark\":\"Remark inserted by the admin\",\"post_balance\":\"Balance of the user after this transaction\"}', 1, '{{site_name}} Finance', NULL, 0, NULL, '2021-11-03 12:00:00', '2024-05-25 00:49:44'),
(2, 'BAL_SUB', 'Balance - Subtracted', 'Your Account has been Debited', '{{site_name}} - Balance Subtracted', '<div>We wish to inform you that an amount of {{amount}} {{site_currency}} has been successfully deducted from your account.</div><div><br></div><div>Below are the details of the transaction:</div><div><br></div><div><b>Transaction Number:</b> {{trx}}</div><div><b>Current Balance: </b>{{post_balance}} {{site_currency}}</div><div><b>Admin Note:</b> {{remark}}</div><div><br></div><div>Should you require any further clarification or assistance, please do not hesitate to reach out to us. We are here to assist you in any way we can.</div><div><br></div><div>Thank you for your continued trust in {{site_name}}.</div>', 'We wish to inform you that an amount of {{amount}} {{site_currency}} has been successfully deducted from your account.', '{\"trx\":\"Transaction number for the action\",\"amount\":\"Amount inserted by the admin\",\"remark\":\"Remark inserted by the admin\",\"post_balance\":\"Balance of the user after this transaction\"}', 1, '{{site_name}} Finance', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:17:48'),
(3, 'DEPOSIT_COMPLETE', 'Deposit - Automated - Successful', 'Deposit Completed Successfully', '{{site_name}} - Deposit successful', '<div>We\'re delighted to inform you that your deposit of {{amount}} {{site_currency}} via {{method_name}} has been completed.</div><div><br></div><div>Below, you\'ll find the details of your deposit:</div><div><br></div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge: </b>{{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Received:</b> {{method_amount}} {{method_currency}}</div><div><b>Paid via:</b> {{method_name}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><div>Your current balance stands at {{post_balance}} {{site_currency}}.</div><div><br></div><div>If you have any questions or need further assistance, feel free to reach out to our support team. We\'re here to assist you in any way we can.</div>', 'We\'re delighted to inform you that your deposit of {{amount}} {{site_currency}} via {{method_name}} has been completed.', '{\"trx\":\"Transaction number for the deposit\",\"amount\":\"Amount inserted by the user\",\"charge\":\"Gateway charge set by the admin\",\"rate\":\"Conversion rate between base currency and method currency\",\"method_name\":\"Name of the deposit method\",\"method_currency\":\"Currency of the deposit method\",\"method_amount\":\"Amount after conversion between base currency and method currency\",\"post_balance\":\"Balance of the user after this transaction\"}', 1, '{{site_name}} Billing', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:20:34'),
(4, 'DEPOSIT_APPROVE', 'Deposit - Manual - Approved', 'Deposit Request Approved', '{{site_name}} - Deposit Request Approved', '<div>We are pleased to inform you that your deposit request of {{amount}} {{site_currency}} via {{method_name}} has been approved.</div><div><br></div><div>Here are the details of your deposit:</div><div><br></div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge: </b>{{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Received: </b>{{method_amount}} {{method_currency}}</div><div><b>Paid via: </b>{{method_name}}</div><div><b>Transaction Number: </b>{{trx}}</div><div><br></div><div>Your current balance now stands at {{post_balance}} {{site_currency}}.</div><div><br></div><div>Should you have any questions or require further assistance, please feel free to contact our support team. We\'re here to help.</div>', 'We are pleased to inform you that your deposit request of {{amount}} {{site_currency}} via {{method_name}} has been approved.', '{\"trx\":\"Transaction number for the deposit\",\"amount\":\"Amount inserted by the user\",\"charge\":\"Gateway charge set by the admin\",\"rate\":\"Conversion rate between base currency and method currency\",\"method_name\":\"Name of the deposit method\",\"method_currency\":\"Currency of the deposit method\",\"method_amount\":\"Amount after conversion between base currency and method currency\",\"post_balance\":\"Balance of the user after this transaction\"}', 1, '{{site_name}} Billing', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:19:49'),
(5, 'DEPOSIT_REJECT', 'Deposit - Manual - Rejected', 'Deposit Request Rejected', '{{site_name}} - Deposit Request Rejected', '<div>We regret to inform you that your deposit request of {{amount}} {{site_currency}} via {{method_name}} has been rejected.</div><div><br></div><div>Here are the details of the rejected deposit:</div><div><br></div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Received:</b> {{method_amount}} {{method_currency}}</div><div><b>Paid via:</b> {{method_name}}</div><div><b>Charge:</b> {{charge}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><div>If you have any questions or need further clarification, please don\'t hesitate to contact us. We\'re here to assist you.</div><div><br></div><div>Rejection Reason:</div><div>{{rejection_message}}</div><div><br></div><div>Thank you for your understanding.</div>', 'We regret to inform you that your deposit request of {{amount}} {{site_currency}} via {{method_name}} has been rejected.', '{\"trx\":\"Transaction number for the deposit\",\"amount\":\"Amount inserted by the user\",\"charge\":\"Gateway charge set by the admin\",\"rate\":\"Conversion rate between base currency and method currency\",\"method_name\":\"Name of the deposit method\",\"method_currency\":\"Currency of the deposit method\",\"method_amount\":\"Amount after conversion between base currency and method currency\",\"rejection_message\":\"Rejection message by the admin\"}', 1, '{{site_name}} Billing', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:20:13'),
(6, 'DEPOSIT_REQUEST', 'Deposit - Manual - Requested', 'Deposit Request Submitted Successfully', NULL, '<div>We are pleased to confirm that your deposit request of {{amount}} {{site_currency}} via {{method_name}} has been submitted successfully.</div><div><br></div><div>Below are the details of your deposit:</div><div><br></div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge:</b> {{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Payable:</b> {{method_amount}} {{method_currency}}</div><div><b>Pay via: </b>{{method_name}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><div>Should you have any questions or require further assistance, please feel free to reach out to our support team. We\'re here to assist you.</div>', 'We are pleased to confirm that your deposit request of {{amount}} {{site_currency}} via {{method_name}} has been submitted successfully.', '{\"trx\":\"Transaction number for the deposit\",\"amount\":\"Amount inserted by the user\",\"charge\":\"Gateway charge set by the admin\",\"rate\":\"Conversion rate between base currency and method currency\",\"method_name\":\"Name of the deposit method\",\"method_currency\":\"Currency of the deposit method\",\"method_amount\":\"Amount after conversion between base currency and method currency\"}', 1, '{{site_name}} Billing', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-04-25 03:27:42'),
(7, 'PASS_RESET_CODE', 'Password - Reset - Code', 'Password Reset', '{{site_name}} Password Reset Code', '<div>We\'ve received a request to reset the password for your account on <b>{{time}}</b>. The request originated from\r\n            the following IP address: <b>{{ip}}</b>, using <b>{{browser}}</b> on <b>{{operating_system}}</b>.\r\n    </div><br>\r\n    <div><span>To proceed with the password reset, please use the following account recovery code</span>: <span><b><font size=\"6\">{{code}}</font></b></span></div><br>\r\n    <div><span>If you did not initiate this password reset request, please disregard this message. Your account security\r\n            remains our top priority, and we advise you to take appropriate action if you suspect any unauthorized\r\n            access to your account.</span></div>', 'To proceed with the password reset, please use the following account recovery code: {{code}}', '{\"code\":\"Verification code for password reset\",\"ip\":\"IP address of the user\",\"browser\":\"Browser of the user\",\"operating_system\":\"Operating system of the user\",\"time\":\"Time of the request\"}', 1, '{{site_name}} Authentication Center', NULL, 0, NULL, '2021-11-03 12:00:00', '2024-05-08 07:24:57'),
(8, 'PASS_RESET_DONE', 'Password - Reset - Confirmation', 'Password Reset Successful', NULL, '<div><div><span>We are writing to inform you that the password reset for your account was successful. This action was completed at {{time}} from the following browser</span>: <span>{{browser}}</span><span>on {{operating_system}}, with the IP address</span>: <span>{{ip}}</span>.</div><br><div><span>Your account security is our utmost priority, and we are committed to ensuring the safety of your information. If you did not initiate this password reset or notice any suspicious activity on your account, please contact our support team immediately for further assistance.</span></div></div>', 'We are writing to inform you that the password reset for your account was successful.', '{\"ip\":\"IP address of the user\",\"browser\":\"Browser of the user\",\"operating_system\":\"Operating system of the user\",\"time\":\"Time of the request\"}', 1, '{{site_name}} Authentication Center', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-04-25 03:27:24'),
(9, 'ADMIN_SUPPORT_REPLY', 'Support - Reply', 'Re: {{ticket_subject}} - Ticket #{{ticket_id}}', '{{site_name}} - Support Ticket Replied', '<div>\r\n    <div><span>Thank you for reaching out to us regarding your support ticket with the subject</span>:\r\n        <span>\"{{ticket_subject}}\"&nbsp;</span><span>and ticket ID</span>: {{ticket_id}}.</div><br>\r\n    <div><span>We have carefully reviewed your inquiry, and we are pleased to provide you with the following\r\n            response</span><span>:</span></div><br>\r\n    <div>{{reply}}</div><br>\r\n    <div><span>If you have any further questions or need additional assistance, please feel free to reply by clicking on\r\n            the following link</span>: <a href=\"{{link}}\" title=\"\" target=\"_blank\">{{link}}</a><span>. This link will take you to\r\n            the ticket thread where you can provide further information or ask for clarification.</span></div><br>\r\n    <div><span>Thank you for your patience and cooperation as we worked to address your concerns.</span></div>\r\n</div>', 'Thank you for reaching out to us regarding your support ticket with the subject: \"{{ticket_subject}}\" and ticket ID: {{ticket_id}}. We have carefully reviewed your inquiry. To check the response, please go to the following link: {{link}}', '{\"ticket_id\":\"ID of the support ticket\",\"ticket_subject\":\"Subject  of the support ticket\",\"reply\":\"Reply made by the admin\",\"link\":\"URL to view the support ticket\"}', 1, '{{site_name}} Support Team', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:26:06'),
(10, 'EVER_CODE', 'Verification - Email', 'Email Verification Code', NULL, '<div>\r\n    <div><span>Thank you for taking the time to verify your email address with us. Your email verification code\r\n            is</span>: <b><font size=\"6\">{{code}}</font></b></div><br>\r\n    <div><span>Please enter this code in the designated field on our platform to complete the verification\r\n            process.</span></div><br>\r\n    <div><span>If you did not request this verification code, please disregard this email. Your account security is our\r\n            top priority, and we advise you to take appropriate measures if you suspect any unauthorized access.</span>\r\n    </div><br>\r\n    <div><span>If you have any questions or encounter any issues during the verification process, please don\'t hesitate\r\n            to contact our support team for assistance.</span></div><br>\r\n    <div><span>Thank you for choosing us.</span></div>\r\n</div>', '---', '{\"code\":\"Email verification code\"}', 1, '{{site_name}} Verification Center', NULL, 0, NULL, '2021-11-03 12:00:00', '2024-04-25 03:27:12'),
(11, 'SVER_CODE', 'Verification - SMS', 'Verify Your Mobile Number', NULL, '---', 'Your mobile verification code is {{code}}. Please enter this code in the appropriate field to verify your mobile number. If you did not request this code, please ignore this message.', '{\"code\":\"SMS Verification Code\"}', 0, '{{site_name}} Verification Center', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-04-25 03:27:03'),
(12, 'WITHDRAW_APPROVE', 'Withdraw - Approved', 'Withdrawal Confirmation: Your Request Processed Successfully', '{{site_name}} - Withdrawal Request Approved', '<div>We are writing to inform you that your withdrawal request of {{amount}} {{site_currency}} via {{method_name}} has been processed successfully.</div><div><br></div><div>Below are the details of your withdrawal:</div><div><br></div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge:</b> {{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>You will receive:</b> {{method_amount}} {{method_currency}}</div><div><b>Via:</b> {{method_name}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><hr><div><br></div><div><b>Details of Processed Payment:</b></div><div>{{admin_details}}</div><div><br></div><div>Should you have any questions or require further assistance, feel free to reach out to our support team. We\'re here to help.</div>', 'We are writing to inform you that your withdrawal request of {{amount}} {{site_currency}} via {{method_name}} has been processed successfully.', '{\"trx\":\"Transaction number for the withdraw\",\"amount\":\"Amount requested by the user\",\"charge\":\"Gateway charge set by the admin\",\"rate\":\"Conversion rate between base currency and method currency\",\"method_name\":\"Name of the withdraw method\",\"method_currency\":\"Currency of the withdraw method\",\"method_amount\":\"Amount after conversion between base currency and method currency\",\"admin_details\":\"Details provided by the admin\"}', 1, '{{site_name}} Finance', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:26:37'),
(13, 'WITHDRAW_REJECT', 'Withdraw - Rejected', 'Withdrawal Request Rejected', '{{site_name}} - Withdrawal Request Rejected', '<div>We regret to inform you that your withdrawal request of {{amount}} {{site_currency}} via {{method_name}} has been rejected.</div><div><br></div><div>Here are the details of your withdrawal:</div><div><br></div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge:</b> {{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Expected Amount:</b> {{method_amount}} {{method_currency}}</div><div><b>Via:</b> {{method_name}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><hr><div><br></div><div><b>Refund Details:</b></div><div>{{amount}} {{site_currency}} has been refunded to your account, and your current balance is {{post_balance}} {{site_currency}}.</div><div><br></div><hr><div><br></div><div><b>Reason for Rejection:</b></div><div>{{admin_details}}</div><div><br></div><div>If you have any questions or concerns regarding this rejection or need further assistance, please do not hesitate to contact our support team. We apologize for any inconvenience this may have caused.</div>', 'We regret to inform you that your withdrawal request of {{amount}} {{site_currency}} via {{method_name}} has been rejected.', '{\"trx\":\"Transaction number for the withdraw\",\"amount\":\"Amount requested by the user\",\"charge\":\"Gateway charge set by the admin\",\"rate\":\"Conversion rate between base currency and method currency\",\"method_name\":\"Name of the withdraw method\",\"method_currency\":\"Currency of the withdraw method\",\"method_amount\":\"Amount after conversion between base currency and method currency\",\"post_balance\":\"Balance of the user after fter this action\",\"admin_details\":\"Rejection message by the admin\"}', 1, '{{site_name}} Finance', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:26:55'),
(14, 'WITHDRAW_REQUEST', 'Withdraw - Requested', 'Withdrawal Request Confirmation', '{{site_name}} - Requested for withdrawal', '<div>We are pleased to inform you that your withdrawal request of {{amount}} {{site_currency}} via {{method_name}} has been submitted successfully.</div><div><br></div><div>Here are the details of your withdrawal:</div><div><br></div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge:</b> {{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Expected Amount:</b> {{method_amount}} {{method_currency}}</div><div><b>Via:</b> {{method_name}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><div>Your current balance is {{post_balance}} {{site_currency}}.</div><div><br></div><div>Should you have any questions or require further assistance, feel free to reach out to our support team. We\'re here to help.</div>', 'We are pleased to inform you that your withdrawal request of {{amount}} {{site_currency}} via {{method_name}} has been submitted successfully.', '{\"trx\":\"Transaction number for the withdraw\",\"amount\":\"Amount requested by the user\",\"charge\":\"Gateway charge set by the admin\",\"rate\":\"Conversion rate between base currency and method currency\",\"method_name\":\"Name of the withdraw method\",\"method_currency\":\"Currency of the withdraw method\",\"method_amount\":\"Amount after conversion between base currency and method currency\",\"post_balance\":\"Balance of the user after fter this transaction\"}', 1, '{{site_name}} Finance', NULL, 1, NULL, '2021-11-03 12:00:00', '2024-05-08 07:27:20'),
(15, 'DEFAULT', 'Default Template', '{{subject}}', '{{subject}}', '{{message}}', '{{message}}', '{\"subject\":\"Subject\",\"message\":\"Message\"}', 1, NULL, NULL, 1, NULL, '2019-09-14 13:14:22', '2024-05-16 01:32:53'),
(16, 'KYC_APPROVE', 'KYC Approved', 'KYC Details has been approved', '{{site_name}} - KYC Approved', '<div><div><span>We are pleased to inform you that your Know Your Customer (KYC) information has been successfully reviewed and approved. This means that you are now eligible to conduct any payout operations within our system.</span></div><br><div><span>Your commitment to completing the KYC process promptly is greatly appreciated, as it helps us ensure the security and integrity of our platform for all users.</span></div><br><div><span>With your KYC verification now complete, you can proceed with confidence to carry out any payout transactions you require. Should you encounter any issues or have any questions along the way, please don\'t hesitate to reach out to our support team. We\'re here to assist you every step of the way.</span></div><br><div><span>Thank you once again for choosing {{site_name}} and for your cooperation in this matter.</span></div></div>', 'We are pleased to inform you that your Know Your Customer (KYC) information has been successfully reviewed and approved. This means that you are now eligible to conduct any payout operations within our system.', '[]', 1, '{{site_name}} Verification Center', NULL, 1, NULL, NULL, '2024-05-08 07:23:57'),
(17, 'KYC_REJECT', 'KYC Rejected', 'KYC has been rejected', '{{site_name}} - KYC Rejected', '<div><div><span>We regret to inform you that the Know Your Customer (KYC) information provided has been reviewed and unfortunately, it has not met our verification standards. As a result, we are unable to approve your KYC submission at this time.</span></div><br><div><span>We understand that this news may be disappointing, and we want to assure you that we take these matters seriously to maintain the security and integrity of our platform.</span></div><br><div><span>Reasons for rejection may include discrepancies or incomplete information in the documentation provided. If you believe there has been a misunderstanding or if you would like further clarification on why your KYC was rejected, please don\'t hesitate to contact our support team.</span></div><br><div><span>We encourage you to review your submitted information and ensure that all details are accurate and up-to-date. Once any necessary adjustments have been made, you are welcome to resubmit your KYC information for review.</span></div><br><div><span>We apologize for any inconvenience this may cause and appreciate your understanding and cooperation in this matter.</span></div><br><div>Rejection Reason:</div><div>{{reason}}</div><div><br></div><div><span>Thank you for your continued support and patience.</span></div></div>', 'We regret to inform you that the Know Your Customer (KYC) information provided has been reviewed and unfortunately, it has not met our verification standards. As a result, we are unable to approve your KYC submission at this time. We encourage you to review your submitted information and ensure that all details are accurate and up-to-date. Once any necessary adjustments have been made, you are welcome to resubmit your KYC information for review.', '{\"reason\":\"Rejection Reason\"}', 1, '{{site_name}} Verification Center', NULL, 1, NULL, NULL, '2024-05-08 07:24:13'),
(19, 'INSTRUCTOR_PAYMENT_RECEIVED', 'Payment - Recevied -  Successful', 'Payment Received Successfully', '{{site_name}} - Payment successful', '<div>We\'re delighted to inform you that <b>{{name}}</b>&nbsp;is purchasing<b>&nbsp;</b>your <b>{{title}} </b>course.</div><div><br></div><div>Below, you\'ll find the details:</div><div><b>Student Name:</b>&nbsp;{{name}}</div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge: </b>{{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><div>Your current balance stands at {{post_balance}} {{site_currency}}.</div><div><br></div><div>If you have any questions or need further assistance, feel free to reach out to our support team. We\'re here to assist you in any way we can.</div>', 'We\'re delighted to inform you that {{name}} is purchasing your {{title}} course.', '{\"trx\":\"Transaction number for the payment\",\"amount\":\"Amount inserted by the user\",\"charge\":\"Gateway charge set by the admin\",\"post_balance\":\"Balance of the user after this transaction\",\"title\":\"course title\",\"name\":\"Payment send user name\"}', 1, '{{site_name}} Billing', NULL, 1, NULL, '2021-11-03 12:00:00', '2025-03-04 01:57:10'),
(20, 'PAYMENT_SEND', 'Payment - Send-  Successful', 'Payment Send Successfully', '{{site_name}} - Payment successful', '<div>We\'re delighted to inform you that purchasing<b>&nbsp;</b><b>{{title}} </b>course.</div><div><br></div><div>Below, you\'ll find the details:</div><div><br></div><div><b>Amount:</b> {{amount}} {{site_currency}}</div><div><b>Charge: </b>{{charge}} {{site_currency}}</div><div><b>Conversion Rate:</b> 1 {{site_currency}} = {{rate}} {{method_currency}}</div><div><b>Transaction Number:</b> {{trx}}</div><div><br></div><div>Your current balance stands at {{post_balance}} {{site_currency}}.</div><div><br></div><div>If you have any questions or need further assistance, feel free to reach out to our support team. We\'re here to assist you in any way we can.</div>', 'We\'re delighted to inform you that your deposit of {{amount}} {{site_currency}} via {{method_name}} has been completed.', '{\"trx\":\"Transaction number for the payment\",\"amount\":\"Amount inserted by the user\",\"charge\":\"Gateway charge set by the admin\",\"post_balance\":\"Balance of the user after this transaction\",\"title\":\"course title\"}', 1, '{{site_name}} Billing', NULL, 1, NULL, '2021-11-03 12:00:00', '2025-03-04 01:59:13'),
(22, 'COURSE_COMPLETE', 'Course - Complete ', 'You have successfully complete a course', NULL, '{{congrats_message}}', 'We are writing to inform you that the password reset for your account was successful.', '{\"congrats_message\":\"Congrats message\"}', 1, '{{site_name}} Authentication Center', NULL, 1, NULL, '2021-11-03 12:00:00', '2025-03-13 03:43:54');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tempname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'template name',
  `secs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `seo_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `name`, `slug`, `tempname`, `secs`, `seo_content`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 'HOME', '/', 'templates.basic.', '[\"popular_courses\",\"top_courses\",\"short_courses\",\"categories\",\"earning\",\"instructor\",\"testimonial\",\"counter\",\"cta\",\"blog\"]', '{\"image\":null,\"description\":null,\"social_title\":\"Viserlab Limited 33\",\"social_description\":null,\"keywords\":null}', 1, '2020-07-11 06:23:58', '2025-03-18 15:32:52'),
(4, 'Blogs', 'blogs', 'templates.basic.', NULL, '{\"image\":null,\"description\":null,\"social_title\":\"Viserlab Limited 33\",\"social_description\":null,\"keywords\":null}', 1, '2020-10-22 01:14:43', '2020-10-22 01:14:43'),
(5, 'Contact', 'contact', 'templates.basic.', '[\"counter\"]', '{\"image\":null,\"description\":null,\"social_title\":\"Viserlab Limited 33\",\"social_description\":null,\"keywords\":null}', 1, '2020-10-22 01:14:53', '2025-01-16 04:00:03'),
(29, 'Courses', 'courses', 'templates.basic.', '[\"learners\",\"career\",\"counter\"]', '{\"image\":null,\"description\":\"Meta Description seo\",\"social_title\":\"Social Title seo\",\"social_description\":null,\"keywords\":null}', 1, '2025-02-18 00:36:14', '2025-03-09 02:34:18'),
(30, 'About', 'about', 'templates.basic.', '[\"about_banner\",\"about_content\",\"achivment\",\"location\"]', '{\"image\":null,\"description\":\"Meta Description seo\",\"social_title\":\"Social Title seo\",\"social_description\":null,\"keywords\":null}', 1, '2025-02-19 06:00:25', '2025-03-09 02:21:21'),
(31, 'Become a Teacher', 'become-a-teacher', 'templates.basic.', '[\"teach_banner\",\"teach_benifit\",\"instructor_section\",\"counter\",\"teach_step\",\"teach_community\"]', NULL, 0, '2025-02-20 00:01:01', '2025-03-19 12:22:16');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` int NOT NULL DEFAULT '0',
  `course_section_id` int NOT NULL DEFAULT '0',
  `curriculum_id` int NOT NULL DEFAULT '0',
  `serial_number` int NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `passing_percentage` decimal(5,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_options`
--

CREATE TABLE `quiz_options` (
  `id` bigint UNSIGNED NOT NULL,
  `quiz_id` int NOT NULL DEFAULT '0',
  `quiz_question_id` int NOT NULL DEFAULT '0',
  `option` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `answer` tinyint NOT NULL DEFAULT '0',
  `explanation` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` bigint UNSIGNED NOT NULL,
  `quiz_id` int NOT NULL DEFAULT '0',
  `question` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_submits`
--

CREATE TABLE `quiz_submits` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `course_section_id` int NOT NULL DEFAULT '0',
  `quiz_id` int NOT NULL DEFAULT '0',
  `quiz_question_id` int NOT NULL DEFAULT '0',
  `quiz_option_id` int NOT NULL DEFAULT '0',
  `answer` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `rating` tinyint(1) NOT NULL DEFAULT '0',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `instructor_answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `instructor_reply_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `search_keywords`
--

CREATE TABLE `search_keywords` (
  `id` bigint UNSIGNED NOT NULL,
  `keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` int NOT NULL DEFAULT '0',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_attachments`
--

CREATE TABLE `support_attachments` (
  `id` bigint UNSIGNED NOT NULL,
  `support_message_id` int UNSIGNED NOT NULL DEFAULT '0',
  `attachment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_messages`
--

CREATE TABLE `support_messages` (
  `id` bigint UNSIGNED NOT NULL,
  `support_ticket_id` int UNSIGNED NOT NULL DEFAULT '0',
  `admin_id` int UNSIGNED NOT NULL DEFAULT '0',
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_tickets`
--

CREATE TABLE `support_tickets` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ticket` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: Open, 1: Answered, 2: Replied, 3: Closed',
  `priority` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = Low, 2 = medium, 3 = heigh',
  `last_reply` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `charge` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `post_balance` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `trx_type` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trx` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `update_logs`
--

CREATE TABLE `update_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `version` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `update_log` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `firstname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dial_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref_by` int UNSIGNED NOT NULL DEFAULT '0',
  `balance` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0: banned, 1: active',
  `kyc_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `kyc_rejection_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kv` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: KYC Unverified, 2: KYC pending, 1: KYC verified',
  `ev` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: email unverified, 1: email verified',
  `sv` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: mobile unverified, 1: mobile verified',
  `profile_complete` tinyint(1) NOT NULL DEFAULT '0',
  `ver_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'stores verification code',
  `ver_code_send_at` datetime DEFAULT NULL COMMENT 'verification send time',
  `ts` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: 2fa off, 1: 2fa on',
  `tv` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0: 2fa unverified, 1: 2fa verified',
  `tsc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ban_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biography` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_activities`
--

CREATE TABLE `user_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `active_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_goals`
--

CREATE TABLE `user_goals` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `goal_id` int NOT NULL DEFAULT '0',
  `days` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_logins`
--

CREATE TABLE `user_logins` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `user_ip` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_code` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browser` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL DEFAULT '0',
  `course_id` int NOT NULL DEFAULT '0',
  `curriculum_id` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `withdrawals`
--

CREATE TABLE `withdrawals` (
  `id` bigint UNSIGNED NOT NULL,
  `method_id` int UNSIGNED NOT NULL DEFAULT '0',
  `user_id` int UNSIGNED NOT NULL DEFAULT '0',
  `instructor_id` int NOT NULL DEFAULT '0',
  `amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `currency` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rate` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `charge` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `trx` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `final_amount` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `after_charge` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `withdraw_information` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1=>success, 2=>pending, 3=>cancel,  ',
  `admin_feedback` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_methods`
--

CREATE TABLE `withdraw_methods` (
  `id` bigint UNSIGNED NOT NULL,
  `form_id` int UNSIGNED NOT NULL DEFAULT '0',
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `min_limit` decimal(28,8) DEFAULT '0.00000000',
  `max_limit` decimal(28,8) NOT NULL DEFAULT '0.00000000',
  `fixed_charge` decimal(28,8) DEFAULT '0.00000000',
  `rate` decimal(28,8) DEFAULT '0.00000000',
  `percent_charge` decimal(5,2) DEFAULT NULL,
  `currency` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`,`username`);

--
-- Indexes for table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_password_resets`
--
ALTER TABLE `admin_password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `applied_coupons`
--
ALTER TABLE `applied_coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupon_code` (`coupon_code`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_completes`
--
ALTER TABLE `course_completes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_contents`
--
ALTER TABLE `course_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_lectures`
--
ALTER TABLE `course_lectures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_purchaseds`
--
ALTER TABLE `course_purchaseds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_requirements`
--
ALTER TABLE `course_requirements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_resources`
--
ALTER TABLE `course_resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_sections`
--
ALTER TABLE `course_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cron_jobs`
--
ALTER TABLE `cron_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cron_job_logs`
--
ALTER TABLE `cron_job_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cron_schedules`
--
ALTER TABLE `cron_schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `curricula`
--
ALTER TABLE `curricula`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extensions`
--
ALTER TABLE `extensions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frontends`
--
ALTER TABLE `frontends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gateways`
--
ALTER TABLE `gateways`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `gateway_currencies`
--
ALTER TABLE `gateway_currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `get_certificate_users`
--
ALTER TABLE `get_certificate_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `learning_objects`
--
ALTER TABLE `learning_objects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_logs`
--
ALTER TABLE `notification_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_templates`
--
ALTER TABLE `notification_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_options`
--
ALTER TABLE `quiz_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_submits`
--
ALTER TABLE `quiz_submits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `search_keywords`
--
ALTER TABLE `search_keywords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `support_attachments`
--
ALTER TABLE `support_attachments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `support_messages`
--
ALTER TABLE `support_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `update_logs`
--
ALTER TABLE `update_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- Indexes for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_goals`
--
ALTER TABLE `user_goals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_logins`
--
ALTER TABLE `user_logins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdrawals`
--
ALTER TABLE `withdrawals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdraw_methods`
--
ALTER TABLE `withdraw_methods`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admin_notifications`
--
ALTER TABLE `admin_notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_password_resets`
--
ALTER TABLE `admin_password_resets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applied_coupons`
--
ALTER TABLE `applied_coupons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_completes`
--
ALTER TABLE `course_completes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_contents`
--
ALTER TABLE `course_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_lectures`
--
ALTER TABLE `course_lectures`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_purchaseds`
--
ALTER TABLE `course_purchaseds`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_requirements`
--
ALTER TABLE `course_requirements`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_resources`
--
ALTER TABLE `course_resources`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_sections`
--
ALTER TABLE `course_sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cron_jobs`
--
ALTER TABLE `cron_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cron_job_logs`
--
ALTER TABLE `cron_job_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cron_schedules`
--
ALTER TABLE `cron_schedules`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `curricula`
--
ALTER TABLE `curricula`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deposits`
--
ALTER TABLE `deposits`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extensions`
--
ALTER TABLE `extensions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `frontends`
--
ALTER TABLE `frontends`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT for table `gateways`
--
ALTER TABLE `gateways`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `gateway_currencies`
--
ALTER TABLE `gateway_currencies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `get_certificate_users`
--
ALTER TABLE `get_certificate_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `learning_objects`
--
ALTER TABLE `learning_objects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_logs`
--
ALTER TABLE `notification_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_templates`
--
ALTER TABLE `notification_templates`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_options`
--
ALTER TABLE `quiz_options`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_submits`
--
ALTER TABLE `quiz_submits`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `search_keywords`
--
ALTER TABLE `search_keywords`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `support_attachments`
--
ALTER TABLE `support_attachments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `support_messages`
--
ALTER TABLE `support_messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `support_tickets`
--
ALTER TABLE `support_tickets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `update_logs`
--
ALTER TABLE `update_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_activities`
--
ALTER TABLE `user_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_goals`
--
ALTER TABLE `user_goals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_logins`
--
ALTER TABLE `user_logins`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `withdrawals`
--
ALTER TABLE `withdrawals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `withdraw_methods`
--
ALTER TABLE `withdraw_methods`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
