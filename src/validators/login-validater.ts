import { checkSchema } from "express-validator";

export default checkSchema({
  email: {
    trim: true,
    errorMessage: "Email is required!",
    notEmpty: true,
    isEmail: {
      errorMessage: "Email should be a valid email",
    },
  },
  password: {
    trim: true,
    notEmpty: {
      errorMessage: "Password is required!",
    },
  },
});
// export default [body("email").notEmpty().withMessage("email is required").trim()]
