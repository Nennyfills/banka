import { Pool } from "pg";
import ptype from "pg-types";
import env from "dotenv";
import QUERY from "./queries";

env.config();

const myconnection = process.env.DBCONNECTION;
const pool = new Pool({
  connectionString: myconnection,
});

/**
 * @param s — A string to convert into a number.
    @param radix —
 *  @param {*} values
 */
ptype.setTypeParser(1700, val => parseInt(val));

const addUser = async (values) => {
  const res = await pool.query(QUERY.ADD_USER(values));
  return res.rows[0];
};
const findUserByEmail = async (email) => {
  const res = await pool.query(QUERY.GET_USER_BY_EMAIL([email]));
  return res.rows[0];
};


const findAccountByEmail = async (email) => {
  const res = await pool.query(QUERY.GET_ACCOUNT_BY_EMAIL([email]));
  return res.rows;
};
const findUserById = async (id) => {
  const res = await pool.query(QUERY.GET_USER_BY_ID([id]));
  return res.rows[0];
};

const findAccountByOwnerid = async (values) => {
  const res = await pool.query(QUERY.GET_ACCOUNT_BY_OWNERID([values]));
  return res.rows;
};

const findAccountByAccountNumber = async (accountNumber) => {
  const res = await pool.query(QUERY.GET_ACCOUNT_BY_ACCOUNTNUMBER([accountNumber]));
  return res.rows[0];
};
const findTransactionByAccountNumber = async (accountNumber) => {
  const res = await pool.query(QUERY.GET_TRANSACTION_BY_ACCOUNTNUMBER([accountNumber]));
  return res.rows;
};

const findTransactionById = async (id) => {
  const res = await pool.query(QUERY.GET_TRANSACTION_BY_ID([id]));
  return res.rows;
};

const getAllAccountByAccountNumber = async (accountNumber) => {
  const res = await pool.query(QUERY.GET_ACCOUNT_BY_ACCOUNTNUMBER([accountNumber]));
  return res.rows;
};

const deleteAccount = async (accountnumber) => {
  const res = await pool.query(QUERY.DELETE_ACCOUNT([accountnumber]));
  return res.rows[0];
};


const saveTransaction = async ({
  accountNumber, amount, cashierId, depositor, type, oldBalance, newBalance,
}) => {
  const now = new Date();
  const values = [
    accountNumber, amount, cashierId, depositor,
    type, oldBalance, newBalance, now,
  ];
  const res = await pool.query(QUERY.ADD_TRANSACTION(values));
  return res.rows[0];
};
const updateAccountbalance = async ({ accountNumber, newBalance }) => {
  const res = await pool.query(QUERY.UPDATE_ACCOUNTBALANCE([newBalance, accountNumber]));
  return res.rows[0];
};
const getAccountbalance = async (accountbalance) => {
  const res = await pool.query(QUERY.GET_accountbalance([accountbalance]));
  return res.rows[0];
};
const saveAccount = async ({
  accountNumber, email, openingbalance, type, status,
}) => {
  const currentUser = await findUserByEmail(email);
  const now = new Date();
  const values = [
    currentUser.id, accountNumber, currentUser.email,
    openingbalance, type, status, now,
  ];
  const res = await pool.query(QUERY.ADD_ACCOUNT(values));
  return res.rows[0];
};
const getAllAccount = async (values) => {
  const res = await pool.query(QUERY.GET_ALL_ACCOUNT(values));
  return res.rows;
};
const updateAccountStatus = async ({ accountnumber, status }) => {
  const res = await pool.query(QUERY.GET_ACCOUNT_BY_STATUS([status, accountnumber]));
  return res.rows[0];
};

const searchTansactionByDate = async ({ from, to }) => {
  const res = await pool.query(QUERY.GET_ACCOUNT_BY_STATUS([from, to]));
  return res.rows;
};

