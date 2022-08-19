import * as yup from "yup";
import { EMAIL_REG_EX, PASSPORT_REG_EX } from "../../../consts/Enum";

export const schemaSignIn = yup.object().shape({
    email: yup.string()
    .required(
        "Please enter your email"
    ).matches(
        EMAIL_REG_EX,
        "Email is not a valid email!"
    ),
    password: yup.string()
    .required("Please enter the password")
    .matches(
        PASSPORT_REG_EX,
        "At least 8 characters. Contains a number"
    ),
  });