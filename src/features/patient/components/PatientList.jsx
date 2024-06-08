import { FilterOutlined } from "@ant-design/icons";
import { Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { MainLayout } from "components/layouts";
import PatientTable from "components/table/PatientTable";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import styles from "../styles/PatientList.module.css";
import FilterSection from "./PatientFitter";

const PatientList = ({
  patientList = [],
  isLoading = false,
  pagination = {},
  filter = {},
  onDelete = () => {},
  onChange = () => {},
  onSubmit = () => {},
  onClear = () => {},
  onCheckboxChange = () => {},
}) => {
  const { t } = useTranslation();
  const [showFilterForm, setShowFilterForm] = useState(false);

  return (
    <MainLayout
      title={t("patient.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("patient.header"), link: "/patient" },
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
          initialValues={filter}
        />
        <CardContainer width="100%" height="fit-content">
          <PatientTable
            dataSource={patientList}
            onDelete={onDelete}
            isLoading={isLoading}
            pagination={pagination}
            onChange={onChange}
            onCheckboxChange={onCheckboxChange}
          />
        </CardContainer>
      </Space>
    </MainLayout>
  );
};

export default PatientList;
