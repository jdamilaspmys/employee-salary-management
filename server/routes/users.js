var express = require("express");
var router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
router.post("/", upload.single("file"), function (req, res, next) {
  try {
    /**
     * 1. Read File
     * 2. Validate Extention
     * 3. Validate Header
     * 4. Validate Content ( Type [ string, number ] )
     * 5. Validate Duplicate 
     * 6. Insert to DB 
     *
    errorType: "INVALID_FILE_TYPE", 
    errorMessage: "Inavalid File Type. Accept file type `csv`"
    *
    errorType: "INVALID_HEADER",
    errorMessage: [{ "index": 0, "received": "RECEIVED_TEXT", "expected": "EXPECTED_TEXT" } ]
    *
    errorType: "INVALID_CONTENT", 
    errorMessage: [{ "row": 0, "index": 0, "header" : "HEADER","receivedType": "string", "expectedType": "number", "received" : "txt-here", example: "5.44" } ]
    *
    errorType: "DUPLICATE_CONTENT",
    errorMessage: [{ "row": 0, "index": 0, "header" : "HEADER", "duplicate": "" } ]
     */

    setTimeout(() => {
      try {
        const file = req.file;
        const { originalname } = file || {};
        if (!originalname) {
          throw new Error("file required");
        }
        const isValidExtention =
          originalname && originalname.split(".").pop() === "csv";
        if (!isValidExtention) {
          throw {
            errorType: "INVALID_FILE_TYPE",
            errorMessage: "Inavalid File Type. Accept file type `csv`",
          };
        }
        res.status(201).json("OK");
      } catch (error) {
        res.status(400).json(error?.errorType ? error : "");
      }
    }, 1000);
  } catch (error) {
    res.status(400).json("");
  }
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
