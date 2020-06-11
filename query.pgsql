-- CREATE TABLE users(
--   user_id serial PRIMARY key,
--   user_name varchar(110) NOT NULL,
--   user_email varchar(225) UNIQUE NOT NULL,
--   user_pwd varchar(50) NOT NULL,
--   created_on timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- )

SELECT * from docs
-- INSERT INTO users(user_name,user_email,user_pwd) VALUES('SAYAN MAITY','example@gmail.com','123');
-- INSERT INTO users(user_name,user_email,user_pwd) VALUES('John Doe','johndoe@gmail.com','0011');
-- DELETE from users;

-- ALTER TABLE users 
-- ALTER COLUMN user_pwd TYPE TEXT;

CREATE TABLE docs(
  doc_id serial PRIMARY KEY,
  user_id SMALLINT NOT NULL,
  isEdited BOOLEAN NOT NULL DEFAULT FALSE,
  created_on timestamp WITH time ZONE DEFAULT CURRENT_TIMESTAMP,
  edited_on timestamp WITH time ZONE DEFAULT CURRENT_TIMESTAMP,
  doc_title varchar(100) not NULL,
  doc_desc text not null,
  doc_formatedDetails text
)
ALTER TABLE docs
ADD COLUMN docs_tag varchar(20) DEFAULT 'regular' not null

INSERT INTO docs(user_id, doc_title, doc_desc) 
VALUES(11,'Do code','Working on pinup project and do add more code')

SELECT * FROM docs;