import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Table,Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import alert from "components/elements/Alert";

const PatientTable = ({
  onChange = () => {},
  onDelete = () => {},
  onCheckboxChange = () => {},
  isLoading = false,
  pagination = {},
  dataSource = [],
}) => {
  const { t } = useTranslation();
  const copyPhoneNumber = (phone) => {
    navigator.clipboard.writeText(phone);
  };

  const columns = [
    {
      title: <div className="text-table">{t("patient.label.hn")}</div>,
      dataIndex: "hn",
      key: "hn",
      width: "5%",
      sorter: (a, b) => parseInt(a.hn) - parseInt(b.hn),
    },
    {
      title: <div className="text-table">{t("patient.label.email")}</div>,
      dataIndex: "email",
      key: "email",
      width: "10%",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: <div className="text-table">{t("patient.label.full_name")}</div>,
      dataIndex: "firstName",
      key: "firstName",
      width: "10%",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render: (_, record) => {
        return record.firstName + " " + record.lastName;
      },
    },
    {
      title: <div className="text-table">{t("patient.label.phone")}</div>,
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      sorter: (a, b) => parseInt(a.phone) - parseInt(b.phone),
      render: (phone) => (
        <div
          onClick={() => {
            copyPhoneNumber(phone);
            alert({ message: "Copy phone number complete." });
          }}
          style={{ cursor: "pointer" }}
        >
          {phone}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("patient.label.status")}</div>,
      dataIndex: "statusFlag",
      key: "statusFlag",
      width: "5%",
      sorter: (a, b) => a.statusFlag.localeCompare(b.statusFlag),
      render: (status) => (
        <div
          style={{
            backgroundColor: status === "ACTIVE" ? "#71C02B" : "#FFC107",
            padding: "6px",
            borderRadius: "5px",
            width: "fit-content",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {status}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("patient.label.level")}</div>,
      dataIndex: "level",
      key: "level",
      width: "1%",
      sorter: (a, b) => a.level.localeCompare(b.level),
      render: (level) => (
        <div
          style={{
            backgroundColor: level === "NORMAL" ? "#71C02B" : level === "DANGER" ? "#FF4747" : "#FFC107",
            padding: "6px",
            borderRadius: "5px",
            width: "fit-content",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {level}
        </div>
      ),
    },
    {
      title: <div className="text-table">{t("patient.label.checkState")}</div>,
      dataIndex: "checkState",
      key: "checkState",
      width: "1%",
      sorter: (a, b) => a.checkState - b.checkState,
      align: "center",
      render: (checkState, record) => (
        <Checkbox
          checked={checkState}
          onChange={() => onCheckboxChange(!checkState, record.id)}
          style={{ cursor: "pointer"}}
        />
      ),
    },
    {
      title: <div className="text-table">{t("action.action")}</div>,
      key: "action",
      width: "5%",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <a
                      href={`/patient/${record.id}`}
                      style={{ color: "grey", fontSize: "14px" }}
                    >
                      {t("action.view")}
                    </a>
                  ),
                  icon: (
                    <EyeOutlined style={{ fontSize: "18px", color: "gray" }} />
                  ),
                },
                {
                  key: "2",
                  label: (
                    <a
                      href={`/patient/${record.id}/edit`}
                      style={{ color: "grey", fontSize: "14px" }}
                    >
                      {t("action.edit")}
                    </a>
                  ),
                  icon: (
                    <EditOutlined style={{ fontSize: "18px", color: "gray" }} />
                  ),
                },
                {
                  key: "3",
                  label: (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete(record.id);
                      }}
                      style={{ color: "grey", fontSize: "14px" }}
                    >
                      {t("action.delete")}
                    </span>
                  ),
                  icon: (
                    <DeleteOutlined
                      style={{ fontSize: "18px", color: "gray" }}
                    />
                  ),
                },
              ],
            }}
          >
            <MoreOutlined style={{ fontSize: "25px", color: "gray" }} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        ...pagination,
        showTotal: (total, range) =>
          t("paginate.description")
            .replace("{min}", range[0])
            .replace("{max}", range[1])
            .replace("{total}", total),
      }}
      loading={isLoading}
      onChange={onChange}
      scroll={{ x: true }}
      bordered={true}
      size="large"
    />
  );
};

export default PatientTable;
