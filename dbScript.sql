DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
	bplus_code VARCHAR(255) NOT NULL,
	mobile_number VARCHAR(10) NOT NULL
	
);

INSERT INTO users (user_id, username, bplus_code, mobile_number)
VALUES
    ('1', 'user1', 'ABC123', '1234567890'),
    ('2', 'user2', 'DEF456', '9876543210'),
    ('3', 'user3', 'GHI789', '5555555555');

select * from users;