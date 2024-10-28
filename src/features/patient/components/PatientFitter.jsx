import { Col, Row, Space } from "antd";
import { Button, CardContainer } from "components/elements";
import { Input, Select } from "components/form";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";
import schema from "../schemas/patientSchema";

const FilterSection = ({
  showFilterForm,
  onSubmit,
  onClear,
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
                    <Input
                      label={t("patient.label.first_name")}
                      name="firstName"
                      size="large"
                    />
                  </Col>
                  <Col
                    span={6}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Input
                      label={t("patient.label.last_name")}
                      name="lastName"
                      size="large"
                    />
                  </Col>
                  <Col span={12}/>
                  <Col
                    span={6}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Input
                      label={t("patient.label.email")}
                      name="email"
                      size="large"
                    />
                  </Col>
                  <Col
                    span={6}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Input
                      label={t("patient.label.phone")}
                      name="phoneNumber"
                      size="large"
                    />
                  </Col>
                  <Col
                    span={6}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Input
                      label={t("patient.label.hn")}
                      name="hospitalNumber"
                      size="large"
                    />
                  </Col>
                  <Col
                    span={6}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Select
                      name="statusFlag"
                      label={t("patient.label.status")}
                      placeholder="select status..."
                      size="large"
                      options={
                        [
                          { label: "Active", value: "ACTIVE" },
                          { label: "Inactive", value: "INACTIVE" },
                        ] || []
                      }
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
