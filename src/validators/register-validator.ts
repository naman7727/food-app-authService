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
    isLength: {
      options: { min: 8 }, // Changed from max to min
      errorMessage: "Password must be at least 8 characters!",
    },
  },

  firstName: {
    errorMessage: "FirstName is Required",
    notEmpty: true,
    trim: true,
  },
  lastName: {
    errorMessage: "lastName is Required",
    notEmpty: true,
    trim: true,
  },
});
// export default [body("email").notEmpty().withMessage("email is required").trim()]
