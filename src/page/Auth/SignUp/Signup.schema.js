import * as yup from "yup";
import { EMAIL_REG_EX, PASSPORT_REG_EX } from "../../../consts/Enum";

export const schemaSignup = yup.object().shape({
  companyName: yup.string().required("Please enter company name"),
  email: yup
    .string()
    .required("Please enter your email")
    .matches(EMAIL_REG_EX,"Email is not a valid email!"),
  password: yup
    .string()
    .required("Please enter the password")
    .matches(PASSPORT_REG_EX, "At least 8 characters. Contains a number"),
  conditions: yup
    .boolean()
    .required("Please check this box if you want to process")
    .oneOf([true], "Please check this box if you want to process"),
});
