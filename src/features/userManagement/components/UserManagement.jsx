import { MainLayout } from 'components/layouts'
import React from 'react'
import { useTranslation } from "react-i18next";

function UserManagement() {
    const { t } = useTranslation();
  return (
    <MainLayout 
        title={t("user_management.header")}
        breadcrumb={[{ title: t("user_management.header") }]}
    >
        <div style={{marginTop: "2rem"}}>Hello World!</div>
    </MainLayout>
  )
}

export default UserManagement