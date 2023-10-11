-- Drop the tables if they exist
DROP TABLE IF EXISTS redeemed_rewards;
DROP TABLE IF EXISTS users;

-- Create the 'users' table first
CREATE TABLE users (
    id serial PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,  -- Make user_id unique
    retailer_name VARCHAR(255) NOT NULL,
    bplus_code VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(10) NOT NULL
);

-- Create the 'redeemed_rewards' table with a foreign key reference to 'users'
CREATE TABLE redeemed_rewards (
    id SERIAL PRIMARY KEY,
    fk_user_id VARCHAR(255) NOT NULL,
    reward_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (fk_user_id) REFERENCES users (user_id)
);

-- Insert data into the 'users' table
INSERT INTO users (user_id, retailer_name, bplus_code, mobile_number)
VALUES
    ('1', 'user1', 'ABC123', '1234567890'),
    ('2', 'user2', 'DEF456', '9876543210'),
    ('3', 'user3', 'GHI789', '5555555555');

-- Insert data into the 'redeemed_rewards' table
INSERT INTO redeemed_rewards (fk_user_id, reward_name, quantity, timestamp)
VALUES ('1', 'Sample Reward', 1, '2023-10-11 14:30:00');

-- Select data from the 'users' table
SELECT * FROM users;

-- Select data from the 'redeemed_rewards' table
SELECT u.*, r.reward_name, r.quantity, r.timestamp
FROM users u
JOIN redeemed_rewards r ON u.user_id = r.fk_user_id;
