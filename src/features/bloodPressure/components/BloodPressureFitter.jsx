import { Col, Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { Input, InputNumber, Select } from "components/form";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";
import schema from "../schemas/bloodPressureSchema";

const FilterSection = ({
  showFilterForm,
  onSubmit,
  onClear,
  userDropDownName,
  userDropDownHn,
  initialValues,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {showFilterForm && (
        <CardContainer width="100%" height="fit-content">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit, resetForm }) => (
              <Form onSubmit={handleSubmit} style={{ padding: "16px" }}>
                <Row gutter={24} style={{ paddingBottom: "10px" }}>
                  <Col
                    span={6}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Select
                      name="patient"
                      label={t("blood_pressure.label.createBy")}
                      placeholder="select user..."
                      size="large"
                      options={userDropDownName}
                    />
                  </Col>
                  <Col
                    span={6}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Select
                      name="patient"
                      label={t("blood_pressure.label.createByHN")}
                      placeholder="select user..."
                      size="large"
                      options={userDropDownHn}
                    />
                  </Col>
                  <Col
                    span={4}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <InputNumber
                      label={t("blood_pressure.label.sys")}
                      name="systolicPressure"
                      size="large"
                    />
                  </Col>
                  <Col
                    span={4}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <InputNumber
                      label={t("blood_pressure.label.dia")}
                      name="diastolicPressure"
                      size="large"
                    />
                  </Col>
                  <Col
                    span={4}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <InputNumber
                      label={t("blood_pressure.label.pul")}
                      name="pulseRate"
                      size="large"
                    />
                  </Col>
                </Row>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {t("common.confirm")}
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      resetForm();
                      onClear();
                    }}
                  >
                    {t("common.clear")}
                  </Button>
                </Space>
              </Form>
            )}
          </Formik>
        </CardContainer>
      )}
    </>
  );
};

export default FilterSection;
