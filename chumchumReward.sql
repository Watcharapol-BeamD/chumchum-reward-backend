-- PostgreSQL Script
-- Wed Oct 18 11:13:45 2023
-- Model: New Model    Version: 1.0
-- PostgreSQL Script
-- Drop the Redeem_History table
DROP TABLE IF EXISTS Redeem_History;

-- Drop the Rewards table
DROP TABLE IF EXISTS Rewards;

-- Drop the Users table
DROP TABLE IF EXISTS Users;

-- Turn off unique checks and foreign key checks
SET CONSTRAINTS ALL DEFERRED;

-- -----------------------------------------------------
-- Table Users
-- -----------------------------------------------------
 
CREATE TABLE IF NOT EXISTS Users (
  user_id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(45) NOT NULL,
  retailer_name VARCHAR(100) NOT NULL,
  bplus_code VARCHAR(255) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  UNIQUE (user_id)
);

-- -----------------------------------------------------
-- Table Rewards
-- -----------------------------------------------------
 
CREATE TABLE IF NOT EXISTS Rewards (
  reward_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  quantity INT
);

-- -----------------------------------------------------
-- Table Redeem_History
-- -----------------------------------------------------
 
CREATE TABLE IF NOT EXISTS Redeem_History (
  redeem_history_id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP NOT NULL,
  redeem_History VARCHAR(45) NOT NULL,
  quantity INT NOT NULL,
  fk_user_id VARCHAR(255) NOT NULL,
  fk_reward_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (fk_user_id) REFERENCES Users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (fk_reward_id) REFERENCES Rewards(reward_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Turn on unique checks and foreign key checks
SET CONSTRAINTS ALL IMMEDIATE;

--------Insert sample----------------
-- Insert a new user into the Users table
INSERT INTO Users (user_id,username, retailer_name, bplus_code, phone_number)
VALUES ('U0000001','JohnDoe', 'ABC Retailers', 'B12345', '0315495215')
		,('U0000002','steve', 'JJJ Retailers', 'B22338', '0215985469');

-- Insert a new reward into the Rewards table
INSERT INTO Rewards (reward_id,name, description, quantity)
VALUES ('RW0000001','Sample Reward1', 'This is a sample reward', 100),
('RW0000002','Sample Reward2', 'This is a sample reward', 200);

-- Insert a record into the Redeem_History table
INSERT INTO Redeem_History (timestamp, Redeem_History, quantity, fk_user_id, fk_reward_id)
VALUES (CURRENT_TIMESTAMP, 'Redeemed a reward', '1', 'U0000001', 'RW0000001')
,(CURRENT_TIMESTAMP, 'Redeemed a reward', 1, 'U0000001', 'RW0000002'),
(CURRENT_TIMESTAMP, 'Redeemed a reward',1, 'U0000002', 'RW0000002');

------- Select sample----------------
SELECT * FROM Users;
SELECT * FROM Rewards;
SELECT * FROM redeem_history;
SELECT * FROM redeem_history,users WHERE redeem_history.fk_user_id = 'U0000001' ;
SELECT reward_id,quantity FROM Rewards WHERE reward_id = 'RW0000001';

------- Select By user_id ----------
SELECT RH.*, U.*
FROM Redeem_History RH
INNER JOIN Users U ON RH.fk_user_id = U.user_id WHERE U.user_id = 'U0000001';

 

----- change reward quantity ----
-- UPDATE Rewards
-- SET quantity = 50
-- WHERE reward_id = 1;
-- --
-- UPDATE Rewards
-- SET quantity = quantity + 10
-- WHERE reward_id = 1;
----------------------------------

 