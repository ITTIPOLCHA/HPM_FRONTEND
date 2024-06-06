import * as Yup from "yup";

export const initialValues = {
  dia: "",
  pul: "",
  sys: "",
  createBy: "",
};

const BloodPressureEditSchema = Yup.object().shape({
  dia: Yup.number()
    .required("Diastolic pressure is required")
    .min(0, "Diastolic pressure is too low"),
  pul: Yup.number()
    .required("Pulse is required")
    .min(0, "Pulse is too low"),
  sys: Yup.number()
    .required("Systolic pressure is required")
    .min(0, "Systolic pressure is too low"),
  createBy: Yup.string()
  .required("Creator is required")
  .test(
    "is-valid-id",
    "createBy must be a valid ID",
    value => typeof value === "string" && value.length > 0
  ),
});

export default BloodPressureEditSchema;
