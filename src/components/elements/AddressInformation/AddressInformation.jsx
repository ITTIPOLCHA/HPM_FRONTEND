import { Col, Divider, Row, Space } from "antd";
import { Input, Select } from "components/form";

import styles from "./AddressInformation.module.css";
import { useTranslation } from "react-i18next";

const Addressinformation = ({
  lower = null,
  provinceOptionsTh = [],
  provinceOptionsEn = [],
  districtOptionsTh = [],
  districtOptionsEn = [],
  subDistrictOptionsTh = [],
  subDistrictOptionsEn = [],
  onProviceChange = () => {},
  onDistrictChange = () => {},
  onSubDistrictChange = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <Space direction="vertical" size={6}>
      <b className={styles.infoTopic}>
        {t("company_profile.label.address_information")}
      </b>
      <Divider />
      <Row gutter={[24, 16]}>
        <Col span={24}>
          <Input
            name="address"
            label={
              t("company_profile.label.address_th") +
              t("common.required_field_suffix")
            }
            placeholder="Address Detail (TH) *"
            size="large"
          />
        </Col>
        <Col span={6}>
          <Select
            name="provinceId"
            label={t("address.province") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            options={provinceOptionsTh}
            onChange={onProviceChange}
          />
        </Col>
        <Col span={6}>
          <Select
            name="districtId"
            label={t("address.district") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            options={districtOptionsTh}
            onChange={onDistrictChange}
          />
        </Col>
        <Col span={6}>
          <Select
            name="subdistrictId"
            label={t("address.subdistrict") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            options={subDistrictOptionsTh}
            onChange={onSubDistrictChange}
          />
        </Col>
        <Col span={6}>
          <Input
            name="zipCode"
            label={t("address.postal_code") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            maxLength={5}
          />
        </Col>
        <Col span={24}>
          <Input
            name="addressEn"
            label={
              t("company_profile.label.address_en") +
              t("common.required_field_suffix")
            }
            placeholder="Address Detail (EN) *"
            size="large"
          />
        </Col>
        <Col span={6}>
          <Select
            name="provinceId"
            label={t("address.province") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            options={provinceOptionsEn}
            onChange={onProviceChange}
          />
        </Col>
        <Col span={6}>
          <Select
            name="districtId"
            label={t("address.district") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            options={districtOptionsEn}
            onChange={onDistrictChange}
          />
        </Col>
        <Col span={6}>
          <Select
            name="subdistrictId"
            label={t("address.subdistrict") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            options={subDistrictOptionsEn}
            onChange={onSubDistrictChange}
          />
        </Col>
        <Col span={6}>
          <Input
            name="zipCode"
            label={t("address.postal_code") + t("common.required_field_suffix")}
            placeholder="Please Select"
            size="large"
            maxLength={5}
          />
        </Col>
      </Row>
      {lower}
    </Space>
  );
};

export default Addressinformation;
