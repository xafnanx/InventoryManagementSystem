-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2023 at 10:51 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_info`
--

CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `itemid` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `order_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `id` int(11) NOT NULL,
  `iname` varchar(100) NOT NULL,
  `quantity` int(45) NOT NULL,
  `added` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `supplier_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`id`, `iname`, `quantity`, `added`, `updated`, `description`, `image`, `supplier_id`) VALUES
(66, 'ASUS VivoBook 15 (2021), 15.6-inch (39.62 cm) HD, Dual Core Intel Celeron N4020, Thin and Light Lapt', 23, '2023-01-15 14:51:14', '2023-01-15 14:57:34', 'Processor: Intel Celeron N4020, 1.1 GHz base speed, Up to 2.8 GHz Turbo Speed, 2 cores, 2 Threads, 4MB Cache\r\n                Memory & Storage: 4GB SO-DIMM DDR4 2400MHz RAM, Support up to 8GB using 1x SO-DIMM Slot with | Storage: 256GB M.2 NVMe PCIe SSD\r\n                Graphics: Integrated Intel HD Graphics\r\n                Display: 15.6-inch (39.62 cms), LED-Backlit LCD, HD (1366 x 768) 16:9, 220nits, NanoEdge bezel, Anti-Glare Plane with 45% NTSC, 82% Screen-To-Body Ratio\r\n                Operating System: Pre-loaded Windows 11 Home with lifetime validity\r\n                Design & battery: Up to 19.9mm Thin | NanoEdge Bezels | Thin and Light Laptop | Laptop weight: 1.8 kg | 37WHrs, 2-cell Li-ion battery | Up to 6 hours battery life ;Note: Battery life depends on conditions of usage\r\n                Keyboard: Chiclet Keyboard with 1.4mm Key Travel\r\n                I/O Ports: 1x HDMI 1.4 | 1x 3.5mm Combo Audio Jack | 1x USB 3.2 Gen 1 Type-A | 1x USB 3.2 Gen 1 Type-C | 2x USB 2.0 Type-A\r\n                Other: Wi-Fi 5 (802.11ac) (Dual band) 1*1 | VGA webcamera without privacy shutter | Built-in speaker | Built-in microphone', 'https://m.media-amazon.com/images/I/71S8U9VzLTL._SX679_.jpg', 6),
(67, '2021 Apple MacBook Pro (14-inch/35.97 cm, Apple M1 Pro chip with 8‑core CPU and 14‑core GPU, 16GB RA', 45, '2023-01-15 14:56:24', '2023-01-15 14:57:07', 'Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU and machine learning performance\r\n        Up to 10-core CPU delivers up to 3.7x faster performance to fly through pro workflows quicker than ever\r\n        Up to 32-core GPU with up to 13x faster performance for graphics-intensive apps and games\r\n        16-core Neural Engine for up to 11x faster machine learning performance\r\n        Longer battery life, up to 17 hours\r\n        Up to 64GB of unified memory so everything you do is fast and fluid\r\n        Up to 8TB of super-fast SSD storage launches apps and opens files in an instant\r\n        Stunning 35.97 cm (14-inch) Liquid Retina XDR display with extreme dynamic range and contrast ratio\r\n        FaceTime HD camera with advanced image signal processor for, sharper video calls\r\n        Six-speaker sound system with force-cancelling woofers.', 'https://m.media-amazon.com/images/I/61cCf94xIEL._SL1500_.jpg', 7),
(68, 'Samsung Galaxy M13 (Midnight Blue, 4GB, 64GB Storage) | 6000mAh Battery | Upto 8GB RAM with RAM Plus', 24, '2023-01-15 14:59:02', '2023-01-15 14:59:02', '6000mAh lithium-ion battery, 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase\r\nUpto 12GB RAM with RAM Plus | 64GB internal memory expandable up to 1TB| Dual Sim (Nano)\r\n50MP+5MP+2MP Triple camera setup- True 50MP (F1.8) main camera +5MP(F2.2)+ 2MP (F2.4) | 8MP (F2.2) front cam\r\nAndroid 12,One UI Core 4 with a powerful Octa Core Processor\r\n16.72 centimeters (6.6-inch) FHD+ LCD - infinity O Display, FHD+ resolution with 1080 x 2408 pixels resolution, 401 PPI with 16M color', 'https://m.media-amazon.com/images/I/812YsUxpyfL._SX679_.jpg', 8),
(69, 'OnePlus Nord CE 2 Lite 5G (Blue Tide, 6GB RAM, 128GB Storage)', 20, '2023-01-15 15:00:09', '2023-01-15 15:00:27', 'Camera: 64MP Main Camera with EIS; 2MP Depth Lens and 2MP Macro Lens; Front (Selfie) Camera: 16MP Sony IMX471\r\n        Camera Features: AI scene enhancement, Dual-View Video, HDR, Night Portrait, Panorama Mode, Retouch Filters, 1080p video at 30 fps, SLO-MO: 720p video at 120 fps, TIME-LAPSE: 1080p video at 30 fps, Video editor, Face unlock, Screen flash, HDR, NIGHT, PORTRAIT, TIME-LAPSE, Retouch, Filters\r\n        Display: 6.59 Inches; 120 Hz Refresh Rate; Support sRGB, Display P3; Resolution: 2412 x 1080 pixels 402ppi; Aspect Ratio: 20:9\r\n        Display Features: Dark mode\r\n        Operating System: Oxygen OS based on Android 12\r\n        Processor: Qualcomm Snapdragon 695 5G\r\n        Battery & Charging: 5000 mAh with 33W SuperVOOC\r\n        Alexa Hands-Free capable: Download the Alexa app to use Alexa hands-free. Play music, make calls, hear news, open apps, navigate, and more, all using just your voice, while on-the-go.\r\n        Cellular technology:5g, 4g lte, Operating system:oxygenos, Display type:lcd, Form factor:smartphone', 'https://m.media-amazon.com/images/I/413u56t+CiL._SY300_SX300_.jpg', 8),
(70, 'JBL Tune 230NC TWS, Active Noise Cancellation Earbuds with Mic, Massive 40 Hrs Playtime with Speed C', 12, '2023-01-15 15:01:37', '2023-01-15 15:01:37', 'ACTIVE NOISE CANCELLATION: Hear more of what you want, less of what you don’t with the JBL Tune 230NC. The Active Noise Cancelling technology with 4 mics on the earbud lets you minimize audio distractions.\r\nUPTO 40 HOURS OF PLAYTIME: Keep the music going and never miss a beat with 40 (30+10) hours of playtime with Bluetooth (ANC OFF). Enjoying your music with ANC ON provides you playtime of 8 Hours on the earbuds and 24 Hours from the case.\r\nPERSONALIZE WITH JBL HEADPHONES APP: Customize your Tune 230NC listening experience with JBL Headphones App. Do more, be it Customizing your NC Setttings, Gesture Controls, EQ Settings, Finding your earbuds or configuring your Voice Assistant.\r\n4 MICS FOR CRYSTAL CLEAR AUDIO: Enjoy hassle-free, hands-free calls in stereo. The Tune 230NC TWS are equipped with 4 microphones, so you’ll always be heard with perfect clarity. Never hesitate to take or make a call again.\r\nSMART AMBIENT & TALK THRU: With Ambient Aware, you can tune into your surroundings at any time so that you feel safer when you’re out in the world, while TalkThru lets you stop for a quick chat without having to remove your Tune 230 NC earbuds.\r\nSPEED CHARGE: When dry on power, a quick 10 minutes of charging provides you with upto 2 Hours of playtime, while you can completely charge from Zero to 100 within 2 Hours.\r\nJBL PURE BASS SOUND: Smartly designed 6 mm drivers enhanced by the Dot form factor deliver JBL’s Pure Bass Sound so you’ll feel every pulsing beat.\r\nIPX4 WATER RESISTANT & SWEATPROOF: Don’t be deterred by bad weather. Thanks to IPX4 water resistance and sweatproofing, there isn’t a workout or downpour the Tune 230NC TWS can’t handle.\r\n1 x JBL Tune 230NC TWS headphones, 1 x Charging case, 1 x USB Type-C charging cable, 1 x 3 sizes of eartips, 1 x Warranty/Warning (W/!), 1 x Quick Start Guide/Safety Sheet (S/i)', 'https://m.media-amazon.com/images/I/51creylSFEL._SL1500_.jpg', 9);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_id`, `supplier_name`) VALUES
(6, 'Supply Depot'),
(7, 'Crown Distributing'),
(8, 'Worldwide Beverages'),
(9, 'RiseUp Distributors'),
(10, 'Large And Low');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `type`) VALUES
(3, 'hello', 'hello@there.com', '1234', 'admin'),
(4, 'bye', 'bye@bye.com', '1234', 'normal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `itemid` (`itemid`);

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `storage`
--
ALTER TABLE `storage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `itemid` FOREIGN KEY (`itemid`) REFERENCES `storage` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `storage`
--
ALTER TABLE `storage`
  ADD CONSTRAINT `supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
