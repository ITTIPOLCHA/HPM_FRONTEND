import { MainLayout } from 'components/layouts'
import React from 'react'
import { useTranslation } from "react-i18next";
import { Row, Space } from "antd";
import { Button } from "components/elements";
import styles from "../styles/UserManagement.module.css"

function UserManagement() {
    const { t } = useTranslation();
  return (
    <MainLayout 
        title={t("user_management.header")}
        breadcrumb={[
            { title: t("home.header"), link: "/" }, 
            { title: t("user_management.header") }
        ]}
    >
        <Space className={styles.container} direction="vertical" size={24}>
            <Row justify="end">
                <Button type="default">เพิ่มผู้ใช้</Button>
            </Row>
        </Space>
    </MainLayout>
  )
}

export default UserManagement