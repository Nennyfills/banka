export default {
  ADD_USER: values => ({
    text: "INSERT INTO  users(permission,  firstName,  surname, phonenumber, email, password, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    values,
  }),
  ADD_ACCOUNT: values => ({
    text: "INSERT INTO account(ownerId, accountNumber, email, balance, type, status, createdAt) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    values,
  }),
  ADD_TRANSACTION: values => ({
    text: "INSERT INTO transaction(accountNumber, amount, cashier, depositor, type, oldBalance, newBalance, createdAt) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    values,
  }),
  // eslint-disable-next-line arrow-parens
  GET_USER_BY_EMAIL: values => ({
    text: "SELECT * FROM  users WHERE email = $1",
    values,
  }),
  GET_ACCOUNT_BY_EMAIL: values => ({
    text: "SELECT * FROM  account WHERE email = $1",
    values,
  }),
  GET_ACCOUNT_BY_ACCOUNTNUMBER: values => ({
    text: "SELECT * FROM account WHERE accountNumber = $1",
    values,
  }),
  GET_ACCOUNT_BY_STATUS: values => ({
    text: "UPDATE account SET status=($1) WHERE accountNumber=($2) RETURNING *;",
    values,
  }),
  GET_TRANSACTION_BY_ACCOUNTNUMBER: values => ({
    text: "SELECT * FROM transaction WHERE accountNumber = ($1);",
    values,
  }),
  GET_TRANSACTION_BY_ID: values => ({
    text: "SELECT * FROM  transaction WHERE id = ($1);",
    values,
  }),
  UPDATE_ACCOUNTBALANCE: values => ({
    text: "UPDATE account SET balance=($1) WHERE accountNumber=($2) RETURNING *;",
    values,
  }),
  DELETE_ACCOUNT: values => ({
    text: "DELETE FROM account WHERE accountNumber=($1) RETURNING *;",
    values,
  }),
  SEARCH_BY_TRANSACTION_DATE: values => ({
    text: "SELECT * FROM transaction WHERE createdAt >= ($1) AND created <= ($1) RETURNING *;",
    values,
  }),
  SEARCH_BY_ACCOUNT_DATE: values => ({
    text: "SELECT * FROM account WHERE createdAt >= ($1) AND created <= ($1) RETURNING *;",
    values,
  }),
};
