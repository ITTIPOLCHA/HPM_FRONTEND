import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Table } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

const BloodPressureTable = ({
  onChange = () => { },
  onDelete = () => { },
  isLoading = false,
  pagination = {},
  dataSource = [],
}) => {
  const { t } = useTranslation();

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
        const currentPage = pagination?.page || 1;
        const pageSize = pagination?.size || 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
      width: "1%",
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.sys")}</div>,
      dataIndex: "sys",
      key: "sys",
      width: "10%",
      sorter: (a, b) => parseInt(a.sys) - parseInt(b.sys),
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.dia")}</div>,
      dataIndex: "dia",
      key: "dia",
      width: "10%",
      sorter: (a, b) => parseInt(a.dia) - parseInt(b.dia),
    },
    {
      title: <div className="text-table">{t("blood_pressure.label.pul")}</div>,
      dataIndex: "pul",
      key: "pul",
      width: "10%",
      sorter: (a, b) => parseInt(a.pul) - parseInt(b.pul),
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.create")}</div>
      ),
      dataIndex: "createBy",
      key: "createBy",
      width: "20%",
      render: (_, record) =>
        record.createBy?.firstName + " " + record.createBy?.lastName,
    },
    {
      title: (
        <div className="text-table">{t("blood_pressure.label.updateBy")}</div>
      ),
      dataIndex: "updateBy",
      key: "updateBy",
      width: "20%",
      render: (_, record) =>
        record.updateBy?.firstName + " " + record.updateBy?.lastName,
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
        console.log(record);
        return (
          <Space size="middle">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a
                        href={`/patient/${record?.createBy?.id}`}
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
                        href={`/blood_pressure/${record?.id}/edit`}
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
                          onDelete(record?.id);
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
        )
      },
    },
  ];

  return (
    <>
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
    </>
  );
};

export default BloodPressureTable;
