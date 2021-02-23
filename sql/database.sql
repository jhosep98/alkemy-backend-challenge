CREATE DATABASE blog_app;

CREATE TABLE posts(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(200) NOT NULL,
    body text NOT NULL,
    image_url text NOT NULL,
    category varchar(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE posts;
