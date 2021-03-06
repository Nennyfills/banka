
import database from "./database/database";

const DBCLEANUP = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS transaction CASCADE;


CREATE TABLE IF NOT EXISTS
   users(
        id SERIAL PRIMARY KEY,
        permission VARCHAR(10) NOT NULL,
        firstname VARCHAR(20) NOT NULL,
        surname VARCHAR(20) NOT NULL,
        phonenumber VARCHAR(15) NOT NULL UNIQUE,
        email VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(300) NOT NULL,
        isAdmin BOOLEAN NOT NULL,
        imageurl VARCHAR(450)
        );

CREATE TABLE IF NOT EXISTS
     account(
        id SERIAL PRIMARY KEY,
        ownerId INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
        accountNumber BIGINT NOT NULL UNIQUE,
        email VARCHAR(20) NOT NULL,
        balance FLOAT NULL,
        type VARCHAR(10) NOT NULL,
        status VARCHAR(10) NOT NULL,
        createdAt TIMESTAMPTZ
         );

CREATE TABLE IF NOT EXISTS
   transaction(
      id SERIAL PRIMARY KEY,
      accountNumber BIGINT REFERENCES account(accountNumber) ON DELETE CASCADE,
      amount FLOAT NOT NULL,
      cashier INTEGER  NOT NULL REFERENCES  users(id) ON DELETE CASCADE,
      depositor VARCHAR(10),
      type VARCHAR(10) NOT NULL,
      oldBalance FLOAT, 
      newBalance FLOAT, 
      createdAt TIMESTAMPTZ
      );

INSERT INTO users(id, permission, firstname, surname, phonenumber, email, password, isAdmin)
VALUES(1, 'USER','Danny','Dike','080787879697', 'danny@gmail.com', '$2a$10$3uK5se63KpaqyvbLWIbsBuobZP6IuqgmsHn5MVxtJkZ04LAy2J1Ja', false), 
(3, 'USER', 'Canny', 'Rike', '080787879695', 'canny@gmail.com', '$2a$10$3uK5se63KpaqyvbLWIbsBuobZP6IuqgmsHn5MVxtJkZ04LAy2J1Ja', false),
(4, 'ADMIN', 'Panny', 'Sunday', '080787879690', 'admin01@gmail.com', '$2a$10$Cu6AEdxxfuDQqH6.MF / M1OKIlxYFWL2BIon.xZut7jkEIyosAef7K', true), 
(5, 'STAFF', 'Rose', 'Peter', '080787877690', 'staff01@gmail.com', '$2a$10$1lj4R1R.YPCORSQWXbonI.aIGoHEZbvt1xuQLqsL64Dw7Z / 1uOQhm', true);

INSERT INTO account(id, ownerId, accountNumber, email, balance, type, status, createdAt)
VALUES(3,1,3007405577,'danny@gmail.com',215690.09,'savings','dormant','2019-04-25 12:58:47 +0000'),
(4,3,3008622723,'canny@gmail.com',215690.09,'savings','active','2019-04-25 13:00:03 +0000'),
(5,3,3008180416,'canny@gmail.com',9215690.0,'current','dormant','2019-04-25 13:00:47 +0000'),
(2,1,3007149146,'danny@gmail.com',48106.09,'savings','dormant','2019-04-25 12:57:58 +0000'),
(6,3,3001219111,'canny@gmail.com',45690.09,'current','active','2019-04-25 13:01:04 +0000');
`;

database.executeQuery(DBCLEANUP).catch((error) => {
});
