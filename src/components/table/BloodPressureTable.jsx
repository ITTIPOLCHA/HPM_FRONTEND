import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Table } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BloodPressureTable = ({
  onChange = () => { },
  onDelete = () => { },
  isLoading = false,
  pagination = { current: 1, pageSize: 10, total: 0 },
  dataSource = [],
}) => {
  const { t } = useTranslation();
  const navigator = useNavigate();

  const columns = [
    {
      title: (
        <div className="text-table">
          {t("blood_pressure.label.blood_pressure_id")}
        </div>
      ),
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => {
        const currentPage = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
        return isLoading ? "-" : (currentPage - 1) * pageSize + index + 1;
      },
      width: "1%",
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.sys")}</div>,
      dataIndex: "sys",
      key: "sys",
      width: "10%",
      sorter: (a, b) => parseInt(a.sys) - parseInt(b.sys),
      render: (text) => (isLoading ? "-" : text),
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.dia")}</div>,
      dataIndex: "dia",
      key: "dia",
      width: "10%",
      sorter: (a, b) => parseInt(a.dia) - parseInt(b.dia),
      render: (text) => (isLoading ? "-" : text),
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.pul")}</div>,
      dataIndex: "pul",
      key: "pul",
      width: "10%",
      sorter: (a, b) => parseInt(a.pul) - parseInt(b.pul),
      render: (text) => (isLoading ? "-" : text),
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.create")}</div>
      ),
      dataIndex: "createBy",
      key: "createBy",
      width: "20%",
      render: (_, record) =>
        isLoading ? "-" : record.createBy?.firstName + " " + record.createBy?.lastName,
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.updateBy")}</div>
      ),
      dataIndex: "updateBy",
      key: "updateBy",
      width: "20%",
      render: (_, record) =>
        isLoading ? "-" : record.updateBy?.firstName + " " + record.updateBy?.lastName,
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.updateDate")}</div>
      ),
      dataIndex: "updateDate",
      key: "updateDate",
      width: "20%",
      sorter: (a, b) => moment(a.updateDate) - moment(b.updateDate),
      render: (updateDate) => {
        if (isLoading) return "-";
        const formattedDate = moment.utc(updateDate)
          .utcOffset('+0700')
          .add(543, 'years')
          .format("HH:mm:ss - DD/MM/YYYY");
        return formattedDate;
      },
    },
    {
      title: <div className="text-table">{t("action.action")}</div>,
      key: "action",
      width: "5%",
      fixed: "right",
      render: (_, record) => {
        if (isLoading) return "-";
        return (
          <Space size="middle">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: t("action.view"),
                    icon: <EyeOutlined style={{ fontSize: "18px", color: "gray" }} />,
                    onClick: () => navigator(`/patient/${record?.createBy?.id}`),
                  },
                  {
                    key: "2",
                    label: t("action.edit"),
                    icon: <EditOutlined style={{ fontSize: "18px", color: "gray" }} />,
                    onClick: () => navigator(`/blood_pressure/${record?.id}/edit`),
                  },
                  {
                    key: "3",
                    label: t("action.delete"),
                    icon: <DeleteOutlined style={{ fontSize: "18px", color: "gray" }} />,
                    onClick: () => onDelete(record?.id),
                  },
                ],
              }}
            >
              <MoreOutlined style={{ fontSize: "25px", color: "gray" }} />
            </Dropdown>
          </Space>
        )
      },
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
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true, // เพิ่มเพื่อแสดงตัวเลือกขนาดหน้า
        pageSizeOptions: ['5','10', '20', '50', '100'], // ตัวเลือกขนาดหน้าที่ให้เลือก
      }}
      loading={isLoading}
      onChange={onChange}
      scroll={{ x: true }}
      bordered={true}
      size="large"
    />
  );
};

export default BloodPressureTable;
