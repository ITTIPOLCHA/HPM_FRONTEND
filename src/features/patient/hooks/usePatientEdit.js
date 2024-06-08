import { Modal } from "antd";
import { Alert } from "components/elements";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { generateRandomString } from "utils/helper";
import * as services from "../services/patientApi";
import { setIsLoading } from "../slices/patientSlice";

function usePatientEdit() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.patient.isLoading);
  // const userDropDownNameHn = useSelector((state) => state.bloodPressure.userDropDownNameHn);
  const [patient, setPatient] = useState({});
  // const currentId = window.localStorage.getItem("id");
  const { id } = useParams();
  // const navigate = useNavigate();

  const getPatient = useCallback(
    async () => {
      try {
        dispatch(setIsLoading(true));
        const values = {
          userId: id,
          requestId: generateRandomString(),
        };
        const response = await services.getPatientById(values);
        setPatient(response.data);
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [id, dispatch]
  );

  // const getUserDropDown = useCallback(async () => {
  //   try {
  //     const response = await services.getUserDropDown({
  //       requestId: generateRandomString(),
  //     });
  //     const formattedUserDropDownNameHn = response.data.map(user => ({
  //       label: `${user.firstName} ${user.lastName} ( ${user.hn} )`,
  //       value: user.id,
  //     }));
  //     dispatch(setUserDropDownNameHn(formattedUserDropDownNameHn || []));
  //     return formattedUserDropDownNameHn;
  //   } catch (error) {
  //     console.error("Error fetching user dropdown:", error);
  //   }
  // }, [dispatch]);

  const onSubmit = useCallback(
    async (values) => {
      try {
        Modal.confirm({
          title: t("dialog.confirmation.header"),
          content: (
            <>
              <p>{t("blood_pressure.message.delete")}</p>
            </>
          ),
          async onOk() {
            // const response = await services.updateBloodPressureById({
            //   requestId: generateRandomString(),
            //   bloodPressureId: values.id,
            //   actionId: currentId,
            //   userId: values.createBy,
            //   sys: values.sys,
            //   dia: values.dia,
            //   pul: values.pul,
            // });
            // Alert({ message: response.data.status.details[0].value || "Success" });
            // navigate("/blood_pressure");
          },
          okText: t("common.confirm"),
          cancelText: t("common.cancel"),
        });
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, t]
  );

  useEffect(() => {
    getPatient();
    // getUserDropDown();
  }, [getPatient]);

  return {
    patient,
    isLoading,
    onSubmit,
  };
}

export default usePatientEdit;
