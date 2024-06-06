import { Alert } from "components/elements";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "utils/helper";
import * as services from "../services/homeApi";
import { setIsLoading, setState, setUserByLevel, setUserByStatusFlag } from "../slices/homeSlice";

function useHome() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const states = useSelector((state) => state.home.states);
  const userByLevel = useSelector((state) => state.home.userByLevel);
  const userByStatusFlag = useSelector((state) => state.home.userByStatusFlag);

  const getState = useCallback(
    async () => {
      try {
        dispatch(setIsLoading(true));
        const values = {
          requestId: generateRandomString(),
        };
        const response = await services.getState(values);
        dispatch(setState(response.data));
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getUserListByStatusFlag = useCallback(
    async () => {
      try {
        dispatch(setIsLoading(true));
        const values = {
          requestId: generateRandomString(),
        };
        const response = await services.getUserListByStatusFlag(values);
        dispatch(setUserByStatusFlag(response.data));
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const getUserListByLevel = useCallback(
    async () => {
      try {
        dispatch(setIsLoading(true));
        const values = {
          requestId: generateRandomString(),
        };
        const response = await services.getUserListByLevel(values);
        dispatch(setUserByLevel(response.data));
      } catch (error) {
        Alert({ type: "error", resultObject: error });
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getState();
    getUserListByLevel();
    getUserListByStatusFlag();
  }, [getState, getUserListByLevel, getUserListByStatusFlag]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = moment().add(543, "years").format("DD/MM/YYYY");
      setCurrentDate(currentDate);
      const currentTime = moment().format("HH:mm:ss");
      setCurrentTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOnCheckboxChange = useCallback(async (checkState, id) => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.updateUserCheckState({
        requestId: generateRandomString(),
        patientId: id,
        checkStatus: checkState,
      });
      getUserListByLevel();
      getUserListByStatusFlag();
      Alert({ message: response.data.status.details[0].value || "Success" });
    } catch (error) {
      Alert({ type: "error", resultObject: error });
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, getUserListByLevel, getUserListByStatusFlag]);

  return {
    currentDate,
    currentTime,
    states,
    userByLevel,
    userByStatusFlag,
    onCheckboxChange: handleOnCheckboxChange,
  };
}

export default useHome;
