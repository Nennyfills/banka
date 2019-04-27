
import database from "./database/database";

const DBCLEANUP = `

CREATE TABLE IF NOT EXISTS
   users(
        id SERIAL PRIMARY KEY,
        permission VARCHAR(10) NOT NULL,
        firstName VARCHAR(20) NOT NULL,
        surname VARCHAR(20) NOT NULL,
        phonenumber VARCHAR(15) NOT NULL UNIQUE,
        email VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(300) NOT NULL,
        isAdmin BOOLEAN NOT NULL
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

DELETE FROM users;
DELETE FROM account;
DELETE FROM transaction;

INSERT INTO  users(id, permission, firstName, surname, phonenumber, email, password, isAdmin)
VALUES(1,	'USER',	'Danny',	'Dike',	'080787879697',	'danny@gmail.com',	'$2a$10$CIvipwNLDRvnCOj.SCRGcu5p82RoDJdImGGN / 65DHXx2 / YwEsgms2',	false),
(3,	'USER',	'Canny',	'Rike',	'080787879695',	'canny@gmail.com',	'$2a$10$3uK5se63KpaqyvbLWIbsBuobZP6IuqgmsHn5MVxtJkZ04LAy2J1Ja',	false),
(4,	'ADMIN',	'Panny',	'Sunday',	'080787879690',	'admin01@gmail.com',	'$2a$10$Cu6AEdxxfuDQqH6.MF / M1OKIlxYFWL2BIon.xZut7jkEIyosAef7K',	true),
(5,	'STAFF',	'Rose',	'Peter',	'080787877690',	'staff01@gmail.com',	'$2a$10$1lj4R1R.YPCORSQWXbonI.aIGoHEZbvt1xuQLqsL64Dw7Z / 1uOQhm',	true);

INSERT INTO account(id, ownerId, accountNumber, email, balance, type, status, createdAt)
VALUES(3,1,3007405577,'danny@gmail.com',215690.09,'savings','dormant','2019-04-25 12:58:47 +0000'),
(4,3,3008622723,'canny@gmail.com',215690.09,'savings','active','2019-04-25 13:00:03 +0000'),
(5,3,3008180416,'canny@gmail.com',9215690.0,'current','dormant','2019-04-25 13:00:47 +0000'),
(2,1,3007149146,'danny@gmail.com',48106.09,'savings','dormant','2019-04-25 12:57:58 +0000'),
(6,3,3001219111,'canny@gmail.com',45690.09,'current','active','2019-04-25 13:01:04 +0000');

INSERT INTO transaction(id, accountNumber, amount, cashier, depositor, type, oldBalance, newBalance, createdAt)
VALUES(1,3007149146,16896,5,'nenye','credit',115690.09,132586.09,'2019-04-25 13:09:41 +0000'),
(2,3007149146,16896,5,'nenye','credit',132586.09,149482.09,'2019-04-25 13:09:44 +0000'),
(3,3007149146,16896,5,'nenye','credit',149482.09,166378.09,'2019-04-25 13:09:47 +0000'),
(4,3007149146,16896,5,'nenye','credit',166378.09,183274.09,'2019-04-25 13:09:51 +0000'),
(5,3007149146,16896,5,'nenye','credit',183274.09,200170.09,'2019-04-25 13:12:38 +0000');
`

database.executeQuery(DBCLEANUP);
