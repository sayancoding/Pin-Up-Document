-- CREATE TABLE users(
--   user_id serial PRIMARY key,
--   user_name varchar(110) NOT NULL,
--   user_email varchar(225) UNIQUE NOT NULL,
--   user_pwd varchar(50) NOT NULL,
--   created_on timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- )

-- SELECT * from users
-- INSERT INTO users(user_name,user_email,user_pwd) VALUES('SAYAN MAITY','example@gmail.com','123');
-- INSERT INTO users(user_name,user_email,user_pwd) VALUES('John Doe','johndoe@gmail.com','0011');
-- DELETE from users;

-- ALTER TABLE users 
-- ALTER COLUMN user_pwd TYPE TEXT;