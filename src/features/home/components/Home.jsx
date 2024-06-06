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

function Home({
  currentDate = "",
  currentTime = "",
  states = {},
  userByLevel = [],
  userByStatusFlag = [],
  onCheckboxChange,
}) {
  const { t } = useTranslation();
  const hasDateTime = currentDate && currentTime;

  return (
    <MainLayout
      title={t("home.header")}
      breadcrumb={[{ title: t("home.header") }]}
    >
      <div className={styles.layout}>
        <CardContainer width="100%" height="fit-content">
          {hasDateTime && (
            <>
              <div className={styles.header}>{t("home.label.card_one")}</div>
              <div className={styles.sub_header}>
                <div
                  className={`${styles.icon_and_text_container} ${styles.align_right_header}`}
                >
                  {t("home.label.card_one_date")}{" "}
                  <span
                    className={`${styles.blue_text} ${styles.right_aligned_text}`}
                  >
                    {currentDate}
                  </span>{" "}
                  {t("home.label.card_one_time")}{" "}
                  <span
                    className={`${styles.blue_text} ${styles.right_aligned_text} ${styles.left_aligned_text}`}
                  >
                    {currentTime}
                  </span>
                </div>
              </div>
            </>
          )}
          {!hasDateTime && (
            <div className={styles.header}>
              {t("home.label.loading")} <LoadingOutlined />
            </div>
          )}
        </CardContainer>
      </div>
      <div className={styles.layout}>
        <CardState
          width="23%"
          height="fit-content"
          color="#248AFD"
          hasDateTime={hasDateTime}
          logo={<TeamOutlined style={{ color: "#FFFFFF" }} />}
          value={states.userAll}
          label={t("home.label.card_two")}
        />
        <CardState
          width="23%"
          height="fit-content"
          color="#71C02B"
          hasDateTime={hasDateTime}
          logo={<SmileOutlined style={{ color: "#FFFFFF" }} />}
          value={states.userSent}
          label={t("home.label.card_three")}
          percent={states.percentUserSent}
          openProgress={true}
        />
        <CardState
          width="23%"
          height="fit-content"
          color="#FFC107"
          hasDateTime={hasDateTime}
          logo={<FrownOutlined style={{ color: "#FFFFFF" }} />}
          value={states.userUnsent}
          label={t("home.label.card_four")}
          percent={states.percentUserUnsent}
          openProgress={true}
        />
        <CardState
          width="23%"
          height="fit-content"
          color="#FF4747"
          hasDateTime={hasDateTime}
          logo={<WarningOutlined style={{ color: "#FFFFFF" }} />}
          value={states.userWarning}
          label={t("home.label.card_five")}
          percent={states.percentUserWarning}
          openProgress={true}
        />
      </div>
      <div className={styles.layout}>
        <CardContainer width="50%" height="fit-content">
          <div className={styles.header_list}>{t("home.label.card_six")}</div>
          <MyList
            height={"35rem"}
            data={userByLevel}
            totalDataCount={userByLevel.length}
            boolean={false}
            onCheckboxChange={onCheckboxChange}
          />
        </CardContainer>
        <div style={{ width: "49%" }} height="fit-content">
          <>
            <CardContainer width="100%" height="fit-content" color="#6F42C1">
              {hasDateTime && (
                <div
                  className={styles.header_mini}
                  style={{ marginBottom: "1.5rem", padding: "0.5rem" }}
                >
                  <div
                    className={`${styles.icon_and_text_container} ${styles.align_right}`}
                  >
                    {t("home.label.card_seven_one")}
                    <span className={styles.right_aligned_text}>
                      sys : {states.bloodPressureCurrent?.sys}
                    </span>
                  </div>
                  <div
                    className={`${styles.icon_and_text_container} ${styles.align_right}`}
                  >
                    <span className={styles.right_aligned_text}>
                      dia : {states.bloodPressureCurrent?.dia}
                    </span>
                  </div>
                  <div
                    className={`${styles.icon_and_text_container} ${styles.align_right}`}
                  >
                    {t("home.label.card_seven_two")}{" "}
                    {states.bloodPressureCurrent?.createBy?.firstName}{" "}
                    {states.bloodPressureCurrent?.createBy?.lastName}
                    {" ( "}
                    {states.bloodPressureCurrent?.createBy?.hn}
                    {" )"}
                    <span className={styles.right_aligned_text}>
                      pul : {states.bloodPressureCurrent?.pul}
                    </span>
                  </div>
                </div>
              )}
              {!hasDateTime && (
                <div className={styles.header_mini}>
                  {t("home.label.loading")} <LoadingOutlined />
                </div>
              )}
            </CardContainer>
            <CardContainer width="100%" height="fit-content">
              <div className={styles.header_list} style={{ padding: "0.5rem" }}>
                {t("home.label.card_eight")}
              </div>
              <MyList
                height={"24.5rem"}
                data={userByStatusFlag}
                totalDataCount={userByStatusFlag.length}
                boolean={true}
                onCheckboxChange={onCheckboxChange}
              />
            </CardContainer>
          </>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
