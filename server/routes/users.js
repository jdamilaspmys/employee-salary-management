var express = require("express");
var router = express.Router();

var dummyUsers = [
  {
    id: "0001",
    username: "user01",
    fullname: "User C",
    salary: 1.0,
  },
  {
    id: "0002",
    username: "user01",
    fullname: "User B",
    salary: 2.0,
  },
  {
    id: "0003",
    username: "user03",
    fullname: "User C",
    salary: 5.0,
  },
];

/* ADD users */
router.post("/", function (req, res, next) {
  // TODO : Only for Test
  dummyUsers.push({
    id: "000" + dummyUsers.length,
    username: "user" + dummyUsers.length,
    fullname: "User C",
    salary: parseFloat(1 + Math.random().toFixed(2)),
  });
  // TODO : Only for Test
  res.status(201).json();
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json(dummyUsers);
});

/* GET user by Id . */
router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const user = dummyUsers.find((user) => user.id === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json();
  }
});

/* UPDATE user by Id  */
router.put("/:id", function (req, res, next) {
  const id = req.params.id;
  const body = req.body;
  const foundUser = dummyUsers.find((user) => user.id === id);
  if (foundUser) {
    // TODO : only for TEST
    const indexOfUser = dummyUsers.findIndex((user) => user.id === id);
    const toUpdateUser = { ...foundUser, ...body, id: id };
    dummyUsers[indexOfUser] = toUpdateUser;
    // TODO : only for TEST
    res.status(204).json();
  } else {
    res.status(404).json();
  }
});

/* DELETE user by Id */
router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  const body = req.body;
  const foundUser = dummyUsers.find((user) => user.id === id);
  if (foundUser) {
    // TODO : only for TEST
    const indexOfUser = dummyUsers.findIndex((user) => user.id === id);
    dummyUsers.splice(indexOfUser, 1);
    // TODO : only for TEST
    res.status(204).json();
  } else {
    res.status(404).json();
  }
});

module.exports = router;
