import { MainLayout } from 'components/layouts'
import React from 'react'
import { useTranslation } from "react-i18next";
import { Row, Space, Table } from "antd";
import { Button, CardContainer, PatientTable } from "components/elements";
import styles from "../styles/UserManagement.module.css"
import { useState, useEffect } from 'react';

function UserManagementComponent() {
    const { t } = useTranslation();
    const [tableWidth, setTableWidth] = useState(
        window.innerWidth > 1000 ? 
        document.documentElement.clientWidth - 56 - 213.83 
        : document.documentElement.clientWidth - 26
      )
    
      useEffect(() => {
        const handleResize = () => {
          setTableWidth(
            window.innerWidth > 1000 ? 
            document.documentElement.clientWidth - 56 - 213.83 
            : document.documentElement.clientWidth - 26
          );
        };
    
        window.addEventListener("resize", handleResize);
      }, [tableWidth])

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
                <CardContainer width={`${tableWidth}px`} height="fit-content">
                    <Table></Table>
                </CardContainer>
            </Space>
        </MainLayout>
    )
}

export default UserManagementComponent