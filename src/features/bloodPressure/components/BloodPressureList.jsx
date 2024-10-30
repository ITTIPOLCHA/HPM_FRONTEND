import { FilterOutlined } from "@ant-design/icons";
import { Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { MainLayout } from "components/layouts";
import BloodPressureTable from "components/table/BloodPressureTable";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "../styles/BloodPressureList.module.css";
import FilterSection from "./BloodPressureFitter";

const BloodPressureList = ({
  bloodPressureList = [],
  isLoading = false,
  pagination = {},
  filter = {},
  onDelete = () => {},
  onChange = () => {},
  onSubmit = () => {},
  onClear = () => {},
}) => {
  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const userDropDownName = useSelector(
    (state) => state.bloodPressure.userDropDownName
  );
  const userDropDownHn = useSelector(
    (state) => state.bloodPressure.userDropDownHn
  );

  return (
    <MainLayout
      title={t("blood_pressure.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("blood_pressure.header"), link: "/blood_pressure" },
      ]}
    >
      <Space className={styles.container} direction="vertical" size={24}>
        <Row justify="end">
          <Space direction="horizontal" size={24}>
            <Button
              type="default"
              onClick={() => setShowFilterForm(!showFilterForm)}
            >
              {t("common.filter")} <FilterOutlined />
            </Button>
          </Space>
        </Row>
        <FilterSection
          showFilterForm={showFilterForm}
          onSubmit={onSubmit}
          onClear={onClear}
          userDropDownName={userDropDownName}
          userDropDownHn={userDropDownHn}
          initialValues={filter}
        />
        <CardContainer width="100%" height="fit-content">
          <BloodPressureTable
            dataSource={bloodPressureList}
            onDelete={onDelete}
            isLoading={isLoading}
            pagination={pagination}
            onChange={onChange}
          />
        </CardContainer>
      </Space>
    </MainLayout>
  );
};

export default BloodPressureList;
