import {
  FrownOutlined,
  LoadingOutlined,
  SmileOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { CardContainer } from "components/elements";
import CardState from "components/elements/CardContainer/CardState";
import MyList from "components/elements/List/MyList";
import { MainLayout } from "components/layouts";
import { useTranslation } from "react-i18next";
import styles from "../styles/Home.module.css";
import { Col, Row } from "antd";

function Home({
  isLoadingStatus = true,
  currentDate = "",
  currentTime = "",
  states = {},
  userByLevel = [],
  userByStatusFlag = [],
  onCheckboxChange,
}) {
  const { t } = useTranslation();
  const hasDateTime = currentDate;

  return (
    <MainLayout
      title={t("home.header")}
      breadcrumb={[{ title: t("home.header") }]}
    >
      <div className={styles.layout}>
        <CardContainer width="100%" height="fit-content">
          {currentDate && (
            <>
              <div className={styles.header}>{t("home.label.card_one")}</div>
              <div className={styles.sub_header}>
                <div className={`${styles.icon_and_text_container}`}>
                  {t("home.label.card_one_date")}
                  <span className={`${styles.blue_text}`}>{currentDate}</span>
                  {t("home.label.card_one_time")}
                  <span className={`${styles.blue_text}`}>{currentTime}</span>
                </div>
              </div>
            </>
          )}
          {!currentDate && (
            <div className={styles.header}>
              {t("home.label.loading")} <LoadingOutlined />
            </div>
          )}
        </CardContainer>
      </div>
      <div className={styles.layout}>
        <Row gutter={[24, 12]} style={{ width: "100%" }}>
          <Col xs={24} sm={12} md={6} lg={6}>
            <CardState
              width="100%"
              height="fit-content"
              color="#134790"
              hasDateTime={hasDateTime}
              logo={<TeamOutlined style={{ color: "#FFFFFF" }} />}
              value={states.userAll}
              label={t("home.label.card_two")}
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <CardState
              width="100%"
              height="fit-content"
              color="#139019"
              hasDateTime={hasDateTime}
              logo={<SmileOutlined style={{ color: "#FFFFFF" }} />}
              value={states.userSent}
              label={t("home.label.card_three")}
              percent={states.percentUserSent}
              openProgress={true}
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <CardState
              width="100%"
              height="fit-content"
              color="#907b13"
              hasDateTime={hasDateTime}
              logo={<FrownOutlined style={{ color: "#FFFFFF" }} />}
              value={states.userUnsent}
              label={t("home.label.card_four")}
              percent={states.percentUserUnsent}
              openProgress={true}
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <CardState
              width="100%"
              height="fit-content"
              color="#901313"
              hasDateTime={hasDateTime}
              logo={<WarningOutlined style={{ color: "#FFFFFF" }} />}
              value={states.userWarning}
              label={t("home.label.card_five")}
              percent={states.percentUserWarning}
              openProgress={true}
            />
          </Col>
        </Row>
      </div>
      <div className={styles.layout}>
        <Row gutter={[24, 12]} style={{ width: "100%" }}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CardContainer width="100%" height="100%">
              <div className={styles.header_list}>
                <h2>{t("home.label.card_six")}</h2>
              </div>
              <MyList
                height={"35rem"}
                data={currentDate ? userByLevel : []}
                totalDataCount={userByLevel.length}
                boolean={false}
                onCheckboxChange={onCheckboxChange}
              />
            </CardContainer>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <div style={{ width: "100%", height: "100%" }}>
              <>
                <CardContainer
                  width="100%"
                  height="fit-content"
                  color="#451390"
                >
                  {currentDate && (
                    <div
                      className={styles.header_mini}
                      style={{
                        padding: "1rem",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      <div
                        className={`${styles.icon_and_text_container} ${styles.align_right}`}
                      >
                        {t("home.label.card_seven_one")}
                        <span className={styles.right_aligned_text}>
                          sys : {states.bloodPressureCurrent?.systolicPressure}
                        </span>
                      </div>
                      <div
                        className={`${styles.icon_and_text_container} ${styles.align_right}`}
                      >
                        <span className={styles.right_aligned_text}>
                          dia : {states.bloodPressureCurrent?.diastolicPressure}
                        </span>
                      </div>
                      <div
                        className={`${styles.icon_and_text_container} ${styles.align_right}`}
                      >
                        {t("home.label.card_seven_two")}{" "}
                        {states.bloodPressureCurrent?.createBy?.firstName}{" "}
                        {states.bloodPressureCurrent?.createBy?.lastName}
                        {" ( "}
                        {states.bloodPressureCurrent?.createBy?.hospitalNumber}
                        {" )"}
                        <span className={styles.right_aligned_text}>
                          pul : {states.bloodPressureCurrent?.pulseRate}
                        </span>
                      </div>
                    </div>
                  )}
                  {!currentDate && (
                    <div className={styles.header_mini}>
                      {t("home.label.loading")} <LoadingOutlined />
                    </div>
                  )}
                </CardContainer>
                <CardContainer width="100%" height="fit-content">
                  <div
                    className={styles.header_list}
                    style={{ padding: "0.5rem", height: "fit-content" }}
                  >
                    <h2>{t("home.label.card_eight")}</h2>
                  </div>
                  <MyList
                    height={"fit-content"}
                    data={currentDate ? userByStatusFlag : []}
                    totalDataCount={userByStatusFlag.length}
                    boolean={true}
                    onCheckboxChange={onCheckboxChange}
                    isLoading={isLoadingStatus}
                  />
                </CardContainer>
              </>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

export default Home;
