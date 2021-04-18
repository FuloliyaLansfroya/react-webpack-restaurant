import { Layout, Menu, Popover, Empty, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Socket from "../../utils/dds";
import React from "react";
import Page from "./page";
import axios from "../../interceptor";
import { message } from "../../utils/config";
import local from "../../utils/localStorage";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const text = <span>全体通知</span>;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "groumet",
      list: [],
    };
  }
  getContent = (list) => (
    <div>
      {list.length === 0 ? (
        <Empty description={false} style={{ width: 700 }} />
      ) : (
          <List
            bordered
            className="res-header"
            style={{ width: 700, maxHeight: 475, overflowY: "scroll" }}
            dataSource={list}
            renderItem={(item) => (
              <List.Item onClick={this.closeMsg}>{item.allMsg}</List.Item>
            )}
          />
        )}
    </div>
  );
  onClick = (value) => {
    this.setState({
      title: value.key,
    });
  };
  getList = () => {
    axios({
      method: "get",
      url: message,
    })
      .then((res) => {
        const { data } = res.data;
        const { list } = data;
        const len = [];
        list.map((value, index) => {
          if (value.allMsg !== "" && value.allMsg !== "undefined") {
            len.push({ allMsg: value.allMsg });
          }
        });
        this.setState({
          list: len,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    if (!local.wss.getItem("loginId") &&
      !local.wss.getItem("hash") &&
      local.wss.getItem("type") !== "admin") {
      window.location = "/"
    }
    this.getList()
    const { list } = this.state;
    //    判断专家是否登录
    this.socket = new Socket({
      socketUrl: "ws://localhost:3001",
      socketMessage: (receive) => {
        console.log(JSON.parse(receive.data)); //后端返回的数据，渲染页面
        const data = JSON.parse(receive.data);
        if (data.allMsg !== undefined && data.allMsg !== "") {
          list.push({ allMsg: data.allMsg });
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
  };
  render() {
    const { title, list } = this.state;
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Popover
            placement="bottomLeft"
            title={text}
            content={this.getContent(list)}
            trigger="click"
          >
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">全体通知：{list.length}条</Menu.Item>
              <Menu.Item key="2">
                {" "}
                <a href="/">返回首页</a>
              </Menu.Item>
            </Menu>
          </Popover>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{ height: "100%" }}
            className="site-layout-background"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={title}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              onClick={this.onClick}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="餐品管理">
                <Menu.Item key="groumet">菜品管理</Menu.Item>
                <Menu.Item key="drinkDesert">甜品管理</Menu.Item>
              </SubMenu>
              <Menu.Item key="join">加盟管理</Menu.Item>
              <Menu.Item key="comment">评论管理</Menu.Item>

              <Menu.Item key="web">数据广播</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                overflowY: "scroll",
              }}
            >
              <Page title={title} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
