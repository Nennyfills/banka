export default {
  ADD_USER: values => ({
    text: "INSERT INTO  users(permission,  firstname,  surname, phonenumber, email, password, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
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
  GET_USER_BY_EMAIL: values => ({
    text: "SELECT * FROM users WHERE email = $1",
    values,
  }),
  GET_USER_BY_ID: values => ({
    text: "SELECT * FROM  users WHERE id = $1",
    values,
  }),
  GET_ACCOUNT_BY_OWNERID: values => ({
    text: "SELECT * FROM  account WHERE ownerid = $1",
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
  GET_ALL_ACCOUNT: values => ({
    text: "SELECT * FROM account WHERE (createdat >= $1::date or $1 is null) AND (createdat <= $2::date  + '1 day'::interval or $2 is null) AND (status = $3 or $3 is null)",
    values,
  }),
  UPDATE_ACCOUNT_BY_STATUS: values => ({
    text: "UPDATE account SET status=($1) WHERE accountNumber=($2) RETURNING *;",
    values,
  }),
  GET_TRANSACTION_BY_ACCOUNTNUMBER: values => ({
    text: "SELECT * FROM transaction WHERE (accountNumber=$1 or $1 is null) AND (createdat >= $2::date or $2 is null) AND (createdat <= $3::date  + '1 day'::interval or $3 is null);",
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
  UPDATE_PASSWORD: values => ({
    text: "UPDATE users SET password=($1) WHERE email=($2) RETURNING *;",
    values,
  }),
  UPDATE_IMAGE: values => ({
    text: "UPDATE users SET imageurl=($1) WHERE email=($2) RETURNING *;",
    values,
  }),
  DELETE_ACCOUNT: values => ({
    text: "DELETE FROM account WHERE accountNumber=($1) RETURNING *;",
    values,
  }),
  SEARCH_BY_TRANSACTION_DATE: values => ({
    text: "SELECT accountNumber FROM transaction WHERE (createdat >= $1::date or $1 is null) AND (createdat <= $2::date  + '1 day'::interval or $2 is null)",
    values,
  }),

};
