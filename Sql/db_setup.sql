CREATE DATABASE fw7_url_shortener;

CREATE TABLE `shortened_url` (
  `id` int(11) NOT NULL,
  `full_url` varchar(2048) NOT NULL,
  `short_url` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `shortened_url`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `shortened_url`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;