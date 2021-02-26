CREATE DATABASE blog_app;

USE blog_app;

CREATE TABLE posts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title varchar(200) NOT NULL,
    body text NOT NULL,
    image_url text NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category_id INT NOT NULL, 
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

SELECT * FROM posts;

SELECT * FROM categories;

DESCRIBE posts;