module.exports = {
  saveAccount,
  findUserByEmail,
  findUserById,
  addUser,
  updateAccountbalance,
  saveTransaction,
  getAccountbalance,
  findAccountByAccountNumber,
  updateAccountStatus,
  deleteAccount,
  findAccountByEmail,
  getAllAccountByAccountNumber,
  findTransactionByAccountNumber,
  findTransactionById,
  searchTansactionByDate,
  getAllAccount,
  findAccountByOwnerid,
};
// const DATABASE = {
//   ADMIN: [
//     {
//       type: "ADMIM",
//       id: 1000001,
//       firstname: "Admin1",
//       surname: "Admin1",
//       email: "admin@FileList.com",
//       phonenumber: "09080870892",
//       password: "$2b$10$peUVM0nFUfGxIoOO55mdW.5bFkadvs8wIDIrikywodrnzvnsXqe52",
//       isAdmin: true,
//     },
//   ],
//   STAFF: [
//     {
//       type: "STAFF",
//       id: 1000001,
//       firstname: "Staff1",
//       surname: "Staff1",
//       email: "staff@FileList.com",
//       phonenumber: "09087670892",
//       password: "$2b$10$peUVM0nFUfGxIoOO55mdW.5bFkadvs8wIDIrikywodrnzvnsXqe52",
//       isAdmin: true,
//     },
//   ],
//   USER: [
//     {
//       type: "USER",
//       id: 1000001,
//       firstname: "Joy",
//       surname: "Fills",
//       email: "joy@westlife.com",
//       phonenumber: "09078754434",
//       password: "$2a$10$EfwMJnjkSIV7HXhCZ3SPR.COcbPGLf7WA4Xu0OSV8XAuW.z.6Qqm2",
//       isAdmin: false,
//     },
//     {
//       type: "USER",
//       id: 1000002,
//       firstname: "Mark",
//       surname: "Hibs",
//       email: "mark@hotmail.com",
//       phonenumber: "09078754450",
//       password: "$2b$10$peUVM0nFUfGxIoOO55mdW.5bFkadvs8wIDIrikywodrnzvnsXqe52",
//       isAdmin: false,
//     },
//   ],
//   ACCOUNT: [
//     {
//       id: 1000001,
//       email: "joy@westlife.com",
//       accountNumber: 3008989871,
//       ownerId: 1000001,
//       phonenumber: "09098765438",
//       accountbalance: 31000.09,
//       type: "current",
//       status: "active",
//       createdAt: "2019 - 04 - 04T18: 23: 05.602Z",
//     },
//     {
//       id: 1000001,
//       email: "joy@westlife.com",
//       accountNumber: 3008989879,
//       ownerId: 1000001,
//       phonenumber: "09098765438",
//       accountbalance: 31000.09,
//       type: "current",
//       status: "active",
//       createdAt: "2019 - 04 - 04T18: 23: 05.602Z",
//     },
//     {
//       id: 1000002,
//       email: "mark@hotmail.com",
//       accountNumber: 4008989879,
//       ownerId: 1000001,
//       phonenumber: "09098765438",
//       accountbalance: 31000.09,
//       type: "current",
//       status: "dormant",
//       createdAt: "2019 - 04 - 04T18: 23: 05.602Z",
//     },
//     {
//       id: 1000002,
//       email: "mark@hotmail.com",
//       accountNumber: 3008989876,
//       phonenumber: "09080678989",
//       ownerId: 1000002,
//       accountbalance: 31000.09,
//       type: "current",
//       status: "active",
//       createdAt: "2019 - 04 - 04T18: 23: 05.602Z",
//     },
//   ],
//   TRANSACTION: [
//     {
//       key: "TRANSACTION",
//       accountNumber: 3008989879,
//       id: 1000001,
//       amount: 3000,
//       casher: 1000001,
//       type: "credit",
//       oldBalance: 31000.09,
//       newBalance: 34000.09,
//       createdAt: "2019 - 04 - 04T18: 23: 05.602Z",
//     },
//     {
//       key: "TRANSACTION",
//       accountNumber: 3008989879,
//       id: 1000002,
//       amount: 3000,
//       casher: 1000001,
//       type: "debit",
//       oldBalance: 7000.09,
//       newBalance: 4000.09,
//       createdAt: "2019 - 04 - 04T18: 23: 07.151Z",
//     },
//   ],
// };

// const database = DATABASE;
// const userdb = [...DATABASE.USER];
// const admindb = [...DATABASE.ADMIN];
// const staff = [...DATABASE.STAFF];
// const accountdb = [...DATABASE.ACCOUNT];
// const transactionsdb = [...DATABASE.TRANSACTION];

// // module.s = {
// //   database, userdb, admindb, staff, accountdb, transactionsdb,
// // };

// // const client = new Client({
// //   user: "postgres",
// //   password: "postgres",
// //   host: "localhost",
// //   port: 5432,
// //   database: "banka",
// // });

// // async function execute() {
// //   try {
// //     await client.connect();
// //     ("Connected successfully.");
// //     const { rows } = await client.query("select * from user");
// //     console.table(rows);
// //     await client.end();
// //     ("Client disconnected successfully.");
// //   } catch (run) {
// //     await
//       (`Something wrong happened ${run}`);
//   } finally {
//     await client.end();
//     ("Client disconnection successfully.");
//   }
// }
