const bcrypt = require("bcrypt");
const User = require("../models").User;

const HelperFunctions = require("../utils/helpers");

const saltRounds = 10;

const postRegister = async (req, res) => {
  try {
    const body = req.body;
    const mandatoryFields = ["name", "username", "password"];

    const missingField = mandatoryFields.find((field) => !body[field]);

    if (missingField) {
      return res
        .status(400)
        .json({ error: `Missing mandatory field ${missingField}` });
    }

    const { name, username, password } = body;

    const userExists = await User.findOne({ username });

    if (userExists)
      return res
        .status(400)
        .json({ error: `A user with the username already exists` });

    const accountNumber = Math.floor(10000000 + Math.random() * 90000000);

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const user = new User({
      name,
      username,
      password: hashedPassword,
      account_number: accountNumber,
    });

    await user.save();

    const output = { username, name, account_number: accountNumber };

    return res.json(output);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const postLogin = async (req, res) => {
  try {
    const body = req.body;
    const mandatoryFields = ["username", "password"];

    const missingField = mandatoryFields.find((field) => !body[field]);

    if (missingField) {
      return res
        .status(400)
        .json({ error: `Missing mandatory field ${missingField}` });
    }

    const { username, password } = body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: `User not found!` });

    const match = bcrypt.compareSync(password, user.password);

    if (!match)
      return res
        .status(400)
        .json({ error: `Authentication failed. Check the password again!` });

    const accessToken = HelperFunctions.generateAccessToken({
      username: user.username,
    });

    const accountDetails = user.account_details;
    if (!accountDetails.length)
      return res.json({
        message: "Please upload some account details through a csv file",
        accessToken,
      });

    return res.json({ account_details: accountDetails });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const postUploadCsv = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];

    const unsignedToken = HelperFunctions.verifyAccessToken(token);

    const { username } = unsignedToken;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: "User not found" });

    const csvStr = req.files.csv_file.data.toString();

    const accountDetails = await HelperFunctions.csvToJson(csvStr);

    const firstHunderAccountDetails = accountDetails.slice(0, 100);

    user.account_details.push(...firstHunderAccountDetails);

    await user.save();

    const accountDetailsByMonth = HelperFunctions.groupByMonth(accountDetails);

    const netDepositsByMonth = Object.keys(accountDetailsByMonth).map(
      (month) => {
        return {
          [month]: accountDetailsByMonth[month].reduce(
            (totalBalance, transaction) =>
              totalBalance + transaction.deposit
                ? Number(transaction.deposit)
                : 0,
            0
          ),
        };
      }
    );

    const netWithdrawsByMonth = Object.keys(accountDetailsByMonth).map(
      (month) => {
        return {
          [month]: accountDetailsByMonth[month].reduce(
            (totalBalance, transaction) =>
              totalBalance + transaction.withdraw
                ? Number(transaction.withdraw)
                : 0,
            0
          ),
        };
      }
    );

    const netWithdraws = netWithdrawsByMonth.reduce(
      (total, item) => total + Object.values(item)[0],
      0
    );

    const netDeposits = netDepositsByMonth.reduce(
      (total, item) => total + Object.values(item)[0],
      0
    );

    const netBalance = netDeposits - netWithdraws;

    const avgMonthlyBalance = netBalance / 12;
    const creditLimit = avgMonthlyBalance * 1.2;

    const interestRate = (netBalance + creditLimit) / netBalance - 1;
    const output = {
      credit_limit: creditLimit,
      interest_rate: Number(interestRate.toFixed(2)),
    };
    return res.json(output);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const postAccountTransfer = async (req, res) => {
  try {
    const body = req.body;
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];

    const { username } = body;
    const unsignedToken = HelperFunctions.verifyAccessToken(token);

    const { username: authUsername } = unsignedToken;
    const userAuth = await User.findOne({ username: authUsername });

    if (!userAuth)
      return res.status(400).json({ error: "Authentication failed" });

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: "User not found" });
    const previousBalance = user.account_details.length
      ? user.account_details[user.account_details.length - 1].balance
      : 0;

    const amount = body.amount;

    const newTransacton = {
      description: "A new deposit",
      withdraw: null,
      deposit: amount,
      balance: previousBalance + amount,
    };

    user.account_details.push(newTransacton);
    await user.save();

    return res.json({ message: "A new deposit added for the user" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postUploadCsv,
  postAccountTransfer,
};
