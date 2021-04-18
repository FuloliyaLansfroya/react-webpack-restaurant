/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Space,
  Button,
} from "antd";
import axios from "../../interceptor";
import Web from "./web";
import { drinkAdesert, gourmet, join, comments } from "../../utils/config";
import local from "../../utils/localStorage";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber key={record => record.id} /> : <Input key={record => record.id} />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};

class Page extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingKey: "",
      oldProps: "",
    };
  }
  columns = [
    {
      title: "菜名",
      dataIndex: "dishName",
      editable: true,
    },
    {
      title: "介绍",
      dataIndex: "introduce",
      editable: true,
    },
    {
      title: "价格",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "打折后价格",
      dataIndex: "sellPrice",
      editable: true,
    },
    {
      title: "主料",
      dataIndex: "main",
      editable: true,
    },
    {
      title: "香辛料",
      dataIndex: "spice",
      editable: true,
    },
    {
      title: "油",
      dataIndex: "oil",
      editable: true,
    },
    {
      title: "类型",
      dataIndex: "type",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => this.save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={this.cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <Space>
              <Typography.Link
                disabled={this.state.editingKey !== ""}
                onClick={() => this.edit(record)}
              >
                Edit
            </Typography.Link>
              <Typography.Link
                disabled={this.state.editingKey !== ""}
                onClick={() => this.deleted(record)}
              >
                Delete
            </Typography.Link>
            </Space>
          );
      },
    },
  ];
  drinkColumns = [
    {
      title: "饮品/甜品名",
      dataIndex: "dishName",
      editable: true,
    },
    {
      title: "介绍",
      dataIndex: "introduce",
      editable: true,
    },
    {
      title: "价格",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "打折后价格",
      dataIndex: "sellPrice",
      editable: true,
    },
    {
      title: "主料",
      dataIndex: "main",
      editable: true,
    },
    {
      title: "辅料",
      dataIndex: "seconds",
      editable: true,
    },
    {
      title: "甜度/酒精浓度",
      dataIndex: "sweet",
      editable: true,
    },
    {
      title: "类型",
      dataIndex: "type",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => this.save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={this.cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <Space>
              <Typography.Link
                disabled={this.state.editingKey !== ""}
                onClick={() => this.edit(record)}
              >
                Edit
            </Typography.Link>
              <Typography.Link
                disabled={this.state.editingKey !== ""}
                onClick={() => this.deleted(record)}
              >
                Delete
            </Typography.Link>
            </Space>
          );
      },
    },
  ];
  joinColumns = [
    {
      title: "姓名",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "年龄",
      dataIndex: "age",
      editable: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "电话",
      dataIndex: "phone",
      editable: true,
    },
    {
      title: "自我介绍",
      dataIndex: "introduce",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Space>
            <Typography.Link
              disabled={this.state.editingKey !== ""}
              onClick={() => this.deleted(record)}
            >
              Delete
            </Typography.Link>
          </Space>
        );
      },
    },
  ];
  CommentColumns = [
    {
      title: "作者",
      dataIndex: "author",
      editable: true,
    },
    {
      title: "内容",
      dataIndex: "content",
      editable: true,
    },
    {
      title: "时间",
      dataIndex: "datetime",
    },
    {
      title: "对应餐品Id",
      dataIndex: "dishId",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Space>
            <Typography.Link
              disabled={this.state.editingKey !== ""}
              onClick={() => this.deleted(record)}
            >
              Delete
            </Typography.Link>
          </Space>
        );
      },
    },
  ];
  getUrl = (title) => {
    if (title === "groumet") {
      return gourmet;
    } else if (title === "drinkDesert") {
      return drinkAdesert;
    } else if (title === "join") {
      return join;
    } else if (title === "comment") {
      return comments;
    }
  };
  isEditing = (record) => record.id === this.state.editingKey;
  edit = (record) => {
    console.log(record);
    this.formRef.current.setFieldsValue({
      ...record,
    });
    this.setState({
      editingKey: record.id,
    });
  };
  deleted = (record) => {
    const { title } = this.props;
    console.log(record);
    axios({
      method: "post",
      url: this.getUrl(title),
      data: record,
    }).then((res) => {
      console.log(res);
    });
  };
  cancel = () => {
    this.setState({
      editingKey: "",
    });
  };
  save = async (key) => {
    const { title } = this.props;
    try {
      const row = await this.formRef.current.validateFields();
      console.log(row, key)
      const newData = [...this.state.data];
      newData.findIndex((item) => { console.log(item) })
      const index = newData.findIndex((item) => key === item.id);
      console.log(newData)
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }
      this.setState({
        data: newData,
        editingKey: "",
      });
      axios({
        method: "post",
        url: this.getUrl(title),
        data: {
          list: newData[index],
          storeId: local.wls.getItem("storeId"),
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  handleAdd = () => {
    const { data } = this.state;
    console.log(data)
    const newData = [...data];
    const count = newData.length;
    newData.push({
      id: `${count + 1}`,
      dishName: "",
      introduce: "",
      price: 0,
      sellPrice: 0,
      main: "",
      spice: "",
      oil: "",
      type: ""
    });
    this.setState({
      data: newData,
    });
    this.edit({
      id: `${count + 1}`,
      dishName: "",
      introduce: "",
      price: "",
      sellPrice: "",
      main: "",
      spice: "",
      oil: "",
      type: ""
    });
  };
  getList = (title) => {
    if (title === "web") {
      console.log("web")
    } else {
      axios({
        method: "get",
        url: this.getUrl(title),
        params: {
          type: title,
          storeId: local.wls.getItem("storeId"),
        },
      })
        .then((res) => {
          const { data } = res.data;
          const { list } = data;
          console.log(res)
          this.setState({
            data: list,
            count: list.length,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  getColumns(title) {
    let mergedColumns = [];
    if (title === "groumet") {
      mergedColumns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType:
              col.dataIndex === "price" || col.dataIndex === "sellPrice"
                ? "number"
                : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
    } else if (title === "drinkDesert") {
      mergedColumns = this.drinkColumns.map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === "price" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
    } else if (title === "comment") {
      mergedColumns = this.CommentColumns.map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === "price" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
    } else if (title === "join") {
      mergedColumns = this.joinColumns.map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === "price" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
    }
    return mergedColumns;
  }
  componentDidMount() {
    const { title } = this.props;
    this.getList(title);
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { title } = this.props;
    console.log(title)
    if (prevProps.title !== title) {
      this.getList(title);
    }

    return null;
  }
  componentDidUpdate() { }
  render() {
    const { data } = this.state;
    const { title } = this.props;
    console.log(data)
    return (
      <>
        {title === "web" ? (
          <Web />
        ) : (
            <Form ref={this.formRef} component={false}>
              <Button
                onClick={this.handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
                style={
                  title === "join" || title === "comment"
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                添加
            </Button>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                rowKey={record => {
                  return title === "join" ? record.joinId :
                    (title === "comment" ? record.commentId : record.id)
                }}
                dataSource={data}
                columns={this.getColumns(title)}
                rowClassName="editable-row"
                pagination={{
                  onChange: this.cancel,
                  pageSize: 6,
                }}
              />
            </Form>
          )}
      </>
    );
  }
}

export default Page;
