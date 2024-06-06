import * as Yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  hn: "",
};

const PatientEditSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  hn: Yup.string().required("HN is required"),
});

export default PatientEditSchema;
