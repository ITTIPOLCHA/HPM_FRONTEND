import { Modal } from "antd";
import { Alert } from "components/elements";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "utils/helper";
import * as services from "../services/bloodPressureApi";
import { setBloodPressureList, setIsLoading, setUserDropDownHn, setUserDropDownName, setUserDropDownNameHn } from "../slices/bloodPressureSlice";

function toParams(params = {}) {
  const { pagination = {}, sortBy = [] } = params;
  return {
    pagination: {
      page: pagination.page,
      size: pagination.pageSize,
    },
    sortBy: sortBy
      .filter((s) => s.order !== undefined)
      .map((s) => ({
        direction: s.order === "descend" ? "desc" : "asc",
        property: s.field,
      })),
  };
}

function useBloodPressureList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.bloodPressure.isLoading);
  const bloodPressureList = useSelector((state) => state.bloodPressure.bloodPressureList);
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [filter, setFilter] = useState({});

  console.log("filter", filter);

  const getBloodPressureList = useCallback(async (params = {}) => {
    try {
      dispatch(setIsLoading(true));
      const response = await services.getBloodPressureList({
        requestId: generateRandomString(),
        ...params.pagination,
        ...filter,
        sortBy: params.sortBy,
      });

      const formattedBloodPressureList = response.data.bps || [];
      dispatch(setBloodPressureList(formattedBloodPressureList));
      setPagination({
        page: response.data.totalPages - 1,
        total: response.data.totalItems,
        size: pagination.size,
      });
    } catch (error) {
      // Handle error gracefully, e.g., set error state and display error message
      console.error("Error fetching patient list:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, filter, pagination.size]);

  const getUserDropDown = useCallback(async () => {
    try {
      const response = await services.getUserDropDown({
        requestId: generateRandomString(),
      });
      const formattedUserDropDownName = response.data.map(user => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id,
      }));
      const formattedUserDropDownHn = response.data.map(user => ({
        label: `${user.hn}`,
        value: user.id,
      }));
      const formattedUserDropDownNameHn = response.data.map(user => ({
        label: `${user.firstName} ${user.lastName} ( ${user.hn} )`,
        value: user.id,
      }));
      dispatch(setUserDropDownName(formattedUserDropDownName || []));
      dispatch(setUserDropDownHn(formattedUserDropDownHn || []));
      dispatch(setUserDropDownNameHn(formattedUserDropDownNameHn || []));
      return formattedUserDropDownName;
    } catch (error) {
      console.error("Error fetching user dropdown:", error);
    }
  }, [dispatch]);

  const handleOnChange = useCallback((tablePagination, tableSorter) => {
    setPagination(tablePagination);
    const modifiedSorter = Array.isArray(tableSorter)
      ? [...tableSorter]
      : [tableSorter];
    const modifiedParams = toParams({
      pagination: {
        page: tablePagination.current - 1,
        pageSize: tablePagination.pageSize,
      },
      sortBy: modifiedSorter,
      ...filter,
    });
    setPagination({ page: tablePagination.current - 1, size: tablePagination.pageSize })
    getBloodPressureList(modifiedParams);
  }, [getBloodPressureList, filter]);

  const handleOnSubmit = useCallback(
    (values) => {
      setFilter(values);
    },
    []
  );

  const handleOnDelete = useCallback(
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
            const response = await services.deleteBloodPressure({
              requestId: generateRandomString(),
              bloodPressureId: values,
            });
            Alert({ message: response.data.status.details[0].value || "Success" });
            getBloodPressureList({ pagination: { page: pagination.page, size: pagination.size } });
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
    [dispatch, getBloodPressureList, pagination.page, pagination.size, t]
  );

  useEffect(() => {
    getBloodPressureList({ pagination: { page: 0, size: 10 } });
    getUserDropDown();
  }, [getBloodPressureList, getUserDropDown]);

  return {
    bloodPressureList,
    isLoading,
    pagination,
    filter,
    onChange: handleOnChange,
    onSubmit: handleOnSubmit,
    onClear: () => setFilter({}),
    onDelete: handleOnDelete,
  };
}

export default useBloodPressureList;
