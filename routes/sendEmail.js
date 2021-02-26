const { Router } = require("express");
const router = Router();

const { email } = require("../controllers/email");

router.post("/send-email", email);

module.exports = router;
