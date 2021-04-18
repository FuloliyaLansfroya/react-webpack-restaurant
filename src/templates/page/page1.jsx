/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Row,
  Col,
  Card,
  Calendar,
  Button,
  Drawer,
  Form,
  DatePicker,
  Select,
  Input,
  Empty,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React from "react";
import Login from "../../components/Login";
import Contents from "./content";
import axios from "../../interceptor";
import Socket from "../../utils/dds";
import { user, message, content, changeUser } from "../../utils/config";
import local from "../../utils/localStorage";
const { Option } = Select;
class Page1 extends React.Component {
  formRef1 = React.createRef();
  formRef2 = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loginFlag: true,
      isAdmin: true,
      visible: false,
      placement: "top",
      list: [],
      user: {},
      visible2: false,
      visible3: false,
    };
  }
  componentDidMount() {
    if (local.wss.getItem("loginId") &&
      local.wss.getItem("hash")) {
      this.setState({
        loginFlag: false,
      })
    } else {
      this.setState({
        loginFlag: true,
      })
    }
    if (local.wss.getItem("type") === "admin") {
      this.setState({
        isAdmin: true,
      })
    } else {
      this.setState({
        isAdmin: false,
      })
    }
    this.getUser()
    this.setList();
    const { list } = this.state;
    //    判断专家是否登录
    this.socket = new Socket({
      socketUrl: "ws://localhost:3001",
      socketMessage: (receive) => {
        console.log(JSON.parse(receive.data)); //后端返回的数据，渲染页面
        const data = JSON.parse(receive.data);
        if (
          data.username !== undefined &&
          data.username !== "" &&
          data.msg !== undefined &&
          data.msg !== ""
        ) {
          list.push({
            username: data.username,
            msg: data.msg,
          });
          this.setState({
            list,
          });
        }
      },
      socketClose: (msg) => {
        console.log(msg);
      },
      socketError: () => {
        console.log(this.state.taskStage + "连接建立失败");
      },
      socketOpen: () => {
        console.log("连接建立成功");
      },
    });
    // 重试创建socket连接;
    try {
      this.socket.connection();
    } catch (e) {
      // 捕获异常，防止js error
      // donothing
    }
  }
  getUser = () => {
    axios({
      method: "post",
      url: user,
      data: {
        id: local.wss.getItem("loginId"),
      },
    }).then((res) => {
      const { data } = res.data;
      const { list } = data;
      this.setState({
        user: list[0],
      });
    });
  };

  onFinish = (values) => {
    console.log(values);
    axios({
      method: "post",
      url: content,
      data: {
        values
      }
    }).then((res) => {
      const { code, data } = res.data;
      console.log(data);
      if (code === "0") {
        this.setState({
          visible2: false,
        });
        setTimeout(() => {
          window.location = "/"
        }, 1000 / 600)
      }
    })
  };
  onOk = (values) => {
    console.log(values);
    local.wss.setItem("username", values.username);
    axios({
      method: "post",
      url: changeUser,
      data: {
        values,
        id: local.wss.getItem("loginId"),
      }
    }).then((res) => {
      const { code, data } = res.data;
      console.log(data);
      if (code === "0") {
        this.setState({
          visible3: false,
        });
        setTimeout(() => {
          window.location = "/"
        }, 1000 / 600)
      }
    })

  };
  showWrite = () => {
    this.setState({
      visible2: true,
    });
  };

  closeWrite = () => {
    this.setState({
      visible2: false,
    });
  };
  showChange = () => {
    this.setState({
      visible3: true,
    });
  };

  closeChange = () => {
    this.setState({
      visible3: false,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  setList = () => {
    axios({
      method: "get",
      url: message,
    })
      .then((res) => {
        const { data } = res.data;
        const { list } = data;
        console.log(list)
        const len = [];
        list.map((value, index) => {
          if (
            value.username === local.wss.getItem("username")
          ) {
            len.push({ username: value.username, msg: value.msg });
          }
        });
        console.log(len)
        this.setState({
          list: len,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getList = (list) => (
    <div>
      {list.length === 0 ? (
        <Empty description={false} />
      ) : (
          list.map((value, index) => (
            <p
              style={{
                whiteSpace: "normal",
                wordBreak: "break-all",
                wordWrap: "break-word",
              }}
              key={index}
            >
              {index + 1}.{value.msg}
            </p>
          ))
        )}
    </div>
  );
  render() {
    const {
      loginFlag,
      isAdmin,
      visible,
      placement,
      list,
      user,
      visible2,
      visible3,
    } = this.state;
    const { type } = this.props;
    return (
      <>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={18}>
            <Contents type={type} />
          </Col>
          <Col className="gutter-row" span={6}>
            {loginFlag ? (
              <Card style={{ width: 300, height: 300 }}>
                <Login />
              </Card>
            ) : (
                <Card
                  title={user.username}
                  extra={
                    isAdmin ? (
                      <Link
                        to={{
                          pathname: "/restaurant/gourmet",
                          state: { storeId: user.storeId },
                        }}
                        style={!user.storeId ? { display: "none" } : { display: "block" }}
                      >
                        餐厅页
                      </Link>
                    ) : (
                        ""
                      )
                  }
                  style={{ width: 300, height: 400 }}
                >
                  <p>自我介绍:{user.introduce}</p>
                  <p>身份:{user.type}</p>
                  <p>邮箱:{user.email}</p>
                  <p>手机号:{user.phone}</p>
                  <p>
                    通知：
                  <Button type="primary" onClick={this.showDrawer}>
                      {list.length}条
                  </Button>
                  </p>
                  <p>
                    <Button type="primary" onClick={this.showWrite}>
                      <PlusOutlined /> 发表文章
                  </Button>
                  </p>
                  <Row gutter={36}>
                    <Col span={12}>
                      <Button type="primary" onClick={this.showChange}>
                        <PlusOutlined /> 修改个人信息
                    </Button>
                    </Col>
                    <Col span={12} style={isAdmin ? { display: "block" } : { display: "none" }}>
                      <Link
                        style={
                          !user.storeId ? { opacity: 1 } : { opacity: 0 }
                        }
                        to="/createRestaurant"
                      >
                        创建网上餐厅
                    </Link>
                    </Col>
                  </Row>
                </Card>
              )}

            <div
              style={{
                width: 300,
              }}
            >
              <Calendar fullscreen={false} />
            </div>
          </Col>
        </Row>
        <Drawer
          title="通知消息"
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
        >
          {this.getList(list)}
        </Drawer>
        <Drawer
          title="发表文章"
          width={720}
          onClose={this.closeWrite}
          visible={visible2}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={this.onFinish}
            ref={this.formRef1}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="author"
                  label="作者"
                  rules={[{ required: true, message: "请输入作者" }]}
                >
                  <Input
                    placeholder="请输入作者"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="标题"
                  rules={[{ required: true, message: "请输入标题" }]}
                >
                  <Input style={{ width: "100%" }} placeholder="请输入标题" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="主题"
                  rules={[{ required: true, message: "请选择主题" }]}
                >
                  <Select placeholder="请选择主题">
                    <Option value="rest">餐厅相关</Option>
                    <Option value="person">个人相关</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="日期"
                  rules={[{ required: true, message: "请输入日期" }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="content"
                  label="内容"
                  rules={[
                    {
                      required: true,
                      message: "请输入内容",
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="请输入内容" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              style={{
                textAlign: "right",
              }}
            >
              <Button
                onClick={this.closeWrite}
                style={{ marginRight: 8 }}
                htmlType="button"
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <Drawer
          title="修改个人信息"
          width={720}
          onClose={this.closeChange}
          visible={visible3}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={this.onOk}
            ref={this.formRef2}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的用户名",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入你的用户名"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    {
                      type: "email",
                      message: "请输入正确的邮箱",
                    },
                    {
                      required: true,
                      message: "请输入你的邮箱",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入你的邮箱"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="手机号"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的手机号",
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入你的手机号"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="introduce"
                  label="自我介绍"
                  rules={[
                    {
                      required: true,
                      message: "请输入自我介绍",
                    },
                  ]}
                >
                  <Input.TextArea
                    maxLength={20}
                    rows={4}
                    placeholder="请输入自我介绍(20个字以内)"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              style={{
                textAlign: "right",
              }}
            >
              <Button
                onClick={this.closeWrite}
                style={{ marginRight: 8 }}
                htmlType="button"
              >
                Cancel
              </Button>
              <Button
                onClick={this.closeWrite}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>

      </>
    );
  }
}

export default Page1;
