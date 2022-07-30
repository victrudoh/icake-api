// Import Routes
const authRouter = require("./auth.routes");
const adminRouter = require("./admin.routes");
const userRouter = require("./user.routes");
const riderRouter = require("./rider.routes");
const mailRouter = require("./mail.routes");

// Middlewares
const { authorize } = require("../middlewares/roleCheck");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/user", userRouter);
  app.use("/api/rider", riderRouter);
  app.use("/api/mail", mailRouter);
};
