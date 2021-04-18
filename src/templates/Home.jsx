import {
  Layout,
  Popover,
  Menu,
  Breadcrumb,
  BackTop,
  Empty,
  List,
  Row,
  Col,
} from "antd";
import React from "react";
import Socket from "../utils/dds";
import Page1 from "./page/page1";
import axios from "../interceptor";
import { message } from "../utils/config";
const { Header, Content, Footer } = Layout;
const text = <span>全体通知</span>;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      type: "content",
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
    this.getList();
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
  onClick = () => {
    const { type } = this.state;
    type === "content"
      ? this.setState({
        type: "list",
      })
      : this.setState({
        type: "content",
      });
  };
  render() {
    const { list, type } = this.state;
    return (
      <Layout className="layout">
        <BackTop />
        <Header>
          <div className="logo" />
          <Row>
            <Col span={20}>
              <Popover
                placement="bottomLeft"
                title={text}
                content={this.getContent(list)}
                trigger="click"
              >
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item key="1">全体通知：{list.length}条</Menu.Item>
                </Menu>
              </Popover>
            </Col>
            <Col span={4}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="2" onClick={this.onClick}>
                  {type === "content" ? "餐厅列表" : "文章列表"}
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div className="site-layout-content">
            <Page1 type={type} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Home;
