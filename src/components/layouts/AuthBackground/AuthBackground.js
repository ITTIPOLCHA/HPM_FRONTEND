import React from "react";

import Logo from "assets/images/Mahidol_U.png";
import LanguageSwitcher from "components/elements/LanguageSwitcher/LanguageSwitcher";
import styles from "./AuthBackground.module.css";
import { useTranslation } from "react-i18next";

const AuthBackground = ({ children, showLanguageSwitcher = false }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="Mahidol University" className={styles.logo} />
        <p className={styles.title}>
          {t("background.header")}
        </p>
        <p className={styles.subtitle}>
        {t("background.sub_header")}
        </p>
      </div>
      <div className={styles.body}>
        {showLanguageSwitcher ? (
          <LanguageSwitcher className={styles.languageSwitcherContainer} />
        ) : (
          <React.Fragment />
        )}
        {children}
      </div>
      <div className={styles.background} />
    </div>
  );
};

export default AuthBackground;
