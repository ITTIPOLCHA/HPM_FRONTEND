import * as Yup from "yup";

export const initialValues = {
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  hn: null,
  statusFlag: null,
};

const PatientSchema = Yup.object().shape({
});

export default PatientSchema;
