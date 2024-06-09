import { Alert } from "components/elements";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "utils/helper";
import * as services from "../services/homeApi";
import { setIsLoading, setIsLoadingStatus, setState, setUserByLevel, setUserByStatusFlag } from "../slices/homeSlice";

function useHome() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const isLoadingStatus = useSelector((state) => state.home.isLoading)
  const states = useSelector((state) => state.home.states);
  const userByLevel = useSelector((state) => state.home.userByLevel);
  const userByStatusFlag = useSelector((state) => state.home.userByStatusFlag);

  const fetchData = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const values = { requestId: generateRandomString() };

      const [stateResponse, levelResponse, statusResponse] = await Promise.all([
        services.getState(values),
        services.getUserListByLevel(values),
        services.getUserListByStatusFlag(values)
      ]);

      dispatch(setState(stateResponse.data));
      dispatch(setUserByLevel(levelResponse.data));
      dispatch(setUserByStatusFlag(statusResponse.data));
    } catch (error) {
      Alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = moment().add(543, "years").format("DD/MM/YYYY");
      const currentTime = moment().add(543, "years").format("HH:mm:ss");
      setCurrentDate(currentDate);
      setCurrentTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOnCheckboxChange = useCallback(async (checkState, id) => {
    try {
      dispatch(setIsLoadingStatus(true));
      const response = await services.updateUserCheckState({
        requestId: generateRandomString(),
        patientId: id,
        checkStatus: checkState,
      });
      fetchData();
      Alert({ message: response.data.status.details[0].value || "Success" });
    } catch (error) {
      Alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoadingStatus(false));
    }
  }, [dispatch, fetchData]);

  return {
    isLoadingStatus,
    currentDate,
    currentTime,
    states,
    userByLevel,
    userByStatusFlag,
    onCheckboxChange: handleOnCheckboxChange,
  };
}

export default useHome;
